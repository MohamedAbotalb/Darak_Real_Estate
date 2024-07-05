// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchReviews,
//   deleteReviewAsync,
//   updateReviewAsync,
// } from 'store/userReviews/userReviewsSlice';
// import {
//   Box,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   IconButton,
//   TextField,
//   Rating,
//   Menu,
//   MenuItem,
//   Avatar,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from '@mui/material';
// import { MoreVert, Save, Cancel } from '@mui/icons-material';
// import { format, formatDistanceToNow } from 'date-fns';
// import { toast } from 'react-toastify';

// function ReviewsList({ propertyId }) {
//   const dispatch = useDispatch();
//   const reviews = useSelector((state) => state.reviews.reviews);
//   const user = useSelector((state) => state.auth.user);
//   const [visibleReviews, setVisibleReviews] = useState(4);
//   const [editedPropertyId, setEditedPropertyId] = useState(null);
//   const [editingReview, setEditingReview] = useState(null);
//   const [editedContent, setEditedContent] = useState('');
//   const [originalContent, setOriginalContent] = useState('');
//   const [editedRating, setEditedRating] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuReviewId, setMenuReviewId] = useState(null);

//   // State for delete confirmation dialog
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [reviewToDelete, setReviewToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchReviews(propertyId));
//   }, [dispatch, propertyId]);

//   const handleDelete = (reviewId) => {
//   // Close the menu
//   setAnchorEl(null);
//   setMenuReviewId(null);

//   // Open delete confirmation dialog
//   setOpenDeleteDialog(true);
//   setReviewToDelete(reviewId);
// };


//   const handleConfirmDelete = () => {
//     // Close delete confirmation dialog
//     setOpenDeleteDialog(false);
//     // Dispatch delete action
//     dispatch(deleteReviewAsync(reviewToDelete)).then(() => {
//       // Re-fetch reviews after deletion
//       dispatch(fetchReviews(propertyId));
//     });
//   };

//   const handleCancelDelete = () => {
//     // Close delete confirmation dialog
//     setOpenDeleteDialog(false);
//     setReviewToDelete(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setMenuReviewId(null);
//   };

//  const handleEditClick = (review) => {
//     setEditingReview(review.id);
//     setEditedContent(review.content);
//     setEditedRating(review.rate);
//     setEditedPropertyId(propertyId); 
//     handleMenuClose();
//   };

//   const handleEditSubmit = () => {
//   let valid = true;

//   // Validate rate
//   if (editedRating === 0) {
//     toast.error('Please provide a rating.');
//     valid = false;
//   }

//   // Validate content
//   if (editedContent.trim() !== '') {
//     if (editedContent.trim().length < 4) {
//       toast.error('Comment must be at least 4 characters long.');
//       valid = false;
//     } else if (/^\d/.test(editedContent.trim())) {
//       toast.error('Comment cannot start with a number.');
//       valid = false;
//     }
//   }

//   if (!valid) {
//     return;
//   }

//   // Prepare the review data payload
//   const reviewData = {
//     rate: editedRating,
//     property_id: editedPropertyId,
//   };

//   // Check if the edited content is different from the original content and is not empty
//   if (editedContent !== originalContent && editedContent.trim() !== '') {
//     reviewData.content = editedContent.trim();
//   }

//   dispatch(
//     updateReviewAsync({
//       reviewId: editingReview,
//       reviewData,
//     })
//   ).then(() => {
//     dispatch(fetchReviews(propertyId)); // Re-fetch reviews after update
//     setEditingReview(null);
//     setEditedContent('');
//     setEditedRating(0);
//     setEditedPropertyId(null); // Reset property_id
//   });
// };


//   const handleEditCancel = () => {
//     setEditingReview(null);
//     setEditedContent('');
//     setEditedRating(0);
//   };

//   const handleMenuClick = (event, reviewId) => {
//     setAnchorEl(event.currentTarget);
//     setMenuReviewId(reviewId);
//   };

//   const loadMore = () => {
//     setVisibleReviews((prev) => prev + 4);
//   };

//   // Function to format a date as "d/M/yyyy"
//   const formatCustomDate = (date) => {
//     return format(date, 'd/M/yyyy');
//   };

//   // Function to format review date dynamically
//   const formatReviewDate = (createdAt) => {
//     const reviewDate = new Date(createdAt);
//     const now = new Date();
//     const differenceInHours = Math.abs(now - reviewDate) / 36e5;

