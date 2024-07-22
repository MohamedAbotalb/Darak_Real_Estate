// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   fetchPropertyUpdates,
//   fetchNewProperty,
// } from 'store/propertyupdateSlice';
// import Loader from 'components/Loader';
// import {
//   Box,
//   Typography,
//   Divider,
//   Grid,
//   Card,
//   CardContent,
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PriceCheckIcon from '@mui/icons-material/PriceCheck';
// import BedIcon from '@mui/icons-material/Bed';
// import BathtubIcon from '@mui/icons-material/Bathtub';
// import SquareFootIcon from '@mui/icons-material/SquareFoot';
// import ImageSliderModal from 'components/PropertyDetails/ImageSliderModal'; // Import ImageSliderModal

// function NewPropertyDetails() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [modalImage, setModalImage] = useState(null);
//   const updates = useSelector((state) => state.propertyUpdates.updates);
//   const newProperty = useSelector(
//     (state) =>
//       state.propertyUpdates.updates.find((update) => update.id === Number(id))
//         ?.newProperty || {}
//   );

//   useEffect(() => {
//     const fetchUpdates = async () => {
//       try {
//         await dispatch(fetchPropertyUpdates());
//       } catch (error) {
//         console.error('Error fetching property updates:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUpdates();
//   }, [dispatch]);

//   useEffect(() => {
//     if (updates.length > 0) {
//       const propertyUpdate = updates.find((update) => update.id === Number(id));
//       if (propertyUpdate) {
//         console.log(propertyUpdate)
//         console.log(propertyUpdate.property_id
// )
//         dispatch(fetchNewProperty(propertyUpdate.property_id
// ));
//       }
//     }
//   }, [dispatch, updates, property_id
// ]);

//   const handleOpenModal = (image) => {
//     setModalImage(image);
//   };

//   const handleCloseModal = () => {
//     setModalImage(null);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Box sx={{ my: 8 }}>
//       {/* Image Slider Modal */}
//       <ImageSliderModal
//         images={newProperty?.images || []}
//         open={modalImage !== null}
//         onClose={handleCloseModal}
//         initialImage={modalImage}
//       />

//       <Card>
//         <CardContent>
//           {/* Images Section */}
//           {newProperty && newProperty.images?.length > 0 && (
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6">New Details</Typography>
//               <Divider sx={{ mb: 2 }} />
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//                 {newProperty.images.map((image) => (
//                   <Box
//                     key={image.id}
//                     sx={{
//                       width: { xs: '100%', sm: '48%', md: '30%' },
//                       borderRadius: 1,
//                       overflow: 'hidden',
//                       boxShadow: 1,
//                       cursor: 'pointer',
//                       '&:hover': {
//                         boxShadow: 6,
//                       },
//                     }}
//                     onClick={() => handleOpenModal(image.image)}
//                   >
//                     <img
//                       src={image.image}
//                       alt={`Property ${image.id}`}
//                       style={{
//                         width: '100%',
//                         height: 'auto',
//                         objectFit: 'cover',
//                         borderRadius: '4px',
//                       }}
//                     />
//                   </Box>
//                 ))}
//               </Box>
//             </Box>
//           )}

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={8}>
//               {newProperty ? (
//                 <Box>
//                   <Typography variant="h5" gutterBottom>
//                     {newProperty.title}
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     {newProperty.description}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 2 }}>
//                     <PriceCheckIcon sx={{ mr: 1 }} />
//                     {newProperty.price?.toLocaleString()}{' '}
//                     {newProperty.listing_type === 'buy' ? 'EGP' : 'EGP/month'}
//                   </Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body1">
//                         <BedIcon sx={{ mr: 1 }} />
//                         {newProperty.num_of_rooms} Bedrooms
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body1">
//                         <BathtubIcon sx={{ mr: 1 }} />
//                         {newProperty.num_of_bathrooms} Bathrooms
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body1">
//                         <SquareFootIcon sx={{ mr: 1 }} />
//                         {newProperty.area} sqft
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Typography variant="body1" sx={{ mt: 2 }}>
//                     <HomeIcon sx={{ mr: 1 }} />
//                     {newProperty.listing_type}
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Typography>No data available</Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} md={4}>
//               {/* Additional info or actions can go here */}
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default NewPropertyDetails;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPropertyUpdates,
  fetchNewProperty,
} from 'store/propertyupdateSlice';
import Loader from 'components/Loader';
import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ImageSliderModal from 'components/PropertyDetails/ImageSliderModal'; // Import ImageSliderModal

function NewPropertyDetails() {
  const dispatch = useDispatch();
  const { id } = useParams(); // URL id
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const updates = useSelector((state) => state.propertyUpdates.updates);
  const newProperty = useSelector(
    (state) =>
      state.propertyUpdates.updates.find((update) => update.id === Number(id))
        ?.newProperty || {}
  );

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        await dispatch(fetchPropertyUpdates());
      } catch (error) {
        console.error('Error fetching property updates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, [dispatch]);

  useEffect(() => {
    if (updates.length > 0) {
      const propertyUpdate = updates.find((update) => update.id === Number(id));
      if (propertyUpdate && propertyUpdate.property_id) {
        dispatch(fetchNewProperty(propertyUpdate.property_id));
      }
    }
  }, [dispatch, updates, id]);

  const handleOpenModal = (image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ my: 8 }}>
      {/* Image Slider Modal */}
      <ImageSliderModal
        images={newProperty?.images || []}
        open={modalImage !== null}
        onClose={handleCloseModal}
        initialImage={modalImage}
      />

      <Card>
        <CardContent>
          {/* Images Section */}
          {newProperty && newProperty.images?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">New Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {newProperty.images.map((image) => (
                  <Box
                    key={image.id}
                    sx={{
                      width: { xs: '100%', sm: '48%', md: '30%' },
                      borderRadius: 1,
                      overflow: 'hidden',
                      boxShadow: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => handleOpenModal(image.image)}
                  >
                    <img
                      src={image.image}
                      alt={`Property ${image.id}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {newProperty ? (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {newProperty.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {newProperty.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <PriceCheckIcon sx={{ mr: 1 }} />
                    {newProperty.price?.toLocaleString()}{' '}
                    {newProperty.listing_type === 'buy' ? 'EGP' : 'EGP/month'}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <BedIcon sx={{ mr: 1 }} />
                        {newProperty.num_of_rooms} Bedrooms
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <BathtubIcon sx={{ mr: 1 }} />
                        {newProperty.num_of_bathrooms} Bathrooms
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <SquareFootIcon sx={{ mr: 1 }} />
                        {newProperty.area} sqft
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <HomeIcon sx={{ mr: 1 }} />
                    {newProperty.listing_type}
                  </Typography>
                </Box>
              ) : (
                <Typography>No data available</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Additional info or actions can go here */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NewPropertyDetails;
