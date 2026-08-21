import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await API.post('/auth/register', form);

      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">
      {/* LEFT BRANDING */}
      <div className="auth-brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            <span className="logo-mark">S</span>
            <span>SmartServe</span>
          </div>

          <div className="brand-hero">
            <div className="ai-badge">
              <span className="ai-dot"></span>
              SMART SERVICE MANAGEMENT
            </div>

            <h1>
              Start managing
              <br />
              <span>requests smarter.</span>
            </h1>

            <p>
              Create your SmartServe account and experience an intelligent
              way to submit, track, and manage service requests.
            </p>
          </div>

          <div className="brand-features">
            <div className="feature-item">
              <span className="feature-icon">✦</span>
              <span>Priority-Based Requests</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">↗</span>
              <span>Track Request Status</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Secure Account Access</span>
            </div>
          </div>

          <p className="brand-footer">
            INTELLIGENT SERVICE REQUEST PLATFORM
          </p>
        </div>
      </div>

      {/* RIGHT REGISTER FORM */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="mobile-brand">
            <span className="logo-mark">S</span>
            <span>SmartServe</span>
          </div>

          <div className="auth-heading">
            <p className="eyebrow">GET STARTED</p>

            <h2>Create your account</h2>

            <p>
              Join SmartServe and start managing your service requests
              efficiently.
            </p>
          </div>

          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* NAME */}
            <div className="input-group">
              <label>Full name</label>

              <div className="input-wrapper">
                <span className="input-icon">◉</span>

                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <div className="password-label">
                <label>Password</label>
                <span>Minimum 6 characters</span>
              </div>

              <div className="input-wrapper">
                <span className="input-icon">⌑</span>

                <input
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={form.password}
                  onChange={handleChange}
                  minLength="6"
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
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span></span>
            <p>ALREADY HAVE AN ACCOUNT?</p>
            <span></span>
          </div>

          <Link to="/login" className="create-account">
            Sign in to SmartServe
            <span>→</span>
          </Link>

          <p className="auth-security-text">
            By creating an account, you can securely access SmartServe.
          </p>
        </div>
      </div>
    </div>
  );
}