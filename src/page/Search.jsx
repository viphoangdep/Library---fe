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

function Borrow() {
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
  const [isSearched, setIsSearched] = useState(false); // State for search trigger

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
      setSelectedDescription(book.description); // Set the description
    } else {
      setSelectedBookImage('');
      setSelectedDescription(''); // Clear the description if no book found
    }

    setIsSearched(true); // Update search trigger state
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

  const handleTitleInputChange = (event, newInputValue) => {
    setSelectedTitle(newInputValue); // Update input value
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

  const handleAuthorInputChange = (event, newInputValue) => {
    setSelectedAuthor(newInputValue); // Update input value
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

  const handleCategoryInputChange = (event, newInputValue) => {
    setSelectedCategory(newInputValue); // Update input value
  };

  return (
    <div className="Borrow">
      {/* <NavBar>  </NavBar>
      <BigContent bigcontent="Borrow a Book" position="text-center" /> */}
      <div className="container my-4">
        <Category sx={{ justifyContent: 'center' }} />
      </div>
      
      <BigContent bigcontent="Please choose your book" position="text-center" />
      
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
            onInputChange={handleTitleInputChange} // Handle text input change
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
              onInputChange={handleAuthorInputChange} // Handle text input change
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
              onInputChange={handleCategoryInputChange} // Handle text input change
              value={selectedCategory}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          >
            <FloatingActionButton onClick={handleSearch} />
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

export default Borrow;