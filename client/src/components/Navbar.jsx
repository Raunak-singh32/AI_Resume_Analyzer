import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        🧠 ATS Pro AI
      </Link>

      <div style={styles.links}>
        {token ? (
          <>
            <span style={styles.welcome}>Hi, {user?.name}!</span>
            <Link to="/upload" style={styles.link}>Analyze</Link>
            <Link to="/history" style={styles.link}>History</Link>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#13131f',
    borderBottom: '1px solid #1e1e2e',
    boxShadow: '0 2px 20px rgba(0,0,0,0.3)'
  },
  logo: {
    color: '#818cf8',
    textDecoration: 'none',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  link: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  },
  welcome: {
    color: '#a5b4fc',
    fontSize: '14px',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default Navbar;