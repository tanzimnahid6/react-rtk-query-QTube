import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

const darkSlice = createSlice({
  name: "darkMood",
  initialState,
  reducers: {
    toggleDarkMood: (state, action) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleDarkMood } = darkSlice.actions;

export default darkSlice.reducer;
