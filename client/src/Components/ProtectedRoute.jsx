import { Navigate } from "react-router-dom"; // Used to navigate to different routes
import { jwtDecode } from "jwt-decode"; // Used to decode the JWT token to get expiration details
import api from "../api"; // Import the API instance for making requests to the backend
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant"; // Constants for accessing token keys in localStorage
import { useState, useEffect } from "react"; // React hooks for managing state and side effects

// A component that protects certain routes and redirects unauthenticated users to the login page
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); // State to track if the user is authorized

    // This effect runs only once when the component is mounted to check if the user is authenticated
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // Calls auth function and catches errors to set unauthorized state
    }, []); // The empty dependency array ensures this runs only once on component mount

    // Function to refresh the access token if it's expired
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get refresh token from localStorage

        try {
            // Request a new access token using the refresh token
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });

            if (res.status === 200) {
                // If refresh is successful, store the new access token and authorize the user
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false); // If refresh fails, set unauthorized state
            }
        } catch (error) {
            console.log(error); // Log error if something goes wrong
            setIsAuthorized(false); // Set unauthorized state if an error occurs
        }
    };

    // Function to check if the user is authenticated by validating the access token
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN); // Get the current access token

        if (!token) {
            setIsAuthorized(false); // If no token found, set unauthorized state
            return;
        }

        const decoded = jwtDecode(token); // Decode the token to get expiration details
        const tokenExpiration = decoded.exp; // Get the expiration time from the decoded token
        const now = Date.now() / 1000; // Get the current time in seconds

        if (tokenExpiration < now) {
            // If the token is expired, attempt to refresh it
            await refreshToken();
        } else {
            setIsAuthorized(true); // If token is still valid, authorize the user
        }
    };

    // If isAuthorized is null, it means we're still checking the auth state, so show a loading indicator
    if (isAuthorized === null) {
        return <div>Loading....</div>;
    }

    // If user is authorized, render the protected content (children); otherwise, navigate to login
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
