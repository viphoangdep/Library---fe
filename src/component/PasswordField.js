import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { 
          width: '90%', // Adjust width as needed
          marginBottom: '16px', // Adjust margin between fields
        },
        m: 2, // Optional: margin for spacing
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        sx={{
          height: '60px', // Adjust height as needed
          '& .MuiInputBase-root': {
            height: '100%',
          },
          '& .MuiInputLabel-root': {
            height: '100%',
            top: '0',
          },
          '& .MuiOutlinedInput-root': {
            height: '100%',
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              edge="end"
              onClick={handleClickShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              sx={{ height: '100%' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
