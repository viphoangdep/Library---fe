import React, { useState, useEffect } from 'react';
import NavBar from '../component/NavBar';
import BigContent from '../component/BigContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SingleSelect from '../component/SingleSelect';
import BasicDatePicker from '../component/DatePicker';
import FloatingActionButton from '../component/FloatingActionButtons';
import Product from '../component/Product';
import Category from '../component/Category';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'; // Add your Edit Icon
import IconButton from '@mui/material/IconButton';

function Edit_book() {
  const [books, setBooks] = useState([]);
  const [bookTitles, setBookTitles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [releasedDates, setReleasedDates] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedBookImage, setSelectedBookImage] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isSearched, setIsSearched] = useState(false); // New state for search trigger
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode

  useEffect(() => {
    fetch('../data/books.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
        updateFilters(data);
      })
      .catch(error => {
        console.error('Error fetching the books:', error);
      });
  }, []);

  const updateFilters = (booksData) => {
    setBookTitles([...new Set(booksData.map(book => book.title))]);
    setAuthors([...new Set(booksData.map(book => book.author))]);
    setReleasedDates([...new Set(booksData.map(book => book.releasedDate))]);
    setCategories([...new Set(booksData.map(book => book.category))]);
  };

  const handleSearch = () => {
    let filteredBooks = books;

    if (selectedTitle) {
      filteredBooks = filteredBooks.filter(book => book.title === selectedTitle);
    }

    if (selectedAuthor) {
      filteredBooks = filteredBooks.filter(book => book.author === selectedAuthor);
    }

    if (selectedDate) {
      filteredBooks = filteredBooks.filter(book => book.releasedDate === selectedDate);
    }

    if (selectedCategory) {
      filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
    }

    if (filteredBooks.length > 0) {
      const book = filteredBooks[0];
      setSelectedBookImage(book.src);
      setSelectedDescription(book.description);
      setEditTitle(book.title);
      setEditAuthor(book.author);
      setEditDate(book.releasedDate);
      setEditCategory(book.category);
      setEditDescription(book.description);
      setEditImage(book.src);
      setIsEditing(false); // Reset edit mode on search
    } else {
      setSelectedBookImage('');
      setSelectedDescription('');
      setEditTitle('');
      setEditAuthor('');
      setEditDate('');
      setEditCategory('');
      setEditDescription('');
      setEditImage('');
    }

    setIsSearched(true); // Update search trigger state
  };

  const handleUpdate = () => {
    const updatedBooks = books.map(book => {
      if (book.title === selectedTitle) {
        return {
          ...book,
          title: editTitle,
          author: editAuthor,
          releasedDate: editDate,
          category: editCategory,
          description: editDescription,
          src: editImage
        };
      }
      return book;
    });

    fetch('../data/books.json', {
      method: 'PUT', // Assuming you have a backend to handle PUT requests
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBooks)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Books updated successfully:', data);
        setBooks(updatedBooks);
        setIsEditing(false); // Exit edit mode after saving
      })
      .catch(error => {
        console.error('Error updating the books:', error);
      });
  };

  const handleTitleChange = (event, newValue) => {
    setSelectedTitle(newValue);

    if (newValue) {
      const filteredBooks = books.filter(book => book.title === newValue);
      setAuthors([...new Set(filteredBooks.map(book => book.author))]);
      setCategories([...new Set(filteredBooks.map(book => book.category))]);
    } else {
      updateFilters(books);
    }
  };

  const handleAuthorChange = (event, newValue) => {
    setSelectedAuthor(newValue);

    if (newValue) {
      const filteredBooks = books.filter(book => book.author === newValue);
      setBookTitles([...new Set(filteredBooks.map(book => book.title))]);
      setCategories([...new Set(filteredBooks.map(book => book.category))]);
    } else {
      updateFilters(books);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date ? date.format('YYYY-MM-DD') : '');
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);

    if (newValue) {
      const filteredBooks = books.filter(book => book.category === newValue);
      setBookTitles([...new Set(filteredBooks.map(book => book.title))]);
      setAuthors([...new Set(filteredBooks.map(book => book.author))]);
    } else {
      updateFilters(books);
    }
  };

  return (
    <div className="Edit">
      {/* <NavBar>  </NavBar>
      <BigContent bigcontent="Edit Book Details" position="text-center" /> */}
      <div className="container my-4">
        <Category sx={{ justifyContent: 'center' }} />
      </div>
      
      <BigContent bigcontent="Edit Book Details" position="text-center" />
      
      <div className="container my-5 d-flex">
        <Container>
          {selectedBookImage && <Product src={selectedBookImage} />}
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
          <SingleSelect
            names={bookTitles}
            label={'Book Title'}
            placeholder={'Type to search and select a title'}
            width="350px"
            onChange={handleTitleChange}
            value={selectedTitle}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            <SingleSelect
              names={authors}
              label={'Author'}
              placeholder={'Type to search and select an author'}
              width="350px"
              onChange={handleAuthorChange}
              value={selectedAuthor}
            />
            <BasicDatePicker
              label={'Released Date'}
              placeholder={'Select release date'}
              width="300px"
              onChange={handleDateChange}
              value={selectedDate}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              marginTop: '8px',
            }}
          >
            <SingleSelect
              names={categories}
              label={'Category'}
              placeholder={'Type to search and select a category'}
              width="350px"
              onChange={handleCategoryChange}
              value={selectedCategory}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            {isEditing && (
              <>
                <TextField
                  label="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
                <TextField
                  label="Book Image URL"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  fullWidth
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
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </Box>
              </>
            )}
            {!isEditing && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '16px',
                }}
              >
                <IconButton
                  onClick={() => setIsEditing(true)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <FloatingActionButton onClick={handleSearch} />
              </Box>
            )}
          </Box>
        
          {/* Render BigContent only after search is performed */}
          {isSearched && selectedDescription && (
            <BigContent 
              bigcontent={selectedTitle} 
              smallcontent={selectedDescription} 
              position="text-start" 
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default Edit_book;
