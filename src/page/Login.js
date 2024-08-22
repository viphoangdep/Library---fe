import React, { useState } from 'react';
import '../App.css';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Hook for navigation

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async () => {
    // Simple validation checks
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      // Make a POST request to the login API endpoint
      const response = await fetch('https://localhost:7222/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
      
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat() // Flatten in case there are multiple errors for a field
            .join("\n"); // Join the error messages into a single string
      
          alert(`Failed to login:\n${errorMessages}`);
        } else {
          alert('Failed to login: Unknown error');
        }
      
        console.error('Failed to login:', errorData);
        return;
      }

      const data = await response.json();

      // Handle successful login
      console.log('Login successful:', data);

      // Store the token in localStorage
      localStorage.setItem('authToken', data.token); // Adjust the key and value as needed

      // Redirect to home or another page on success
      navigate('/');  
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: '185px' }}
                alt="logo"
              />
              <h4 className="mt-1 mb-5 pb-1">Fahasa - The library you choose</h4>
            </div>

            <div className="mb-4">
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </div>

            <div className="text-center pt-1 mb-5 pb-1">
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={handleLogin}  // Attach handleLogin to the button
              >
                Login
              </button>
              <a className="text-muted d-block text-end" href="/">
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <button type="button" className="btn btn-outline-danger mx-2">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-5">
          <div className="d-flex flex-column justify-content-center text-black h-100">
            <div className="px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
