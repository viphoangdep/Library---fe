import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Product from '../component/Product';
import BigContent from '../component/BigContent';
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs'; // Import dayjs

function Edit_book() {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Initialize as null
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');

  const defaultImageUrl = 'https://bizweb.dktcdn.net/100/449/104/products/phukien-3-thumb.jpg?v=1680697314390/150';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch the existing book details
    fetch(`https://localhost:7222/api/book/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setSelectedTitle(data.title);
        setSelectedAuthor(data.author);
        setPublisher(data.publisher);
        setSelectedDate(dayjs(data.publishedDate)); // Use dayjs for date handling
        setSelectedCategory(data.category);
        setQuantity(data.quantity);
        setImageUrl(data.imageURL);
        setDescription(data.description);
        setPages(data.pages);
        setIsbn(data.isbn);
      })
      .catch((error) => {
        console.error('Failed to fetch book details:', error);
        alert('Failed to load book details.');
      });
  }, [id, navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Create an updated book object
    const updatedBook = {
      title: selectedTitle,
      author: selectedAuthor,
      publisher: publisher,
      publishedDate: selectedDate ? selectedDate.format('YYYY-MM-DD') : null, // Format date
      category: selectedCategory,
      quantity: quantity,
      imageURL: imageUrl,
      description: description,
      pages: parseInt(pages),
      isbn: isbn,
    };

    // Save the updated book to the API endpoint
    const response = await fetch(`https://localhost:7222/api/book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBook),
    });

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
    } else {
      alert('The book has been successfully updated!');
      navigate('/'); // Navigate back to book list
    }
  };

  if (!book) {
    return <div>Loading book details...</div>;
  }

  return (
    <div className="Borrow">
      <BigContent bigcontent="Edit Book Details" position="text-center" />

      <div className="container my-5 d-flex">
        <Container>
          <Product src={imageUrl.trim() !== '' ? imageUrl : defaultImageUrl} />
        </Container>

        <Container
          sx={{
            width: '740px',
            backgroundColor: '#f0f0f0',
            padding: '24px',
            borderRadius: '8px',
            height: 'fit-content',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <TextField
              label="Book Title"
              placeholder="Enter book title"
              fullWidth
              value={selectedTitle}
              onChange={(event) => setSelectedTitle(event.target.value)}
            />
            <TextField
              label="Author"
              placeholder="Enter author name"
              fullWidth
              value={selectedAuthor}
              onChange={(event) => setSelectedAuthor(event.target.value)}
            />
            <TextField
              label="Publisher"
              placeholder="Enter publisher name"
              fullWidth
              value={publisher}
              onChange={(event) => setPublisher(event.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Published Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <TextField
              label="Category"
              placeholder="Enter category"
              fullWidth
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            />
            <TextField
              label="Quantity"
              placeholder="Enter quantity"
              fullWidth
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <TextField
              label="Pages"
              placeholder="Enter number of pages"
              fullWidth
              type="number"
              value={pages}
              onChange={(event) => setPages(event.target.value)}
            />
            <TextField
              label="ISBN"
              placeholder="Enter ISBN"
              fullWidth
              value={isbn}
              onChange={(event) => setIsbn(event.target.value)}
            />
            <TextField
              label="Image URL"
              placeholder="Enter image URL"
              fullWidth
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <TextField
              label="Description"
              placeholder="Enter book description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  padding: '10px 20px',
                  fontSize: '16px',
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Edit_book;
