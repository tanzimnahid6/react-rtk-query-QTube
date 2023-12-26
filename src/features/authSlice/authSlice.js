import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  userName: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
    },
    logOutUser: (state) => {
      state.email = null;
      state.userName = null;
    },
  },
});

export const { logInUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
