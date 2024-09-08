import { combineReducers } from "@reduxjs/toolkit";
import movieSliceReducer from "./movieSlice";
import personSliceReducer from "./personSlice";
import reviewSliceReducer from "./reviewSlice";

const rootReducer = {
  movieSliceReducer,
  personSliceReducer,
  reviewSliceReducer,
};

export { rootReducer };
