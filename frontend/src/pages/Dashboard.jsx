import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await API.get('/tickets/my');
        setTickets(res.data.tickets || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load your requests.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === 'open'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === 'in-progress'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === 'resolved'
  ).length;

  const getStatusClass = (status) => {
    if (status === 'open') return 'status-open';
    if (status === 'in-progress') return 'status-progress';
    if (status === 'resolved') return 'status-resolved';
    return '';
  };

  const formatStatus = (status) => {
    if (status === 'in-progress') return 'In Progress';

    return (
      status?.charAt(0).toUpperCase() +
      status?.slice(1)
    );
  };

  const getSeverityClass = (severity) => {
    if (severity === 'critical') return 'severity-critical';
    if (severity === 'high') return 'severity-high';
    if (severity === 'medium') return 'severity-medium';

    return 'severity-low';
  };

  const formatDate = (date) => {
    if (!date) return 'Recently';

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 6);

  const topPriorityTicket = [...tickets].sort(
    (a, b) =>
      (b.priorityScore ?? 0) -
      (a.priorityScore ?? 0)
  )[0];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* HERO */}

        <section className="dashboard-hero">
          <div className="dashboard-hero-content">
            <div className="dashboard-welcome-row">
              <span className="dashboard-live-dot"></span>
              <p>SMARTSERVE WORKSPACE</p>
            </div>

            <h1>
              Welcome back,
              <span> {user?.name || 'User'}.</span>
            </h1>

            <p className="dashboard-description">
              Everything you need to track, manage and monitor
              your service requests in one intelligent workspace.
            </p>

            <div className="dashboard-hero-actions">
              <Link
                to="/create-ticket"
                className="dashboard-primary-btn"
              >
                <span>＋</span>
                New Service Request
              </Link>

              <a
                href="#my-requests"
                className="dashboard-secondary-btn"
              >
                View My Requests
                <span>↓</span>
              </a>
            </div>
          </div>

          <div className="dashboard-hero-panel">
            <div className="hero-panel-glow"></div>

            <p className="hero-panel-label">
              REQUEST OVERVIEW
            </p>

            <div className="hero-panel-main">
              <div>
                <span>Active Requests</span>
                <strong>
                  {openTickets + inProgressTickets}
                </strong>
              </div>

              <div className="hero-panel-circle">
                <span>
                  {totalTickets > 0
                    ? Math.round(
                        ((openTickets +
                          inProgressTickets) /
                          totalTickets) *
                          100
                      )
                    : 0}
                  %
                </span>
                <small>Active</small>
              </div>
            </div>

            <div className="hero-panel-footer">
              <span>
                {resolvedTickets} resolved
              </span>

              <span className="hero-ready">
                <i></i>
                SmartServe Active
              </span>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="dashboard-stats">
          <div className="dashboard-stat-card stat-total">
            <div className="stat-icon">▦</div>

            <div>
              <p>Total Requests</p>
              <h3>{totalTickets}</h3>
              <span>All submitted requests</span>
            </div>
          </div>

          <div className="dashboard-stat-card stat-open">
            <div className="stat-icon">○</div>

            <div>
              <p>Open</p>
              <h3>{openTickets}</h3>
              <span>Awaiting action</span>
            </div>
          </div>

          <div className="dashboard-stat-card stat-progress">
            <div className="stat-icon">◌</div>

            <div>
              <p>In Progress</p>
              <h3>{inProgressTickets}</h3>
              <span>Currently being handled</span>
            </div>
          </div>

          <div className="dashboard-stat-card stat-resolved">
            <div className="stat-icon">✓</div>

            <div>
              <p>Resolved</p>
              <h3>{resolvedTickets}</h3>
              <span>Successfully completed</span>
            </div>
          </div>
        </section>

        {/* PRIORITY INSIGHT */}

        {topPriorityTicket && (
          <section className="dashboard-priority-insight">

            <div className="priority-insight-icon">
              ✦
            </div>

            <div className="priority-insight-content">
              <p>HIGHEST PRIORITY REQUEST</p>

              <h3>
                {topPriorityTicket.title}
              </h3>

              <span>
                SmartServe identified this as your
                highest priority request.
              </span>
            </div>

            <div className="priority-insight-score">
              <span>PRIORITY SCORE</span>

              <strong>
                {topPriorityTicket.priorityScore ?? 0}
              </strong>
            </div>

            <div className="priority-insight-status">
              <span
                className={`status-badge ${getStatusClass(
                  topPriorityTicket.status
                )}`}
              >
                {formatStatus(
                  topPriorityTicket.status
                )}
              </span>
            </div>

          </section>
        )}

        {/* REQUEST HEADER */}

        <section
          id="my-requests"
          className="dashboard-section-header"
        >
          <div>
            <p className="section-label">
              RECENT ACTIVITY
            </p>

            <h2>
              My Service <span>Requests.</span>
            </h2>

            <p>
              Track the latest progress of your submitted
              requests.
            </p>
          </div>

          <div className="dashboard-section-right">
            <span className="request-count">
              {totalTickets}{' '}
              {totalTickets === 1
                ? 'request'
                : 'requests'}
            </span>

            <Link
              to="/create-ticket"
              className="mini-create-btn"
            >
              + New Request
            </Link>
          </div>
        </section>

        {/* LOADING */}

        {loading && (
          <div className="dashboard-loading">
            <div className="dashboard-loader"></div>

            <p>
              Loading your service requests...
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="dashboard-error">
            <span>!</span>
            {error}
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading &&
          !error &&
          tickets.length === 0 && (
            <div className="dashboard-empty">

              <div className="empty-icon">
                ✦
              </div>

              <p className="empty-label">
                GET STARTED
              </p>

              <h3>
                No service requests yet
              </h3>

              <p>
                Create your first request and let
                SmartServe intelligently prioritize it.
              </p>

              <Link
                to="/create-ticket"
                className="dashboard-primary-btn"
              >
                Create First Request
                <span>→</span>
              </Link>

            </div>
          )}

        {/* TICKETS */}

        {!loading &&
          !error &&
          tickets.length > 0 && (
            <div className="dashboard-ticket-grid">

              {recentTickets.map(
                (ticket) => (
                  <div
                    key={ticket._id}
                    className="dashboard-ticket-card"
                  >

                    <div className="ticket-card-top">

                      <div className="ticket-category-icon">
                        {ticket.category
                          ?.charAt(0)
                          .toUpperCase() || 'T'}
                      </div>

                      <div className="ticket-meta">

                        <span className="ticket-id">
                          REQUEST #
                          {ticket._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </span>

                        <span className="ticket-date">
                          {formatDate(
                            ticket.createdAt
                          )}
                        </span>

                      </div>

                      <span
                        className={`status-badge ${getStatusClass(
                          ticket.status
                        )}`}
                      >
                        {formatStatus(
                          ticket.status
                        )}
                      </span>

                    </div>

                    <div className="ticket-main-content">

                      <h3>
                        {ticket.title}
                      </h3>

                      <p className="ticket-description">
                        {ticket.description ||
                          'No additional description provided.'}
                      </p>

                    </div>

                    <div className="ticket-tags">

                      <span className="category-tag">
                        {ticket.category ||
                          'Other'}
                      </span>

                      <span
                        className={`severity-badge ${getSeverityClass(
                          ticket.severity
                        )}`}
                      >
                        <span></span>
                        {ticket.severity}
                      </span>

                    </div>

                    <div className="ticket-card-bottom">

                      <div className="priority-score">
                        <span>
                          Priority Score
                        </span>

                        <strong>
                          {ticket.priorityScore ?? 0}
                        </strong>
                      </div>

                      <div className="ticket-progress-wrapper">

                        <div className="ticket-progress-label">
                          <span>
                            Request Progress
                          </span>

                          <span>
                            {ticket.status ===
                            'resolved'
                              ? '100%'
                              : ticket.status ===
                                'in-progress'
                              ? '55%'
                              : '20%'}
                          </span>
                        </div>

                        <div className="ticket-progress-line">
                          <span
                            className={
                              ticket.status ===
                              'resolved'
                                ? 'progress-fill resolved'
                                : ticket.status ===
                                  'in-progress'
                                ? 'progress-fill progress'
                                : 'progress-fill open'
                            }
                          ></span>
                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>
    </div>
  );
}