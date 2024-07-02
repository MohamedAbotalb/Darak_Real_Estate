import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ShowAmenityDetailsModal from './ShowAmenityDetailsModal';

function ShowAmenityDetailsButton({ amenitySlug }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ backgroundColor: '#0288d1', color: '#fff', mr: 1 }}
      >
        Show
      </Button>
      <ShowAmenityDetailsModal
        isOpen={isOpen}
        handleClose={handleClose}
        amenitySlug={amenitySlug}
      />
    </>
  );
}

ShowAmenityDetailsButton.propTypes = {
  amenitySlug: PropTypes.string.isRequired,
};

export default ShowAmenityDetailsButton;
