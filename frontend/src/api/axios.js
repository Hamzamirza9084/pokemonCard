import axios from 'axios';

// Create an axios instance
const api = axios.create({
  // Use the VITE_API_URL environment variable if available, otherwise fallback to localhost
  baseURL: import.meta.env.VITE_API_URL || 'https://pokemoncard-25nv.onrender.com', 
  withCredentials: true, // IMPORTANT: This sends cookies/sessions with every request
});

export default api;