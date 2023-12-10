import { server } from "../../main";
import axios from "axios";
import {
  loadUserProfileFail,
  loadUserProfileRequest,
  loadUserProfileSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
} from "../slices/userSlice";

export const login = async (email, password, dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      `${server}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const getMyProfile = async (dispatch) => {
  try {
    dispatch(loadUserProfileRequest());
    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch(loadUserProfileSuccess(data));
  } catch (error) {
    dispatch(loadUserProfileFail(error.response.data.message));
  }
};
