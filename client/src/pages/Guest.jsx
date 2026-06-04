import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Guest() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const spinnerStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      toast.error('Please upload a PDF and enter a job description');
      return;
    }
    setLoading(true);

    try {
      // Step 1 - Upload PDF
      const formData = new FormData();
      formData.append('resume', file);

      const uploadRes = await axios.post(
        'https://ai-resume-analyzer-dt6p.onrender.com/api/resume/upload-guest',
        formData
      );

      const resumeText = uploadRes.data.text;

      // Step 2 - Guest analyze
      const analyzeRes = await axios.post(
        'https://ai-resume-analyzer-dt6p.onrender.com/api/resume/guest-analyze',
        { resumeText, jobDescription }
      );

      setResults(analyzeRes.data);
      toast.success('Analysis complete!');

    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={styles.container}>
      <style>{spinnerStyle}</style>

      {!results ? (
        <div style={styles.card}>
          <h2 style={styles.title}>Try Without Login 🚀</h2>
          <p style={styles.subtitle}>Get a quick ATS score — no account needed!</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label>Upload Resume (PDF only)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={styles.fileInput}
              />
              {file && (
                <div style={styles.fileSelected}>
                  <span>✅</span>
                  <span style={{ color: '#22c55e', fontSize: '14px' }}>
                    {file.name} selected!
                  </span>
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label>Job Description</label>
              <textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                style={styles.textarea}
                rows={8}
                required
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div style={{
                    width: '20px', height: '20px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Analyzing...
                </div>
              ) : '🚀 Analyze Resume'}
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.resultsContainer}>
          {/* Score */}
          <div style={styles.card}>
            <h2 style={styles.title}>Your ATS Score 🎯</h2>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <span style={{
                fontSize: '90px',
                fontWeight: 'bold',
                color: getScoreColor(results.overallScore)
              }}>
                {results.overallScore}
              </span>
              <span style={{ fontSize: '28px', color: '#6b7280' }}>/100</span>
            </div>
            <div style={styles.barBg}>
              <div style={{
                height: '12px',
                borderRadius: '10px',
                width: `${results.overallScore}%`,
                backgroundColor: getScoreColor(results.overallScore),
                transition: 'width 1s ease'
              }} />
            </div>
          </div>

          {/* Missing Keywords */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🔍 Missing Keywords</h3>
            <div style={styles.tagContainer}>
              {results.missingKeywords.map((k, i) => (
                <span key={i} style={styles.tag}>{k}</span>
              ))}
            </div>
          </div>

          {/* Top Suggestions */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>💡 Top Suggestions</h3>
            {results.topSuggestions.map((s, i) => (
              <div key={i} style={styles.suggestionItem}>
                <span style={styles.suggestionNumber}>{i + 1}</span>
                <p style={styles.suggestionText}>{s}</p>
              </div>
            ))}
          </div>

          {/* Register Banner */}
          <div style={styles.banner}>
            <h3 style={styles.bannerTitle}>🔓 Want the full analysis?</h3>
            <p style={styles.bannerText}>
              Sign up for free to get detailed section breakdown, history tracking and downloadable PDF reports!
            </p>
            <div style={styles.bannerButtons}>
              <button
                onClick={() => navigate('/register')}
                style={styles.bannerButton}>
                🚀 Create Free Account
              </button>
              <button
                onClick={() => setResults(null)}
                style={{ ...styles.bannerButton, backgroundColor: '#6b7280' }}>
                🔄 Try Another Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    backgroundColor: '#0f0f1a',
    padding: '20px'
  },
  card: {
    backgroundColor: '#13131f',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    width: '100%',
    maxWidth: '620px',
    border: '1px solid #1e1e2e',
    marginBottom: '20px'
  },
  resultsContainer: {
    width: '100%',
    maxWidth: '620px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '8px',
    color: '#e2e8f0',
    fontSize: '26px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '28px',
    fontSize: '14px'
  },
  inputGroup: {
    marginBottom: '24px'
  },
  fileInput: {
    width: '100%',
    marginTop: '8px',
    padding: '14px',
    border: '2px dashed #4f46e5',
    borderRadius: '10px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    backgroundColor: '#1a1a2e',
    color: '#a5b4fc'
  },
  fileSelected: {
    marginTop: '10px',
    padding: '10px 14px',
    backgroundColor: '#0d2d1a',
    border: '1px solid #22c55e',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    borderRadius: '10px',
    border: '1px solid #374151',
    fontSize: '14px',
    resize: 'vertical',
    boxSizing: 'border-box',
    backgroundColor: '#1e1e2e',
    color: '#e2e8f0',
    lineHeight: '1.6'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px',
    fontWeight: '600'
  },
  sectionTitle: {
    color: '#a5b4fc',
    marginBottom: '16px',
    fontSize: '18px'
  },
  barBg: {
    width: '100%',
    backgroundColor: '#1e1e2e',
    borderRadius: '10px',
    height: '12px',
    margin: '16px 0'
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    backgroundColor: '#2d1515',
    color: '#ef4444',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '13px'
  },
  suggestionItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '14px'
  },
  suggestionNumber: {
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    flexShrink: 0
  },
  suggestionText: {
    color: '#d1d5db',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.6'
  },
  banner: {
    backgroundColor: '#1a1a2e',
    border: '1px solid #4f46e5',
    borderRadius: '16px',
    padding: '28px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  bannerTitle: {
    color: '#e2e8f0',
    fontSize: '20px',
    marginBottom: '10px'
  },
  bannerText: {
    color: '#9ca3af',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  bannerButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  bannerButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

export default Guest;