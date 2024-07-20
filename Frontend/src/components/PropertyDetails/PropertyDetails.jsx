import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';
import { fetchProperty } from 'store/propertyDetailsSlice';
import { fetchReviews } from 'store/userReviews/userReviewsSlice';
import AddToWishlistButton from 'components/Home/AddToWishlistButton';
import TourRequestForm from 'components/TourRequestForm';
import amenityIcons from 'utils/amenityIcons';
import Loader from 'components/Loader';
import ReportModal from 'components/ReportModal';
import ReviewSection from 'components/userReviews/ReviewSection';
import ImageSliderModal from 'components/PropertyDetails/ImageSliderModal';

function PropertyDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { property, status } = useSelector((state) => state.property);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const getAmenityIcon = (amenityName) => {
    const amenity = amenityIcons.find((a) => a.name === amenityName);
    return amenity ? amenity.icon : null;
  };

  const baseImgUrl = 'http://127.0.0.1:8000/';

  useEffect(() => {
    if (slug) {
      dispatch(fetchProperty(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (property.id) {
      dispatch(fetchReviews(property.id));
    }
  }, [dispatch, property.id]);

  const handleRequestTourClick = () => {
    setIsTourFormOpen(true);
  };

  const handleTourFormClose = () => {
    setIsTourFormOpen(false);
  };

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleReportModalClose = () => {
    setIsReportModalOpen(false);
  };

  const handleImageSliderOpen = () => {
    setIsImageSliderOpen(true);
  };

  const handleImageSliderClose = () => {
    setIsImageSliderOpen(false);
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed' || !property)
    return (
      <Box
        justifyContent="center"
        height="100vh"
        display="flex"
        alignItems="center"
      >
        <Typography variant="h5">{t('No property found')}</Typography>
      </Box>
    );

  return (
    <Container
      sx={{ my: 4, ...(user?.role === 'admin' ? { marginTop: '100px' } : {}) }}
    >
      {' '}
      <Card sx={{ width: '100%' }}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              {property.images && property.images[0] && (
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={baseImgUrl + property.images[0].image}
                    alt="Property"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                    }}
                    onClick={handleImageSliderOpen}
                  >
                    {t('Show All Images')}
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {property.images && property.images[1] && (
                <Box
                  sx={{
                    height: '300px',
                    overflow: 'hidden',
                    mb: 1,
                  }}
                >
                  <img
                    src={baseImgUrl + property.images[1].image}
                    alt="Property"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
              {property.images && property.images[2] && (
                <Box
                  sx={{
                    height: '300px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={baseImgUrl + property.images[2].image}
                    alt="Property"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          <ImageSliderModal
            isOpen={isImageSliderOpen}
            onClose={handleImageSliderClose}
            images={property.images}
          />
          <CardContent>
            {/* Details Section */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {/* Price and details */}
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{ mb: 2 }}
                    >
                      <Grid item display="flex" alignItems="center">
                        <PriceCheckIcon color="error" />
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ ml: 1 }}
                        >
                          {property.price
                            ? property.price.toLocaleString()
                            : t('Price not available')}{' '}
                          {property.listing_type === 'buy'
                            ? t('EGP')
                            : t('EGP/month')}
                        </Typography>
                      </Grid>
                      <Grid item display="flex" alignItems="center">
                        <BedIcon color="error" />
                        <Typography variant="body1" sx={{ ml: 1, mr: 1 }}>
                          {property.num_of_rooms} {t('Bedrooms')}
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          |
                        </Typography>
                        <BathtubIcon color="error" />
                        <Typography variant="body1" sx={{ ml: 1, mr: 1 }}>
                          {property.num_of_bathrooms} {t('Bathrooms')}
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          |
                        </Typography>
                        <SquareFootIcon color="error" />
                        <Typography variant="body1" sx={{ ml: 1 }}>
                          {property.area} {t('sqm')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />

                    {/* Property title */}
                    <Typography variant="h5" gutterBottom>
                      {property.title}
                    </Typography>

                    {/* Property type */}
                    {property.property_type && (
                      <Box display="flex" alignItems="center" sx={{ my: 2 }}>
                        <HomeWorkIcon color="error" sx={{ mr: 2 }} />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontSize: 16 }}
                        >
                          {t('Property Type')}:
                          <span style={{ fontWeight: 'bold' }}>
                            {property.property_type.name}
                          </span>
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 3 }} />

                    {/* Location details */}
                    {property.location && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          {t('Location')}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                          <LocationOnIcon color="error" sx={{ mr: 2 }} />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 'lighter' }}
                          >
                            {property.location.street}, {property.location.city}
                            , {property.location.state}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />
                      </>
                    )}

                    {/* Description */}
                    <Typography variant="h6" gutterBottom>
                      {t('Description')}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, width: '60%' }}>
                      {property.description}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Amenities */}
                    {property.amenities && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          {t('Amenities')}
                        </Typography>
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          justifyContent="space-between"
                          sx={{ mb: 4, width: '50%' }}
                        >
                          {property.amenities.map((amenity) => {
                            const Icon = getAmenityIcon(amenity.name);
                            return (
                              Icon && (
                                <Box
                                  key={amenity.id}
                                  display="flex"
                                  alignItems="center"
                                  sx={{ mr: 2, mb: 2 }}
                                >
                                  <Icon color="#ed2128" sx={{ mr: 1 }} />
                                  <Typography>{amenity.name}</Typography>
                                </Box>
                              )
                            );
                          })}
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Report and Tour Request Buttons */}
              <Grid item xs={12} md={4}>
                {property.user && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6" align="center" gutterBottom>
                        {t('Managing Landlord')}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Avatar
                          alt={property.user.first_name}
                          src={property.user.avatar}
                          sx={{ width: 100, height: 100, my: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                          {property.user.first_name} {property.user.last_name}
                        </Typography>
                        <Box
                          display="flex"
                          justifyContent="center"
                          sx={{ mt: 2 }}
                        >
                          <IconButton
                            href={`tel:${property.user.phone_number}`}
                            aria-label="phone"
                            color="primary"
                          >
                            <PhoneIcon />
                          </IconButton>
                          <IconButton
                            href={`mailto:${property.user.email}`}
                            aria-label="email"
                            color="primary"
                          >
                            <EmailIcon />
                          </IconButton>
                          <IconButton
                            href={`https://wa.me/${property.user.phone_number}`}
                            aria-label="whatsapp"
                            color="primary"
                          >
                            <WhatsAppIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}
                <Box
                  display="flex"
                  justifyContent="space-around"
                  sx={{ mt: 3 }}
                >
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleRequestTourClick}
                      disabled={
                        user?.role === 'landlord' &&
                        property.user?.id === user?.id
                      }
                    >
                      {t('Request a tour')}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleReportClick}
                      disabled={
                        user?.role === 'landlord' &&
                        property.user?.id === user?.id
                      }
                    >
                      {t('Report Listing')}
                    </Button>
                    {user && <AddToWishlistButton property={property} />}
                  </>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
      {/* Tour Request Form */}
      {property.id && (
        <TourRequestForm
          isOpen={isTourFormOpen}
          onClose={handleTourFormClose}
          propertyId={property.id}
          slug={property.slug}
        />
      )}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={handleReportModalClose}
        propertyId={property.id}
        userData={property.user}
      />
      {/* review */}
      {property?.listing_type === 'rent' && (
        <ReviewSection
          propertyId={property.id}
          propertyTitle={property.title}
        />
      )}
    </Container>
  );
}

PropertyDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PropertyDetails;
