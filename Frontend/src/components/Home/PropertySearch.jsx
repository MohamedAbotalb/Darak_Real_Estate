import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/propertySearchSlice';
import Loader from 'components/Loader';
import { useTranslation } from 'react-i18next';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0px',
  flexWrap: 'wrap',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  padding: '20px',
  borderRadius: '30px',
  maxWidth: '1000px',
  margin: '300px auto 0 auto',
  position: 'relative',
}));

const SearchFormControl = styled(FormControl)(({ theme, first }) => ({
  minWidth: first ? '350px' : '150px',
  marginRight: '0px',
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    color: '#000',
    height: '56px',
    borderRadius: '0',
    borderTopLeftRadius: first ? '30px' : '0px',
    borderBottomLeftRadius: first ? '30px' : '0px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c4c4c4', 
    },
    '&:hover fieldset': {
      borderColor: '#c4c4c4', 
    },
    '&.Mui-focused fieldset': {
      border: 'solid 1px #000', 
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c4c4c4', 
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c4c4c4', 
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'solid 1px #000', 
  },
}));

const SearchButton = styled(IconButton)({
  height: '56px',
  width: '100px',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ed2128',
  color: '#fff',
  borderRadius: '0 30px 30px 0',
  '&:hover': {
    backgroundColor: '#e21118',
  },
});

const LoadingOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});

function PropertySearch() {
  const { t } = useTranslation();
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
      {isLoading && (
        <LoadingOverlay>
          <Loader />
        </LoadingOverlay>
      )}
      <SearchFormControl first>
        <TextField
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="search by City"
          variant="outlined"
          InputProps={{
            style: { borderRadius: '30px 0 0 30px', paddingLeft: '8px' },
          }}
        />
      </SearchFormControl>

      <SearchFormControl variant="outlined">
        <Select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Property Type</em>
          </MenuItem>
          {propertyTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </SearchFormControl>

      <SearchFormControl>
        <Select
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          displayEmpty
        >
          <MenuItem value="rent">Rent</MenuItem>
          <MenuItem value="buy">Buy</MenuItem>
        </Select>
      </SearchFormControl>

      <SearchButton variant="contained" color="primary" onClick={handleSearch}>
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
}

export default PropertySearch;
