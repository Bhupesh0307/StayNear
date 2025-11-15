import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
	name: '',
	email: '',
	password: '',
	role: 'renter'
  });

  const handleChange = (e) => {
	setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');

    alert('Signup successful! Please log in.');
    navigate('/login');
  } catch (err) {
    setError(err.message);
  }
};


return (
<div className="auth-container">
<h2>Sign Up</h2>
<form onSubmit={handleSubmit}>
<input
type="text"
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
required
/>
<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
/>
<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
required
/>
<select name="role" value={form.role} onChange={handleChange}>
<option value="renter">Renter</option>
<option value="owner">Owner</option>
<option value="admin">Admin</option>
</select>
{error && <p className="error">{error}</p>}
<button type="submit">Sign Up</button>
</form>
<p>
Already have an account?{' '}
<span className="link" onClick={() => navigate('/login')}>
Login
</span>
</p>
</div>
);
};

const API_BASE_URL = "http://localhost:5173/api";

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log("Signup:", data);
  } catch (error) {
    console.error(error);
  }
};

export default Signup;