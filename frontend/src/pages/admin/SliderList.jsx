import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; 
import { FaPlus, FaTrash } from 'react-icons/fa'; 
import './Admin.css'; 

const SliderList = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [sliders, setSliders] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchSliders = async () => {
    try {
      // FIX: Added /api/ prefix to match your backend server.js
      const { data } = await api.get('/sliders'); 
      setSliders(data);
    } catch (err) {
      console.error("Failed to fetch sliders", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image || !title) return alert("Please provide both a title and an image");

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);

    try {
      setUploading(true);
      // FIX: Added /api/ prefix here as well
      await api.post('/sliders', formData);
      alert('Slider Added!');
      setTitle('');
      setImage(null);
      fetchSliders();
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        // FIX: Added /api/ prefix here too
        await api.delete(`/sliders/${id}`);
        fetchSliders();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Hero Slider</h1>
      </div>

      <div className="form-container" style={{ marginBottom: '30px' }}>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Slide Title</label>
            <input 
              type="text" 
              placeholder="Enter Slide Title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Banner Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])} 
            />
          </div>
          <button type="submit" className="admin-btn" disabled={uploading} style={{ background: '#27ae60', width: '100%' }}>
            <FaPlus /> {uploading ? 'Uploading...' : 'Upload Banner'}
          </button>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliders.map((s) => (
            <tr key={s._id}>
              <td>
                <img 
                  src={s.image} 
                  alt={s.title} 
                  style={{ width: '150px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                />
              </td>
              <td>{s.title}</td>
              <td>
                <button 
                  className="action-btn delete-icon" 
                  onClick={() => deleteHandler(s._id)}
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SliderList;