import { createSlice } from "@reduxjs/toolkit"

export const registrosSlice = createSlice({
    name: "registrosSlice",
    initialState: {
        registrosStored: JSON.parse(localStorage.getItem("registrosAlimenticios"))
    },
    reducers: {
        SetRegistros: (state, action) => {
            localStorage.setItem("registrosAlimenticios", JSON.stringify(action.payload))
            state.registrosStored = action.payload;
        },
        EraseRegistros: (state) => {
            localStorage.removeItem("registrosAlimenticios")
            state.registrosStored = null;
        }
    }
})


export const { SetRegistros, EraseRegistros } = registrosSlice.actions;
export default registrosSlice.reducer;