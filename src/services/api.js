import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL of the API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

// Axios instance configured with base URL and with content type set to JSON
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to the headers if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    toast.error('An error occurred. Please try again.');
    return Promise.reject(error);
  }
);

// Utility functions to handle errors and parse data from the response
const handleResponse = response => response.data;

export const login = (username, password) => apiClient.post('/auth/login', { username, password }).then(handleResponse);


export const signup = (username, password, role) => apiClient.post('/auth/signup', { username, password, role }).then(handleResponse);

export const getEmployees = () => apiClient.get('/employee').then(handleResponse);

export const addEmployee = (employeeData) => apiClient.post('/employee', employeeData).then(handleResponse);

export const updateEmployee = (employeeId, employeeData) => apiClient.put(`/employee/${employeeId}`, employeeData).then(handleResponse);

export const deleteEmployee = (employeeId) => apiClient.delete(`/employee/${employeeId}`).then(handleResponse);

export const exportEmployeesToCSV = () => apiClient.get('/employee/export', { responseType: 'blob' }).then(handleResponse);
