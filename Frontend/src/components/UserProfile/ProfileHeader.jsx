import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function ProfileHeader({ avatar, user, onEditAvatar }) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, textAlign: 'center', position: 'relative' }}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          sx={{ width: 100, height: 100, mx: 'auto', mb: 3 }}
          src={avatar}
        />
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'white',
            border: '2px solid white',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'white',
            },
          }}
          onClick={onEditAvatar}
        >
          <EditIcon />
        </IconButton>
      </div>
      <Typography variant="h6" component="div">
        {`${user?.first_name} ${user?.last_name}`}
      </Typography>
      <Typography variant="body1" component="div">
        {user?.phone_number}
      </Typography>
      <Typography variant="body1" component="div">
        {user?.email}
      </Typography>
    </Paper>
  );
}

ProfileHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    avatar: PropTypes.string,
    phone_number: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onEditAvatar: PropTypes.func.isRequired,
};

export default ProfileHeader;
