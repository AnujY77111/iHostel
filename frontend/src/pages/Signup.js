import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./signup.css"
import Header from "../componenets/Header";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/signup", data);
      if (response.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/api/users/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
        <Header/>
    
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div>
          <label>Role:</label>
          <select {...register("role", { required: "Role is required" })}>
            <option value="resident">Resident</option>
            <option value="caretaker">Caretaker</option>
          </select>
          {errors.role && <p className="error">{errors.role.message}</p>}
        </div>
          
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};
export default  Signup
