import { createSlice } from "@reduxjs/toolkit";
import { createPaymentLinkThunk, proceedPaymentThunk } from "./paymentThunks";

const initialState = {
  paymentLink: null,
  loading: false,
  error: null,
  status: "idle",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentLinkThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(createPaymentLinkThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentLink = action.payload;
        state.status = "succeeded";
      })
      .addCase(createPaymentLinkThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(proceedPaymentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(proceedPaymentThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(proceedPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default paymentSlice.reducer; 