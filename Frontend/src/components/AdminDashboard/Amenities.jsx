import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container,
  Typography,
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchAmenities,
  addAmenity,
  deleteAmenity,
} from 'store/amenitiesSlice';

function Amenities() {
  const dispatch = useDispatch();
  const amenities = useSelector((state) => state.amenities.amenities);
  const status = useSelector((state) => state.amenities.status);
  const error = useSelector((state) => state.amenities.error);
  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAmenities());
    }
  }, [status, dispatch]);

  const handleAdd = () => {
    if (newAmenity) {
      dispatch(addAmenity({ name: newAmenity }))
        .unwrap()
        .then(() => {
          setNewAmenity('');
          toast.success('Amenity added successfully');
        })
        .catch(() => {
          toast.error('Failed to add amenity');
        });
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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Amenities
      </Typography>
      <TextField
        label="New Amenity"
        variant="outlined"
        value={newAmenity}
        onChange={(e) => setNewAmenity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        fullWidth
        sx={{ mb: 2 }}
      >
        Add Amenity
      </Button>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Alert severity="error">{error}</Alert>}
      {status === 'succeeded' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {amenities.map((amenity) => (
                <TableRow key={amenity.id}>
                  <TableCell>{amenity.id}</TableCell>
                  <TableCell>{amenity.name}</TableCell>
                  <TableCell>
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
        </TableContainer>
      )}
    </Container>
  );
}

export default Amenities;
