const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const protect = require('../middleware/authMiddleware');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer setup
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed!'), false);
    }
  }
});

// Upload + Extract text from PDF
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    // Read the uploaded file
    const dataBuffer = fs.readFileSync(req.file.path);

    // Extract text from PDF
    const pdfData = await pdfParse(dataBuffer);

    // Delete temp file after reading
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'PDF uploaded and text extracted successfully!',
      text: pdfData.text
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Guest upload - no auth required
router.post('/upload-guest', upload.single('resume'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'PDF uploaded and text extracted successfully!',
      text: pdfData.text
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Analyze resume against job description
router.post('/analyze', protect, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `
      You are an ATS (Applicant Tracking System) expert.
      Analyze this resume against the job description and return ONLY a JSON object with no extra text.

      Resume: ${resumeText}
      Job Description: ${jobDescription}

      Return this exact JSON structure:
      {
        "overallScore": <number 0-100>,
        "atsSections": {
          "skills": {
            "score": <number 0-100>,
            "missing": [<missing skill strings>],
            "suggestions": [<suggestion strings>]
          },
          "experience": {
            "score": <number 0-100>,
            "missing": [<missing experience strings>],
            "suggestions": [<suggestion strings>]
          },
          "education": {
            "score": <number 0-100>,
            "missing": [<missing education strings>],
            "suggestions": [<suggestion strings>]
          },
          "keywords": {
            "score": <number 0-100>,
            "missing": [<missing keyword strings>],
            "suggestions": [<suggestion strings>]
          },
          "formatting": {
            "score": <number 0-100>,
            "suggestions": [<suggestion strings>]
          }
        },
        "topSuggestions": [<top 5 improvement suggestion strings>]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Clean response and parse JSON
    const cleaned = response.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleaned);

    // Save to MongoDB
    const savedAnalysis = await Analysis.create({
      userId: req.userId,
      resumeText,
      jobDescription,
      overallScore: analysis.overallScore,
      atsSections: analysis.atsSections,
      topSuggestions: analysis.topSuggestions
    });

    res.json({
      message: 'Analysis complete!',
      analysisId: savedAnalysis._id,
      ...analysis
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analysis history
router.get('/history', protect, async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('-resumeText');

    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single analysis by ID
router.get('/analysis/:id', protect, async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download analysis as PDF
router.get('/download/:id', async (req, res) => {
  try {
    const token = req.query.token;
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=analysis-${req.params.id}.pdf`);

    doc.pipe(res);

    // Title
    doc.fontSize(24).font('Helvetica-Bold').text('AI Resume Analysis Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica').text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    // Overall Score
    doc.fontSize(18).font('Helvetica-Bold').text('Overall ATS Score', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(36).fillColor(
      analysis.overallScore >= 75 ? 'green' :
      analysis.overallScore >= 50 ? 'orange' : 'red'
    ).text(`${analysis.overallScore}/100`, { align: 'center' });
    doc.fillColor('black').moveDown(2);

    // ATS Section Breakdown
    doc.fontSize(18).font('Helvetica-Bold').text('ATS Section Breakdown', { underline: true });
    doc.moveDown(0.5);

    const sections = analysis.atsSections;
    Object.entries(sections).forEach(([key, value]) => {
      doc.fontSize(14).font('Helvetica-Bold').text(
        `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.score}/100`
      );

      if (value.missing && value.missing.length > 0) {
        doc.fontSize(11).font('Helvetica').fillColor('red')
          .text(`Missing: ${value.missing.join(', ')}`);
        doc.fillColor('black');
      }

      if (value.suggestions && value.suggestions.length > 0) {
        value.suggestions.forEach(s => {
          doc.fontSize(11).font('Helvetica').text(`• ${s}`);
        });
      }
      doc.moveDown();
    });

    // Top Suggestions
    doc.fontSize(18).font('Helvetica-Bold').text('Top Suggestions', { underline: true });
    doc.moveDown(0.5);
    analysis.topSuggestions.forEach((s, i) => {
      doc.fontSize(12).font('Helvetica').text(`${i + 1}. ${s}`);
      doc.moveDown(0.5);
    });

    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Guest analyze - no auth required
router.post('/guest-analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `
      You are an ATS expert.
      Analyze this resume against the job description and return ONLY a JSON object.

      Resume: ${resumeText}
      Job Description: ${jobDescription}

      Return this exact JSON:
      {
        "overallScore": <number 0-100>,
        "topSuggestions": [<top 3 improvement suggestions>],
        "missingKeywords": [<top 5 missing keywords>]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const cleaned = response.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleaned);

    res.json(analysis);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Generate personalized learning path from analysis
router.post('/learning-path', protect, async (req, res) => {
  try {
    const { analysisId } = req.body;

    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    const missingSkills = analysis.atsSections?.skills?.missing || [];
    const missingKeywords = analysis.atsSections?.keywords?.missing || [];
    const suggestions = analysis.topSuggestions || [];

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are a senior tech career coach.
      Based on this resume gap analysis, create a personalized 6-week learning path.

      Missing Skills: ${missingSkills.join(', ')}
      Missing Keywords: ${missingKeywords.join(', ')}
      Top Suggestions: ${suggestions.join(', ')}

      Return ONLY a JSON object with no extra text, no markdown, no backticks:
      {
        "totalWeeks": 6,
        "summary": "<one line overview of the learning path>",
        "weeks": [
          {
            "week": 1,
            "focus": "<main focus area>",
            "topics": ["<topic1>", "<topic2>", "<topic3>"],
            "resources": [
              { "name": "<resource name>", "url": "<real url>", "type": "Free" },
              { "name": "<resource name>", "url": "<real url>", "type": "Free" }
            ],
            "goal": "<what they should achieve by end of this week>"
          }
        ],
        "quickWins": ["<action 1>", "<action 2>", "<action 3>"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const cleaned = response.replace(/```json|```/g, '').trim();
    const learningPath = JSON.parse(cleaned);

    res.json(learningPath);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;