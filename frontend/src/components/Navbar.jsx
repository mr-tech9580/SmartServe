import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="premium-navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link
          to={user?.role === 'admin' ? '/admin' : '/dashboard'}
          className="premium-brand"
          onClick={closeMenu}
        >
          <span className="premium-logo-mark">S</span>

          <div className="brand-text">
            <span className="brand-name">SmartServe</span>
            <span className="brand-subtitle">SERVICE PLATFORM</span>
          </div>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <div className={`premium-nav-content ${menuOpen ? 'show' : ''}`}>
          {user ? (
            <>
              <div className="premium-nav-links">
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className={isActive('/admin')}
                    onClick={closeMenu}
                  >
                    <span>◈</span>
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className={isActive('/dashboard')}
                      onClick={closeMenu}
                    >
                      <span>▦</span>
                      My Requests
                    </Link>

                    <Link
                      to="/create-ticket"
                      className={isActive('/create-ticket')}
                      onClick={closeMenu}
                    >
                      <span>＋</span>
                      New Request
                    </Link>
                  </>
                )}
              </div>

              {/* USER AREA */}
              <div className="nav-user-area">
                <div className="nav-divider"></div>

                <div className="user-profile">
                  <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-info">
                    <span className="user-name">
                      {user.name}
                    </span>

                    <span className="user-role">
                      {user.role === 'admin'
                        ? 'Administrator'
                        : 'User'}
                    </span>
                  </div>
                </div>

                <button
                  className="premium-logout-btn"
                  onClick={handleLogout}
                >
                  <span>↪</span>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth-links">
              <Link
                to="/login"
                className={isActive('/login')}
                onClick={closeMenu}
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="nav-register-btn"
                onClick={closeMenu}
              >
                Get Started
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}