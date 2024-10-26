// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://webjaime.onrender.com', // FastAPI backend URL
});

export default axiosInstance;
