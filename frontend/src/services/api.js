import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  localStorage.setItem('token', res.data.token);
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/files/upload`, formData, {
    headers: { 'x-auth-token': token }
  });
  
  return res.data;
};

