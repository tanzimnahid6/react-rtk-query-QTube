import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authReducer from "../features/authSlice/authSlice";
import darkMoodReducer from "../features/darkMoodSlice/darkSlice";
import loaderReducer from "../features/onAuthChangedLoader/loaderSlice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    dark: darkMoodReducer,
    loaderUi:loaderReducer
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
