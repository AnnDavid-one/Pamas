import apiClient from "../lib/axios";

export const fetchUserProfile = async () => {
  // Axios automatically throws an error for non-2xx responses
  const response = await apiClient.get('/profile');
  return response.data;
};