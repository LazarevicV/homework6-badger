import { useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BadgerLogin() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { isAuth, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      alert("You must provide both a username and password!");
      return;
    }

    if (isAuth) return;

    await login({
      username,
      password,
      onSuccess: () => {
        navigate("/");
      },
    });
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
