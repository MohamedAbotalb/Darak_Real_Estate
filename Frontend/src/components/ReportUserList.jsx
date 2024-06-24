import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import {
  fetchReports,
  deleteReport,
  deleteLandlord,
} from '../store/reportUsersSlice';

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

export default function ReportUserList() {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reportUsers.reports);
  const reportStatus = useSelector((state) => state.reportUsers.status);
  const error = useSelector((state) => state.reportUsers.error);

  const [selectedContent, setSelectedContent] = useState('');
  const [openContentDialog, setOpenContentDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (reportStatus === 'idle') {
      dispatch(fetchReports());
    }
  }, [reportStatus, dispatch]);

  const handleDeleteReport = (id) => {
    setDeleteType('report');
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteLandlord = (id) => {
    setDeleteType('landlord');
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleShowContent = (content) => {
    setSelectedContent(content);
    setOpenContentDialog(true);
  };

  const handleCloseContentDialog = () => {
    setOpenContentDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (deleteType === 'report') {
      dispatch(deleteReport(deleteId));
    } else if (deleteType === 'landlord') {
      dispatch(deleteLandlord(deleteId));
    }
    setOpenDeleteDialog(false);
  };

  let content;

  if (reportStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (reportStatus === 'succeeded') {
    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Landlord</StyledTableCell>
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <StyledTableRow key={report.id}>
                <StyledTableCell component="th" scope="row">
                  {report.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${report.user.first_name} ${report.user.last_name}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${report.landlord.first_name} ${report.landlord.last_name}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleShowContent(report.content)}
                  >
                    Details
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteReport(report.id)}
                    style={{ marginRight: '7px' }}
                  >
                    Delete Report
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteLandlord(report.landlord.id)}
                  >
                    Delete Landlord
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (reportStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      {content}
      <Dialog open={openContentDialog} onClose={handleCloseContentDialog}>
        <DialogTitle>Content</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{selectedContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContentDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete this {deleteType}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
