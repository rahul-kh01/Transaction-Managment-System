import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const createPaymentLinkThunk = createAsyncThunk(
  "payment/createPaymentLink",
  async ({ planId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/payments/create?planId=${planId}&paymentMethod=${paymentMethod}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      window.open(response.data.payment_link_url, "_blank");
      console.log("Payment link created:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error creating payment link:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const proceedPaymentThunk = createAsyncThunk(
  "payment/proceedPayment",
  async ({ paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/payments/proceed?paymentId=${paymentId}&paymentLinkId=${paymentLinkId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
