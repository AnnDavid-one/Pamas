// src/services/userService.ts
import apiClient from '../lib/axios'; // Import your configured Axios instance

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: 'USER' | 'VENDOR' | 'ADMIN';
  // Add other user fields as necessary
}

// API call to fetch user data
export const getUserData = async (): Promise<User> => {
  const response = await apiClient.get<User>('/profile'); // Assuming /profile endpoint returns user data
  return response.data; // Return the user data from the response
};