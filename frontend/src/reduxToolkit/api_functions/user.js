import { server } from "../../main";
import axios from "axios";
import {
  loadUserProfileFail,
  loadUserProfileRequest,
  loadUserProfileSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
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
    dispatch(loadUserProfileSuccess(data));
  } catch (error) {
    dispatch(loadUserProfileFail(error.response.data.message));
  }
};

export const logout = async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const register = async (formData, dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(`${server}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};
