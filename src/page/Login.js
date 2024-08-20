import React, { useState } from 'react';
import '../App.css';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Login() {
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserRole } = useUser(); // Access setUserRole function from context

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
  
      const text = await response.text();
      if (!text) throw new Error(`Empty response from ${url}`);
  
      const data = JSON.parse(text);
      if (!data || data.length === 0) throw new Error(`No data found in ${url}`);
  
      return data;
    } catch (error) {
      console.error(`Error fetching or parsing data from ${url}:`, error);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      // Fetch data from JSON files
      const customers = await fetchData('/data/customer.json');
      const librarians = await fetchData('/data/librarian.json');
      const admins = await fetchData('/data/admin.json');
      
      // Authenticate user
      const customer = customers.find(
        (user) => user.username === username && user.password === password
      );
  
      if (customer) {
        setUserRole('customer'); // Set role for customer
        navigate('/home');
        return;
      }
  
      const librarian = librarians.find(
        (user) => user.username === username && user.password === password
      );
  
      if (librarian) {
        setUserRole('librarian'); // Set role for librarian
        navigate('/home');
        return;
      }
  
      const admin = admins.find(
        (user) => user.username === username && user.password === password
      );
  
      if (admin) {
        setUserRole('admin'); // Set role for admin
        navigate('/home');
        return;
      }
  
      alert('Invalid username or password');
    } catch (error) {
      console.error(error);
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
                onClick={handleLogin}
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
