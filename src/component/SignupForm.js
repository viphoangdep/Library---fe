import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
  const navigate = useNavigate();  // Hook for navigation
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    studentId: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch(
        "https://localhost:7222/api/account/register",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
      
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat() // Flatten in case there are multiple errors for a field
            .join("\n"); // Join the error messages into a single string
      
          alert(`Failed to update the book:\n${errorMessages}`);
        } else {
          alert('Failed to update the book: Unknown error');
        }
      
        console.error('Failed to update the book:', errorData);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);

      if (result.token) {
        localStorage.setItem("authToken", result.token);
        alert("Signed up successfully!");
      }
      navigate('/');  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  };

  const labelStyle = {
    marginBottom: "8px",
    display: "block",
    fontWeight: "bold",
    color: "#555",
    textAlign: "left", // Ensures label aligns to the left
  };

  const inputStyle = {
    marginBottom: "16px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "16px",
    backgroundColor: "#fff",
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  return (
    <div style={formStyle}>
      <h1 style={headingStyle}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName" style={labelStyle}>
            Username:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="password" style={labelStyle}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="studentId" style={labelStyle}>
            Student ID:
          </label>
          <input
            type="number"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="firstName" style={labelStyle}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="lastName" style={labelStyle}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="address" style={labelStyle}>
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" style={labelStyle}>
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = buttonStyle.backgroundColor)
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
