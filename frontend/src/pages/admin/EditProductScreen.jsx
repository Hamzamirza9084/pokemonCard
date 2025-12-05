import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios'; // Ensure this path is correct based on your folder structure

const EditProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState(''); // To show image preview
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the File object
      setPreview(URL.createObjectURL(file)); // Create a local preview URL
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('description', description);

    // Only append the image if a new file was selected
    if (image instanceof File) {
        formData.append('image', image);
    }

    try {
      setUploading(true);
      // Note: When sending FormData, axios usually sets Content-Type automatically, 
      // but it's safe to let the browser handle the boundary.
      await api.put(`/products/${productId}`, formData, {
        headers: {
            // Do NOT manually set Content-Type to 'multipart/form-data' here if using axios + FormData
            // Axios handles the boundary automatically. 
            // If you must, use "Content-Type": "multipart/form-data"
        }
      });
      
      setUploading(false);
      navigate('/admin/productlist'); // Redirect after success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Update failed');
      setUploading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      
      <h1>Edit Product</h1>
      
      <form onSubmit={submitHandler} encType="multipart/form-data">
        {/* Name */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            style={{ width: '100%', padding: '8px' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            style={{ width: '100%', padding: '8px' }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Image</label>
          
          {/* Text input to show current URL or file name */}
          <input
            type="text"
            className="form-control"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            value={typeof image === 'string' ? image : image.name}
            readOnly
          />

          {/* File Input */}
          <input
            type="file"
            onChange={uploadFileHandler}
          />
          
          {/* Preview */}
          {preview && <img src={preview} alt="Preview" style={{ height: '100px', marginTop: '10px' }} />}
          {/* Show existing image if no preview */}
          {!preview && typeof image === 'string' && (
             <img src={`http://localhost:5000${image}`} alt="Current" style={{ height: '100px', marginTop: '10px' }} />
          )}
        </div>

        {/* Brand */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Brand</label>
          <input
            type="text"
            className="form-control"
            style={{ width: '100%', padding: '8px' }}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            style={{ width: '100%', padding: '8px' }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Count In Stock */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Count In Stock</label>
          <input
            type="number"
            className="form-control"
            style={{ width: '100%', padding: '8px' }}
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group" style={{ marginBottom: '1rem'}}>
          <label>Description</label>
          <textarea
            className="form-control"
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button 
            type="submit" 
            disabled={uploading}
            style={{ padding: '10px 20px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {uploading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditProductScreen;