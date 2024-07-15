import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAmenities,
  deleteAmenity,
  updateAmenityAvailability,
} from 'store/amenitiesSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Box,
  InputBase,
  alpha,
  styled,
  Typography,
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { tableCellClasses } from '@mui/material/TableCell';
import SearchIcon from '@mui/icons-material/Search';
import Loader from 'components/Loader';
import AddAmenityButton from 'components/AdminDashboard/Amenities/AddAmenityButton';
import EditAmenityButton from 'components/AdminDashboard/Amenities/EditAmenityButton';
import DeleteConfirmationModal from 'components/DeleteConfirmationModal';
import { errorToast, successToast } from 'utils/toast';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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

function AmenityTable() {
  const dispatch = useDispatch();
  const { amenities, status } = useSelector((state) => state.amenities);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);

  useEffect(() => {
    dispatch(fetchAmenities());
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      dispatch(deleteAmenity(selectedSlug));
      successToast('Amenity deleted successfully');
      setOpenConfirm(false);
    } catch (error) {
      errorToast('Failed to delete the amenity');
    }
  };

  const handleOpenConfirm = (slug) => {
    setSelectedSlug(slug);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedSlug(null);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const updateAvailability = async (id, availability) => {
    try {
      await dispatch(updateAmenityAvailability({ id, availability }));
      successToast('Availability updated successfully');
    } catch (error) {
      errorToast('Failed to update availability');
    }
  };

  const filteredAmenities = useMemo(() => {
    return amenities.filter((amenity) =>
      amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [amenities, searchTerm]);

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
          backgroundColor: '#d8d8d8',
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginTop: '66px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnIcon sx={{ mr: 1, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            Amenities
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <AddAmenityButton />
        </Box>
      </Box>

      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Availability</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAmenities
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((amenity) => (
                    <StyledTableRow key={amenity.id}>
                      <StyledTableCell>{amenity.id}</StyledTableCell>
                      <StyledTableCell align="center">
                        {amenity.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor:
                              amenity.availability === 'available'
                                ? 'green'
                                : 'red',
                            color: '#fff',
                          }}
                          onClick={() =>
                            updateAvailability(
                              amenity.id,
                              amenity.availability === 'available'
                                ? 'unavailable'
                                : 'available'
                            )
                          }
                        >
                          {amenity.availability}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <EditAmenityButton amenity={amenity} />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpenConfirm(amenity.slug)}
                          sx={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            ml: 2,
                          }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Pagination
              count={Math.ceil(filteredAmenities.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
        </>
      )}

      <DeleteConfirmationModal
        open={openConfirm}
        onClose={handleCloseConfirm}
        onDelete={handleDelete}
      />
    </>
  );
}

export default AmenityTable;
