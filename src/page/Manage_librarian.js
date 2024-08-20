import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

function ManageLibrarian() {
  const [searchId, setSearchId] = useState('');
  const [librarians, setLibrarians] = useState([]);
  const [librarian, setLibrarian] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('edit'); // 'edit' or 'delete'
  const [editLibrarian, setEditLibrarian] = useState({});

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/librarian.json');
        const data = await response.json();
        setLibrarians(data);
      } catch (error) {
        console.error('Error fetching librarian data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const result = librarians.find(lib => lib.id === parseInt(searchId));
    setLibrarian(result);
    if (result) {
      setEditLibrarian(result);
    }
  };

  const handleEditChange = (e) => {
    setEditLibrarian({ ...editLibrarian, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedLibrarians = librarians.map(lib => 
        lib.id === editLibrarian.id ? editLibrarian : lib
      );
      await fetch('/data/librarian.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLibrarians),
      });
      setLibrarians(updatedLibrarians);
      setLibrarian(editLibrarian);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating librarian:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const updatedLibrarians = librarians.filter(lib => lib.id !== librarian.id);
      await fetch('/data/librarian.json', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLibrarians),
      });
      setLibrarians(updatedLibrarians);
      setLibrarian(null);
      setEditLibrarian({});
      handleCloseDialog();
    } catch (error) {
      console.error('Error deleting librarian:', error);
    }
  };

  const handleOpenDialog = (mode) => {
    setDialogMode(mode);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditLibrarian({});
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="mb-4 text-center">Search Librarian</h2>
          <div className="input-group mb-3">
            <TextField
              type="number"
              label="Enter Librarian ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
              sx={{ ml: 2 }}
            >
              {loading ? 'Loading...' : 'Search'}
            </Button>
          </div>

          {librarian ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Librarian Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>ID:</strong> {librarian.id}</li>
                  <li className="list-group-item"><strong>Username:</strong> {librarian.username}</li>
                  <li className="list-group-item"><strong>Name:</strong> {librarian.name}</li>
                  <li className="list-group-item"><strong>Phone:</strong> {librarian.phone}</li>
                  <li className="list-group-item"><strong>Email:</strong> {librarian.email}</li>
                  <li className="list-group-item"><strong>Address:</strong> {librarian.address}</li>
                </ul>
                <div className="mt-3">
                  <IconButton color="primary" onClick={() => handleOpenDialog('edit')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleOpenDialog('delete')}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ) : (
            searchId && !loading && <Alert severity="warning" className="mt-3">No librarian found with ID {searchId}</Alert>
          )}
        </div>
      </div>

      {/* Dialog for Edit/Delete */}
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === 'edit' ? 'Edit Librarian' : 'Delete Librarian'}</DialogTitle>
        <DialogContent>
          {dialogMode === 'edit' ? (
            <div>
              <TextField
                label="Username"
                name="username"
                value={editLibrarian.username}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Name"
                name="name"
                value={editLibrarian.name}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={editLibrarian.phone}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={editLibrarian.email}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={editLibrarian.address}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
            </div>
          ) : (
            <div>
              <p>Are you sure you want to delete librarian with ID {librarian.id}?</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogMode === 'edit' ? (
            <Button onClick={handleUpdate}>Save Changes</Button>
          ) : (
            <Button color="error" onClick={handleDelete}>Delete</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageLibrarian;
