import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const SliderManagement = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [sliders, setSliders] = useState([]);

  const fetchSliders = async () => {
    const { data } = await api.get('/sliders');
    setSliders(data);
  };

  useEffect(() => { fetchSliders(); }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);

    try {
      await api.post('/sliders', formData);
      alert('Slider Added!');
      fetchSliders();
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="admin-container">
      <h1>Manage Hero Slider</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Slide Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="admin-btn">Upload Banner</button>
      </form>

      <div className="slider-previews">
        {sliders.map(s => (
          <div key={s._id}>
            <img src={s.image} alt={s.title} style={{width: '200px'}} />
            <button onClick={() => deleteHandler(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};