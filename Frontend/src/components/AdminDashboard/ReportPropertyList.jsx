import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GridOnIcon from '@mui/icons-material/GridOn';
import {
  fetchReports,
  deleteReport,
  deleteProperty,
} from 'store/reportPropertiesSlice';
import Loader from 'components/Loader';
import DeleteConfirmationModal from 'components/DeleteConfirmationModal';
import { successToast, errorToast } from 'utils/toast';

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

function ReportPropertyList() {
  const dispatch = useDispatch();
  const { reports, status, error } = useSelector(
    (state) => state.reportProperties
  );

  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerms, setSearchTerms] = useState({ user: '', property: '' });
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReports());
    }
  }, [status, dispatch]);

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

  const handleConfirmDelete = async () => {
    try {
      if (deleteType === 'report') {
        await dispatch(deleteReport(deleteId));
        successToast('Report deleted successfully');
      } else if (deleteType === 'property') {
        await dispatch(deleteProperty(deleteId));
        successToast('Property deleted successfully');
      }
      setOpenDeleteDialog(false);
      dispatch(fetchReports());
    } catch (err) {
      errorToast('An error occurred while performing the action');
    }
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

  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const userFullName = `${report?.user?.first_name?.toLowerCase() || ''} ${report?.user?.last_name?.toLowerCase() || ''}`;
        const propertyTitle = report?.property?.title?.toLowerCase() || '';

        return (
          (searchTerms.user === '' ||
            userFullName.includes(searchTerms.user.toLowerCase())) &&
          (searchTerms.property === '' ||
            propertyTitle.includes(searchTerms.property.toLowerCase()))
        );
      }),
    [reports, searchTerms]
  );

  const paginatedReports = useMemo(
    () =>
      filteredReports.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [filteredReports, page, rowsPerPage]
  );

  let content;

  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'succeeded') {
    content = (
      <div>
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
                    {`${report?.user?.first_name} ${report?.user?.last_name}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {report?.property?.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShowContent(report.content)}
                    >
                      View
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
                      onClick={() => handleDeleteProperty(report.id)}
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
  } else if (status === 'failed') {
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
            Property Reports
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User"
              inputProps={{ 'aria-label': 'search user' }}
              onChange={(e) =>
                setSearchTerms((prevTerms) => ({
                  ...prevTerms,
                  user: e.target.value,
                }))
              }
            />
          </Search>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Property"
              inputProps={{ 'aria-label': 'search property' }}
              onChange={(e) =>
                setSearchTerms((prevTerms) => ({
                  ...prevTerms,
                  property: e.target.value,
                }))
              }
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
      <DeleteConfirmationModal
        item={deleteType}
        isOpen={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default React.memo(ReportPropertyList);
