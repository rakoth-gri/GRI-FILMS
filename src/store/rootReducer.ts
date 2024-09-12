import { combineReducers } from "@reduxjs/toolkit";
import movieSliceReducer from "./movieSlice";
import personSliceReducer from "./personSlice";
import reviewSliceReducer from "./reviewSlice";
import themeSliceReducer from "./themeSlice";

const rootReducer = {
  movieSliceReducer,
  personSliceReducer,
  reviewSliceReducer,
  themeSliceReducer,
};

export { rootReducer };
