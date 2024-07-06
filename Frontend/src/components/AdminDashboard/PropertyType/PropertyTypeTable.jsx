import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import SearchIcon from '@mui/icons-material/Search';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  deletePropertyType,
  fetchPropertyTypes,
} from 'store/propertyTypesSlice';
import { errorToast, successToast } from 'utils/toast';
import Loader from 'components/Loader';
import EditPropertyTypeButton from 'components/AdminDashboard/PropertyType/EditPropertyTypeButton';
import AddPropertyTypeButton from 'components/AdminDashboard/PropertyType/AddPropertyTypeButton';
import ShowDetailsModal from 'components/AdminDashboard/PropertyType/showDetailsModal';
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

function PropertyTypeTable() {
  const dispatch = useDispatch();
  const { status, propertyTypes } = useSelector((state) => state.propertyTypes);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const filteredPropertyTypes = useMemo(() => {
    return propertyTypes.filter((type) =>
      type.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [propertyTypes, searchTerm]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePropertyType(selectedSlug));
      successToast('Property type deleted successfully');
      setOpenConfirm(false);
    } catch (error) {
      errorToast('Failed to delete this property type');
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleOpenConfirm = (slug) => {
    setSelectedSlug(slug);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedSlug(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDetails = (slug) => {
    setSelectedSlug(slug);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedSlug(null);
  };

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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnIcon sx={{ mr: 1, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            Property Types
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
          <AddPropertyTypeButton />
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
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPropertyTypes
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((type) => (
                    <StyledTableRow key={type.id}>
                      <StyledTableCell component="th" scope="row">
                        {type.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {type.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handleOpenDetails(type.slug)}
                          sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            mr: 1,
                          }}
                        >
                          Show
                        </Button>
                        <EditPropertyTypeButton type={type} />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpenConfirm(type.slug)}
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
              count={Math.ceil(filteredPropertyTypes.length / rowsPerPage)}
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

      <ShowDetailsModal
        typeSlug={selectedSlug}
        isOpen={detailsOpen}
        handleClose={handleCloseDetails}
      />
    </>
  );
}

export default PropertyTypeTable;
