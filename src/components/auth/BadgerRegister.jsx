import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BadgerRegister() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (!formData.username || !formData.password) {
      setAlertMessage("You must provide both a username and password!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlertMessage("Your passwords do not match!");
      return;
    }

    // Perform the API call to register the user
    const response = await fetch("https://cs571.org/api/f23/hw6/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID":
          "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setSuccessMessage("Registration was successful.");
      navigate("/");
    } else if (response.status === 409) {
      setAlertMessage("That username has already been taken.");
    } else {
      setAlertMessage("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Register</h1>
      {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </>
  );
}
