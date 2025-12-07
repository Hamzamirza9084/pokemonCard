import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import './Admin.css'; // Import the new CSS

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState(''); // Added state for subcategory
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setSubcategory(data.subcategory || ''); // Set subcategory data
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('Could not fetch product');
      }
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, {
        name,
        price,
        image,
        category,
        subcategory, // Send subcategory to backend
        description,
        countInStock,
      });
      alert('Product Updated!');
      navigate('/admin/productlist');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  return (
    <div className="admin-container">
      <Link to="/admin/productlist" className="admin-btn" style={{width: 'fit-content', marginBottom:'20px'}}>
        <FaArrowLeft /> Go Back
      </Link>
      
      <div className="form-container">
        <h1>Edit Product</h1>
        {loading ? <p>Loading...</p> : (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>

            {/* Updated Category Dropdown */}
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Pokemon TCG">Pokemon TCG</option>
                <option value="One Piece TCG">One Piece TCG</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Added Subcategory Dropdown */}
            <div className="form-group">
              <label>Subcategory</label>
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                <option value="">Select Subcategory</option>
                <option value="Booster Packs">Booster Packs</option>
                <option value="Booster Boxes">Booster Boxes</option>
                <option value="Single Cards">Single Cards</option>
                <option value="Decks">Decks</option>
                <option value="Magazines">Magazines</option>
              </select>
            </div>

            <div className="form-group">
              <label>Count In Stock</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea value={description} rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <button type="submit" className="admin-btn" style={{background: '#27ae60', width: '100%', justifyContent: 'center'}}>
              <FaSave /> Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;