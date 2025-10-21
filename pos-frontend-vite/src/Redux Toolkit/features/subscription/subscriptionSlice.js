import { createSlice } from '@reduxjs/toolkit';
import {
  subscribeToPlan,
  upgradeSubscription,
  activateSubscription,
  cancelSubscription,
  updatePaymentStatus,
  getStoreSubscriptions,
  getAllSubscriptions,
  getExpiringSubscriptions,
  countSubscriptionsByStatus
} from './subscriptionThunks';

const initialState = {
  subscriptions: [],
  selectedSubscription: null,
  expiringSubscriptions: [],
  countByStatus: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscriptionState: (state) => {
      state.subscriptions = [];
      state.selectedSubscription = null;
      state.expiringSubscriptions = [];
      state.countByStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload);
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(upgradeSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.map(sub => sub.id === action.payload.id ? action.payload : sub);
      })
      .addCase(upgradeSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(upgradeSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(activateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.map(sub => sub.id === action.payload.id ? action.payload : sub);
      })
      .addCase(activateSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(activateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.map(sub => sub.id === action.payload.id ? action.payload : sub);
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.map(sub => sub.id === action.payload.id ? action.payload : sub);
      })
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getStoreSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStoreSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getStoreSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getExpiringSubscriptions.fulfilled, (state, action) => {
        state.expiringSubscriptions = action.payload;
      })
      .addCase(getExpiringSubscriptions.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(countSubscriptionsByStatus.fulfilled, (state, action) => {
        state.countByStatus = action.payload;
      })
      .addCase(countSubscriptionsByStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addMatcher(
        (action) => action.type.startsWith('subscription/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer; 