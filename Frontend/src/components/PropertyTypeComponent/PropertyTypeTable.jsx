import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
  fetchPropertyTypes,
  deletePropertyType,
} from 'store/propertyTypesSlice';
import EditPropertyTypeButton from 'components/PropertyTypeComponent/EditPropertyTypeButton';
import ShowDetailsButton from 'components/PropertyTypeComponent/ShowDetailsButton';

function PropertyTypeTable() {
  const dispatch = useDispatch();
  const propertyTypes = useSelector(
    (state) => state.propertyTypes.propertyTypes
  );

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const handleDelete = async (slug) => {
    try {
      await dispatch(deletePropertyType(slug));
      await dispatch(fetchPropertyTypes());
      toast.success('Property type deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete property type.');
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {propertyTypes
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>{type.name}</TableCell>
                <TableCell>
                  <EditPropertyTypeButton type={type} />
                  <ShowDetailsButton typeSlug={type.slug} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(type.slug)}
                    sx={{ backgroundColor: '#d32f2f', color: '#fff' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(propertyTypes.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </TableContainer>
  );
}

export default PropertyTypeTable;
