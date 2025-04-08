import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/from.scss";

function Register() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = registerForm;

   
    const existingUser = JSON.parse(localStorage.getItem("user")) || null;
    if (existingUser) {
      alert("User already exists, please log in.");
    } else {
      const userDetails = {
        username,
        password,
      };

      localStorage.setItem("user", JSON.stringify(userDetails));
      alert("Registration successful!");
      navigate("/user-details");  
    }
  };

  return (
    <div className="add-book-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            value={registerForm.username}
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
            value={registerForm.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
