import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import apiClient from '../lib/axios'; // Make sure this path matches your axios client
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/useUserStore';
import { toast } from 'react-toastify';

// 1. The API fetcher function
const fetchUserProfile = async () => {
  const response = await apiClient.get('/profile');
  return response.data;
};

// 2. The Custom Hook
export function useUserAuth() {
  const token = useAuthStore((state) => state.token);
  const logoutAuth = useAuthStore((state) => state.logout);
  const setUser = useUserStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ['userProfile', token], 
    queryFn: fetchUserProfile,
    enabled: !!token, // Only runs if a token exists
    retry: false,
  });

  // Automatically syncs the network state to your Zustand store
  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }

    if (query.isError) {
      setUser(null);
      const err = query.error as any;
      
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        logoutAuth(); 
      } else {
        toast.error(err.response?.data?.message || 'Unable to reach the server');
      }
    }
  }, [query.data, query.isError, query.error, setUser, logoutAuth]);

  return query;
}