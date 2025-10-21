import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

// Complete onboarding process
export const completeOnboarding = createAsyncThunk(
  'onboarding/complete',
  async (onboardingData, { rejectWithValue }) => {
    try {
      const res = await api.post('/onboarding/complete', onboardingData);
      console.log('Onboarding complete success:', res.data.data);
      return res.data.data;
    } catch (err) {
      console.error('Onboarding complete error:', err);
      return rejectWithValue(err.response?.data?.message || 'Onboarding failed');
    }
  }
); 