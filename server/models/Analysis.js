const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeText: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  overallScore: {
    type: Number,
    required: true
  },
  atsSections: {
    skills: {
      score: Number,
      missing: [String],
      suggestions: [String]
    },
    experience: {
      score: Number,
      missing: [String],
      suggestions: [String]
    },
    education: {
      score: Number,
      missing: [String],
      suggestions: [String]
    },
    keywords: {
      score: Number,
      missing: [String],
      suggestions: [String]
    },
    formatting: {
      score: Number,
      suggestions: [String]
    }
  },
  topSuggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);