//     if (differenceInHours < 24) {
//       return formatDistanceToNow(reviewDate, { addSuffix: true });
//     }

//     return formatCustomDate(reviewDate);
//   };

//   console.log(reviews,'reviews from list form')

//   return (
//     <Box>
//       <List>
//         {reviews
//           ?.slice()
//           .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//           .slice(0, visibleReviews)
//           .map((review) => (
//             <Paper
//               elevation={3}
//               style={{
//                 marginBottom: '16px',
//                 padding: '16px',
//                 borderRadius: '8px',
//               }}
//               key={review.id}
//             >
//               <ListItem alignItems="flex-start">
//                 <Box display="flex" flexDirection="column" width="100%">
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box display="flex" alignItems="center">
//                       {/* <Avatar
//                         src={review.user.avatar}
//                         alt={review.user.first_name}
//                         style={{ marginRight: '16px' }}
//                       /> */}
//                       <Box>
//                         <Typography
//                           variant="subtitle1"
//                           component="span"
//                           fontWeight="bold"
//                         >
//                           {/* {`${review?.user.first_name} ${review?.user.last_name}`} */}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     {/* {user.id === review.user.id && ( */}
//                       <>
//                         <IconButton
//                           onClick={(event) => handleMenuClick(event, review.id)}
//                         >
//                           <MoreVert />
//                         </IconButton>
//                         <Menu
//                           anchorEl={anchorEl}
//                           open={Boolean(anchorEl) && menuReviewId === review.id}
//                           onClose={handleMenuClose}
//                         >
//                           <MenuItem
//                             onClick={() => handleEditClick(review)}
//                             color="primary"
//                           >
//                             Edit
//                           </MenuItem>
//                           <MenuItem
//                             onClick={() => handleDelete(review.id)}
//                             color="error"
//                           >
//                             Delete
//                           </MenuItem>
//                         </Menu>
//                       </>
//                     {/* )} */}
//                   </Box>
//                   <Box display="flex" alignItems="center" mt={1} ml={1}>
//                     <Rating
//                       name="rate"
//                       value={
//                         editingReview === review.id ? editedRating : review.rate
//                       }
//                       readOnly={editingReview !== review.id}
//                       size="small"
//                       onChange={(e, newValue) => setEditedRating(newValue)}
//                     />
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       style={{ marginLeft: '4px', fontSize: '0.75rem' }}
//                     >
//                       {formatReviewDate(review.created_at)}
//                     </Typography>
//                   </Box>

//                   <Box marginTop={2}>
//                     {editingReview === review.id ? (
//                       <TextField
//                         value={editedContent}
//                         onChange={(e) => setEditedContent(e.target.value)}
//                         variant="outlined"
//                         fullWidth
//                       />
//                     ) : (
//                       <Typography variant="body2" color="textSecondary">
//                         {review.content}
//                       </Typography>
//                     )}
//                   </Box>
//                   {editingReview === review.id && (
//                     <Box display="flex" justifyContent="flex-end" marginTop={1}>
//                       <IconButton onClick={handleEditSubmit} color="primary">
//                         <Save />
//                       </IconButton>
//                       <IconButton onClick={handleEditCancel} color="secondary">
//                         <Cancel />
//                       </IconButton>
//                     </Box>
//                   )}
//                 </Box>
//               </ListItem>
//             </Paper>
//           ))}
//       </List>
//       {visibleReviews < reviews.length && (
//         <Button variant="contained" color="primary" onClick={loadMore}>
//           Load More
//         </Button>
//       )}

//       {/* Delete confirmation dialog */}
//       <Dialog
//         open={openDeleteDialog}
//         onClose={handleCancelDelete}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Delete Review?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this review?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// ReviewsList.propTypes = {
//   propertyId: PropTypes.number.isRequired,
// };

