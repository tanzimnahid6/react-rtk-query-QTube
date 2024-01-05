import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingUi: true,
};

const loaderSlice = createSlice({
  name: "onAuthChangedLoader",
  initialState,
  reducers: {
    loadingState: (state, action) => {
      state.loadingUi = false;
    },
  },
});

export const { loadingState } = loaderSlice.actions;

export default loaderSlice.reducer;
