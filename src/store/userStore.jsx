import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
  },
  devTools: true,
});

export default store;
