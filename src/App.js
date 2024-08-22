import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Import các component
import Home from '../src/page/Home';
import Introduction from '../src/page/Introduction';
import Borrow from './page/Search';
import AboutUs from '../src/page/About_us';
import NavBar from '../src/component/NavBar';
import Login from '../src/page/Login';
import Add_book from '../src/page/Add_book';
import Edit_book from '../src/page/Edit_book';
import Footer from './component/Footer';
import ManageLibrarian from './page/Manage_librarian';
import AddLibrarian from './page/Add_librarian';
import SignupForm from './component/SignupForm';
import DeleteBook from './component/DeleteBook';
import BookSearch from './component/BookSearch';
import LoanList from './component/LoanList';

function App() {
  const location = useLocation();


  return (
    <div className="App">
      { <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/introduction" element={<Introduction />} />
          {/* <Route path="/borrow" element={<Borrow />} /> */}
          <Route path="/librarian/add_book" element={<Add_book />} />
          <Route path="/librarian/edit_book/:id" element={<Edit_book />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/employee/Add_librarian" element={<AddLibrarian />} />
          <Route path="/employee/manage_librarian" element={<ManageLibrarian />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/librarian/delete_book/:id" element={<DeleteBook />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/loan" element={<LoanList />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
