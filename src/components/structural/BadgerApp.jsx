import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import BadgerLayout from "./BadgerLayout";
import BadgerLogin from "../auth/BadgerLogin";
import BadgerRegister from "../auth/BadgerRegister";
import BadgerLogout from "../auth/BadgerLogout";
import BadgerChatroom from "../content/BadgerChatroom";
import BadgerChatHome from "../content/BadgerChatHome";
import BadgerNoMatch from "../content/BadgerNoMatch";

function BadgerApp() {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw6/chatrooms", {
      headers: {
        "X-CS571-ID":
          "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setChatrooms(json);
      });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
            <Route index element={<BadgerChatHome />} />
            <Route path="/login" element={<BadgerLogin />}></Route>
            <Route path="/register" element={<BadgerRegister />}></Route>
            <Route path="/logout" element={<BadgerLogout />}></Route>
            {chatrooms.map((chatroom) => {
              return (
                <Route
                  key={chatroom}
                  path={`chatrooms/${chatroom}`}
                  element={<BadgerChatroom name={chatroom} />}
                />
              );
            })}
            <Route path="*" element={<BadgerNoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default BadgerApp;
