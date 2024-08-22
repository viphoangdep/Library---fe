import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); // Or however you manage your token
  const [userRole, setUserRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openRenewDialog, setOpenRenewDialog] = useState(false);
  const [loanDate, setLoanDate] = useState("");
  const [duration, setDuration] = useState("");
  const [days, setDays] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token); // Use jwtDecode here
    setUserRole(decodedToken.role); // Assuming 'role' is present in the token
    fetch("https://localhost:7222/api/loan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok, try to login again");
        }
        return response.json();
      })
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Network response was not ok, try to login again", error);
        alert("Network response was not ok, try to login again", error.message);
        setError(error);
        setLoading(false);
      });
  }, [token]);

  const handleAction = (loanId, isAccepted, actionType) => {
    const urls = {
      LoanPending: "https://localhost:7222/api/loan/confirm-loan",
      RenewPending: "https://localhost:7222/api/loan/confirm-renew",
      ReturnPending: `https://localhost:7222/api/loan/confirm-return/${loanId}`,
      Cancel: `https://localhost:7222/api/loan/cancel-loan/${loanId}`,
      Return: `https://localhost:7222/api/loan/return/${loanId}`,
      Update: `https://localhost:7222/api/loan`, // Using PUT for update
      Renew: `https://localhost:7222/api/loan/renew/${loanId}`, // Using POST for renew
    };

    const method = actionType === "Update" ? "PUT" : "POST";
    const bodyContent =
      actionType === "Update"
        ? JSON.stringify({
            loanDate: loanDate, // Example update
            duration: duration, // Example new duration
            id: loanId,
          })
        : actionType === "Renew" ||
          actionType === "Return" ||
          actionType === "Cancel" ||
          actionType === "ReturnPending"
        ? null // No body for renew
        : JSON.stringify({
            loanId,
            isAccepted,
          });

    const url = days ? `${urls[actionType]}?days=${days}` : urls[actionType]; // Handle query param for renew
    console.log("URL:", url);
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: bodyContent,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        // Refresh the loan list or handle successful action
        alert("Action processed successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error processing action:", error);
      });
  };

  const handleOpenUpdateDialog = (loanId) => {
    setOpenDialog(true);
    setSelectedLoanId(loanId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDays("");
  };

  const handleOpenRenewDialog = (loanId) => {
    setOpenRenewDialog(true);
    setSelectedLoanId(loanId);
  };

  const handleCloseRenewDialog = () => {
    setOpenRenewDialog(false);
    setDays("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Loan List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member Name</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Loan Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Actual Return Date</TableCell>
              <TableCell>Renew Return Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.memberName}</TableCell>
                <TableCell>{loan.bookTitle}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>{loan.returnDate}</TableCell>
                <TableCell>{loan.actualReturnDate}</TableCell>
                <TableCell>{loan.renewReturnDate}</TableCell>
                <TableCell>
                  {loan.returnDate < Date.now() && loan.status !== "Returned" && loan.status !== "Cancel" && loan.status !== "Rejected"
                    ? "Overdue"
                    : loan.status}
                </TableCell>

                {userRole === "Librarian" || userRole === "Admin" ? (
                  <TableCell>
                    {loan.status === "LoanPending" && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleAction(loan.id, false, "LoanPending")
                          }
                          sx={{ mr: 1 }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleAction(loan.id, true, "LoanPending")
                          }
                        >
                          Confirm
                        </Button>
                      </>
                    )}
                    {loan.status === "RenewPending" && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleAction(loan.id, false, "RenewPending")
                          }
                          sx={{ mr: 1 }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleAction(loan.id, true, "RenewPending")
                          }
                        >
                          Confirm
                        </Button>
                      </>
                    )}
                    {loan.status === "ReturnPending" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleAction(loan.id, true, "ReturnPending")
                        }
                      >
                        Confirm Return
                      </Button>
                    )}
                  </TableCell>
                ) : (
                  <TableCell>
                    {loan.status === "LoanPending" && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleAction(loan.id, false, "Cancel")}
                          sx={{ mr: 1 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenUpdateDialog(loan.id)}
                        >
                          Update
                        </Button>
                      </>
                    )}
                    {loan.status === "RenewPending" && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleAction(loan.id, true, "Return")}
                          sx={{ mr: 1 }}
                        >
                          Return
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenRenewDialog(loan.id)}
                        >
                          Renew
                        </Button>
                      </>
                    )}
                    {loan.status === "Borrowing" && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleAction(loan.id, true, "Return")}
                          sx={{ mr: 1 }}
                        >
                          Return
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenRenewDialog(loan.id)}
                        >
                          Renew
                        </Button>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Loan</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Loan Date"
            type="date"
            fullWidth
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Duration"
            type="number"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => handleAction(selectedLoanId, true, "Update")}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Renew Dialog */}
      <Dialog open={openRenewDialog} onClose={handleCloseRenewDialog}>
        <DialogTitle>Renew Loan</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Days"
            type="number"
            fullWidth
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRenewDialog}>Cancel</Button>
          <Button
            onClick={() => handleAction(selectedLoanId, true, "Renew")}
            color="primary"
          >
            Renew
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoanList;
