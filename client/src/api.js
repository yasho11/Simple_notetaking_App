/* Axios Interceptor Here */

import axios from "axios"; // Import the axios library for making HTTP requests
import { ACCESS_TOKEN } from "./constant"; // Import the constant for accessing the token in localStorage

// Create an axios instance with a base URL (this is set from environment variables)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // The base URL for API requests, using environment variables for flexibility
});

// Add an interceptor to attach the authorization token to every request, if it exists
api.interceptors.request.use(
    (config) => {
        // Retrieve the access token from localStorage
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        // If a token is found, add it to the Authorization header of the request
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Always return the config (whether modified or not) to proceed with the request
        return config;
    },
    (error) => {
        // If there's an error setting up the request, reject the promise to handle it later
        return Promise.reject(error);
    }
);

export default api; // Export the axios instance to be used in other parts of the application
