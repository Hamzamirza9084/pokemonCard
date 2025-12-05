import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './Admin.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new product?')) {
        try {
          await api.post('/products', {
              name: 'New Product',
              price: 0,
              image: '/Images/logo.jpg',
              category: 'Sample',
              countInStock: 0,
              description: 'Description'
          });
          fetchProducts();
        } catch (error) {
          alert('Failed to create');
        }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
          <h1>Products</h1>
          <button onClick={createProductHandler} className="admin-btn" style={{background:'#27ae60'}}>
             <FaPlus /> Create Product
          </button>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                    <button className="action-btn edit-icon"><FaEdit size={18}/></button>
                </Link>
                <button 
                    className="action-btn delete-icon" 
                    onClick={() => deleteHandler(product._id)}
                >
                    <FaTrash size={18}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;