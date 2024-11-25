import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import PopupMessage from './PopupMessage';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.user);

      if (data.role === "admin") {
        setPopupMessage("Login successful! Redirecting to Admin.");
        setShowPopup(true);
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        setPopupMessage("Login successful! Redirecting to User.");
        setShowPopup(true);
        setTimeout(() => navigate("/user"), 2000);
      }
    } catch (err) {
      setPopupMessage(err.response?.data?.message || "Error logging in");
      setShowPopup(true);
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {showPopup && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
      <p>
        Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register here</span>
      </p>
    </div>
  );
};

export default Login;
