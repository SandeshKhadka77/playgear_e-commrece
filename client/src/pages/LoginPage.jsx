import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import '../styles/auth.css';
import { useToast } from '../hooks/useToast';

const EMPTY_FORM = {
  name: '',
  email: '',
  password: '',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const title = useMemo(
    () => (mode === 'login' ? 'Welcome Back' : 'Create Your Account'),
    [mode]
  );

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      setError('Please complete all required fields.');
      return;
    }

    try {
      setLoading(true);
      const endpoint = mode === 'login' ? '/api/users/login' : '/api/users';
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const { data } = await axios.post(`http://localhost:5000${endpoint}`, payload);
      localStorage.setItem('userInfo', JSON.stringify(data));
      showToast(mode === 'login' ? 'Logged in successfully.' : 'Account created successfully.', 'success');
      navigate(data?.isAdmin ? '/admin' : '/products');
    } catch (requestError) {
      const message = requestError?.response?.data?.message || 'Authentication failed. Please try again.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="auth-head">
          <h1>{title}</h1>
          <p>Access your Play Gear account to shop faster and manage orders.</p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Auth modes">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => {
              setMode('register');
              setError('');
            }}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              <span>Full Name</span>
              <div className="field-wrap">
                <FiUser />
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  placeholder="Your full name"
                />
              </div>
            </label>
          )}

          <label>
            <span>Email</span>
            <div className="field-wrap">
              <FiMail />
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </label>

          <label>
            <span>Password</span>
            <div className="field-wrap">
              <FiLock />
              <input
                type="password"
                value={form.password}
                onChange={(event) => handleChange('password', event.target.value)}
                placeholder="Enter password"
              />
            </div>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
