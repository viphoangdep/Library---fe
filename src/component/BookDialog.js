import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography } from '@mui/material';
import BasicDatePicker from '../component/DatePicker';

function BookDialog({ open, onClose, book }) {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const handleSubmit = () => {
    console.log('Borrow Date:', borrowDate);
    console.log('Return Date:', returnDate);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Borrow Book: {book.title}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1"><strong>Author:</strong> {book.author}</Typography>
          <Typography variant="body1"><strong>Publisher:</strong> {book.publisher}</Typography>
          <Typography variant="body1"><strong>Published Date:</strong> {book.publishedDate}</Typography>
          <Typography variant="body1"><strong>ISBN:</strong> {book.isbn}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {book.category}</Typography>
          <Typography variant="body1"><strong>Page Size:</strong> {book.pageSize}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {book.description}</Typography>
          <Typography variant="body1"><strong>Available:</strong> {book.available} / {book.quantity}</Typography>
          <Box
            component="img"
            src={book.src}
            alt={book.title}
            sx={{ width: '100%', marginTop: 2, borderRadius: 2 }}
          />
        </Box>
        <p1>Want to Borrow ?</p1>
        <Box mb={2}>
          <BasicDatePicker
            label="Borrow Date"
            placeholder="Select borrow date"
            value={borrowDate}
            onChange={(newValue) => setBorrowDate(newValue)}
            width="100%"
          />
        </Box>
        <Box mb={2}>
          <BasicDatePicker
            label="Return Date"
            placeholder="Select return date"
            value={returnDate}
            onChange={(newValue) => setReturnDate(newValue)}
            width="100%"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookDialog;
