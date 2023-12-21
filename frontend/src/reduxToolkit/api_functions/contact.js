import axios from "axios";
import { server } from "../../main";
import {
  contactFail,
  contactRequest,
  contactSuccess,
  requestCourseFail,
  requestCourseRequest,
  requestCourseSuccess,
} from "../slices/contactSlice";

export const contactUs = async (name, email, message, dispatch) => {
  try {
    dispatch(contactRequest());

    const { data } = await axios.post(
      `${server}/contact`,
      {
        name,
        email,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(contactSuccess(data.message));
  } catch (error) {
    dispatch(contactFail(error.response.data.message));
  }
};


export const courseRequest = async (name, email, course, dispatch) => {
    try {
      dispatch(requestCourseRequest());
  
      const { data } = await axios.post(
        `${server}/courserequest`,
        {
          name,
          email,
          course,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      dispatch(requestCourseSuccess(data.message));
    } catch (error) {
      dispatch(requestCourseFail(error.response.data.message));
    }
  };