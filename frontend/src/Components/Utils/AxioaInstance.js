import axios from "axios";
// import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "https://pinterest-cloning.onrender.com", // Set your base URL here
  withCredentials: true, // Allows cookies to be sent with cross-site requests
});

// Request interceptor to add authentication token from cookies (if required)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('token'); // Assumes token is stored in a cookie named 'token'
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// const refreshtoken = async () => {
//   try {
//     // Call refresh token API endpoint
//     const response = await axiosInstance.post("/refreshtoken");
//     console.log("Token refreshed successfully");
//     return response.data.accessToken; // Return the new token for further use
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     throw error; // Rethrow error to handle logout or fallback
//   }
// };

// Add Axios response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass successful responses through
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Avoid retry loops

//       try {
//         await refreshtoken(); // Call refresh token function
//         return axiosInstance(originalRequest); // Retry the original request
//       } catch (refreshError) {
//         console.error("Token refresh failed, redirecting to login:", refreshError);
//         // Handle logout or redirect to login
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// Response interceptor for handling common errors or logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
