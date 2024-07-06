import axiosInstance from 'services/axiosConfig';

export const fetchReviewsApi = async (propertyId) => {
  const response = await axiosInstance.get(`/reviews/property/${propertyId}`);
  return response.data;
};

export const addReviewApi = async (reviewData) => {
  const response = await axiosInstance.post('/reviews', reviewData);
  return response.data;
};

export const updateReviewApi = async ({ reviewId, reviewData }) => {
  const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReviewApi = async (reviewId) => {
  await axiosInstance.delete(`/reviews/${reviewId}`);
  return reviewId;
};
