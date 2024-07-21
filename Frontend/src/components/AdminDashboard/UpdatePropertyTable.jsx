import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useNavigate } from 'react-router-dom';
import {
  fetchPropertyUpdates,
  approvePropertyUpdate,
  rejectPropertyUpdate,
} from 'store/propertyupdateSlice';
import { errorToast, successToast } from 'utils/toast';
import Loader from 'components/Loader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
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

function UpdatePropertyTable() {
  const dispatch = useDispatch();
  const updates = useSelector((state) => state.propertyUpdates.updates);
  const status = useSelector((state) => state.propertyUpdates.status);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [openRejectConfirm, setOpenRejectConfirm] = useState(false);
  const [selectedRejectId, setSelectedRejectId] = useState(null);

  useEffect(() => {
    dispatch(fetchPropertyUpdates());
  }, [dispatch]);
  const handleOpenRejectConfirm = (id) => {
    setSelectedRejectId(id);
    setOpenRejectConfirm(true);
  };

  const handleCloseRejectConfirm = () => {
    setOpenRejectConfirm(false);
    setSelectedRejectId(null);
  };

  const handleReject = async () => {
    try {
      await dispatch(rejectPropertyUpdate(selectedRejectId));
      successToast('Property update rejected successfully');
      dispatch(fetchPropertyUpdates());
      handleCloseRejectConfirm();
    } catch (error) {
      errorToast('Failed to reject this property update');
    }
  };

  const handleAccept = async (id) => {
    try {
      await dispatch(approvePropertyUpdate(id));
      successToast('Property update approved successfully');
      dispatch(fetchPropertyUpdates());
    } catch (error) {
      errorToast('Failed to approve this property update');
    }
  };
  const paginatedUpdates = updates.slice((page - 1) * 5, page * 5);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const showPropertyDetails = (id, type) => {
    if (type === 'old') {
      navigate(`/admin/property-updates/${id}/old`);
    } else if (type === 'new') {
      navigate(`/admin/property-updates/${id}/new`);
    }
  };

  const getPropertyTitle = (update) => {
    if (update['old-data'] && update['old-data'].title) {
      return update['old-data'].title;
    }
    if (update['new-data'] && update['new-data'].title) {
      return update['new-data'].title;
    }
    return 'No title available';
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
          marginTop: '66px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnIcon sx={{ mr: 1, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            Property Updates
          </Typography>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        {status === 'loading' && <Loader />}
        {status === 'failed' && (
          <Typography color="error">Failed to fetch updates</Typography>
        )}
        {status === 'succeeded' && (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Property Title</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUpdates.map((update) => (
                <StyledTableRow key={update.id}>
                  <StyledTableCell component="th" scope="row">
                    {update.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getPropertyTitle(update)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => showPropertyDetails(update.id, 'old')}
                      sx={{ backgroundColor: '#1976d2', color: '#fff', mr: 1 }}
                    >
                      Show Old Details
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => showPropertyDetails(update.id, 'new')}
                      sx={{ backgroundColor: '#ff9800', color: '#fff', mr: 1 }}
                    >
                      Show New Details
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleAccept(update.id)}
                      sx={{ backgroundColor: '#4caf50', color: '#fff', mr: 1 }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenRejectConfirm(update.id)}
                      sx={{ backgroundColor: '#f44336', color: '#fff' }}
                    >
                      Reject
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {status === 'succeeded' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <Pagination
            count={Math.ceil(updates.length / 5)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
      )}

      {/* Reject Confirmation Dialog */}
      <Dialog open={openRejectConfirm} onClose={handleCloseRejectConfirm}>
        <DialogTitle>Confirm Reject</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to reject this property update?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReject} color="error" autoFocus>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdatePropertyTable;
