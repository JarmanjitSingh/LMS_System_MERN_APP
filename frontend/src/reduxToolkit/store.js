import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import profileReducer from "./slices/profileSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer
    }
})

export default store;