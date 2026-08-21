import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import SuggestionBox from '../components/Suggestion';

function LearningPath({ analysisId, token }) {
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPath = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'https://ai-resume-analyzer-dt6p.onrender.com/api/resume/learning-path',
        { analysisId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPath(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={lpStyles.card}>
      <h3 style={lpStyles.title}>Personalized Learning Path</h3>
      {!path && !loading && (
        <button onClick={fetchPath} style={lpStyles.btn}>
          Generate My 6-Week Learning Path
        </button>
      )}
      {loading && <p style={lpStyles.muted}>Generating your personalized path...</p>}
      {path && (
        <>
          <p style={lpStyles.summary}>{path.summary}</p>
          {path.weeks.map(w => (
            <div key={w.week} style={lpStyles.week}>
              <h4 style={lpStyles.weekTitle}>Week {w.week} - {w.focus}</h4>
              <p style={lpStyles.muted}>Goal: {w.goal}</p>
              <div style={lpStyles.topics}>
                {w.topics.map((t, i) => <span key={i} style={lpStyles.tag}>{t}</span>)}
              </div>
              <div style={{ marginTop: '10px' }}>
                {w.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" style={lpStyles.link}>
                    {r.name} <span style={lpStyles.free}>{r.type}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div style={lpStyles.week}>
            <h4 style={lpStyles.weekTitle}>Quick Wins</h4>
            {path.quickWins.map((q, i) => (
              <p key={i} style={lpStyles.muted}>- {q}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const lpStyles = {
  card: { backgroundColor: '#13131f', borderRadius: '16px', padding: '28px', marginBottom: '20px', border: '1px solid #1e1e2e' },
  title: { color: '#a5b4fc', marginBottom: '16px', fontSize: '18px' },
  summary: { color: '#e2e8f0', marginBottom: '16px', lineHeight: '1.6' },
  week: { backgroundColor: '#0f0f1a', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #1e1e2e' },
  weekTitle: { color: '#c4b5fd', marginBottom: '8px', fontSize: '15px' },
  muted: { color: '#6b7280', fontSize: '13px', marginBottom: '6px' },
  topics: { display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' },
  tag: { backgroundColor: '#1e1e3a', color: '#a5b4fc', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' },
  link: { display: 'block', color: '#60a5fa', fontSize: '13px', marginBottom: '4px', textDecoration: 'none' },
  free: { backgroundColor: '#14532d', color: '#86efac', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', marginLeft: '6px' },
  btn: { padding: '12px 24px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }
};

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
          `https://ai-resume-analyzer-dt6p.onrender.com/api/resume/analysis/${id}`,
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

  if (loading) return <div style={styles.center}>Loading results...</div>;
  if (!analysis) return <div style={styles.center}>Analysis not found!</div>;

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>ATS Analysis Results</h2>
        <div style={styles.scoreCircle}>
          <span style={{ ...styles.scoreNumber, color: getScoreColor(analysis.overallScore) }}>
            {analysis.overallScore}
          </span>
          <span style={styles.scoreLabel}>/ 100</span>
        </div>
        <p style={styles.scoreText}>Overall ATS Score</p>
      </div>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Section Breakdown</h3>
        <div style={styles.sectionsGrid}>
          {Object.entries(analysis.atsSections).map(([key, value]) => (
            <ScoreCard key={key} name={key} score={value.score} missing={value.missing} suggestions={value.suggestions} />
          ))}
        </div>
      </div>
      <SuggestionBox suggestions={analysis.topSuggestions} />
      <LearningPath analysisId={id} token={token} />
      <div style={styles.buttonRow}>
        <button onClick={() => navigate('/upload')} style={styles.button}>Analyze Another Resume</button>
        <button onClick={() => navigate('/history')} style={{ ...styles.button, backgroundColor: '#6b7280' }}>View History</button>
        <button onClick={() => window.open(`https://ai-resume-analyzer-dt6p.onrender.com/api/resume/download/${id}?token=${token}`, '_blank')} style={{ ...styles.button, backgroundColor: '#22c55e' }}>Download PDF Report</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '24px', backgroundColor: '#0f0f1a', minHeight: '100vh' },
  center: { textAlign: 'center', padding: '40px', fontSize: '18px', color: '#e2e8f0' },
  card: { backgroundColor: '#13131f', borderRadius: '16px', padding: '28px', marginBottom: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid #1e1e2e' },
  title: { textAlign: 'center', color: '#e2e8f0', marginBottom: '20px', fontSize: '24px' },
  scoreCircle: { textAlign: 'center', margin: '20px 0' },
  scoreNumber: { fontSize: '90px', fontWeight: 'bold' },
  scoreLabel: { fontSize: '28px', color: '#6b7280' },
  scoreText: { textAlign: 'center', color: '#6b7280', fontSize: '16px', marginTop: '8px' },
  sectionTitle: { color: '#a5b4fc', marginBottom: '16px', fontSize: '18px' },
  sectionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' },
  buttonRow: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' },
  button: { padding: '12px 24px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: '500' }
};

export default Results;
