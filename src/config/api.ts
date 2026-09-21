// API Configuration
// Change this to your production API URL when deploying

const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'  // Local development
  : 'https://your-api-domain.com';  // Production - change this!

export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/api/contact`,
  newsletter: `${API_BASE_URL}/api/newsletter`,
  health: `${API_BASE_URL}/api/health`,
};
