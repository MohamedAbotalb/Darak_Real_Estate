import axiosInstance from 'services/axiosConfig';

export const fetchRenterNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications/renter');
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch renter notifications: ${error.message}`);
  }
};

export const fetchLandlordNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications/landlord');
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch landlord notifications: ${error.message}`);
  }
};

export const declineTourRequest = async (tourId) => {
  const url = `/tours/${tourId}/decline`;
  try {
    const response = await axiosInstance.post(url);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to decline tour: ${error.message}`);
  }
};

export const approveTourDate = async ({ tourId, selectedDate }) => {
  const url = `/tours/${tourId}/approve`;
  try {
    const response = await axiosInstance.post(url, {
      tour_date: selectedDate.id,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to approve tour date: ${error.message}`);
  }
};

export const deleteNotification = async (id) => {
  const url = `/notifications/${id}`;
  try {
    const response = await axiosInstance.delete(url);
    return { id };
  } catch (error) {
    throw new Error(`Failed to delete notification: ${error.message}`);
  }
};
