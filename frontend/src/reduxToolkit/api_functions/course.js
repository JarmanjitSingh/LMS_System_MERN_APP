import axios from "axios";
import { server } from "../../main";
import { allCoursesFail, allCoursesRequest, allCoursesSuccess, getCourseFail, getCourseRequest, getCourseSuccess } from "../slices/courseSlice";
import { useDispatch } from "react-redux";

export const getAllCourses = async (category='', keyword='', dispatch) => {
    try {
      dispatch(allCoursesRequest());
  
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`);
  
      dispatch(allCoursesSuccess(data.allCourses));
    } catch (error) {
      console.log(error)
      dispatch(allCoursesFail(error.response.data.message));
    }
  };

  

  export const getCourseLectures = async (id, dispatch) => {
    try {
      dispatch(getCourseRequest());
  
      const { data } = await axios.get(
        `${server}/course/${id}`, {
          withCredentials: true
        });
  
      dispatch(getCourseSuccess(data.lectures));
    } catch (error) {
      dispatch(getCourseFail(error.response.data.message));
    }
  };