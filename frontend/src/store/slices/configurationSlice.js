import { createSlice } from "@reduxjs/toolkit";

const savedConfigurations = JSON.parse(
  localStorage.getItem("lps_configurations") || "[]"
);

const configurationSlice = createSlice({
  name: "configurations",

  initialState: {
    items: savedConfigurations
  },

  reducers: {

    addConfiguration(state, action) {

      state.items.unshift(action.payload);

      localStorage.setItem(
        "lps_configurations",
        JSON.stringify(state.items)
      );
    }

  }
});

export const {
  addConfiguration
} = configurationSlice.actions;

export default configurationSlice.reducer;