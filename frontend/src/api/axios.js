import axios from 'axios';

// Create an axios instance
const api = axios.create({
  // Use the VITE_API_URL environment variable if available, otherwise fallback to localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
  withCredentials: true, // IMPORTANT: This sends cookies/sessions with every request
});

export default api;