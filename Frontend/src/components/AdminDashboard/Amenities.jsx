import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  fetchAmenities,
  addAmenity,
  deleteAmenity,
  updateAmenity,
} from 'store/amenitiesSlice';

function Amenities() {
  const dispatch = useDispatch();
  const amenities = useSelector((state) => state.amenities.amenities);
  const status = useSelector((state) => state.amenities.status);
  const error = useSelector((state) => state.amenities.error);
  const [newAmenity, setNewAmenity] = useState('');
  const [currentAmenity, setCurrentAmenity] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAmenities());
    }
  }, [status, dispatch]);

  const handleAddOrUpdate = () => {
    if (newAmenity) {
      if (isEditMode && currentAmenity) {
        dispatch(updateAmenity({ id: currentAmenity.id, name: newAmenity }))
          .unwrap()
          .then(() => {
            setNewAmenity('');
            setIsEditMode(false);
            setCurrentAmenity(null);
            setIsDialogOpen(false);
            toast.success('Amenity updated successfully');
          })
          .catch(() => {
            toast.error('Failed to update amenity');
          });
      } else {
        dispatch(addAmenity({ name: newAmenity }))
          .unwrap()
          .then(() => {
            setNewAmenity('');
            setIsDialogOpen(false);
            toast.success('Amenity added successfully');
          })
          .catch(() => {
            toast.error('Failed to add amenity');
          });
      }
    }
  };

  const handleDelete = (amenityId) => {
    dispatch(deleteAmenity(amenityId))
      .unwrap()
      .then(() => {
        toast.success('Amenity deleted successfully');
      })
      .catch(() => {
        toast.error('Failed to delete amenity');
      });
  };

  const handleEdit = (amenity) => {
    setNewAmenity(amenity.name);
    setCurrentAmenity(amenity);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const amenitiesArray = Object.values(amenities);

  const paginatedAmenities = amenitiesArray.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}
        sx={{ mb: 2, alignSelf: 'flex-start' }}
      >
        Add New Amenity
      </Button>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Alert severity="error">{error}</Alert>}
      {status === 'succeeded' && (
        <>
          <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAmenities.map((amenity) => (
                  <TableRow key={amenity.id}>
                    <TableCell>{amenity.id}</TableCell>
                    <TableCell>{amenity.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(amenity)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(amenity.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              count={Math.ceil(amenitiesArray.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            />
          </TableContainer>

          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>
              {isEditMode ? 'Edit Amenity' : 'Add New Amenity'}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Amenity Name"
                variant="outlined"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddOrUpdate} color="primary">
                {isEditMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default Amenities;
