import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './Admin.css'; 

const SliderList = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState('');
  const [sliders, setSliders] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedSliders = JSON.parse(localStorage.getItem('frontend_sliders')) || [];
    setSliders(savedSliders);
  }, []);

  // Convert File to Base64 String
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // This is the image as a string
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!image || !title) return alert("Please provide both a title and an image");

    setUploading(true);
    
    const newSlider = {
      _id: Date.now().toString(),
      title: title,
      image: image, // Base64 string
    };

    const updatedSliders = [...sliders, newSlider];
    
    // Save to State and LocalStorage
    setSliders(updatedSliders);
    localStorage.setItem('frontend_sliders', JSON.stringify(updatedSliders));

    // Reset Form
    setTitle('');
    setImage("");
    setUploading(false);
    alert('Slider Added Locally!');
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      const filteredSliders = sliders.filter(s => s._id !== id);
      setSliders(filteredSliders);
      localStorage.setItem('frontend_sliders', JSON.stringify(filteredSliders));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Hero Slider (Frontend Only)</h1>
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
              onChange={handleFileChange} 
            />
          </div>
          <button type="submit" className="admin-btn" disabled={uploading} style={{ background: '#27ae60', width: '100%' }}>
            <FaPlus /> {uploading ? 'Processing...' : 'Add Banner'}
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