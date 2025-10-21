import { createSlice } from '@reduxjs/toolkit';
import {
  createStoreEmployee,
  createBranchEmployee,
  updateEmployee,
  deleteEmployee,
  findEmployeeById,
  findStoreEmployees,
  findBranchEmployees,
} from './employeeThunks';

const initialState = {
  employees: [],
  employee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearEmployeeState: (state) => {
      state.employee = null;
      state.employees = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStoreEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStoreEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createStoreEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBranchEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBranchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createBranchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((e) => e.id !== action.payload);
      })

      .addCase(findEmployeeById.fulfilled, (state, action) => {
        state.employee = action.payload;
      })

      .addCase(findStoreEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })

      .addCase(findBranchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        // console.log("")
      })

      .addMatcher(
        (action) => action.type.startsWith('employee/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;