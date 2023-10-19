import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BadgerLogin() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      alert("You must provide both a username and password!");
      return;
    }

    const response = await fetch("https://cs571.org/api/f23/hw6/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID":
          "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.status === 200) {
      alert("Login was successful.");
      sessionStorage.setItem("loginStatus", JSON.stringify({ username }));
      navigate("/");
    } else if (response.status === 401) {
      alert("Incorrect username or password!");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          ref={usernameRef}
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
          ref={passwordRef}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </>
  );
}
