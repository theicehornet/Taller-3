import { createSlice } from "@reduxjs/toolkit"
import fetchPaises from '../../Services/fetchPaises'

export const paisesSlice = createSlice({
    name: "paisesSlice",
    initialState: {
        paisesStored: localStorage.getItem("paisesData") == null ?  fetchPaises() : JSON.parse(localStorage.getItem("paisesData"))
    },
    reducers: {
        SetPaises:async (state) => {
            localStorage.setItem("paisesData", JSON.stringify(await fetchPaises()))
            state.paisesStored = fetchPaises();
        }
    }
})


export const { SetPaises } = paisesSlice.actions;
export default paisesSlice.reducer;