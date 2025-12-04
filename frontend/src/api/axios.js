import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Backend URL
  withCredentials: true, // IMPORTANT: This sends cookies/sessions with every request
});

export default api;