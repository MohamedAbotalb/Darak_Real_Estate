import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ReportIcon from '@mui/icons-material/Report';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
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
    title: 'Properties',
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
    icon: <AssessmentIcon sx={iconStyles} />,
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
  const counts = useSelector((state) => state.overview.counts);
  const status = useSelector((state) => state.overview.status);
  const error = useSelector((state) => state.overview.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCounts());
    }
  }, [status, dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Alert severity="error">{error}</Alert>}
      {status === 'succeeded' && (
        <Grid container spacing={3}>
          {cardsData.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.key}>
              <Card sx={cardStyles}>
                {card.icon}
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: 18 }}>
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
    </Container>
  );
}

export default OverView;
