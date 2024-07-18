import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  InputBase,
  alpha,
  styled,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import SearchIcon from '@mui/icons-material/Search';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  fetchAcceptedProperties,
  fetchPendingProperties,
  deleteProperty,
  acceptProperty,
  rejectProperty,
} from 'store/propertySlice';
import { errorToast, successToast } from 'utils/toast';
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

function ShowDetailsButton({ slug }) {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/admin/ads/${slug}`);
  };

  return (
    <Button
      variant="contained"
      onClick={handleShowDetails}
      sx={{ backgroundColor: '#1976d2', color: '#fff', mr: 1 }}
    >
      Show
    </Button>
  );
}

ShowDetailsButton.propTypes = {
  slug: PropTypes.string.isRequired,
};

function DeletePropertyButton({ propertyId, onDelete }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => onDelete(propertyId)}
      sx={{ backgroundColor: '#d32f2f', color: '#fff' }}
    >
      Delete
    </Button>
  );
}

DeletePropertyButton.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function AcceptPropertyButton({ propertyId, onAccept }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => onAccept(propertyId)}
      sx={{ backgroundColor: '#388e3c', color: '#fff', mr: 1 }}
    >
      Accept
    </Button>
  );
}

AcceptPropertyButton.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};

function RejectPropertyButton({ propertyId, onReject }) {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => onReject(propertyId)}
      sx={{ backgroundColor: '#d32f2f', color: '#fff', mr: 1 }}
    >
      Reject
    </Button>
  );
}

RejectPropertyButton.propTypes = {
  propertyId: PropTypes.string.isRequired,
  onReject: PropTypes.func.isRequired,
};

function PropertyTable() {
  const dispatch = useDispatch();
  const { status, properties = [] } = useSelector((state) => state.property);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('Accepted');
  const rowsPerPage = 6;
  const [openAcceptConfirm, setOpenAcceptConfirm] = useState(false);
  const [openRejectConfirm, setOpenRejectConfirm] = useState(false);
  const [selectedAcceptId, setSelectedAcceptId] = useState(null);
  const [selectedRejectId, setSelectedRejectId] = useState(null);

  useEffect(() => {
    if (filterType === 'Accepted') {
      dispatch(fetchAcceptedProperties());
    } else if (filterType === 'Pending') {
      dispatch(fetchPendingProperties());
    }
  }, [dispatch, filterType]);

  useEffect(() => {
    setPage(1);
  }, [filterType]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [properties, searchTerm]);

  const paginatedProperties = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredProperties.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredProperties, page, rowsPerPage]);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteProperty(selectedId));
      successToast('Ad deleted successfully');
      handleCloseConfirm();
    } catch (error) {
      errorToast('Failed to delete this Ad');
    }
  };

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleShowDescription = (description) => {
    setSelectedDescription(description);
    setOpenDescriptionDialog(true);
  };

  const handleCloseDescriptionDialog = () => {
    setOpenDescriptionDialog(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event, newFilterType) => {
    if (newFilterType !== null) {
      setFilterType(newFilterType);
    }
  };

  const handleOpenAcceptConfirm = (id) => {
    setSelectedAcceptId(id);
    setOpenAcceptConfirm(true);
  };

  const handleOpenRejectConfirm = (id) => {
    setSelectedRejectId(id);
    setOpenRejectConfirm(true);
  };

  const handleCloseAcceptConfirm = () => {
    setOpenAcceptConfirm(false);
    setSelectedAcceptId(null);
  };

  const handleCloseRejectConfirm = () => {
    setOpenRejectConfirm(false);
    setSelectedRejectId(null);
  };

  const handleAccept = async () => {
    try {
      dispatch(acceptProperty(selectedAcceptId));
      successToast('Property accepted successfully');
      dispatch(fetchPendingProperties());
      handleCloseAcceptConfirm();
    } catch (error) {
      errorToast('Failed to accept this property');
    }
  };

  const handleReject = async () => {
    try {
      dispatch(rejectProperty(selectedRejectId));
      successToast('Property rejected successfully');
      dispatch(fetchPendingProperties());
      handleCloseRejectConfirm();
    } catch (error) {
      errorToast('Failed to reject this property');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
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
            Ads
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by title"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <ToggleButtonGroup
            value={filterType}
            exclusive
            onChange={handleFilterChange}
            aria-label="status filter"
          >
            <ToggleButton value="Accepted" aria-label="Accepted">
              Accepted
            </ToggleButton>
            <ToggleButton value="Pending" aria-label="Pending">
              Pending
            </ToggleButton>
          </ToggleButtonGroup>
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
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Area (Sqm)</StyledTableCell>
                  <StyledTableCell>Price (EGP)</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProperties.map((property) => (
                  <StyledTableRow key={property.id}>
                    <StyledTableCell>{property.id}</StyledTableCell>
                    <StyledTableCell>{property.title}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleShowDescription(property.description)
                        }
                      >
                        View
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>{property.area}</StyledTableCell>
                    <StyledTableCell>{property.price}</StyledTableCell>
                    <StyledTableCell>
                      <ShowDetailsButton slug={property.slug} />
                      {filterType === 'Accepted' ? (
                        <DeletePropertyButton
                          propertyId={property.id}
                          onDelete={handleOpenConfirm}
                        />
                      ) : (
                        <>
                          <AcceptPropertyButton
                            propertyId={property.id}
                            onAccept={handleOpenAcceptConfirm}
                          />
                          <RejectPropertyButton
                            propertyId={property.id}
                            onReject={handleOpenRejectConfirm}
                          />
                        </>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(filteredProperties.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>

          {/* Description Dialog */}
          <Dialog
            open={openDescriptionDialog}
            onClose={handleCloseDescriptionDialog}
          >
            <DialogTitle>Description</DialogTitle>
            <DialogContent>
              <Typography variant="body2">{selectedDescription}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDescriptionDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <DeleteConfirmationModal
            item="Ad"
            isOpen={openConfirm}
            handleClose={handleCloseConfirm}
            handleConfirm={handleDelete}
          />

          {/* Accept Confirmation Dialog */}
          <Dialog open={openAcceptConfirm} onClose={handleCloseAcceptConfirm}>
            <DialogTitle>Confirm Accept</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Are you sure you want to accept this property?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAcceptConfirm} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAccept} color="primary">
                Accept
              </Button>
            </DialogActions>
          </Dialog>

          {/* Reject Confirmation Dialog */}
          <Dialog open={openRejectConfirm} onClose={handleCloseRejectConfirm}>
            <DialogTitle>Confirm Reject</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Are you sure you want to reject this property?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRejectConfirm} color="primary">
                Cancel
              </Button>
              <Button onClick={handleReject} color="primary">
                Reject
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

export default PropertyTable;
