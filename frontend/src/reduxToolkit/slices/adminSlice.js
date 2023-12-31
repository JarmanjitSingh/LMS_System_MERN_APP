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
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRoleRequest: (state) => {
      state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAdminStatsRequest: (state) => {
      state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.userCount = action.payload.userCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.viewsCount = action.payload.viewsCount;
      state.usersPercentage = action.payload.usersPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.usersProfit = action.payload.usersProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.subscriptionProfit = action.payload.subscriptionProfit;
    },
    getAdminStatsFail: (state, action) => {
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
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  updateUserRoleFail,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  getAdminStatsRequest,
  getAdminStatsSuccess,
  getAdminStatsFail,
  clearError,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
