import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(undefined);

const getIsUserLoggedIn = () => {
  const storedIsAuth = sessionStorage.getItem("loginStatus");
  return storedIsAuth ? JSON.parse(storedIsAuth) : false;
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(getIsUserLoggedIn());

  const login = async ({ username, password, onSuccess }) => {
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
      setIsAuth(getIsUserLoggedIn());
      onSuccess?.();
    } else if (response.status === 401) {
      alert("Incorrect username or password!");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  const logout = ({ onSuccess }) => {
    fetch("https://cs571.org/api/f23/hw6/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID":
          "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        sessionStorage.removeItem("loginStatus");
        setIsAuth(getIsUserLoggedIn());
        onSuccess?.();
      });
  };

  const value = useMemo(() => {
    return { isAuth, login, logout };
  }, [isAuth, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
