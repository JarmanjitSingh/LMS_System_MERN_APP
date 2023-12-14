import axios from "axios";
import { server } from "../../main";
import { allCoursesFail, allCoursesRequest, allCoursesSuccess } from "../slices/courseSlice";

export const getAllCourses = async (category='', keyword='', dispatch) => {
    try {
      dispatch(allCoursesRequest());
  
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`);
  
      dispatch(allCoursesSuccess(data.allCourses));
    } catch (error) {
      dispatch(allCoursesFail(error.response.data.message));
    }
  };