import React, { useState } from 'react';
import { Button } from '@mui/material';
import ShowDetailsModal from './showDetailsModal';

function ShowDetailsButton({ typeSlug }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        open={open}
        handleClose={handleClose}
        typeSlug={typeSlug}
      />
    </>
  );
}

export default ShowDetailsButton;
