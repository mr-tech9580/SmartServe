import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [nextTicket, setNextTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextLoading, setNextLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState('');

  const loadTickets = async () => {
    try {
      setLoading(true);

      const res = await API.get('/admin/tickets');

      setTickets(res.data.tickets || []);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          'Unable to load service requests.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const getNext = async () => {
    try {
      setNextLoading(true);
      setMessage('');

      const res = await API.get('/admin/tickets/next');

      setNextTicket(res.data.ticket);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          'No priority ticket available.'
      );
    } finally {
      setNextLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      setMessage('');

      await API.patch(
        `/admin/tickets/${id}/status`,
        { status }
      );

      await loadTickets();

      if (nextTicket?._id === id) {
        setNextTicket({
          ...nextTicket,
          status,
        });
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          'Unable to update ticket status.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =========================
     STATISTICS
  ========================= */

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

  const criticalTickets = tickets.filter(
    (ticket) => ticket.severity === 'critical'
  ).length;

  /* =========================
     HELPERS
  ========================= */

  const getStatusClass = (status) => {
    if (status === 'open') return 'admin-status-open';
    if (status === 'in-progress') {
      return 'admin-status-progress';
    }
    if (status === 'resolved') {
      return 'admin-status-resolved';
    }

    return '';
  };

  const formatStatus = (status) => {
    if (status === 'in-progress') {
      return 'In Progress';
    }

    return (
      status?.charAt(0).toUpperCase() +
      status?.slice(1)
    );
  };

  const getSeverityClass = (severity) => {
    if (severity === 'critical') {
      return 'admin-severity-critical';
    }

    if (severity === 'high') {
      return 'admin-severity-high';
    }

    if (severity === 'medium') {
      return 'admin-severity-medium';
    }

    return 'admin-severity-low';
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

  const sortedTickets = [...tickets].sort(
    (a, b) =>
      (b.priorityScore ?? 0) -
      (a.priorityScore ?? 0)
  );

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* HEADER */}

        <section className="admin-dashboard-header">
          <div>
            <p className="admin-eyebrow">
              SMARTSERVE ADMIN CENTER
            </p>

            <h1>
              Service <span>Control Center.</span>
            </h1>

            <p className="admin-header-description">
              Monitor service requests, manage priorities,
              and keep operations moving efficiently.
            </p>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={loadTickets}
            disabled={loading}
          >
            <span>↻</span>
            Refresh
          </button>
        </section>

        {/* STATISTICS */}

        <section className="admin-stats-grid">

          <div className="admin-stat-card admin-stat-total">
            <div className="admin-stat-icon">▦</div>

            <div>
              <p>Total Requests</p>
              <h3>{totalTickets}</h3>
              <span>Across all users</span>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-open">
            <div className="admin-stat-icon">○</div>

            <div>
              <p>Open</p>
              <h3>{openTickets}</h3>
              <span>Waiting for action</span>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-progress">
            <div className="admin-stat-icon">◌</div>

            <div>
              <p>In Progress</p>
              <h3>{inProgressTickets}</h3>
              <span>Currently handled</span>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-resolved">
            <div className="admin-stat-icon">✓</div>

            <div>
              <p>Resolved</p>
              <h3>{resolvedTickets}</h3>
              <span>Successfully completed</span>
            </div>
          </div>

        </section>

        {/* PRIORITY SECTION */}

        <section className="priority-ticket-section">

          <div className="priority-ticket-header">
            <div>
              <p>INTELLIGENT PRIORITIZATION</p>

              <h2>
                Next Priority <span>Request</span>
              </h2>

              <p>
                Let SmartServe select the highest priority
                request requiring attention.
              </p>
            </div>

            <button
              className="get-priority-btn"
              onClick={getNext}
              disabled={nextLoading}
            >
              {nextLoading ? (
                <>
                  <span className="admin-spinner"></span>
                  Finding request...
                </>
              ) : (
                <>
                  Find Next Priority
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          {!nextTicket && !nextLoading && (
            <div className="priority-empty-state">
              <div className="priority-empty-icon">✦</div>

              <h3>No request selected yet</h3>

              <p>
                Click “Find Next Priority” and SmartServe will
                identify the most important request.
              </p>
            </div>
          )}

          {nextLoading && (
            <div className="priority-loading">
              <div className="admin-loader"></div>
              <p>Analyzing request priorities...</p>
            </div>
          )}

          {nextTicket && !nextLoading && (
            <div className="next-priority-ticket">

              <div className="next-priority-top">

                <div className="priority-ticket-badge">
                  <span>✦</span>
                  TOP PRIORITY
                </div>

                <span
                  className={`admin-status-badge ${getStatusClass(
                    nextTicket.status
                  )}`}
                >
                  {formatStatus(nextTicket.status)}
                </span>

              </div>

              <div className="next-priority-content">

                <div className="next-priority-main">

                  <div className="next-ticket-icon">
                    {nextTicket.category
                      ?.charAt(0)
                      .toUpperCase() || 'T'}
                  </div>

                  <div>
                    <span className="admin-ticket-id">
                      REQUEST #
                      {nextTicket._id
                        ?.slice(-6)
                        .toUpperCase()}
                    </span>

                    <h3>{nextTicket.title}</h3>

                    <p>
                      {nextTicket.description ||
                        'No additional description provided.'}
                    </p>
                  </div>

                </div>

                <div className="priority-score-large">

                  <span>PRIORITY SCORE</span>

                  <strong>
                    {nextTicket.priorityScore ?? 0}
                  </strong>

                  <small>
                    AI ranked priority
                  </small>

                </div>

              </div>

              <div className="next-priority-footer">

                <div className="next-ticket-tags">

                  <span className="admin-category-tag">
                    {nextTicket.category || 'Other'}
                  </span>

                  <span
                    className={`admin-severity-badge ${getSeverityClass(
                      nextTicket.severity
                    )}`}
                  >
                    <span></span>
                    {nextTicket.severity}
                  </span>

                </div>

                <div className="next-ticket-actions">

                  {nextTicket.status !== 'in-progress' &&
                    nextTicket.status !== 'resolved' && (
                      <button
                        className="admin-action-progress"
                        onClick={() =>
                          updateStatus(
                            nextTicket._id,
                            'in-progress'
                          )
                        }
                        disabled={
                          updatingId === nextTicket._id
                        }
                      >
                        Mark In Progress
                      </button>
                    )}

                  {nextTicket.status !== 'resolved' && (
                    <button
                      className="admin-action-resolve"
                      onClick={() =>
                        updateStatus(
                          nextTicket._id,
                          'resolved'
                        )
                      }
                      disabled={
                        updatingId === nextTicket._id
                      }
                    >
                      {updatingId === nextTicket._id
                        ? 'Updating...'
                        : 'Resolve Request'}
                    </button>
                  )}

                </div>

              </div>

            </div>
          )}

        </section>

        {/* ALL REQUESTS */}

        <section className="admin-requests-section">

          <div className="admin-requests-header">

            <div>
              <p>REQUEST MANAGEMENT</p>

              <h2>
                All Service Requests
              </h2>

              <p>
                Requests are automatically arranged by
                priority score.
              </p>
            </div>

            <div className="admin-request-summary">
              <span>{totalTickets} Total</span>

              {criticalTickets > 0 && (
                <strong>
                  {criticalTickets} Critical
                </strong>
              )}
            </div>

          </div>

          {message && (
            <div className="admin-message">
              <span>!</span>
              {message}
            </div>
          )}

          {loading && (
            <div className="admin-loading-state">
              <div className="admin-loader"></div>

              <p>
                Loading service requests...
              </p>
            </div>
          )}

          {!loading && sortedTickets.length === 0 && (
            <div className="admin-empty-state">

              <div className="admin-empty-icon">
                ◌
              </div>

              <h3>
                No service requests yet
              </h3>

              <p>
                New requests will appear here
                automatically.
              </p>

            </div>
          )}

          {!loading && sortedTickets.length > 0 && (
            <div className="admin-ticket-list">

              {sortedTickets.map(
                (ticket, index) => (
                  <div
                    key={ticket._id}
                    className="admin-ticket-row"
                  >

                    <div className="admin-ticket-rank">
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </div>

                    <div className="admin-ticket-main">

                      <div className="admin-ticket-title-row">

                        <h3>
                          {ticket.title}
                        </h3>

                        <span
                          className={`admin-status-badge ${getStatusClass(
                            ticket.status
                          )}`}
                        >
                          {formatStatus(
                            ticket.status
                          )}
                        </span>

                      </div>

                      <p className="admin-ticket-description">
                        {ticket.description ||
                          'No additional description provided.'}
                      </p>

                      <div className="admin-ticket-meta">

                        <span className="admin-category-tag">
                          {ticket.category ||
                            'Other'}
                        </span>

                        <span
                          className={`admin-severity-badge ${getSeverityClass(
                            ticket.severity
                          )}`}
                        >
                          <span></span>

                          {ticket.severity}
                        </span>

                        <span className="admin-date">
                          {formatDate(
                            ticket.createdAt
                          )}
                        </span>

                      </div>

                    </div>

                    <div className="admin-row-priority">

                      <span>
                        Priority
                      </span>

                      <strong>
                        {ticket.priorityScore ?? 0}
                      </strong>

                    </div>

                    <div className="admin-row-actions">

                      {ticket.status === 'open' && (
                        <button
                          onClick={() =>
                            updateStatus(
                              ticket._id,
                              'in-progress'
                            )
                          }
                          disabled={
                            updatingId === ticket._id
                          }
                          className="admin-row-progress-btn"
                        >
                          Start
                        </button>
                      )}

                      {ticket.status !== 'resolved' && (
                        <button
                          onClick={() =>
                            updateStatus(
                              ticket._id,
                              'resolved'
                            )
                          }
                          disabled={
                            updatingId === ticket._id
                          }
                          className="admin-row-resolve-btn"
                        >
                          {updatingId === ticket._id
                            ? '...'
                            : 'Resolve'}
                        </button>
                      )}

                      {ticket.status === 'resolved' && (
                        <span className="admin-completed">
                          ✓ Done
                        </span>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}