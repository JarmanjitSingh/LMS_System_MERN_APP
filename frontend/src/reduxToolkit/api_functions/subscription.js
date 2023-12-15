import axios from "axios";
import { server } from "../../main";
import {
  buySubscriptionFail,
  buySubscriptionRequest,
  buySubscriptionSuccess,
  cancelSubscriptionFail,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
} from "../slices/subscriptionSlice";

export const buySubscription = async (dispatch) => {
  try {
    dispatch(buySubscriptionRequest());

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch(buySubscriptionSuccess(data.subscriptionId));
  } catch (error) {
    dispatch(buySubscriptionFail(error.response.data.message));
  }
};

export const cancelSubscription = async (dispatch) => {
  try {
    dispatch(cancelSubscriptionRequest());

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch(cancelSubscriptionSuccess(data.message));
  } catch (error) {
    dispatch(cancelSubscriptionFail(error.response.data.message));
  }
};
