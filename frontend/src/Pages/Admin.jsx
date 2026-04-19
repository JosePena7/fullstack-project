import { useEffect, useState } from "react";
import { buildApiUrl } from "../api.js";

const ADMIN_TOKEN_KEY = "admin_token";

const emptySummary = {
  registered_users: 0,
  active_users: 0,
  estimate_requests: 0,
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");

  useEffect(() => {
    const loadAdminData = async () => {
      if (!token) {
        setStatus("login");
        setUsers([]);
        setEstimates([]);
        setSummary(emptySummary);
        return;
      }

      try {
        const response = await fetch(buildApiUrl("/api/admin/overview"), {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          setToken("");
          setStatus("login");
          setError("Your admin session expired. Please sign in again.");
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || "Could not load admin overview.");
        }

        setSummary(data.summary || emptySummary);
        setUsers(data.users || []);
        setEstimates(data.estimates || []);
        setError("");
        setStatus("ready");
      } catch (requestError) {
        setError(requestError.message || "Could not load admin data.");
        setStatus("error");
      }
    };

    loadAdminData();
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    try {
      const response = await fetch(buildApiUrl("/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.access_token) {
        throw new Error(data.error || "Invalid admin credentials.");
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.access_token);
      setToken(data.access_token);
      setPassword("");
    } catch (requestError) {
      setError(requestError.message || "Could not sign in.");
      setStatus("login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken("");
    setPassword("");
    setStatus("login");
    setUsers([]);
    setEstimates([]);
    setSummary(emptySummary);
  };

  return (
    <div className="admin-page py-5">
      <div className="container py-4">
        <div className="admin-hero mb-4">
          <span className="eyebrow mb-3">Admin Dashboard</span>
          <h1 className="section-title fw-bold mb-3">Manage your Huntsville operations in one place</h1>
          <p className="text-soft mb-0">
            Review incoming quote requests, monitor registered users, and keep the business side
            of the site organized from one hidden route.
          </p>
        </div>

        {(status === "login" || status === "submitting") && (
          <div className="admin-login-shell">
            <div className="admin-panel admin-login-panel">
              <h2 className="h3 fw-bold mb-3">Admin sign in</h2>
              <p className="text-soft mb-4">
                Use your admin email and password to unlock the hidden dashboard and review estimate requests.
              </p>

              <form className="admin-login-form" onSubmit={handleLogin}>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Admin email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button className="btn btn-brand" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {error ? <p className="chatbot-error mb-0 mt-3">{error}</p> : null}
            </div>
          </div>
        )}

        {status === "loading" && <p className="text-soft">Loading admin data...</p>}

        {status === "error" && (
          <div className="admin-panel">
            <h2 className="h4 fw-bold mb-3">Dashboard unavailable</h2>
            <p className="text-soft mb-0">{error}</p>
          </div>
        )}

        {status === "ready" && (
          <>
            <div className="d-flex justify-content-end mb-4">
              <button type="button" className="btn btn-outline-brand" onClick={handleLogout}>
                Sign out
              </button>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6 col-lg-4">
                <div className="admin-panel h-100">
                  <span className="admin-label">Dashboard access</span>
                  <h2 className="h4 fw-bold mt-2">Protected route</h2>
                  <p className="text-soft mb-0">This page stays off the public navigation and now requires a valid login.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="admin-panel h-100">
                  <span className="admin-label">Registered users</span>
                  <h2 className="display-6 fw-bold mt-2 mb-0">{summary.registered_users}</h2>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="admin-panel h-100">
                  <span className="admin-label">Estimate requests</span>
                  <h2 className="display-6 fw-bold mt-2 mb-0">{summary.estimate_requests}</h2>
                </div>
              </div>
            </div>

            <div className="admin-panel">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                  <h2 className="h4 fw-bold mb-1">User directory</h2>
                  <p className="text-soft mb-0">A quick look at everyone currently registered in the system.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="fw-semibold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`admin-status ${user.is_active ? "is-active" : "is-inactive"}`}>
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-panel mt-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                  <h2 className="h4 fw-bold mb-1">Incoming estimate requests</h2>
                  <p className="text-soft mb-0">Every quote form submission will appear here once the backend migration is applied.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Frequency</th>
                      <th>Address</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimates.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-soft py-4">
                          No estimate requests yet.
                        </td>
                      </tr>
                    ) : (
                      estimates.map((estimate) => (
                        <tr key={estimate.id}>
                          <td className="fw-semibold">
                            <div>{estimate.full_name}</div>
                            {estimate.comments ? (
                              <small className="text-soft d-block mt-1">{estimate.comments}</small>
                            ) : null}
                          </td>
                          <td>{estimate.email}</td>
                          <td>{estimate.service_type}</td>
                          <td>{estimate.frequency}</td>
                          <td>{estimate.address}</td>
                          <td>{new Date(estimate.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
