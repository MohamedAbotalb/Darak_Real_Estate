// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { Grid, Typography, Alert, Box, ButtonBase } from '@mui/material';
// import { fetchProperties } from 'store/home/propertiesSlice';
// import { fetchWishlist } from 'store/home/wishlistSlice';
// import PropertyCard from 'components/Home/PropertyCard';
// import Loader from 'components/Loader';
// import { styled } from '@mui/system';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// function PropertyListings({ type }) {
//   const dispatch = useDispatch();
//   const properties = useSelector((state) => state.properties[type] || []);
//   const propertiesStatus = useSelector((state) => state.properties.status);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   useEffect(() => {
//     // if (category !== null) {
//       dispatch(fetchProperties({ type}));
//     // } else {
//       // dispatch(fetchProperties({ type, category: 'all' }));
//     }, [dispatch, type]);
//     const StyledButton = styled(ButtonBase)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(0.5),
//   margin: theme.spacing(1),
//   transition: 'background-color 0.3s, color 0.3s',
//   width: 'auto',
//   height: 'auto',
//   textAlign: 'center',
// }));
// const StyledSlider = styled(Slider)({
//   width: '100%',
//    '.slick-slide': {
//     display: 'flex',
//     justifyContent: 'center',
//   },
// });
//      const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,};

//   if (propertiesStatus === 'loading') {
//     return (
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{ minHeight: '100vh' }}
//       >
//         <Loader />
//       </Grid>
//     );
//   }

//   if (propertiesStatus === 'failed') {
//     return (
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{ minHeight: '100vh' }}
//       >
//         <Alert severity="error">Error loading properties</Alert>
//       </Grid>
//     );
//   }

//   return (
//     <Box mx={{ xs: 2, sm: 4 }} px={{ xs: 2, sm: 4 }} py={4}>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ color: '#2b3d4f' }}
//       >
//         Latest Properties For {type.charAt(0).toUpperCase() + type.slice(1)}
//       </Typography>
//       <Box display="flex" justifyContent="center" mb={3}>
//         {/* <CategoryFilter
//           categories={categories}
//           setCategory={setCategory}
//           initialCategory={category}
//         /> */}
//       </Box>
//       {propertiesStatus === 'failed' ? (
//         <Typography variant="body1" align="center">
//           No properties found for the selected category.
//         </Typography>
//       ) : (
//         // <Grid container spacing={2} justifyContent="center">
//           <StyledSlider {...settings}>
//           {properties.map((property) => (
//             <Grid item xs={12} sm={6} md={4} key={property.id}>
//               <StyledButton>
//               <Box display="flex" justifyContent="center">
//                 <PropertyCard property={property} />
//               </Box>
// </StyledButton>
//             </Grid>
//           ))}
//           </StyledSlider>
//         // </Grid>
//       )}
//     </Box>
//   );
// }

// PropertyListings.propTypes = {
//   type: PropTypes.oneOf(['rent', 'sell']).isRequired,
// };

// export default PropertyListings;
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { Grid, Typography, Alert, Box } from '@mui/material';
// import Slider from 'react-slick';
// import { fetchProperties } from 'store/home/propertiesSlice';
// import { fetchWishlist } from 'store/home/wishlistSlice';
// import PropertyCard from 'components/Home/PropertyCard';
// import Loader from 'components/Loader';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// function PropertyListings({ type }) {
//   const dispatch = useDispatch();
//   const properties = useSelector((state) => state.properties[type] || []);
//   const propertiesStatus = useSelector((state) => state.properties.status);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchProperties({ type }));
//   }, [dispatch, type]);

//   if (propertiesStatus === 'loading') {
//     return (
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{ minHeight: '100vh' }}
//       >
//         <Loader />
//       </Grid>
//     );
//   }

//   if (propertiesStatus === 'failed') {
//     return (
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{ minHeight: '100vh' }}
//       >
//         <Alert severity="error">Error loading properties</Alert>
//       </Grid>
//     );
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Box mx={{ xs: 2, sm: 4 }} px={{ xs: 2, sm: 4 }} py={4}>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ color: '#2b3d4f' }}
//       >
//         Latest Properties For {type.charAt(0).toUpperCase() + type.slice(1)}
//       </Typography>
//       <Box display="flex" justifyContent="center" mb={3}></Box>
//       {propertiesStatus === 'failed' ? (
//         <Typography variant="body1" align="center">
//           No properties found for the selected category.
//         </Typography>
//       ) : (
//         <Slider {...settings}>
//           {properties.map((property) => (
//             <Box key={property.id} px={2} py={1}>
//               <PropertyCard property={property} />
//             </Box>
//           ))}
//         </Slider>
//       )}
//     </Box>
//   );
// }

// PropertyListings.propTypes = {
//   type: PropTypes.oneOf(['rent', 'sell']).isRequired,
// };

// export default PropertyListings;
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Alert, Box } from '@mui/material';
import Slider from 'react-slick';
import { fetchProperties } from 'store/home/propertiesSlice';
import { fetchWishlist } from 'store/home/wishlistSlice';
import PropertyCard from 'components/Home/PropertyCard';
import Loader from 'components/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/system';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '.slick-slide': {
    padding: '0 15px', // Adjust the padding to add space between the cards
    boxSizing: 'border-box',
    height:'500px'
  },
  '.slick-list': {
    margin: '0 -15px', // Adjust the margin to compensate for the padding
  },
  '.slick-prev, .slick-next': {
    zIndex: 1,
    width: '50px', // Increase width to give some space
    height: '50px', // Increase height to give some space
  },
  '.slick-prev:before, .slick-next:before': {
    fontSize: '30px', // Adjust the arrow size
    color: '#2b3d4f', // Adjust the arrow color
  },
  '.slick-prev': {
    left: '-60px', // Adjust position of the left arrow
  },
  '.slick-next': {
    right: '-60px', // Adjust position of the right arrow
  },
}));

function PropertyListings({ type }) {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties[type] || []);
  const propertiesStatus = useSelector((state) => state.properties.status);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProperties({ type }));
  }, [dispatch, type]);

  if (propertiesStatus === 'loading') {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Loader />
      </Grid>
    );
  }

  if (propertiesStatus === 'failed') {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Alert severity="error">Error loading properties</Alert>
      </Grid>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Box mx={{ xs: 2, sm: 4 }} px={{ xs: 2, sm: 4 }} py={4}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#2b3d4f', mb:'0'}}
      >
        Latest Properties For {type.charAt(0).toUpperCase() + type.slice(1)}
      </Typography>
      {propertiesStatus === 'failed' ? (
        <Typography variant="body1" align="center">
          No properties found for the selected category.
        </Typography>
      ) : (
        <StyledSlider {...settings}>
          {properties.map((property) => (
            <Box key={property.id} px={1} py={1}>
              <PropertyCard property={property} />
            </Box>
          ))}
        </StyledSlider>
      )}
    </Box>
  );
}

PropertyListings.propTypes = {
  type: PropTypes.oneOf(['rent', 'sell']).isRequired,
};

export default PropertyListings;
