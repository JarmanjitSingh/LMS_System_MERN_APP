import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    createCourseRequest: (state) => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
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
  createCourseRequest,
  createCourseSuccess,
  createCourseFail,
  clearError,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
