function KeywordList({ keywords }) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div style={styles.container}>
      <p style={styles.title}>Missing Keywords:</p>
      <div style={styles.tagContainer}>
        {keywords.map((item, i) => (
          <span key={i} style={styles.tag}>{item}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '10px'
  },
  title: {
    color: '#ef4444',
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '13px'
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  tag: {
    backgroundColor: '#2d1515',
    color: '#ef4444',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px'
  }
};

export default KeywordList;