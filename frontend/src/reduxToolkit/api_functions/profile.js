import axios from "axios";
import { server } from "../../main";
import {
  changePasswordFail,
  changePasswordRequest,
  changePasswordSuccess,
  forgetPasswordFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  removeFromPlaylistFail,
  removeFromPlaylistRequest,
  removeFromPlaylistSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  updateProfileFail,
  updateProfilePictureFail,
  updateProfilePictureRequest,
  updateProfilePictureSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/profileSlice";
import { addToPlaylistFail, addToPlaylistRequest, addToPlaylistSuccess } from "../slices/courseSlice";

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


export const forgetPassword = async (email,  dispatch) => {
  try {
    dispatch(forgetPasswordRequest());

    const { data } = await axios.post(
      `${server}/forgetpassword`,
      {
        email
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(forgetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgetPasswordFail(error.response.data.message));
  }
};



export const resetPassword = async (token, password, dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    console.log(error.response.data.message)
    dispatch(resetPasswordFail(error.response.data.message));
  }
};




export const addToPlaylist = async (id, dispatch) => {
  try {
    dispatch(addToPlaylistRequest());

    const { data } = await axios.post(
      `${server}/addtoplaylist`, {
        id
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

    dispatch(addToPlaylistSuccess(data.message));
  } catch (error) {
    dispatch(addToPlaylistFail(error.response.data.message));
  }
};

export const removeFromPlaylist = async (id, dispatch) => {
  try {
    dispatch(removeFromPlaylistRequest());

    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

    dispatch(removeFromPlaylistSuccess(data.message));
  } catch (error) {
    dispatch(removeFromPlaylistFail(error.response.data.message));
  }
};
