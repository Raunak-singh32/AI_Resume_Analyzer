import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import SuggestionBox from '../components/Suggestion';

function Results() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await axios.get(
          `https://ats-pro-backend.onrender.com/api/resume/analysis/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnalysis(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (loading) return <div style={styles.center}>⏳ Loading results...</div>;
  if (!analysis) return <div style={styles.center}>Analysis not found!</div>;

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={styles.container}>
      {/* Overall Score */}
      <div style={styles.card}>
        <h2 style={styles.title}>ATS Analysis Results</h2>
        <div style={styles.scoreCircle}>
          <span style={{
            ...styles.scoreNumber,
            color: getScoreColor(analysis.overallScore)
          }}>
            {analysis.overallScore}
          </span>
          <span style={styles.scoreLabel}>/ 100</span>
        </div>
        <p style={styles.scoreText}>Overall ATS Score</p>
      </div>

      {/* ATS Section Breakdown */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📋 Section Breakdown</h3>
        <div style={styles.sectionsGrid}>
          {Object.entries(analysis.atsSections).map(([key, value]) => (
            <ScoreCard
              key={key}
              name={key}
              score={value.score}
              missing={value.missing}
              suggestions={value.suggestions}
            />
          ))}
        </div>
      </div>

      {/* Top Suggestions */}
      <SuggestionBox suggestions={analysis.topSuggestions} />

      {/* Buttons */}
      <div style={styles.buttonRow}>
        <button
          onClick={() => navigate('/upload')}
          style={styles.button}>
          🔄 Analyze Another Resume
        </button>
        <button
          onClick={() => navigate('/history')}
          style={{ ...styles.button, backgroundColor: '#6b7280' }}>
          📁 View History
        </button>
        <button
          onClick={() => window.open(
            `https://ats-pro-backend.onrender.com/api/resume/download/${id}?token=${token}`,
            '_blank'
          )}
          style={{ ...styles.button, backgroundColor: '#22c55e' }}>
          📥 Download PDF Report
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#0f0f1a',
    minHeight: '100vh'
  },
  center: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#e2e8f0'
  },
  card: {
    backgroundColor: '#13131f',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    border: '1px solid #1e1e2e'
  },
  title: {
    textAlign: 'center',
    color: '#e2e8f0',
    marginBottom: '20px',
    fontSize: '24px'
  },
  scoreCircle: {
    textAlign: 'center',
    margin: '20px 0'
  },
  scoreNumber: {
    fontSize: '90px',
    fontWeight: 'bold'
  },
  scoreLabel: {
    fontSize: '28px',
    color: '#6b7280'
  },
  scoreText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '16px',
    marginTop: '8px'
  },
  sectionTitle: {
    color: '#a5b4fc',
    marginBottom: '16px',
    fontSize: '18px'
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px'
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '8px',
    flexWrap: 'wrap'
  },
  button: {
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

export default Results;