import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  fetchReviews,
  deleteReviewAsync,
  updateReviewAsync,
} from 'store/userReviews/userReviewsSlice';
import { fetchAverageRatingAsync } from 'store/userReviews/averageRatingSlice';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
  TextField,
  Rating,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MoreVert, Save, Cancel } from '@mui/icons-material';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

function ReviewsList({ propertyId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.auth.user);
  const averageRating = useSelector((state) => state.averageRating.average);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [editedPropertyId, setEditedPropertyId] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedRating, setEditedRating] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuReviewId, setMenuReviewId] = useState(null);
  const [rateError, setRateError] = useState('');
  const [contentError, setContentError] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews(propertyId));
  }, [dispatch, propertyId]);

  const handleDelete = (reviewId) => {
    setAnchorEl(null);
    setMenuReviewId(null);

    setOpenDeleteDialog(true);
    setReviewToDelete(reviewId);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);
    dispatch(deleteReviewAsync(reviewToDelete)).then(() => {
      dispatch(fetchReviews(propertyId));
      toast.success(t('Review deleted successfully.'));
    });
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setReviewToDelete(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuReviewId(null);
  };

  const handleEditClick = (review) => {
    setEditingReview(review.id);
    setEditedContent(review.content);
    setEditedRating(review.rate || 0);
    setEditedPropertyId(propertyId);
    handleMenuClose();
  };

  const handleEditSubmit = () => {
    let valid = true;

    // Validate rate
    if (editedRating === 0) {
      toast.error(t('Please provide a rating.'));
      setRateError(t('Please provide a rating.'));
      valid = false;
    } else {
      setRateError('');
    }

    // Validate content
    if (editedContent !== null && editedContent.trim() !== '') {
      if (editedContent.trim().length < 4) {
        setContentError(t('Comment must be at least 4 characters long.'));
        valid = false;
      } else if (/^\d/.test(editedContent.trim())) {
        setContentError(t('Comment cannot start with a number.'));
        valid = false;
      } else {
        setContentError('');
      }
    }

    if (!valid) {
      return;
    }

    // Prepare the review data payload
    const reviewData = {
      rate: editedRating,
      property_id: editedPropertyId,
      content: editedContent !== null ? editedContent.trim() : null,
      updated_at: new Date().toISOString(), // Add updated_at field with current date
    };

    dispatch(
      updateReviewAsync({
        reviewId: editingReview,
        reviewData,
      })
    ).then(() => {
      dispatch(fetchReviews(propertyId));
      dispatch(fetchAverageRatingAsync(propertyId));
      setEditingReview(null);
      setEditedContent('');
      setEditedRating(0);
      setEditedPropertyId(null);
      toast.success(t('Review updated successfully.'));
    });
  };

  const handleEditCancel = () => {
    setEditingReview(null);
    setEditedContent('');
    setEditedRating(0);
  };

  const handleMenuClick = (event, reviewId) => {
    setAnchorEl(event.currentTarget);
    setMenuReviewId(reviewId);
  };

  const loadMore = () => {
    setVisibleReviews((prev) => prev + 4);
  };

  const formatCustomDate = (date) => {
    return format(date, 'd/M/yyyy');
  };

  const formatReviewDate = (createdAt, updatedAt, reviewId) => {
    if (editingReview === reviewId && updatedAt) {
      // Display updated at time if review is currently being edited and has an updated_at time
      const updateDate = new Date(updatedAt);
      return formatDistanceToNow(updateDate, { addSuffix: true });
    }

    const reviewDate = new Date(createdAt);
    const now = new Date();
    const differenceInHours = Math.abs(now - reviewDate) / 36e5;

    if (differenceInHours < 24) {
      return formatDistanceToNow(reviewDate, { addSuffix: true });
    }

    return formatCustomDate(reviewDate);
  };
  console.log(reviews, 'error');
  return (
    <Box>
      <List>
        {reviews?.length > 0 &&
          reviews
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, visibleReviews)
            .map((review) => (
              <Paper
                elevation={3}
                style={{
                  marginBottom: '16px',
                  padding: '16px',
                  borderRadius: '8px',
                }}
                key={review.id}
              >
                <ListItem alignItems="flex-start">
                  <Box display="flex" flexDirection="column" width="100%">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={review.user?.avatar}
                          alt={review.user?.first_name}
                          style={{ marginRight: '16px' }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            component="span"
                            fontWeight="bold"
                          >
                            {`${review.user?.first_name} ${review.user?.last_name}`}
                          </Typography>
                        </Box>
                      </Box>
                      {user?.id === review.user?.id && (
                        <>
                          <IconButton
                            onClick={(event) =>
                              handleMenuClick(event, review.id)
                            }
                          >
                            <MoreVert />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={
                              Boolean(anchorEl) && menuReviewId === review.id
                            }
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() => handleEditClick(review)}
                              color="primary"
                            >
                              {t('Edit')}
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleDelete(review.id)}
                              color="error"
                            >
                              {t('Delete')}
                            </MenuItem>
                          </Menu>
                        </>
                      )}
                    </Box>
                    <Box display="flex" alignItems="center" mt={1} ml={1}>
                      <Rating
                        name="rate"
                        value={
                          editingReview === review.id
                            ? editedRating
                            : review.rate
                        }
                        readOnly={editingReview !== review.id}
                        size="small"
                        onChange={(e, newValue) =>
                          setEditedRating(newValue || 0)
                        }
                      />

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginLeft: '4px', fontSize: '0.75rem' }}
                      >
                        {formatReviewDate(
                          review.created_at,
                          review.updated_at,
                          review.id
                        )}
                      </Typography>
                    </Box>

                    <Box marginTop={2}>
                      {editingReview === review.id ? (
                        <Box>
                          <TextField
                            value={editedContent}
                            onChange={(e) => {
                              setEditedContent(e.target.value);
                              setContentError(''); // Clear content error when user changes content
                            }}
                            variant="outlined"
                            fullWidth
                          />
                          {rateError && (
                            <Typography
                              variant="body2"
                              color="error"
                              style={{ marginTop: '4px' }}
                            >
                              {rateError}
                            </Typography>
                          )}
                          {contentError && (
                            <Typography
                              variant="body2"
                              color="error"
                              style={{ marginTop: '4px' }}
                            >
                              {contentError}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          {review.content}
                        </Typography>
                      )}
                    </Box>
                    {editingReview === review.id && (
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        marginTop={1}
                      >
                        <IconButton onClick={handleEditSubmit} color="primary">
                          <Save />
                        </IconButton>
                        <IconButton onClick={handleEditCancel} color="error">
                          <Cancel />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </ListItem>
              </Paper>
            ))}
      </List>
      {reviews && visibleReviews < reviews.length && (
        <Button variant="contained" color="primary" onClick={loadMore}>
          {t('Load More')}
        </Button>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('Delete Review?')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Are you sure you want to delete this review?')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

ReviewsList.propTypes = {
  propertyId: PropTypes.number.isRequired,
};

export default ReviewsList;
