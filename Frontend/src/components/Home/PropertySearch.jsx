// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Box, IconButton, MenuItem, Select, FormControl } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled } from '@mui/system';
// import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
// import { fetchLocations } from 'store/home/locationsSlice';
// import { fetchProperties } from 'store/propertySearchSlice';
// import Loader from 'components/Loader';

// const SearchContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   gap: theme.spacing(2),
//   flexWrap: 'wrap',
//   maxWidth: '800px',
//   margin: '0 auto',
// }));

// const SearchFormControl = styled(FormControl)(({ theme }) => ({
//   minWidth: '200px',
//   marginRight: theme.spacing(1),
//   '& .MuiInputBase-root': {
//     backgroundColor: '#fff',
//     color: '#000',
//     height: '56px',
//   },
// }));

// const SearchButton = styled(IconButton)({
//   height: '56px',
//   width: '56px',
//   padding: '0 16px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#1976d2',
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: '#115293',
//   },
//   '@media (max-width: 600px)': {
//     width: '100%',
//   },
// });

// function PropertySearch() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
//   const locations = useSelector((state) => state.locations.data || []);
//   const locationsStatus = useSelector((state) => state.locations.status);
//   const propertyTypesStatus = useSelector(
//     (state) => state.propertyTypes.status
//   );

//   const [listingType, setListingType] = useState('rent');
//   const [propertyType, setPropertyType] = useState('');
//   const [city, setCity] = useState('');

//   const isLoading =
//     locationsStatus === 'loading' || propertyTypesStatus === 'loading';

//   useEffect(() => {
//     dispatch(fetchPropertyTypes());
//     dispatch(fetchLocations());
//   }, [dispatch]);

//   const handleSearch = () => {
//     // Navigate to properties search page with query parameters
//     let query = `lt=${listingType}`;
//     if (propertyType) query += `&pt=${propertyType}`;
//     if (city) query += `&c=${city}`;

//     navigate({
//       pathname: '/properties',
//       search: `?${query}`,
//     });

//     dispatch(fetchProperties({ propertyType, city, listingType }));
//   };

//   return (
//     <SearchContainer>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <SearchFormControl variant="outlined">
//             <Select
//               value={listingType}
//               onChange={(e) => setListingType(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="" disabled>
//                 <em>Rent, Buy</em>
//               </MenuItem>
//               <MenuItem value="rent">Rent</MenuItem>
//               <MenuItem value="buy">Buy</MenuItem>
//             </Select>
//           </SearchFormControl>

//           <SearchFormControl variant="outlined">
//             <Select
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="" disabled>
//                 <em>Location</em>
//               </MenuItem>
//               {locations.map((location) => (
//                 <MenuItem key={location.id} value={location.city}>
//                   {location.city}
//                 </MenuItem>
//               ))}
//             </Select>
//           </SearchFormControl>

//           <SearchFormControl>
//             <Select
//               value={propertyType}
//               onChange={(e) => setPropertyType(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="" disabled>
//                 <em>Property Type</em>
//               </MenuItem>
//               {propertyTypes.map((type) => (
//                 <MenuItem key={type.id} value={type.id}>
//                   {type.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </SearchFormControl>

//           <SearchButton
//             variant="contained"
//             color="primary"
//             onClick={handleSearch}
//           >
//             <SearchIcon />
//           </SearchButton>
//         </>
//       )}
//     </SearchContainer>
//   );
// }

// export default PropertySearch;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Box, IconButton, MenuItem, Select, FormControl, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled } from '@mui/system';
// import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
// import { fetchLocations } from 'store/home/locationsSlice';
// import { fetchProperties } from 'store/propertySearchSlice';
// import Loader from 'components/Loader';

// const SearchContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   gap: '0px', // Ensure there is no gap between elements
//   flexWrap: 'wrap',
//   backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent background
//   padding: '20px', // Add some padding
//   borderRadius: '30px', // Rounded corners
//   maxWidth: '1000px',
//   margin: '300px auto 0 auto',
// }));

