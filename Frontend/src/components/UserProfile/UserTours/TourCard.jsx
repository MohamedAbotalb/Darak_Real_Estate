import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { green, red, orange } from '@mui/material/colors';
import { cancelTour } from 'store/tourSlice';

const getBorderColor = (status) => {
  switch (status) {
    case 'approved':
      return green[500];
    case 'declined':
      return red[500];
    default:
      return orange[500];
  }
};

function TourCard({ tour }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(cancelTour(tour.id));
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderLeft: `5px solid ${getBorderColor(tour.status)}`,
        maxWidth: '100%',
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6">{tour.property.title}</Typography>
        <Typography>
          {tour.dates.map((date) => `${date.date}`).join(', ')}
        </Typography>
        {tour.status === 'pending' && (
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
            sx={{ mt: 1 }}
          >
            Cancel Tour
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

TourCard.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    dates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        approved: PropTypes.bool.isRequired,
      })
    ).isRequired,
    property: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TourCard;
