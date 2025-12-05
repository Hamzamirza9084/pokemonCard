import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone || ''); // Load existing phone number
      } catch (error) {
        console.error('Error fetching profile', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const { data } = await api.put('/users/profile', {
          name,
          email,
          phone,
          password,
        });
        setMessage('Profile Updated Successfully!');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error updating profile');
      }
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Profile</h2>
      {message && <div style={{ color: message.includes('Success') ? 'green' : 'red', marginBottom: '20px' }}>{message}</div>}
      
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            placeholder="Enter name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Phone Number (Required for Orders)</label>
          <input 
            type="text" 
            placeholder="Enter phone number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', border: '2px solid #3498db' }}
          />
        </div>

        {/* <div>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div> */}

        <button type="submit" style={{ 
            padding: '10px', 
            backgroundColor: '#333', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
        }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;