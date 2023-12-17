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