import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice";
import courseReducer from "./slices/courseSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import adminReducer from "./slices/adminSlice";
import contactReducer from "./slices/contactSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    contact: contactReducer
  },
});

export default store;
