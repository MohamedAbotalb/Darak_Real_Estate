import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-material-ui-carousel';

function ImageSliderModal({ isOpen, onClose, images }) {
  const baseImgUrl = 'http://127.0.0.1:8000/';

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
        {images && images.length > 0 ? (
          <Carousel
            navButtonsAlwaysVisible
            sx={{
              '& .carousel': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              },
            }}
          >
            {images.map((image, index) => (
              <Box
                key={image.id}
                component="img"
                src={baseImgUrl + image.image}
                alt={`Property detail ${index + 1}`}
                sx={{
                  height: '700px',
                  width: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            ))}
          </Carousel>
        ) : (
          <Typography variant="h6" align="center">
            No images available
          </Typography>
        )}
      </Box>
    </Modal>
  );
}

ImageSliderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageSliderModal;
