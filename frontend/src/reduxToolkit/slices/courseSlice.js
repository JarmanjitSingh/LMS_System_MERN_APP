import { createSlice } from "@reduxjs/toolkit";

const initialState = {courses: [], lectures: []};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    allCoursesRequest: (state) => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCourseRequest: (state) => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistRequest: (state) => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
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
  allCoursesRequest,
  allCoursesSuccess,
  allCoursesFail,
  addToPlaylistRequest,
  addToPlaylistSuccess,
  addToPlaylistFail,
  getCourseRequest,
  getCourseSuccess,
  getCourseFail,
  clearError,
  clearMessage
} = courseSlice.actions;

export default courseSlice.reducer;
