// src/store/useSummarizerStore.ts
import { create } from 'zustand';
import { Mode } from '@/types';
import { isAxiosError } from 'axios';
import apiClient from '@/lib/axios'; // Use the instance we just made
import { toast } from 'react-toastify';


interface appState {
  text: string;
  summary: string;
  mode: Mode;  // Represents the selected model
  loading: boolean;
  error: string;  // Add a new error state
  setText: (text: string) => void;
  setMode: (mode: Mode) => void;
  processContent: () => Promise<void>;
}

export const useSummarizerStore = create<appState>((set, get) => ({
  text: '',
  summary: '',
  mode: 'Summarizer',  // Default model
  loading: false,
  error: '',  // Default empty error state

  setText: (text) => set({ text }),
  setMode: (mode) => set({ mode }), // Updates the selected model

  processContent: async () => {
    const { text, mode } = get();
    if (!text) {
      set({ error: 'Text is required to generate summary.' });
       toast.error('Text is required to generate summary.');
      return;
    }

    set({ loading: true, summary: '', error: '' }); // Clear any previous errors

    try {
      const response = await apiClient.post('/summarize', { text, mode });
      set({ summary: response.data.summary, error: '' });
    } catch (error: unknown) {
      console.error("Fetch error:", error);

      let errorMessage = "An unexpected error occurred.";

      if (isAxiosError(error)) {
        // Check for network-related errors
        if (!error.response) {
          errorMessage = "Network error. Please check your internet connection.";
        } else {
          // Server-side error
          const status = error.response?.status;
          if (status === 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (status === 400) {
            errorMessage = "Bad request. Please check your input.";
          } else if (status === 429) {
            errorMessage = "Too many requests. Please try again later.";
          } else {
            errorMessage = `Error: ${error.response?.data?.error || "Something went wrong."}`;
          }
        }
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: string }).code === 'ECONNABORTED'
      ) {
        errorMessage = "Request timeout. Please try again later.";
      }

      set({ summary: '', error: errorMessage });
       toast.error(errorMessage);  // Show the error toast notification
    } finally {
      set({ loading: false });
    }
  },


}));