import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import PopupMessage from './PopupMessage';

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      setPopupMessage("Registration successful. Please log in.");
      setShowPopup(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setPopupMessage(err.response?.data?.error || "Registration failed.");
      setShowPopup(true);
    }
  };

  return (
    <div className="form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
      {showPopup && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
      <p>
        Already have an account? <span className="link" onClick={() => navigate('/login')}>Login here</span>
      </p>
    </div>
  );
};

export default Register;
