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
      <Avatar
        sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
        src={avatar}
      />
      <Typography variant="h6" component="div">
        {`${user?.first_name} ${user?.last_name}`}
      </Typography>
      <IconButton
        sx={{ mt: 1, position: 'absolute', top: 16, right: 16 }}
        onClick={onEditAvatar}
      >
        <EditIcon />
      </IconButton>
    </Paper>
  );
}

ProfileHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    avatar: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  onEditAvatar: PropTypes.func.isRequired,
};

export default ProfileHeader;
