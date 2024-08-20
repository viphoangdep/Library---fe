import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';

function AddLibrarian() {
  const [librarian, setLibrarian] = useState({
    id: '',
    username: '',
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setLibrarian({ ...librarian, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!librarian.id || !librarian.username || !librarian.name || !librarian.phone || !librarian.email || !librarian.address) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/data/librarian.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(librarian),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      setSuccess('Librarian added successfully!');
      setError('');
      setLibrarian({
        id: '',
        username: '',
        name: '',
        phone: '',
        email: '',
        address: ''
      });
    } catch (error) {
      setError('Error adding librarian: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Add Librarian
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          boxShadow: 1,
          borderRadius: 2,
          backgroundColor: '#fff'
        }}
      >
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        
        
        <TextField
          label="Username"
          name="username"
          value={librarian.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Name"
          name="name"
          value={librarian.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={librarian.phone}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={librarian.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Address"
          name="address"
          value={librarian.address}
          onChange={handleChange}
          required
        />
        
        <Button type="submit" variant="contained" color="primary">
          Add Librarian
        </Button>
      </Box>
    </Container>
  );
}

export default AddLibrarian;
