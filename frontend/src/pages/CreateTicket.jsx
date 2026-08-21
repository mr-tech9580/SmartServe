import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function CreateTicket() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Hardware',
    severity: 'medium',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [priorityScore, setPriorityScore] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setPriorityScore(null);
    setLoading(true);

    try {
      const res = await API.post('/tickets', form);

      setMessage('Your service request has been created successfully.');
      setMessageType('success');
      setPriorityScore(res.data.ticket.priorityScore);

      setForm({
        title: '',
        description: '',
        category: 'Hardware',
        severity: 'medium',
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        'Unable to create your service request.'
      );

      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket-page">
      <div className="create-ticket-container">

        {/* TOP HEADER */}
        <section className="create-ticket-header">
          <div>
            <p className="create-ticket-eyebrow">
              SMARTSERVE WORKSPACE
            </p>

            <h1>
              Create a <span>New Request.</span>
            </h1>

            <p>
              Tell us what you need help with. SmartServe will organize
              and prioritize your request based on its details.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="back-dashboard-btn"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </section>

        <div className="create-ticket-layout">

          {/* LEFT FORM */}
          <section className="ticket-form-card">
            <div className="form-card-header">
              <div className="form-header-icon">＋</div>

              <div>
                <p>NEW SERVICE REQUEST</p>
                <h2>Request Details</h2>
              </div>
            </div>

            {message && (
              <div
                className={`ticket-message ${
                  messageType === 'success'
                    ? 'ticket-success'
                    : 'ticket-error'
                }`}
              >
                <div className="message-icon">
                  {messageType === 'success' ? '✓' : '!'}
                </div>

                <div>
                  <strong>
                    {messageType === 'success'
                      ? 'Request Created'
                      : 'Something went wrong'}
                  </strong>

                  <p>{message}</p>

                  {priorityScore !== null && (
                    <div className="priority-result">
                      <span>AI Priority Score</span>
                      <strong>{priorityScore}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="create-ticket-form"
            >

              {/* TITLE */}
              <div className="create-input-group">
                <label htmlFor="title">
                  Request title
                  <span>Required</span>
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Briefly describe your issue"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="create-input-group">
                <label htmlFor="description">
                  Describe the issue
                  <span>Required</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Provide as much detail as possible about the issue..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="6"
                />
              </div>

              {/* CATEGORY + SEVERITY */}
              <div className="ticket-select-grid">

                <div className="create-input-group">
                  <label htmlFor="category">
                    Request category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Hardware</option>
                    <option>Network</option>
                    <option>Software</option>
                    <option>Electrical</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="create-input-group">
                  <label htmlFor="severity">
                    Issue severity
                  </label>

                  <select
                    id="severity"
                    name="severity"
                    value={form.severity}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">
                      Critical
                    </option>
                  </select>
                </div>

              </div>

              {/* ACTION */}
              <div className="ticket-form-actions">
                <Link
                  to="/dashboard"
                  className="cancel-ticket-btn"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="submit-ticket-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="ticket-submit-spinner"></span>
                      Creating request...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </section>

          {/* RIGHT INFORMATION PANEL */}
          <aside className="request-info-panel">

            <div className="info-panel-top">
              <p>SMART PRIORITIZATION</p>

              <h2>
                Your request,
                <br />
                <span>intelligently ranked.</span>
              </h2>

              <p className="info-description">
                SmartServe evaluates your request details and assigns a
                priority score to help important issues receive attention
                faster.
              </p>
            </div>

            <div className="priority-flow">
              <div className="flow-item">
                <div className="flow-number">
                  01
                </div>

                <div>
                  <h3>Submit</h3>
                  <p>
                    Provide your request details and severity.
                  </p>
                </div>
              </div>

              <div className="flow-line"></div>

              <div className="flow-item">
                <div className="flow-number">
                  02
                </div>

                <div>
                  <h3>Analyze</h3>
                  <p>
                    SmartServe evaluates the request priority.
                  </p>
                </div>
              </div>

              <div className="flow-line"></div>

              <div className="flow-item">
                <div className="flow-number">
                  03
                </div>

                <div>
                  <h3>Prioritize</h3>
                  <p>
                    Important requests receive faster attention.
                  </p>
                </div>
              </div>
            </div>

            <div className="info-panel-footer">
              <span className="pulse-dot"></span>
              Priority engine ready
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}