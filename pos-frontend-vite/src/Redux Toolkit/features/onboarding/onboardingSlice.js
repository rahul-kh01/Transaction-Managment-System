import { createSlice } from '@reduxjs/toolkit';
import { completeOnboarding } from './onboardingThunk';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    loading: false,
    error: null,
    isCompleted: false,
    userData: null,
  },
  reducers: {
    resetOnboarding: (state) => {
      state.loading = false;
      state.error = null;
      state.isCompleted = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeOnboarding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeOnboarding.fulfilled, (state, action) => {
        state.loading = false;
        state.isCompleted = true;
        state.userData = action.payload;
      })
      .addCase(completeOnboarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer; 