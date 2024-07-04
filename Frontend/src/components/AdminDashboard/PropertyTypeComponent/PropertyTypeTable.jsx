import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  fetchPropertyTypes,
  deletePropertyType,
} from 'store/propertyTypesSlice';
import GridOnIcon from '@mui/icons-material/GridOn';
import EditPropertyTypeButton from 'components/AdminDashboard/PropertyTypeComponent/EditPropertyTypeButton';
import SearchIcon from '@mui/icons-material/Search';
import AddPropertyTypeButton from 'components/AdminDashboard/PropertyTypeComponent/AddPropertyTypeButton';
import { tableCellClasses } from '@mui/material/TableCell';
import ShowDetailsModal from 'components/AdminDashboard/PropertyTypeComponent/showDetailsModal';
import { Oval } from 'react-loader-spinner';

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

function PropertyTypeTable() {
  const dispatch = useDispatch();
  const propertyTypes = useSelector(
    (state) => state.propertyTypes.propertyTypes
  );
  const status = useSelector((state) => state.propertyTypes.status);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const handleDelete = async () => {
    dispatch(deletePropertyType(selectedSlug));
    setOpenConfirm(false);
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

  const filteredPropertyTypes = propertyTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Oval
            height={40}
            width={40}
            color="#2D2E34"
            wrapperStyle={{}}
            wrapperClass=""
            visible
            ariaLabel="oval-loading"
            secondaryColor="#2D2E34"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </Box>
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
                {filteredPropertyTypes
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((type) => (
                    <StyledTableRow key={type.id}>
                      <StyledTableCell>{type.id}</StyledTableCell>
                      <StyledTableCell>{type.name}</StyledTableCell>
                      <StyledTableCell>
                        <EditPropertyTypeButton type={type} />
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

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this property type?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ShowDetailsModal
        typeSlug={selectedSlug}
        isOpen={detailsOpen}
        handleClose={handleCloseDetails}
      />
    </>
  );
}

export default PropertyTypeTable;
