import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ShowDetailsModal from 'components/AdminDashboard/PropertyType/showDetailsModal';

function ShowDetailsButton({ typeSlug }) {
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
      <ShowDetailsModal
        isOpen={isOpen}
        handleClose={handleClose}
        typeSlug={typeSlug}
      />
    </>
  );
}

ShowDetailsButton.propTypes = {
  typeSlug: PropTypes.string.isRequired,
};

export default ShowDetailsButton;
