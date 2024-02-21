import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import paisesSlice from "./slices/paisesSlice";
import  registrosSlice  from "./slices/registrosSlice";
import  alimentosSlice  from "./slices/alimentosSlice";


export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        paisesSlice: paisesSlice,
        registrosSlice: registrosSlice,
        alimentosSlice: alimentosSlice,
    },
})