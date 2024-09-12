import { createSlice } from "@reduxjs/toolkit";
// types
import {} from "../types/types";
// consts
import { ROOT } from "../consts/api";

const initialState = {
  theme: "light",
} as { theme: "light" | "dark" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeThemeParam(state, {payload}) {
      state.theme =
        state.theme === "light"
          ? (state.theme = "dark")
          : (state.theme = "light");
    },
  },
});

export const { changeThemeParam } = themeSlice.actions;
export default themeSlice.reducer;
