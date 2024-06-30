import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
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
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {
  fetchReports,
  deleteReport,
  deleteProperty,
} from '../store/reportPropertiesSlice';

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

export default function ReportPropertyList() {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reportProperties.reports);
  const reportStatus = useSelector((state) => state.reportProperties.status);
  const error = useSelector((state) => state.reportProperties.error);

  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    user: '',
    property: '',
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

  const handleDeleteProperty = (id) => {
    setDeleteType('property');
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (deleteType === 'report') {
      dispatch(deleteReport(deleteId));
    } else if (deleteType === 'property') {
      dispatch(deleteProperty(deleteId));
    }
    setOpenDeleteDialog(false);
  };

  const handleShowContent = (content) => {
    setSelectedContent(content);
    setOpenContentDialog(true);
  };

  const handleCloseContentDialog = () => {
    setOpenContentDialog(false);
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
    const propertyTitle = report.property.title.toLowerCase();

    return (
      (searchTerms.user === '' ||
        userFullName.includes(searchTerms.user.toLowerCase())) &&
      (searchTerms.property === '' ||
        propertyTitle.includes(searchTerms.property.toLowerCase()))
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
        <Box display="flex" justifyContent="center" mb={2}>
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
              placeholder="Search Property"
              inputProps={{ 'aria-label': 'search property' }}
              value={searchTerms.property}
              onChange={(e) => handleSearchChange(e, 'property')}
            />
          </Search>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">User</StyledTableCell>
                <StyledTableCell align="center">Property</StyledTableCell>
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
                    {report.property.title}
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
                      onClick={() => handleDeleteProperty(report.property.id)}
                    >
                      Delete Property
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
