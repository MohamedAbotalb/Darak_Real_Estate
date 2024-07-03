import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserNotificationsAsync,
  deleteNotificationAsync,
} from 'store/Notifications/notificationsSlice';
import { CircularProgress, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { green, red, orange, grey } from '@mui/material/colors';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

function UserNotifications() {
  const dispatch = useDispatch();
  const notificationsState = useSelector((state) => state.notifications);
  const { notifications, status, error } = notificationsState; // Destructuring here

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [hoveredNotification, setHoveredNotification] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUserNotificationsAsync());
  }, [dispatch]);

  const handleDeleteNotification = (id) => {
    dispatch(deleteNotificationAsync(id));
    setDeleteConfirmationOpen(false);
    toast.success('Notification removed successfully', {
      position: 'top-right',
    });
  };

  const openDeleteConfirmation = (notification) => {
    setNotificationToDelete(notification);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setNotificationToDelete(null);
  };

  const getTimeDisplay = (createdAt) => {
    const now = moment();
    const notificationTime = moment(createdAt);
    const diffInHours = now.diff(notificationTime, 'hours');

    if (diffInHours < 3) {
      return notificationTime.fromNow();
    }
    return notificationTime.format('MMMM DD, YYYY hh:mm A');
  };

  const getBorderColor = (notificationStatus) => {
    switch (notificationStatus) {
      case 'approved':
        return green[500];
      case 'declined':
        return red[500];
      default:
        return orange[500];
    }
  };
  const handleMouseEnter = (e, color) => {
    e.currentTarget.style.color = color;
  };

  const handleMouseLeave = (e, color) => {
    e.currentTarget.style.color = color;
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredNotifications =
    filter === 'all'
      ? sortedNotifications
      : sortedNotifications.filter(
          (notification) => notification.tour.status === filter
        );
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageCount = Math.ceil(filteredNotifications.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        Error: {error}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 3,
        marginLeft: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Divider />
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="declined">Declined</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {currentNotifications.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          height="100vh"
          sx={{ marginTop: 4 }}
        >
          No notifications found.
        </Typography>
      ) : (
        currentNotifications.map((notification) => (
          <Box
            key={notification.id}
            sx={{
              marginBottom: 2,
              transition: 'transform 0.3s ease',
              transform:
                hoveredNotification === notification.id
                  ? 'scale(1.03)'
                  : 'scale(1)',
            }}
            onMouseEnter={() => setHoveredNotification(notification.id)}
            onMouseLeave={() => setHoveredNotification(null)}
          >
            <Paper
              sx={{
                padding: 2,
                borderRadius: 4,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                borderLeft: `5px solid ${getBorderColor(notification?.tour?.status)}`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Avatar
                alt={notification.landlord.first_name}
                src={notification.landlord.avatar}
              />
              <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                <Typography variant="subtitle1">
                  {`${notification.landlord.first_name} ${notification.landlord.last_name}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {getTimeDisplay(notification.created_at)}
                </Typography>
                <Typography variant="body1">{notification.message}</Typography>
              </Box>
              <IconButton
                aria-label="delete notification"
                onClick={() => openDeleteConfirmation(notification)}
                onMouseEnter={(e) => handleMouseEnter(e, red[500])}
                onMouseLeave={(e) => handleMouseLeave(e, grey[500])}
                sx={{ position: 'absolute', top: 5, right: 5 }}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          </Box>
        ))
      )}
      <Box sx={{ marginTop: 2, alignSelf: 'center' }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-notification-modal-title"
        aria-describedby="delete-notification-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="delete-notification-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Confirm Delete
          </Typography>
          <Typography
            id="delete-notification-modal-description"
            variant="body1"
            sx={{ marginBottom: 2 }}
          >
            Are you sure you want to delete this notification?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={closeDeleteConfirmation} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteNotification(notificationToDelete?.id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default UserNotifications;
