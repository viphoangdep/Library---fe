import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import

function Navbar() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Or however you manage your token
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode here
      setUserRole(decodedToken.role); // Assuming 'role' is present in the token
      console.log(userRole);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="light"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          FAHASA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav ms-auto my-5 my-lg-2 navbar-nav-scroll gap-5 fs-6"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/Introduction">
                INTRODUCTION
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="booksDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                BOOKS
              </a>
              <ul className="dropdown-menu" aria-labelledby="booksDropdown">
                {(userRole === "Admin" || userRole === "Librarian") && (
                  <li>
                    <Link className="dropdown-item" to="/librarian/add_book">
                      Add
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            {userRole === "Admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="employeeDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Librarian
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="employeeDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/employee/Add_librarian"
                    >
                      Add Librarian
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/employee/manage_librarian"
                    >
                      Manage Librarian
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/About_us">
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/loan">
                Loan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                SIGN UP
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
