function ScoreCard({ name, score, missing, suggestions }) {
  const getColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
        <span style={{ ...styles.score, color: getColor(score) }}>
          {score}/100
        </span>
      </div>
      <div style={styles.barBg}>
        <div style={{
          ...styles.barFill,
          width: `${score}%`,
          backgroundColor: getColor(score)
        }} />
      </div>
      {missing && missing.length > 0 && (
        <div>
          <p style={styles.missingTitle}>Missing:</p>
          <div style={styles.tagContainer}>
            {missing.map((item, i) => (
              <span key={i} style={styles.tag}>{item}</span>
            ))}
          </div>
        </div>
      )}
      {suggestions && suggestions.map((s, i) => (
        <p key={i} style={styles.suggestion}>💡 {s}</p>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #1e1e2e',
    borderRadius: '10px',
    padding: '16px',
    backgroundColor: '#0f0f1a'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  name: {
    fontWeight: 'bold',
    color: '#e2e8f0',
    textTransform: 'capitalize'
  },
  score: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  barBg: {
    width: '100%',
    backgroundColor: '#1e1e2e',
    borderRadius: '10px',
    height: '8px',
    marginBottom: '12px'
  },
  barFill: {
    height: '8px',
    borderRadius: '10px',
    transition: 'width 1s ease-in-out'
  },
  missingTitle: {
    color: '#ef4444',
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '13px'
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '10px'
  },
  tag: {
    backgroundColor: '#2d1515',
    color: '#ef4444',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  suggestion: {
    fontSize: '13px',
    color: '#9ca3af',
    marginBottom: '4px'
  }
};

export default ScoreCard;