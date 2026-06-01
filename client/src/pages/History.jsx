import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function History() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          'https://ats-pro-backend.onrender.com/api/resume/history',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnalyses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) return <div style={styles.center}>⏳ Loading history...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📁 Analysis History</h2>

      {analyses.length === 0 ? (
        <div style={styles.empty}>
          <p>No analyses yet!</p>
          <button
            onClick={() => navigate('/upload')}
            style={styles.button}>
            Analyze Your First Resume
          </button>
        </div>
      ) : (
        <div style={styles.list}>
          {analyses.map((analysis) => (
            <div key={analysis._id} style={styles.card}>
              <div style={styles.cardLeft}>
                <p style={styles.date}>
                  {new Date(analysis.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p style={styles.jobDesc}>
                  {analysis.jobDescription?.substring(0, 100)}...
                </p>
              </div>
              <div style={styles.cardRight}>
                <span style={{
                  ...styles.score,
                  color: getScoreColor(analysis.overallScore)
                }}>
                  {analysis.overallScore}/100
                </span>
                <button
                  onClick={() => navigate(`/results/${analysis._id}`)}
                  style={styles.button}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
  title: {
    color: '#e2e8f0',
    marginBottom: '24px',
    fontSize: '24px'
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#13131f',
    borderRadius: '16px',
    border: '1px solid #1e1e2e',
    color: '#6b7280'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  card: {
    backgroundColor: '#13131f',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    border: '1px solid #1e1e2e',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardLeft: {
    flex: 1
  },
  cardRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  date: {
    color: '#6b7280',
    fontSize: '13px',
    marginBottom: '6px'
  },
  jobDesc: {
    color: '#9ca3af',
    fontSize: '14px'
  },
  score: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  button: {
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default History;