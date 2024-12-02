// import axios from 'axios';
// import store from '../store';

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData = null, customHeaders = {}, params = null) => {
//   const state = store.getState();
//   const token = state.auth.token;

//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//     ...customHeaders,
//   };

//   if (bodyData instanceof FormData) {
//     delete headers['Content-Type'];
//   } else {
//     headers['Content-Type'] = 'application/json';
//   }

//   return axiosInstance({
//     method: method,
//     url: url,
//     data: bodyData,
//     headers: headers,
//     params: params,
//   });
// };
import axios from 'axios';
import store from '../store';
import { logout } from '../slices/authSlice'; 
import { toast } from 'react-hot-toast';

// Create Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env. REACT_APP_BASE_URL,
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { dispatch } = store;

    // Check if the error is a 401 (Unauthorized) indicating token expiration
    if (error.response && error.response.status === 401) {
      // Log the user out
      dispatch(logout());
      toast.error("Session expired. Please log in again.");
    } else if (error.response && error.response.status === 403) {
      // Handle 403 Forbidden if needed
      toast.error("Access forbidden. You do not have permission to access this resource.");
    }

    // Return the error to the original caller
    return Promise.reject(error);
  }
);

// API Connector function
export const apiConnector = async (method, url, bodyData = null, customHeaders = {}, params = null) => {
  try {
    const state = store.getState();
    const token = state.auth.token;

    // Set headers
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
      ...customHeaders,
    };

    // If the body is a FormData, remove the Content-Type header to allow the browser to set it automatically
    if (bodyData instanceof FormData) {
      delete headers['Content-Type']; // FormData automatically sets the Content-Type header
    } else {
      headers['Content-Type'] = 'application/json';
    }

    // Perform the API request
    const response = await axiosInstance({
      method,
      url,
      data: method === 'DELETE' ? undefined : bodyData,
      headers,
      params,
    });
     
    return response; 
  } catch (error) {
    
    console.error(`API request failed: ${error.response?.data?.message || error.message}`);
    throw error; 
  }
};
