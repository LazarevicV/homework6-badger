import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BadgerLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw6/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID":
          "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        sessionStorage.removeItem("loginStatus");
        navigate("/");
      });
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
