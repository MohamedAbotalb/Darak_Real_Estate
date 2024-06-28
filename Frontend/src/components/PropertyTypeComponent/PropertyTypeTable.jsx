import React, { useEffect } from 'react';
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
} from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPropertyTypes } from 'store/propertyTypesSlice';
import EditPropertyTypeButton from './EditPropertyTypeButton';
import ShowDetailsButton from './ShowDetailsButton';
import axios from '../../axiosConfig';

function PropertyTypeTable() {
  const dispatch = useDispatch();
  const propertyTypes = useSelector(
    (state) => state.propertyTypes.propertyTypes
  );

  useEffect(() => {
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const handleDelete = async (slug) => {
    try {
      await axios.delete(`/property-types/${slug}`);
      dispatch(fetchPropertyTypes());
      toast.success('Property type deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete property type.');
    }
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
          {propertyTypes.map((type) => (
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
    </TableContainer>
  );
}

export default PropertyTypeTable;
