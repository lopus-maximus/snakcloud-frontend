"use client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend login endpoint
      const response = await axios.post(
        "https://snakcloud.onrender.com/login", // Update with your backend endpoint URL
        { username, password } // Send username and password in the request body
      );

      // Assuming your backend returns a success status code (e.g., 200)
      if (response.status === 200) {
        // Extract JWT token from the response
        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Redirect the user to the upload page upon successful login
        navigate("/upload");
      } else {
        alert("Login Failed");
        console.error("Login failed:", response.data); // Log the error
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert("Login Failed");
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="m-4 bg-white p-9 rounded-xl shadow-md font-poppins">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="text-base">
              Welcome to{" "}
              <span className="text-yellow-500 font-bold mr-5">snakcloud</span>
            </p>
            <h2 className="text-4xl font-semibold">Sign in</h2>
          </div>
          <div className="flex flex-col text-xs ">
            <p className="mb-1 mt-1">No account?</p>
            <span className="text-yellow-500">
              <Link to="/Signup">Sign up</Link>
            </span>
          </div>
        </div>
        <label className="mt-8 text-sm">Enter your username</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 mt-2 text-sm"
          placeholder="username"
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
        <button className="mt-8 text-red-600 text-xs self-end">
          Forgot Password
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full border text-white bg-yellow-600 rounded-md p-2 mt-16 text-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
}
