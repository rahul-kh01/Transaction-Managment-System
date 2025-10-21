import { createSlice } from '@reduxjs/toolkit';
import {
  createStore,
  getStoreById,
  getAllStores,
  updateStore,
  deleteStore,
  getStoreByAdmin,
  getStoreByEmployee,
  getStoreEmployees,
  addEmployee,
  moderateStore, // <-- Add this import
} from './storeThunks';

const initialState = {
  store: null,
  stores: [],
  employees: [],
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    clearStoreState: (state) => {
      state.store = null;
      state.error = null;
      state.employees = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload;
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getStoreById.fulfilled, (state, action) => {
        state.store = action.payload;
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.stores = action.payload;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.store = action.payload;
      })
      .addCase(deleteStore.fulfilled, (state) => {
        state.store = null;
      })
      .addCase(getStoreByAdmin.fulfilled, (state, action) => {
        state.store = action.payload;
      })
      .addCase(getStoreByEmployee.fulfilled, (state, action) => {
        state.store = action.payload;
      })
      .addCase(getStoreEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // Update store in list after moderation
      .addCase(moderateStore.fulfilled, (state, action) => {
        const updated = action.payload;
        state.stores = state.stores.map(store =>
          store.id === updated.id ? updated : store
        );
      })

      .addMatcher(
        (action) => action.type.startsWith('store/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearStoreState } = storeSlice.actions;
export default storeSlice.reducer;
