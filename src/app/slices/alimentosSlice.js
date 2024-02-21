import { createSlice } from "@reduxjs/toolkit"

export const alimentosSlice = createSlice({
    name: "alimentosSlice",
    initialState: {
        alimentosStored: JSON.parse(localStorage.getItem("alimentosData"))
    },
    reducers: {
        SetAlimentos: (state, action) => {
            localStorage.setItem("alimentosData", JSON.stringify(action.payload))
            state.alimentosStored = action.payload;
        }
    }
})


export const { SetAlimentos } = alimentosSlice.actions;
export default alimentosSlice.reducer;