// export default ReviewsList;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchReviews,
  deleteReviewAsync,
  updateReviewAsync,
} from 'store/userReviews/userReviewsSlice';
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
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.auth.user);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [editedPropertyId, setEditedPropertyId] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [editedRating, setEditedRating] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuReviewId, setMenuReviewId] = useState(null);
const [rateError, setRateError] = useState('');
  const [contentError, setContentError] = useState('');
  // State for delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews(propertyId));
  }, [dispatch, propertyId]);

  const handleDelete = (reviewId) => {
  // Close the menu
  setAnchorEl(null);
  setMenuReviewId(null);

  // Open delete confirmation dialog
  setOpenDeleteDialog(true);
  setReviewToDelete(reviewId);
};


  const handleConfirmDelete = () => {
    // Close delete confirmation dialog
    setOpenDeleteDialog(false);
    // Dispatch delete action
    dispatch(deleteReviewAsync(reviewToDelete)).then(() => {
      // Re-fetch reviews after deletion
      dispatch(fetchReviews(propertyId));
    });
  };

  const handleCancelDelete = () => {
    // Close delete confirmation dialog
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
    setEditedRating(review.rate);
    setEditedPropertyId(propertyId); 
    handleMenuClose();
  };

  const handleEditSubmit = () => {
  let valid = true;

  // Validate rate
  if (editedRating === 0) {
    toast.error('Please provide a rating.');
    valid = false;
  }

  // Validate content
  if (editedContent.trim() !== '') {
    if (editedContent.trim().length < 4) {
      toast.error('Comment must be at least 4 characters long.');
      valid = false;
    } else if (/^\d/.test(editedContent.trim())) {
      toast.error('Comment cannot start with a number.');
      valid = false;
    }
  }

  if (!valid) {
    return;
  }

  // Prepare the review data payload
  const reviewData = {
    rate: editedRating,
    property_id: editedPropertyId,
  };

  // Check if the edited content is different from the original content and is not empty
  if (editedContent !== originalContent && editedContent.trim() !== '') {
    reviewData.content = editedContent.trim();
  }

  dispatch(
    updateReviewAsync({
      reviewId: editingReview,
      reviewData,
    })
  ).then(() => {
    dispatch(fetchReviews(propertyId)); // Re-fetch reviews after update
    setEditingReview(null);
    setEditedContent('');
    setEditedRating(0);
    setEditedPropertyId(null); // Reset property_id
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

  // Function to format a date as "d/M/yyyy"
  const formatCustomDate = (date) => {
    return format(date, 'd/M/yyyy');
  };

  // Function to format review date dynamically
  const formatReviewDate = (createdAt) => {
    const reviewDate = new Date(createdAt);
    const now = new Date();
    const differenceInHours = Math.abs(now - reviewDate) / 36e5;

    if (differenceInHours < 24) {
      return formatDistanceToNow(reviewDate, { addSuffix: true });
    }

    return formatCustomDate(reviewDate);
  };

  console.log(reviews,'reviews from list form')

  return (
    <Box>
      <List>
        {reviews
          ?.slice()
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
                      {/* <Avatar
                        src={review.user.avatar}
                        alt={review.user.first_name}
                        style={{ marginRight: '16px' }}
                      /> */}
                      <Box>
                        <Typography
                          variant="subtitle1"
                          component="span"
                          fontWeight="bold"
                        >
                          {/* {`${review?.user.first_name} ${review?.user.last_name}`} */}
                        </Typography>
                      </Box>
                    </Box>
                    {/* {user.id === review.user.id && ( */}
                      <>
                        <IconButton
                          onClick={(event) => handleMenuClick(event, review.id)}
                        >
                          <MoreVert />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && menuReviewId === review.id}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={() => handleEditClick(review)}
                            color="primary"
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDelete(review.id)}
                            color="error"
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </>
                    {/* )} */}
                  </Box>
                  <Box display="flex" alignItems="center" mt={1} ml={1}>
                    <Rating
                      name="rate"
                      value={
                        editingReview === review.id ? editedRating : review.rate
                      }
                      readOnly={editingReview !== review.id}
                      size="small"
                      onChange={(e, newValue) => setEditedRating(newValue)}
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginLeft: '4px', fontSize: '0.75rem' }}
                    >
                      {formatReviewDate(review.created_at)}
                    </Typography>
                  </Box>

                  <Box marginTop={2}>
                    {editingReview === review.id ? (
                      <TextField
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        {review.content}
                      </Typography>
                    )}
                  </Box>
                  {editingReview === review.id && (
                    <Box display="flex" justifyContent="flex-end" marginTop={1}>
                      <IconButton onClick={handleEditSubmit} color="primary">
                        <Save />
                      </IconButton>
                      <IconButton onClick={handleEditCancel} color="secondary">
                        <Cancel />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </ListItem>
            </Paper>
          ))}
      </List>
      {visibleReviews < reviews.length && (
        <Button variant="contained" color="primary" onClick={loadMore}>
          Load More
        </Button>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Review?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
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
