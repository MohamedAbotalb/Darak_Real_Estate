import axios from 'services/axiosConfig';

export const fetchAverageRating = async (propertyId) => {
  try {
    const response = await axios.get(`/reviews/Average/${propertyId}`);
    return parseFloat(response.data.average);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default fetchAverageRating;
