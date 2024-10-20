import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    // Local state for username, password, and loading indicator
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // The useNavigate hook from React Router is used to programmatically navigate between routes
    const navigate = useNavigate();

    // handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form behavior (page reload)
        setLoading(true);    // Set loading state to true to indicate the process is ongoing

        try {
            // Send a POST request to the API with username and password
            const res = await api.post(route, { username, password });

            // If method is "Login", store the access and refresh tokens and navigate to the home page
            if (method === "Login") {
                // Save tokens to localStorage so the user can stay authenticated
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                // Navigate to the home page after successful login
                navigate("/");
            } 
            // If method is "register", navigate the user to the login page after successful registration
            else if (method === "register") {
                navigate("/Login");
            } 
            // If an unknown method is passed, show an alert with an error message
            else {
                alert("An unknown action was requested. Please try again.");
            }
        } catch (error) {
            // If there is an error during the API request, show an alert with the error message
            alert("An error occurred: " + error.message);
        } finally {
            // Set loading to false once the request is complete, regardless of success or failure
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {/* Display the form title based on the method (Login or register) */}
            <h1>{method === "Login" ? "Login" : "Register"}</h1>
            
            {/* Input field for the username */}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />

            {/* Input field for the password */}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            (loading && <LoadingIndicator/>)

            {/* Submit button for the form, showing a loading message if the request is in progress */}
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : method === "Login" ? "Login" : "Register"}
            </button>
        </form>
    );
}

export default Form;
