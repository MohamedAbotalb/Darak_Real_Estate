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

let dir;

const SearchContainer = styled(Box)(() => ({
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

const SearchFormControl = styled(FormControl)(({ first }) => ({
  minWidth: first ? '350px' : '150px',
  marginRight: '0px',
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    color: '#000',
    height: '56px',
    ...(dir === 'ltr'
      ? { borderRadius: first ? '30px 0 0 30px' : '' }
      : { borderRadius: first ? '0 30px 30px 0' : '' }),
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
  backgroundColor: 'var(--primary-color)',
  color: '#fff',
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
  const { t, i18n } = useTranslation();
  dir = i18n.dir(i18n.language);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
  const propertyTypesStatus = useSelector(
    (state) => state.propertyTypes.status
  );

  const [listingType, setListingType] = useState('rent');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  const isLoading = propertyTypesStatus === 'loading';

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    let query = `lt=${listingType}`;
    if (propertyType) query += `&pt=${propertyType}`;
    if (location) query += `&pl=${location}`;

    navigate({
      pathname: '/properties',
      search: `?${query}`,
    });

    dispatch(fetchProperties({ propertyType, location, listingType }));
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={t('State, City or Street')}
          variant="outlined"
        />
      </SearchFormControl>

      <SearchFormControl variant="outlined">
        <Select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>{t('Property Type')}</em>
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
          <MenuItem value="rent">{t('Rent')}</MenuItem>
          <MenuItem value="buy">{t('Buy')}</MenuItem>
        </Select>
      </SearchFormControl>

      <SearchButton
        sx={{
          ...(dir === 'ltr'
            ? { borderRadius: '0 30px 30px 0' }
            : { borderRadius: '30px 0 0 30px' }),
        }}
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
}

export default PropertySearch;
