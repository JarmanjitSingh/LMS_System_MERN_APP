import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    contactRequest: (state) => {
      state.loading = true;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    requestCourseRequest: (state) => {
      state.loading = true;
    },
    requestCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    requestCourseFail: (state, action) => {
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

export const {
  contactRequest,
  contactSuccess,
  contactFail,
  requestCourseRequest,
  requestCourseSuccess,
  requestCourseFail,
  clearError,
  clearMessage,
} = contactSlice.actions;

export default contactSlice.reducer;
