import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Importing necessary components from react-router-dom for routing
import Login from "./Pages/Login"; // Importing the Login component
import Home from "./Pages/Home";   // Importing the Home component
import Register from "./Pages/Register";  // Importing the Register component
import NotFound from "./Pages/NotFound";  // Importing the NotFound component (for undefined routes)
import ProtectedRoute from "./Components/ProtectedRoute";  // Importing ProtectedRoute for guarding certain routes
import "../src/Styles/Form.css";  // Importing CSS for form styling

// Function for Logout - this clears the localStorage (removes tokens or other stored data)
// and then redirects the user to the Login page
function Logout() {
  localStorage.clear(); // Clear everything in localStorage (i.e., user authentication tokens)
  return <Navigate to="/Login" />; // Redirect to the login page after logging out
}

// Function for Register and Logout - this is used when the user registers.
// It clears any stored data in localStorage (if any) and shows the registration page.
function RegisterAndLogout() {
  localStorage.clear(); // Clear localStorage (just in case) before showing the registration page
  return <Register />;  // Return the Register component to display the registration form
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The "/" route is protected, meaning only authenticated users can access it */}
        {/* The <ProtectedRoute> wraps the Home component to protect it */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        {/* The Login page route - for users to log in */}
        <Route path="/Login" element={<Login />} />

        {/* The Logout route - clears local storage and redirects to the Login page */}
        <Route path="/Logout" element={<Logout />} />

        {/* The Register page route - clears local storage and shows the Register page */}
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* The wildcard route - if the user navigates to any undefined route, it shows the NotFound component */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
