import React, { useState, useEffect } from "react";
import BigContent from "../component/BigContent";
import Hero from "../component/Hero";
import MiniContent from "../component/MiniContent";
import Footer from "../component/Footer";
import BookDialog from "../component/BookDialog";
import BookSearch from "../component/BookSearch";

function Home() {
  const [books, setBooks] = useState([]); // Store fetched books data, initialized as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [openDialog, setOpenDialog] = useState(false); // Book dialog state
  const [selectedBook, setSelectedBook] = useState(null); // Book selected for dialog
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [searchParams, setSearchParams] = useState({}); // Search parameters state

  const pageSize = 6; // Number of books per page

  // Fetch books data from API with pagination and search parameters
  useEffect(() => {
    setLoading(true);
    
    // Build the query string from search parameters
    const query = new URLSearchParams({
      PageNumber: currentPage,
      PageSize: pageSize,
      ...Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v != null && v !== '')) // Remove empty values
    }).toString();

    fetch(`https://localhost:7222/api/book?${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.books || []); // Safely set books, defaulting to an empty array if data.books is undefined
        setTotalPages(data.count || 1); // Ensure totalPages has a fallback value
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError(error);
        setLoading(false);
      });
  }, [currentPage, searchParams]); // Include searchParams as a dependency

  const handleClickOpen = (book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedBook(null); // Reset the selected book
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (filter) => {
    setSearchParams(filter); // Update search parameters
    setCurrentPage(1); // Reset to first page when search parameters change
  };

  // Conditional rendering for loading and error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Home">
      {/* BigContent Component */}
      <BigContent
        bigcontent="Fahasa - Camp of the soul"
        position="text-center"
      />

      {/* Hero Component */}
      {/* <Hero /> */}

      {/* MiniContent Component */}
      {/* <MiniContent /> */}

      {/* BookSearch Component */}
      <BookSearch onSearch={handleSearch} />

      {/* Book Section */}
      <div className="container d-flex flex-wrap justify-content-center p-3">
        {/* Add a check to ensure books is defined before calling map */}
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="position-relative m-5">
              <img
                src={book.imageURL || "https://via.placeholder.com/150"} // Placeholder URL
                alt={book.title}
                style={{ width: "18rem", height: "30rem", objectFit: "cover" }}
                onClick={() => handleClickOpen(book)} // Open dialog with book details
              />

              <div className="overlay d-flex align-items-center justify-content-center text-white">
                <div className="text-center">
                  <h5>{book.title}</h5>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No books available</div> // Fallback message if books array is empty
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Book Dialog */}
      <BookDialog open={openDialog} onClose={handleClose} book={selectedBook} />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default Home;
