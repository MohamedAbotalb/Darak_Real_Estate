import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (reportStatus === 'idle') {
      dispatch(fetchReports());
    }
  }, [reportStatus, dispatch]);

  const handleDeleteReport = (id) => {
    dispatch(deleteReport(id));
  };

  const handleDeleteLandlord = (id) => {
    dispatch(deleteLandlord(id));
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
                  {report.content}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteReport(report.id)}
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

  return <div>{content}</div>;
}
