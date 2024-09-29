import { useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error registering user");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error(error);
      setMessage("Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      setMessage("Logged out");
      setSessionId("");
    } catch (error) {
      console.error(error);
      setMessage("Error logging out");
    }
  };

  const getSessionInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/session", {
        withCredentials: true,
      });
      setMessage(`Active session: ${response.data.sessionId}`);
    } catch (error) {
      console.error(error);
      setMessage("No active session");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Session Hijacking Demo</h1>

      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <h2>Session Info</h2>
        <button onClick={getSessionInfo}>Get Session Info</button>
        {sessionId && <p>Session ID: {sessionId}</p>}
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
