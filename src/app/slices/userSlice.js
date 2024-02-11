import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userLogged: JSON.parse(localStorage.getItem("userData"))
    },
    reducers:{
        LoggedIn: (state, action) => {
            state.userLogged = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload))
        },
        LoggedOut: (state) => {
            state.userLogged = null;
            localStorage.removeItem("userData");
        }
    }
})


export const { LoggedIn, LoggedOut } = userSlice.actions;
export default userSlice.reducer;