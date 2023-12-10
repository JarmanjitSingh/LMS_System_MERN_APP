import axios from "axios";
import {
  changePasswordFail,
  changePasswordRequest,
  changePasswordSuccess,
  updateProfileFail,
  updateProfilePictureFail,
  updateProfilePictureRequest,
  updateProfilePictureSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/profileSlice";
import { server } from "../../main";

export const updateProfile = async (name, email, dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const { data } = await axios.put(
      `${server}/updateprofile`,
      {
        name,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const updateProfilePicture = async (formData, dispatch) => {
  try {
    dispatch(updateProfilePictureRequest());

    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(updateProfilePictureSuccess(data.message));
  } catch (error) {
    dispatch(updateProfilePictureFail(error.response.data.message));
  }
};

export const changePassword = async (oldPassword, newPassword, dispatch) => {
  try {
    dispatch(changePasswordRequest());

    const { data } = await axios.put(
      `${server}/changepassword`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(changePasswordSuccess(data.message));
  } catch (error) {
    dispatch(changePasswordFail(error.response.data.message));
  }
};
