import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { userRole } = useUser(); // Access userRole from context

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="light">
      <div className="container">
        <Link className="navbar-brand" to="/home">FAHASA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto my-5 my-lg-2 navbar-nav-scroll gap-5 fs-6" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Introduction">INTRODUCTION</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="booksDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                BOOKS
              </a>
              <ul className="dropdown-menu" aria-labelledby="booksDropdown">
                <li><Link className="dropdown-item" to="/Borrow">SEARCH</Link></li>
                {(userRole === 'admin' || userRole === 'librarian') && (
                  <>
                    <li><Link className="dropdown-item" to="/librarian/add_book">Add</Link></li>
                    <li><Link className="dropdown-item" to="/librarian/edit_book">Edit Book Details</Link></li>
                  </>
                )}
              </ul>
            </li>

            {userRole === 'admin' && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  EMPLOYEE
                </a>
                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                 
                  <li><Link className="dropdown-item" to="/employee/Add_librarian">Add Employee</Link></li>
                  <li><Link className="dropdown-item" to="/employee/manage_librarian">Manage Employees</Link></li>
                </ul>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/About_us">ABOUT US</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
