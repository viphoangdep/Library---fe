// src/components/BookDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';
import BasicDatePicker from '../component/DatePicker'; // Đảm bảo đường dẫn đúng

function BookDialog({ open, onClose }) {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Borrow Date:', borrowDate);
    console.log('Return Date:', returnDate);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Borrow Book</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <BasicDatePicker
            label="Ngày mượn"
            placeholder="Chọn ngày mượn"
            value={borrowDate}
            onChange={(newValue) => setBorrowDate(newValue)}
            width="100%"
          />
        </Box>
        <Box mb={2}>
          <BasicDatePicker
            label="Ngày trả"
            placeholder="Chọn ngày trả"
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
