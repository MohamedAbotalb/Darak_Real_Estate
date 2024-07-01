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
  Typography,
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import {
  fetchAmenities,
  addAmenity,
  deleteAmenity,
  updateAmenity,
} from 'store/amenitiesSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20%',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAmenities = Object.values(amenities).filter((amenity) =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAmenities = filteredAmenities.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          px: 2,
          py: 2,
          backgroundColor: '#E8DFDE',
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnIcon sx={{ mr: 1, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            Amenities
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by Name"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
        <Button
          variant="outlined"
          onClick={() => setIsDialogOpen(true)}
          sx={{
            borderColor: '#2196f3',
            color: '#2196f3',
            mt: 2,
            mb: 2,
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#2196f3',
            },
          }}
        >
          Add New Amenity
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && <Alert severity="error">{error}</Alert>}
        {status === 'succeeded' && (
          <>
            <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedAmenities.map((amenity) => (
                    <StyledTableRow key={amenity.id}>
                      <StyledTableCell>{amenity.id}</StyledTableCell>
                      <StyledTableCell>{amenity.name}</StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(amenity)}
                          sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            mr: 1,
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(amenity.id)}
                          sx={{ backgroundColor: '#d32f2f', color: '#fff' }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={Math.ceil(filteredAmenities.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                color="primary"
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
    </>
  );
}

export default Amenities;
