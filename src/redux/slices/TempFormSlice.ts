import { createSlice } from "@reduxjs/toolkit";

export interface TemperatureState {
  unit: "C" | "F";
}

const initialState: TemperatureState = {
  unit: (localStorage.getItem("tempUnit") as "C" | "F") || "C",
};

const tempSlice = createSlice({
  name: "temperature",
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "C" ? "F" : "C";
      localStorage.setItem("tempUnit", state.unit);
    },
  },
});

export const { toggleUnit } = tempSlice.actions;
export default tempSlice.reducer;
