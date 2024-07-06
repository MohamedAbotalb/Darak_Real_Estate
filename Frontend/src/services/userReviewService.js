import axiosInstance from 'services/axiosConfig';

export const fetchReviewsApi = async (propertyId) => {
  const response = await axiosInstance.get(`/reviews/property/${propertyId}`);
  console.log('API Response:', response.data); // Log the response data
  return response.data;
};

export const addReviewApi = async (reviewData) => {
  const response = await axiosInstance.post('/reviews', reviewData);
  console.log(response, 'response revew added');
  return response.data;
};

export const updateReviewApi = async ({ reviewId, reviewData }) => {
  try {
    const response = await axiosInstance.put(
      `/reviews/${reviewId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error updating review:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteReviewApi = async (reviewId) => {
  await axiosInstance.delete(`/reviews/${reviewId}`);
  return reviewId;
};
