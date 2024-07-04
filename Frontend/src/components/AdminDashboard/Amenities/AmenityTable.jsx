import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAmenities, deleteAmenity } from 'store/amenitiesSlice';
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
import AddAmenityButton from 'components/AdminDashboard/Amenities/AddAmenityButton';
import EditAmenityButton from 'components/AdminDashboard/Amenities/EditAmenityButton';
import Loader from 'components/Loader';
import DeleteConfirmationModal from 'components/DeleteConfirmationModal';

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
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: 'auto',
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
  const amenities = useSelector((state) => state.amenities.amenities);
  const status = useSelector((state) => state.amenities.status);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);

  useEffect(() => {
    dispatch(fetchAmenities());
  }, [dispatch]);

  const handleDelete = async () => {
    dispatch(deleteAmenity(selectedSlug));
    setOpenConfirm(false);
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

  const filteredAmenities = Array.isArray(amenities)
    ? amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAmenities
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((amenity) => (
                    <StyledTableRow key={amenity.id}>
                      <StyledTableCell>{amenity.id}</StyledTableCell>
                      <StyledTableCell>{amenity.name}</StyledTableCell>
                      <StyledTableCell>
                        <EditAmenityButton amenity={amenity} />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpenConfirm(amenity.slug)}
                          sx={{ backgroundColor: '#d32f2f', color: '#fff' }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2}>
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
        item="property type"
        isOpen={openConfirm}
        handleClose={handleCloseConfirm}
        handleConfirm={handleDelete}
      />
    </>
  );
}

export default AmenityTable;
