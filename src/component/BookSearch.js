import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, MenuItem, Select, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

function BookSearch({ onSearch }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [categories, setCategories] = useState('');
  const [pages, setPages] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert categories string into an array and pages into a number
    const filter = {
      Title: title || undefined,
      Author: author || undefined,
      Publisher: publisher || undefined,
      Categories: categories ? categories.split(',').map(category => category.trim()).filter(Boolean) : undefined,
      Pages: pages ? parseInt(pages, 10) : undefined,
      IsAvailable: isAvailable,
    };
    onSearch(filter);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, px: 38, bgcolor: 'background.paper' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Publisher"
          variant="outlined"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Categories (comma separated)"
          variant="outlined"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Pages"
          type="number"
          variant="outlined"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </FormControl>
      <FormGroup sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              color="primary"
            />
          }
          label="Available"
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Search
      </Button>
    </Box>
  );
}

export default BookSearch;
