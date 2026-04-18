import { useEffect, useState } from "react";
import { buildApiUrl } from "../api.js";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState({ registered_users: 0, active_users: 0 });
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const response = await fetch(buildApiUrl("/api/admin/overview"));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load admin overview.");
        }

        setSummary(data.summary || { registered_users: 0, active_users: 0 });
        setUsers(data.users || []);
        setStatus("ready");
      } catch (requestError) {
        setError(requestError.message || "Could not load admin data.");
        setStatus("error");
      }
    };

    loadAdminData();
  }, []);

  return (
    <div className="admin-page py-5">
      <div className="container py-4">
        <div className="admin-hero mb-4">
          <span className="eyebrow mb-3">Admin Dashboard</span>
          <h1 className="section-title fw-bold mb-3">Manage your Huntsville operations in one place</h1>
          <p className="text-soft mb-0">
            Review account details, monitor registered users, and keep an eye on the customer side
            of the site from a single dashboard.
          </p>
        </div>

        {status === "loading" && <p className="text-soft">Loading admin data...</p>}

        {status === "error" && (
          <div className="admin-panel">
            <h2 className="h4 fw-bold mb-3">Dashboard unavailable</h2>
            <p className="text-soft mb-0">{error}</p>
          </div>
        )}

        {status === "ready" && (
          <>
            <div className="row g-4 mb-4">
              <div className="col-md-6 col-lg-4">
                <div className="admin-panel h-100">
                  <span className="admin-label">Dashboard access</span>
                  <h2 className="h4 fw-bold mt-2">Hidden route</h2>
                  <p className="text-soft mb-0">This page stays available at `/admin` without showing up in the public navigation.</p>
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
                  <span className="admin-label">Active accounts</span>
                  <h2 className="display-6 fw-bold mt-2 mb-0">{summary.active_users}</h2>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
