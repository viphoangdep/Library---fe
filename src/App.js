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
function App() {

  const location = useLocation();

  // Điều kiện để hiển thị NavBar
  const showNavBar = location.pathname !== '/';

  return (
    <div>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/librarian/add_book" element={<Add_book />} />
        <Route path="/librarian/edit_book" element={<Edit_book />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admin/employee/Add_librarian" element={<AddLibrarian />} />
        <Route path="/admin/employee/manage_librarian" element={<ManageLibrarian />} />
      </Routes>
      <Footer style='bottom: 0'></Footer>
    </div>
  );
}

export default App;
