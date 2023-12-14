import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import profileReducer from "./slices/profileSlice"
import courseReducer from "./slices/courseSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        course: courseReducer
    }
})

export default store;