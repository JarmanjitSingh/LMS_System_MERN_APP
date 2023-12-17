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
    deleteCourseRequest: (state) => {
      state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLectueRequest: (state) => {
      state.loading = true;
    },
    addLectueSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectueFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLectureRequest: (state) => {
      state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
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
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFail,
  addLectueRequest,
  addLectueSuccess,
  addLectueFail,
  deleteLectureRequest,
  deleteLectureSuccess,
  deleteLectureFail,
  clearError,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
