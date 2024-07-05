import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/propertySearchSlice';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  maxWidth: '800px',
  margin: '0 auto',
}));

const SearchFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '200px',
  marginRight: theme.spacing(1),
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    color: '#000',
    height: '56px',
  },
}));

const SearchButton = styled(IconButton)({
  height: '56px',
  width: '56px',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
  '@media (max-width: 600px)': {
    width: '100%',
  },
});

function PropertySearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
  const locations = useSelector((state) => state.locations.data || []);
  const locationsStatus = useSelector((state) => state.locations.status);
  const propertyTypesStatus = useSelector(
    (state) => state.propertyTypes.status
  );

  const [listingType, setListingType] = useState('rent');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');

  const isLoading =
    locationsStatus === 'loading' || propertyTypesStatus === 'loading';

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    // Navigate to properties search page with query parameters
    let query = `lt=${listingType}`;
    if (propertyType) query += `&pt=${propertyType}`;
    if (city) query += `&c=${city}`;

    navigate({
      pathname: '/properties',
      search: `?${query}`,
    });

    dispatch(fetchProperties({ propertyType, city, listingType }));
  };

  return (
    <SearchContainer>
      {isLoading ? (
        <CircularProgress size={50} />
      ) : (
        <>
          <SearchFormControl variant="outlined">
            <Select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Rent, Buy</em>
              </MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="buy">Buy</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl variant="outlined">
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Location</em>
              </MenuItem>
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.city}>
                  {location.city}
                </MenuItem>
              ))}
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Property Type</em>
              </MenuItem>
              {propertyTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </SearchFormControl>

          <SearchButton
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            <SearchIcon />
          </SearchButton>
        </>
      )}
    </SearchContainer>
  );
}

export default PropertySearch;
