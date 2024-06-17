import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
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
          {reviews.map((review) => (
            <StyledTableRow key={review.id}>
              <StyledTableCell component="th" scope="row">
                {review.id}
              </StyledTableCell>
              <StyledTableCell align="center">{review.user.first_name+" "+review.user.last_name}</StyledTableCell>
              <StyledTableCell align="center">{review.property.title}</StyledTableCell>
              <StyledTableCell align="center">{review.content}</StyledTableCell>
              <StyledTableCell align="center">{review.rate}</StyledTableCell>
              <StyledTableCell align="center">{new Date(review.date).toLocaleDateString()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
