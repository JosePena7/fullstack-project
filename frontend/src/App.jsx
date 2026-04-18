import { useEffect, useState } from "react";
import { buildApiUrl } from "./api.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCurrentUser(null);
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch(buildApiUrl("/login"), {
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
    } catch {
      setError("Could not reach server");
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      const res = await fetch(buildApiUrl("/users"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsRegistering(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setError("Account created! Please log in.");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Could not reach server");
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(buildApiUrl("/me"), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          handleLogout();
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Could not load account details");
          return;
        }

        setCurrentUser(data);
      } catch (err) {
        console.error(err);
        setError("Could not load account details");
      }
    };

    fetchCurrentUser();
  }, [token]);

  // Logged in view
  if (token) {
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Client Portal</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentUser ? (
          <div>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Status:</strong> {currentUser.is_active ? "Active" : "Inactive"}</p>
          </div>
        ) : (
          <p>Loading your account...</p>
        )}
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
