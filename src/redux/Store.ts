import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./slices/TempFormSlice";
import useReducer from "./slices/UserLoginSlice";

export const store = configureStore({
  reducer: {
    temp: tempReducer,
    user: useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
