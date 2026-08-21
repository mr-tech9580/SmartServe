import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', {
        email,
        password,
      });

      login(res.data.user, res.data.token);

      navigate(
        res.data.user.role === 'admin'
          ? '/admin'
          : '/dashboard'
      );
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Branding Section */}
      <div className="auth-brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            <span className="logo-mark">S</span>
            <span>SmartServe</span>
          </div>

          <div className="brand-hero">
            <div className="ai-badge">
              <span className="ai-dot"></span>
              AI-Powered Service Management
            </div>

            <h1>
              Smarter requests.
              <br />
              <span>Faster solutions.</span>
            </h1>

            <p>
              SmartServe intelligently manages and prioritizes service
              requests so the most important issues get attention first.
            </p>
          </div>

          <div className="brand-features">
            <div className="feature-item">
              <span className="feature-icon">✦</span>
              <span>Smart Priority Management</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">↗</span>
              <span>Real-time Request Tracking</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Faster Issue Resolution</span>
            </div>
          </div>

          <p className="brand-footer">
            Intelligent Service Request Platform
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="mobile-brand">
            <span className="logo-mark">S</span>
            <span>SmartServe</span>
          </div>

          <div className="auth-heading">
            <p className="eyebrow">WELCOME BACK</p>

            <h2>Sign in to SmartServe</h2>

            <p>
              Access your dashboard and manage your service requests.
            </p>
          </div>

          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>Email address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="password-label">
                <label>Password</label>
                <span>Secure access</span>
              </div>

              <div className="input-wrapper">
                <span className="input-icon">⌑</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to dashboard
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span></span>
            <p>NEW TO SMARTSERVE?</p>
            <span></span>
          </div>

          <Link to="/register" className="create-account">
            Create your account
            <span>→</span>
          </Link>

          <p className="auth-security-text">
            Your account is securely protected with authentication.
          </p>
        </div>
      </div>
    </div>
  );
}