import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    buySubscriptionRequest: (state) => {
      state.loading = true;
    },
    buySubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.subscriptionId = action.payload;
    },
    buySubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelSubscriptionRequest: (state) => {
      state.loading = true;
    },
    cancelSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    cancelSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

//action creating
export const {
  buySubscriptionRequest,
  buySubscriptionSuccess,
  buySubscriptionFail,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail,
  clearError,
  clearMessage,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
