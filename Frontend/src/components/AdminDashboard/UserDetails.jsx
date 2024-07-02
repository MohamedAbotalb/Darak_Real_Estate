import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Paper,
  CircularProgress,
  Alert,
  Pagination,
  Typography,
  Box,
  InputBase,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUsers } from 'store/userDetailsSlice';

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

function UserDetails() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDetails.users);
  const status = useSelector((state) => state.userDetails.status);
  const error = useSelector((state) => state.userDetails.error);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event, newFilterType) => {
    setFilterType(newFilterType);
  };

  const filteredUsers = users
    .filter((user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => {
      if (filterType === 'all') return true;
      return user.role === filterType;
    });

  let content;

  if (status === 'loading') {
    content = <CircularProgress />;
  } else if (status === 'succeeded') {
    if (Array.isArray(users)) {
      const paginatedUsers = filteredUsers.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      );
      content = (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">First Name</StyledTableCell>
                  <StyledTableCell align="center">Last Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Phone</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map(
                  (user) =>
                    user.role !== 'admin' && (
                      <StyledTableRow key={user.id}>
                        <StyledTableCell component="th" scope="row">
                          {user.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.first_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.last_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.phone_number}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.role}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          />
        </>
      );
    } else {
      content = <Alert severity="error">Users data is not an array</Alert>;
    }
  } else if (status === 'failed') {
    content = <Alert severity="error">{error}</Alert>;
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
            User Details
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by First Name"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
        <ToggleButtonGroup
          value={filterType}
          exclusive
          onChange={handleFilterChange}
          aria-label="role filter"
        >
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
          <ToggleButton value="user" aria-label="users">
            Users
          </ToggleButton>
          <ToggleButton value="landlord" aria-label="landlords">
            Landlords
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {content}
    </>
  );
}

export default UserDetails;