// const SearchFormControl = styled(FormControl)(({ theme, first }) => ({
//   minWidth: first? '350px' : '150px',
//   marginRight: '0px', // Ensure there is no margin right
//   '& .MuiInputBase-root': {
//     backgroundColor: '#fff',
//     color: '#000',
//     height: '56px',
//     borderRadius: '0', // Reset border radius
//     borderTopLeftRadius: first ? '30px' : '0px', // Apply border radius to the first button
//     borderBottomLeftRadius: first ? '30px' : '0px', // Apply border radius to the first button
//   },
// }));

// const SearchButton = styled(IconButton)({
//   height: '56px',
//   width:'100px',
//   padding: '0 16px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#EE2027',
//   color: '#fff',
//   borderRadius: '0 30px 30px 0', // Rounded corners for the search button
//   '&:hover': {
//     backgroundColor: '#f03137',
//   },
// });

// function PropertySearch() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
//   const locations = useSelector((state) => state.locations.data || []);
//   const locationsStatus = useSelector((state) => state.locations.status);
//   const propertyTypesStatus = useSelector(
//     (state) => state.propertyTypes.status
//   );

//   const [listingType, setListingType] = useState('rent');
//   const [propertyType, setPropertyType] = useState('');
//   const [city, setCity] = useState('');

//   const isLoading =
//     locationsStatus === 'loading' || propertyTypesStatus === 'loading';

//   useEffect(() => {
//     dispatch(fetchPropertyTypes());
//     dispatch(fetchLocations());
//   }, [dispatch]);

//   const handleSearch = () => {
//     // Navigate to properties search page with query parameters
//     let query = `lt=${listingType}`;
//     if (propertyType) query += `&pt=${propertyType}`;
//     if (city) query += `&c=${city}`;

//     navigate({
//       pathname: '/properties',
//       search: `?${query}`,
//     });

//     dispatch(fetchProperties({ propertyType, city, listingType }));
//   };

//   return (
//     <SearchContainer>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <SearchFormControl first>
//             <TextField
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               placeholder="search by City"
//               variant="outlined"
//               InputProps={{
//                 style: { borderRadius: '30px 0 0 30px', paddingLeft:'8px' }
//               }}
//             />
//           </SearchFormControl>

//           <SearchFormControl variant="outlined">
//             <Select
//               value={propertyType}
//               onChange={(e) => setPropertyType(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="">
//                 <em>Property Type</em>
//               </MenuItem>
//               {propertyTypes.map((type) => (
//                 <MenuItem key={type.id} value={type.id}>
//                   {type.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </SearchFormControl>

//           <SearchFormControl>
//             <Select
//               value={listingType}
//               onChange={(e) => setListingType(e.target.value)}
//               displayEmpty
//             >
//                {/* <MenuItem value="" disabled>
//                 <em>Rent, Buy</em>
//                </MenuItem> */}
               
//               <MenuItem value="rent">Rent</MenuItem>
//               <MenuItem value="buy">Buy</MenuItem>
//             </Select>
//           </SearchFormControl>

//           <SearchButton
//             variant="contained"
//             color="primary"
//             onClick={handleSearch}
//           >
//             <SearchIcon />
//           </SearchButton>
//         </>
//       )}
//     </SearchContainer>
//   );
// }

// export default PropertySearch;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, MenuItem, Select, FormControl, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/propertySearchSlice';
import Loader from 'components/Loader';

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
}));

const SearchButton = styled(IconButton)({
  height: '56px',
  width: '100px',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#EE2027',
  color: '#fff',
  borderRadius: '0 30px 30px 0',
  '&:hover': {
    backgroundColor: '#f03137',
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
  // backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 1,
});

function PropertySearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
  const locations = useSelector((state) => state.locations.data || []);
  const locationsStatus = useSelector((state) => state.locations.status);
  const propertyTypesStatus = useSelector((state) => state.propertyTypes.status);

  const [listingType, setListingType] = useState('rent');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');

  const isLoading = locationsStatus === 'loading' || propertyTypesStatus === 'loading';

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
