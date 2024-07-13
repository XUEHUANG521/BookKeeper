import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refreshToken');

      try {
        const response = await axios.post('/api/auth/refreshToken', { refreshToken });

        if (response.data.success) {
          sessionStorage.setItem('token', response.data.token);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
