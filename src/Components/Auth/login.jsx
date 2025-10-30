import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');


const handleSubmit = async (e) => {
e.preventDefault();
try {
const res = await fetch('http://localhost:5000/api/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});


const data = await res.json();
if (!res.ok) throw new Error(data.message || 'Login failed');


localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
navigate('/'); // redirect to home after login
} catch (err) {
setError(err.message);
}
};


return (
<div className="auth-container">
<h2>Login</h2>
<form onSubmit={handleSubmit}>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
{error && <p className="error">{error}</p>}
<button type="submit">Login</button>
</form>
<p>
Don’t have an account?{' '}
<span className="link" onClick={() => navigate('/signup')}>
Sign up
</span>
</p>
</div>
);
};


export default Login;