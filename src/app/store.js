import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import paisesSlice from "./slices/paisesSlice";


export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        paisesSlice: paisesSlice,
    },
})