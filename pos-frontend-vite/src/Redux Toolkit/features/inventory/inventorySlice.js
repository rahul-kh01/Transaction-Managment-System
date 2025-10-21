import { createSlice } from '@reduxjs/toolkit';
import {
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
  getInventoryByBranch,
  getInventoryByProduct
} from './inventoryThunks';

const initialState = {
  inventories: [],
  inventory: null,
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearInventoryState: (state) => {
      state.inventories = [];
      state.inventory = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories.push(action.payload);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateInventory.fulfilled, (state, action) => {
        const index = state.inventories.findIndex(inv => inv.id === action.payload.id);
        if (index !== -1) state.inventories[index] = action.payload;
      })

      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.inventories = state.inventories.filter(inv => inv.id !== action.payload);
      })

      .addCase(getInventoryById.fulfilled, (state, action) => {
        state.inventory = action.payload;
      })

      .addCase(getInventoryByBranch.fulfilled, (state, action) => {
        state.inventories = action.payload;
      })

      .addCase(getInventoryByProduct.fulfilled, (state, action) => {
        state.inventory = action.payload;
      })

      .addMatcher(
        (action) => action.type.startsWith('inventory/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearInventoryState } = inventorySlice.actions;
export default inventorySlice.reducer;
