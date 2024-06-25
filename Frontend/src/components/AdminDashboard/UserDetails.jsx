import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Typography,
  Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { fetchUsers, deleteUser } from 'store/userDetailsSlice';

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

function UserDetails() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDetails.users);
  const status = useSelector((state) => state.userDetails.status);
  const error = useSelector((state) => state.userDetails.error);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId))
      .unwrap()
      .then(() => {
        toast.success('User deleted successfully');
      })
      .catch((err) => {
        toast.error(`Failed to delete user: ${err.message}`);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let content;

  if (status === 'loading') {
    content = <CircularProgress />;
  } else if (status === 'succeeded') {
    if (Array.isArray(users)) {
      const paginatedUsers = users.slice(
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
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
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
                      {user.phone}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.role}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(users.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
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

  return <Container maxWidth={false}>{content}</Container>;
}

export default UserDetails;
