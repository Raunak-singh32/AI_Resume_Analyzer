function SuggestionBox({ suggestions }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🎯 Top Suggestions</h3>
      {suggestions.map((s, i) => (
        <div key={i} style={styles.item}>
          <span style={styles.number}>{i + 1}</span>
          <p style={styles.text}>{s}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#13131f',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    border: '1px solid #1e1e2e'
  },
  title: {
    color: '#a5b4fc',
    marginBottom: '16px',
    fontSize: '18px'
  },
  item: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '14px'
  },
  number: {
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
  text: {
    color: '#d1d5db',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.6'
  }
};

export default SuggestionBox;