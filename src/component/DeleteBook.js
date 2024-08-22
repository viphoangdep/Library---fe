import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Product from '../component/Product';
import BigContent from '../component/BigContent';

function DeleteBook() {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const defaultImageUrl = 'https://bizweb.dktcdn.net/100/449/104/products/phukien-3-thumb.jpg?v=1680697314390/150';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch the book details to show the user what they're deleting
    fetch(`https://localhost:7222/api/book/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.error('Failed to fetch book details:', error);
        alert('Failed to load book details.');
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Confirm the deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) {
      return;
    }

    // Send the delete request to the API
    const response = await fetch(`https://localhost:7222/api/book/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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
      alert('The book has been successfully deleted!');
      navigate('/'); // Navigate back to book list or any other relevant page
    }
  };

  if (!book) {
    return <div>Loading book details...</div>;
  }

  return (
    <div className="DeleteBook">
      <BigContent bigcontent="Delete Book" position="text-center" />

      <div className="container my-5 d-flex">
        <Container>
          <Product src={book.imageURL?.trim() !== '' ? book.imageURL : defaultImageUrl} />
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
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Category: {book.category}</p>
            <p>Quantity: {book.quantity}</p>
            <p>Pages: {book.pages}</p>
            <p>ISBN: {book.isbn}</p>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{
                  padding: '10px 20px',
                  fontSize: '16px',
                }}
              >
                Delete Book
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default DeleteBook;
