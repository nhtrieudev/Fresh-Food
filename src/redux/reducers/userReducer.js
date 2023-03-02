import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userID: null,
        email: null,
        username: null,
        password: null,
    },
    reducers: {
        activeUser: (state, action) => {
            state.isLoggedIn = true;
            state.userID = action.payload.userID;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        removeUser: (state) => {
            state.isLoggedIn = false;
            state.userID = null;
            state.username = null;
            state.email = null;
            state.password = null;
        }

    }
})

export const { activeUser, removeUser } = userReducer.actions;
export default userReducer.reducer;