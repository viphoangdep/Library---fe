import React, { useState } from 'react';
import NavBar from '../component/NavBar';
import BigContent from '../component/BigContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; // Import TextField
import BasicDatePicker from '../component/DatePicker';
import FloatingActionButton from '../component/FloatingActionButtons';
import Product from '../component/Product';
import Category from '../component/Category';

function Add() {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for image URL
  const [description, setDescription] = useState(''); // State for description

  const defaultImageUrl = 'https://bizweb.dktcdn.net/100/449/104/products/phukien-3-thumb.jpg?v=1680697314390/150'; // URL for default image

  const handleSave = () => {
    // Create a new book object
    const newBook = {
      title: selectedTitle || null,
      author: selectedAuthor || null,
      releasedDate: selectedDate || null,
      category: selectedCategory || null,
      src: imageUrl || null,
      description: description || null, // Include description
      quantity: quantity || null,
      imageUrl: imageUrl || null,
    };

    // Save the new book to books.json (replace this with actual API call or file write logic)
    fetch('../data/books.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Book saved:', data);
      alert('Add successfully'); // Show success alert
    })
    .catch(error => {
      console.error('Error saving the book:', error);
      alert('Failed to add book'); // Show failure alert
    });
  };

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date ? date.format('YYYY-MM-DD') : '');
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update description state
  };

  return (
    <div className="Borrow">
      {/* <NavBar />
      <BigContent bigcontent="Fahasa - Camp of the soul" position="text-center" /> */}
      <div className="container my-4">
        <Category sx={{ justifyContent: 'center' }} />
      </div>

      <BigContent bigcontent="Add a new book" position="text-center" />

      <div className="container my-5 d-flex">
        <Container>
          {/* Show default image if imageUrl is empty */}
          <Product src={imageUrl.trim() !== '' ? imageUrl : defaultImageUrl} />
        </Container>

        <Container
          sx={{
            width: '740px',
            backgroundColor: '#f0f0f0',
            padding: '16px',
            borderRadius: '8px',
            height: 'fit-content',
          }}
        >
          <TextField
            label="Book Title"
            placeholder="Enter book title"
            fullWidth
            margin="normal"
            value={selectedTitle}
            onChange={handleTitleChange}
          />
          <TextField
            label="Author"
            placeholder="Enter author name"
            fullWidth
            margin="normal"
            value={selectedAuthor}
            onChange={handleAuthorChange}
          />
          <BasicDatePicker
            label={'Released Date'}
            placeholder={'Select release date'}
            width="300px"
            onChange={handleDateChange}
            value={selectedDate}
          />
          <TextField
            label="Category"
            placeholder="Enter category"
            fullWidth
            margin="normal"
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <TextField
            label="Quantity"
            placeholder="Enter quantity"
            fullWidth
            margin="normal"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <TextField
            label="Image URL"
            placeholder="Enter image URL"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <TextField
            label="Description"
            placeholder="Enter book description"
            fullWidth
            margin="normal"
            multiline
            rows={4} // Adjust number of rows as needed
            value={description}
            onChange={handleDescriptionChange}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          >
            <FloatingActionButton onClick={handleSave} />
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Add;
