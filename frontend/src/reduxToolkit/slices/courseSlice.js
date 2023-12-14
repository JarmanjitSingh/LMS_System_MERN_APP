import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

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
    clearError: (state)=>{
        state.error = null
    }
  },
});

//action creating
export const {
  allCoursesRequest,
  allCoursesSuccess,
  allCoursesFail,
  clearError
} = courseSlice.actions;

export default courseSlice.reducer;
