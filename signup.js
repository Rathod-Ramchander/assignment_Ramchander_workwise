// frontend/pages/signup.js

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData); 
      alert('Signup successful!');
      router.push('/login');
    } catch (err) {
      alert('Signup failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: '1rem' }}>Signup</button>
      </form>
    </div>
  );
}
