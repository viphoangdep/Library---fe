import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";

function BookDialog({ open, onClose, book }) {
  const [borrowDate, setBorrowDate] = useState(null);
  const [days, setDays] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("authToken");

    // If no token, redirect to login
    if (token) {
      // Decode the token to extract user information
      const decodedToken = jwtDecode(token); // Use jwtDecode here
      console.log("Decoded token:", decodedToken);
      setUserRole(decodedToken.role); // Assuming 'role' is present in the token
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!borrowDate || !days) {
      alert("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const loanData = {
      loanDate: borrowDate.format("YYYY-MM-DD"),
      duration: parseInt(days, 10),
      bookId: book.id,
    };

    const response = await fetch("https://localhost:7222/api/loan/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loanData),
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors)
          .flat() // Flatten in case there are multiple errors for a field
          .join("\n"); // Join the error messages into a single string

        alert(`Failed to update the book:\n${errorMessages}`);
      } else {
        alert("Failed to update the book: Unknown error");
      }

      console.error("Failed to update the book:", errorData);
      return;
    } else {
      alert("Book borrowed successfully!");
      onClose();
    }
  };

  const handleEdit = () => {
    alert("Edit book functionality");
    navigate(`/librarian/edit_book/${book.id}`);
  };

  const handleDelete = () => {
    alert("Delete book functionality");
    navigate(`/librarian/delete_book/${book.id}`);
  };

  if (!book) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Borrow Book: {book.title}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Box
            component="img"
            src={book.imageURL || "default-image-url"}
            alt={book.title}
            sx={{ width: "100%", marginTop: 2, borderRadius: 2 }}
          />
        </Box>
        <Typography variant="body1">
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography variant="body1">
          <strong>Publisher:</strong> {book.publisher}
        </Typography>
        <Typography variant="body1">
          <strong>Published Date:</strong> {book.publishedDate}
        </Typography>
        <Typography variant="body1">
          <strong>ISBN:</strong> {book.isbn}
        </Typography>
        <Typography variant="body1">
          <strong>Category:</strong> {book.category}
        </Typography>
        <Typography variant="body1">
          <strong>Page Size:</strong> {book.pageSize}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {book.description}
        </Typography>
        <Typography variant="body1">
          <strong>Available:</strong> {book.available} / {book.quantity}
        </Typography>
        {book.available === 0 || userRole !== "Member" ? (
          <Typography variant="body2" color="error">
            This book is currently unavailable for borrowing.
          </Typography>
        ) : (
          <>
            <Typography variant="h6">Want to Borrow?</Typography>
            <Box mb={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Borrow Date"
                  value={borrowDate}
                  onChange={(newValue) => setBorrowDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ mb: 2 }} // Adding margin-bottom for spacing
                />
              </LocalizationProvider>
            </Box>
            <Box mb={2}>
              <TextField
                label="Number of Days"
                placeholder="Enter number of days"
                fullWidth
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {userRole === "Admin" || userRole === "Librarian" ? (
          <>
            <Button onClick={handleEdit} color="primary">
              Edit
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default BookDialog;
