import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../type";

const initialState: UserState = {
  isLogin: JSON.parse(localStorage.getItem("isLogin") || "false"),
};

const userLoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userState: (state) => {
      console.log(state.isLogin);
      state.isLogin = state.isLogin === true ? false : true;
    },
  },
});

export const { userState } = userLoginSlice.actions;
export default userLoginSlice.reducer;
