import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { isNotEmpty } from "../utils/validations";

export default function Login() {
  const { user, logIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/view');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNotEmpty(username) || !isNotEmpty(password)) {
      setError('Please fill info');
      return;
    }
    try {
      const success = await logIn(username, password); // ✅ Await
      if (success) {
        navigate('/view');
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="panel login-panel">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-group">
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">
          Login
        </button>
        <p>
          <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}
