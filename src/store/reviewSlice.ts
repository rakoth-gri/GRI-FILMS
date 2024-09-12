import { createSlice } from "@reduxjs/toolkit";
import { reviewByAuthorIdThunk, reviewByMovieIdThunk } from "./reviewThunks";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  T_ACTION_QUERY_PAYLOAD,
  I_API_OBJECT,
  I_REVIEW,
  I_REVIEW_STATE,
} from "../types/types";

const initialState = {
  sortField: "",
  sortType: -1,
  page: 1,
  limit: 5,
  loading: false,
  error: "",
  total: 0,
  pages: 0,
  reviews: [],  
} satisfies I_REVIEW_STATE as I_REVIEW_STATE;

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    changeReviewStateQueryParams(
      state,
      { payload: { name, value } }: PayloadAction<T_ACTION_QUERY_PAYLOAD>
    ) {
      // @ts-ignore
      state[name as keyof I_REVIEW_STATE] = value;
    },
    cleanUpReviewInfo : (state) => {
      state.reviews = []
      state.page = 1
    }
  },
  extraReducers: (builder) => {
    // ! reviewByMovieIdThunk ---------------------------------------------
    builder
      .addCase(reviewByMovieIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        reviewByMovieIdThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<I_REVIEW[]>>) => {
          state.pages = payload.pages;
          state.total = payload.total;
          state.reviews = payload.data;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        reviewByMovieIdThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! reviewByAuthorIdThunk --------------------------------------------
      .addCase(reviewByAuthorIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        reviewByAuthorIdThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<I_REVIEW[]>>) => {
          state.pages = payload.pages;
          state.total = payload.total;
          state.reviews = payload.data;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        reviewByAuthorIdThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
  },
});

export const {changeReviewStateQueryParams} = reviewSlice.actions;
export default reviewSlice.reducer;

