import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BadgerLogout() {
  const { isAuth, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return;

    logout({
      onSuccess: () => {
        navigate("/");
      },
    });
  }, [isAuth, logout, navigate]);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
