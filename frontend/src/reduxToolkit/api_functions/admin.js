import axios from "axios";
import { server } from "../../main";
import {
  createCourseFail,
  createCourseRequest,
  createCourseSuccess,
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
