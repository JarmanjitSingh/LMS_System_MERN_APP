import axios from "axios";
import { server } from "../../main";
import {
  addLectueFail,
  addLectueRequest,
  addLectueSuccess,
  createCourseFail,
  createCourseRequest,
  createCourseSuccess,
  deleteCourseFail,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteLectureFail,
  deleteLectureRequest,
  deleteLectureSuccess,
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAdminStatsFail,
  getAdminStatsRequest,
  getAdminStatsSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  updateUserRoleFail,
  updateUserRoleRequest,
  updateUserRoleSuccess,
} from "../slices/adminSlice";

export const createCourse = async (formData, dispatch) => {
  try {
    dispatch(createCourseRequest());

    const { data } = await axios.post(`${server}/createcourse`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch(createCourseSuccess(data.message));
  } catch (error) {
    dispatch(createCourseFail(error.response.data.message));
  }
};

export const deleteCourse = async (id, dispatch) => {
  try {
    dispatch(deleteCourseRequest());

    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteCourseSuccess(data.message));
  } catch (error) {
    dispatch(deleteCourseFail(error.response.data.message));
  }
};

export const addLecture = async (courseId, formData, dispatch) => {
  try {
    dispatch(addLectueRequest());

    const { data } = await axios.post(
      `${server}/course/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(addLectueSuccess(data.message));
  } catch (error) {
    dispatch(addLectueFail(error.response.data.message));
  }
};


export const deleteLecture = async (courseId,lectureId, dispatch) => {
  try {
    dispatch(deleteLectureRequest());

    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );

    dispatch(deleteLectureSuccess(data.message));
  } catch (error) {
    dispatch(deleteLectureFail(error.response.data.message));
  }
};


export const getAllUsers = async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const { data } = await axios.get(
      `${server}/admin/users`,
      {
        withCredentials: true,
      }
    );

    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const updateUserRole = async (id, dispatch) => {
  try {
    dispatch(updateUserRoleRequest());

    const { data } = await axios.put(
      `${server}/admin/user/${id}`,{},
      {
        withCredentials: true,
      }
    );

    dispatch(updateUserRoleSuccess(data.message));
  } catch (error) {
    dispatch(updateUserRoleFail(error.response.data.message));
  }
};

export const deleteUser = async (id, dispatch) => {
  try {
    dispatch(deleteUserRequest());

    const { data } = await axios.delete(
      `${server}/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch(deleteUserSuccess(data.message));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

export const getAdminStats = async (dispatch) => {
  try {
    dispatch(getAdminStatsRequest());

    const { data } = await axios.get(
      `${server}/admin/stats`,
      {
        withCredentials: true,
      }
    );

    dispatch(getAdminStatsSuccess(data));
  } catch (error) {
    dispatch(getAdminStatsFail(error.response.data.message));
  }
};