import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import GridOnIcon from '@mui/icons-material/GridOn';
import {
  fetchReports,
  deleteReport,
  deleteLandlord,
} from '../../store/reportUsersSlice';

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
  const [searchTerms, setSearchTerms] = useState({
    user: '',
    landlord: '',
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

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

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event, fieldName) => {
    setSearchTerms({
      ...searchTerms,
      [fieldName]: event.target.value,
    });
  };

  const filteredReports = reports.filter((report) => {
    const userFullName = `${report.user.first_name.toLowerCase()} ${report.user.last_name.toLowerCase()}`;
    const landlordFullName = `${report.landlord.first_name.toLowerCase()} ${report.landlord.last_name.toLowerCase()}`;

    return (
      (searchTerms.user === '' ||
        userFullName.includes(searchTerms.user.toLowerCase())) &&
      (searchTerms.landlord === '' ||
        landlordFullName.includes(searchTerms.landlord.toLowerCase()))
    );
  });

  const paginatedReports = filteredReports.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  let content;

  if (reportStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (reportStatus === 'succeeded') {
    content = (
      <div>
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
              {paginatedReports.map((report) => (
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
                      View_Content
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
                      Blocked Landlord
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <Pagination
            count={Math.ceil(filteredReports.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      </div>
    );
  } else if (reportStatus === 'failed') {
    content = <p>{error}</p>;
  }

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
            Report User
          </Typography>
        </Box>
        <Box display="flex" justifyContent="between">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User"
              inputProps={{ 'aria-label': 'search user' }}
              value={searchTerms.user}
              onChange={(e) => handleSearchChange(e, 'user')}
            />
          </Search>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Landlord"
              inputProps={{ 'aria-label': 'search landlord' }}
              value={searchTerms.landlord}
              onChange={(e) => handleSearchChange(e, 'landlord')}
            />
          </Search>
        </Box>
      </Box>
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
    </>
  );
}
