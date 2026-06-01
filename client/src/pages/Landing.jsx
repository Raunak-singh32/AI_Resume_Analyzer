import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.badge}>AI Powered by Google Gemini</div>
        <h1 style={styles.heroTitle}>
          Beat the ATS.<br />
          <span style={styles.highlight}>Land Your Dream Job.</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Upload your resume and get an instant AI-powered ATS score, detailed section analysis, and actionable recommendations to improve your chances of getting shortlisted.
        </p>
        <div style={styles.buttonRow}>
          <button
            onClick={() => navigate('/register')}
            style={styles.primaryButton}>
            🚀 Get Started Free
          </button>
          <button
            onClick={() => navigate('/guest')}
            style={styles.secondaryButton}>
            ⚡ Try Without Login
          </button>
          <button
            onClick={() => navigate('/login')}
            style={styles.secondaryButton}>
            Login
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>95%</h3>
          <p style={styles.statLabel}>of resumes are filtered before reaching recruiters</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>3x</h3>
          <p style={styles.statLabel}>Higher interview chances with an ATS-optimized resume</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>10 seconds</h3>
          <p style={styles.statLabel}>Average time recruiters spend reviewing a resume</p>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Everything You Need to Get Hired</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📄</span>
            <h3 style={styles.featureTitle}>PDF Resume Upload</h3>
            <p style={styles.featureDesc}>
              Upload your resume in PDF format and let AI analyze it instantly.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🎯</span>
            <h3 style={styles.featureTitle}>ATS Score</h3>
            <p style={styles.featureDesc}>
              Get an instant ATS score based on your resume and job description.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📊</span>
            <h3 style={styles.featureTitle}>Section Breakdown</h3>
            <p style={styles.featureDesc}>
              Detailed analysis of skills, experience, education, keywords, and formatting.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>💡</span>
            <h3 style={styles.featureTitle}>Smart Suggestions</h3>
            <p style={styles.featureDesc}>
              Get personalized recommendations to improve your resume and ATS performance.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📥</span>
            <h3 style={styles.featureTitle}>Download Report</h3>
            <p style={styles.featureDesc}>
              Download a detailed PDF report of your resume analysis anytime.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📁</span>
            <h3 style={styles.featureTitle}>Analysis History</h3>
            <p style={styles.featureDesc}>
              Access previous analyses and track your resume improvements over time
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <div style={styles.stepsRow}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>Upload Your Resume</h3>
            <p style={styles.stepDesc}>Upload your resume in PDF format</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>Add Job Description</h3>
            <p style={styles.stepDesc}>Paste the job description for the role you are applying for</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>View Analysis</h3>
            <p style={styles.stepDesc}>Receive instant AI-powered analysis and recommendations.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to land your dream job?</h2>
        <p style={styles.ctaSubtitle}>Join thousands of job seekers improving their resumes with ATS Pro</p>
        <button
          onClick={() => navigate('/register')}
          style={styles.primaryButton}>
          🚀 Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Developed by Raunak Singh • Powered by Gemini AI
        </p>
      </footer>

    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0f0f1a',
    color: '#e2e8f0',
    minHeight: '100vh'
  },
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#1e1e2e',
    border: '1px solid #4f46e5',
    color: '#a5b4fc',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    marginBottom: '24px'
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginBottom: '20px',
    color: '#e2e8f0'
  },
  highlight: {
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#9ca3af',
    lineHeight: '1.8',
    marginBottom: '40px'
  },
  buttonRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  secondaryButton: {
    padding: '14px 32px',
    backgroundColor: 'transparent',
    color: '#e2e8f0',
    border: '1px solid #374151',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    padding: '40px 20px',
    flexWrap: 'wrap',
    backgroundColor: '#13131f',
    borderTop: '1px solid #1e1e2e',
    borderBottom: '1px solid #1e1e2e'
  },
  statCard: {
    textAlign: 'center',
    padding: '20px 40px'
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: '14px',
    maxWidth: '200px'
  },
  featuresSection: {
    padding: '80px 20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '48px',
    color: '#e2e8f0'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  featureCard: {
    backgroundColor: '#13131f',
    border: '1px solid #1e1e2e',
    borderRadius: '16px',
    padding: '28px',
    transition: 'border-color 0.3s ease'
  },
  featureIcon: {
    fontSize: '36px',
    marginBottom: '16px',
    display: 'block'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: '10px'
  },
  featureDesc: {
    color: '#9ca3af',
    fontSize: '14px',
    lineHeight: '1.6'
  },
  howSection: {
    padding: '80px 20px',
    backgroundColor: '#13131f',
    borderTop: '1px solid #1e1e2e',
    borderBottom: '1px solid #1e1e2e'
  },
  stepsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    maxWidth: '800px',
    margin: '0 auto'
  },
  step: {
    textAlign: 'center',
    padding: '20px'
  },
  stepNumber: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 auto 16px'
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: '8px'
  },
  stepDesc: {
    color: '#9ca3af',
    fontSize: '14px',
    maxWidth: '200px'
  },
  stepArrow: {
    fontSize: '24px',
    color: '#4f46e5',
    fontWeight: 'bold'
  },
  ctaSection: {
    textAlign: 'center',
    padding: '80px 20px'
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: '16px'
  },
  ctaSubtitle: {
    color: '#9ca3af',
    fontSize: '16px',
    marginBottom: '32px'
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    borderTop: '1px solid #1e1e2e'
  },
  footerText: {
    color: '#6b7280',
    fontSize: '14px'
  }
};

export default Landing;