import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const checkUsername = async (name) => {
    const res = await fetch('http://localhost:5000/auth/checkUsername', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name }),
    });
    const data = await res.json();
    if (data.message) setMessage(data.message);
    setUsernameAvailable(data.available === true);
    return data.available === true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setMessage('Username is required');
      return;
    }

    const isAvailable = usernameAvailable === true
      ? true
      : await checkUsername(trimmedUsername);

    if (!isAvailable) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}; path=/;`;
        navigate('/app');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlechange1 = (e) => {
    const name = e.target.value;
    setUsername(name);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!name.trim()) {
      setMessage('');
      setUsernameAvailable(null);
      return;
    }

    setUsernameAvailable(null);

    debounceTimer.current = setTimeout(async () => {
      try {
        await checkUsername(name.trim());
      } catch (error) {
        console.error('Username check failed:', error);
        setUsernameAvailable(null);
      }
    }, 500);
  };


  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join us today</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-input-group">
            <label className="signup-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={handlechange1}
              placeholder="Choose your username"
              required
              className="signup-input"
            />
            {message && <p className="signup-message">{message}</p>}
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="signup-input"
            />
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="signup-input"
            />
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="signup-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading || usernameAvailable !== true}
            className="signup-button"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <a href="/login" className="signup-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
