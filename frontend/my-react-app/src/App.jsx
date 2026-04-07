import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUsers([]);
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Could not reach server");
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsRegistering(false);
        setError("Account created! Please log in.");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Could not reach server");
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          handleLogout();
          return;
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [token]);

  // Logged in view
  if (token) {
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Users</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        {users.map((user) => (
          <p key={user.id}>{user.name} — {user.email}</p>
        ))}
      </div>
    );
  }

  // Auth view
  return (
    <div style={{ padding: "2rem" }}>
      <h1>{isRegistering ? "Register" : "Login"}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {isRegistering && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button onClick={isRegistering ? handleRegister : handleLogin}>
          {isRegistering ? "Register" : "Login"}
        </button>

        <button onClick={() => { setIsRegistering(!isRegistering); setError(""); }}>
          {isRegistering ? "Already have an account? Login" : "No account? Register"}
        </button>
      </div>
    </div>
  );
}

export default App;