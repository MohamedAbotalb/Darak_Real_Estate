import axios from 'services/axiosConfig';

export const fetchWishlistApi = () => axios.get('/wishlist');

export const addToWishlistApi = (data) => axios.post('/wishlist', data);

export const removeFromWishlistApi = (id) => axios.delete(`/wishlist/${id}`);
