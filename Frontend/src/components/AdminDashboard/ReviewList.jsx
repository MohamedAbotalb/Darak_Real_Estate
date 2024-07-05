import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  Pagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import SearchIcon from '@mui/icons-material/Search';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { fetchReviews } from 'store/reviewsSlice';
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
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

function ReviewList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rateSearchTerm, setRateSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { reviews, status } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRateSearchChange = (event) => {
    setRateSearchTerm(event.target.value);
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

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearchTerm = review?.property?.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRateSearchTerm =
        rateSearchTerm === '' || review.rate === parseInt(rateSearchTerm, 10);
      return matchesSearchTerm && matchesRateSearchTerm;
    });
  }, [reviews, searchTerm, rateSearchTerm]);

  const paginatedReviews = useMemo(() => {
    return filteredReviews.slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage
    );
  }, [filteredReviews, page, rowsPerPage]);

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
            Reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="between" alignItems="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Property"
              inputProps={{ 'aria-label': 'search property' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <FormControl sx={{ minWidth: 100, ml: 2 }}>
            <InputLabel id="rate-select-label">Rate</InputLabel>
            <Select
              labelId="rate-select-label"
              id="rate-select"
              value={rateSearchTerm}
              onChange={handleRateSearchChange}
              label="Rate"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((rate) => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                  <StyledTableCell align="center">User</StyledTableCell>
                  <StyledTableCell align="center">Property</StyledTableCell>
                  <StyledTableCell align="center">Content</StyledTableCell>
                  <StyledTableCell align="center">Rate</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReviews.map((review, index) => (
                  <StyledTableRow key={review.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${review?.user?.first_name} ${review?.user?.last_name}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {review?.property?.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleShowContent(review.content)}
                      >
                        View
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {review.rate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(review.created_at).toLocaleDateString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 20px',
            }}
          >
            <Pagination
              count={Math.ceil(filteredReviews.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
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
        </>
      )}
    </>
  );
}

export default React.memo(ReviewList);
