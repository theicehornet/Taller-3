import { createSlice } from "@reduxjs/toolkit"

export const paisesSlice = createSlice({
    name: "paisesSlice",
    initialState: {
        paisesStored: JSON.parse(localStorage.getItem("paisesData"))
    },
    reducers: {
        SetPaises: (state, action) => {
            localStorage.setItem("paisesData", JSON.stringify(action.payload))
            state.paisesStored = action.payload;
        }
    }
})


export const { SetPaises } = paisesSlice.actions;
export default paisesSlice.reducer;