import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, Typography, Grid, Alert } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ReportIcon from '@mui/icons-material/Report';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Loader from 'components/Loader';
import { fetchCounts } from 'store/overviewSlice';

const cardStyles = {
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 0,
  position: 'relative',
  backgroundColor: '#f5f5f5',
};

const iconStyles = {
  fontSize: '3rem',
  position: 'absolute',
  top: 15,
  right: 15,
  color: '#6e6e6e',
};

const cardsData = [
  {
    key: 'users',
    title: 'Users',
    countKey: 'users',
    icon: <PeopleIcon sx={iconStyles} />,
  },
  {
    key: 'properties',
    title: 'Ads',
    countKey: 'properties',
    icon: <HomeIcon sx={iconStyles} />,
  },
  {
    key: 'property_types',
    title: 'Property Types',
    countKey: 'property_types',
    icon: <CategoryIcon sx={iconStyles} />,
  },
  {
    key: 'user_reports',
    title: 'User Reports',
    countKey: 'user_reports',
    icon: <ReportIcon sx={iconStyles} />,
  },
  {
    key: 'property_reports',
    title: 'Property Reports',
    countKey: 'property_reports',
    icon: <ReportIcon sx={iconStyles} />,
  },
  {
    key: 'amenities',
    title: 'Amenities',
    countKey: 'amenities',
    icon: <LocalOfferIcon sx={iconStyles} />,
  },
];

function OverView() {
  const dispatch = useDispatch();
  const { counts, status, error } = useSelector((state) => state.overview);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCounts());
    }
  }, [status, dispatch]);

  const memoizedCardsData = useMemo(() => cardsData, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          px: 2,
          py: 2,
          backgroundColor: '#d8d8d8',
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginTop: '66px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnIcon sx={{ mr: 1, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            Overview
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4, width: '100%' }}>
        {status === 'loading' && <Loader />}
        {status === 'failed' && <Alert severity="error">{error}</Alert>}
        {status === 'succeeded' && (
          <Grid container spacing={3}>
            {memoizedCardsData.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.key}>
                <Card sx={cardStyles}>
                  {card.icon}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: 24 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontSize: 32 }}>
                      {counts[card.countKey]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default OverView;
