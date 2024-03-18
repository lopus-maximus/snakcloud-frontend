import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Send a POST request to your backend signup endpoint
      const response = await axios.post(
        "https://snakcloud.onrender.com/signup", // Update with your backend endpoint URL
        { username, password } // Send username and password in the request body
      );

      // Assuming your backend returns a success status code (e.g., 201)
      // Redirect the user to the login page upon successful signup
      if (response.status === 201) {
        navigate("/upload");
      } else {
        alert("Signup Failed");
        // Handle other response statuses or errors if needed
        console.error("Signup failed:", response.data); // Log the error
      }
    } catch (error) {
      alert("Signup Failed");
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="m-4 bg-white p-7 rounded-xl shadow-md font-poppins">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="text-base">
              Welcome to{" "}
              <span className="text-yellow-500 font-bold mr-5">snakcloud</span>
            </p>
            <h2 className="text-4xl font-semibold">Sign up</h2>
          </div>
          <div className="flex flex-col text-xs ">
            <p className="mb-1 mt-1">Have an account?</p>
            <span className="text-yellow-500">
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
        <label className="mt-8 text-sm">Enter your username</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 mt-2 text-sm"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className="mt-3 text-sm">Enter your password</label>
        <input
          type="password"
          className="w-full border border-gray-400 rounded-md p-2 mt-2 text-sm"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label className="mt-3 text-sm">Confirm password</label>
        <input
          type="password"
          className="w-full border border-gray-400 rounded-md p-2 mt-2 text-sm"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button
          type="submit"
          className="w-full border text-white bg-yellow-600 rounded-md p-2 mt-16 text-sm"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
