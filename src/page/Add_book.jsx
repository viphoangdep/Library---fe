import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button
import Product from "../component/Product";
import BigContent from "../component/BigContent";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Add() {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const defaultImageUrl =
    "https://bizweb.dktcdn.net/100/449/104/products/phukien-3-thumb.jpg?v=1680697314390/150";

  const handleSave = async () => {
    // Create a new book object
    const newBook = {
      title: selectedTitle || null,
      author: selectedAuthor || null,
      publishedDate: selectedDate || null,
      category: selectedCategory || null,
      quantity: quantity || null,
      imageURL: imageUrl || null,
      description: description || null,
      pages: parseInt(pages) || null,
      isbn: isbn || null,
    };

    // Save the new book to the API endpoint
    const response = await fetch("https://localhost:7222/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors)
          .flat() // Flatten in case there are multiple errors for a field
          .join("\n"); // Join the error messages into a single string

        alert(`Failed to add the book:\n${errorMessages}`);
      } else {
        alert("Failed to add the book: Unknown error");
      }

      console.error("Failed to add the book:", errorData);
      return;
    }
  };

  return (
    <div className="Borrow">
      <BigContent bigcontent="Add a new book" position="text-center" />

      <div className="container my-5 d-flex">
        <Container>
          <Product src={imageUrl.trim() !== "" ? imageUrl : defaultImageUrl} />
        </Container>

        <Container
          sx={{
            width: "740px",
            backgroundColor: "#f0f0f0",
            padding: "24px",
            borderRadius: "8px",
            height: "fit-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px", // Adjust gap as needed
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
                inputFormat="DD/MM/YYYY" // Định dạng ngày
                minDate={dayjs()} // Ngày nhỏ nhất là ngày hiện tại
                disablePast // Không cho phép chọn ngày trong quá khứ
                clearable // Có nút xóa giá trị
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
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  padding: "10px 20px", // Adjust padding as needed
                  fontSize: "16px", // Adjust font size if needed
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Add;
