import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/from.scss";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = loginForm;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      onLogin();
      navigate("/");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="add-book-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link className="Linkbtn" to ="/register">Resgistion</Link>
      </form>
    </div>
  );
}

export default Login;
