import { createSlice } from "@reduxjs/toolkit";
import {
  movieThunk,
  movieSearchThunk,
  movieByIdThunk,
  movieIdImagesThunk,
} from "./movieThunks";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  I_MOVIE_STATE,
  T_ACTION_QUERY_PAYLOAD,
  I_API_OBJECT,
  I_MOVIE,
  T_MOVIE_SEARCH,
  I_IMAGE,
  T_QUERY_KEYS,
} from "../types/types";

const initialState = {
  sortField: "",  
  sortType: -1,
  query: "",
  page: 1,
  limit: 10,
  type: "movie",
  genre: "боевик",
  ratingKp: [70, 90],
  ratingIMDB: [70, 90],
  year: [2005, 2024],
  countries: "",
  id: null,
  loading: false,
  error: "",
  total: 0,
  pages: 0,
  movies: [],
  movie: {},
  images: [],
  selectFields: [
    "id",
    "name",
    "enName",
    "description",
    "shortDescription",
    "type",
    "status",
    "year",
    "rating",
    "ageRating",
    "movieLength",
    "genres",
    "countries",
    "poster",
  ],
} as I_MOVIE_STATE;

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    changeMovieStateQueryParams(
      state,
      { payload: { name, value } }: PayloadAction<T_ACTION_QUERY_PAYLOAD>
    ) {
      state[name as keyof I_MOVIE_STATE] = value;
      if (name !== "page") state.page = 1;
    },
    changeMovieStateSelectFields(state, { payload }: PayloadAction<string>) {
      if (state.selectFields.includes(payload)) {         
        state.selectFields = state.selectFields.filter((field) => field !== payload);
        return
      }
        state.selectFields.push(payload);
    },
    movieImagesPageCleanUp: (state) => {
      // state.page = 1;
      // state.sortField = 'rating.kp'
      // state.sortType = -1
      // state.limit = 5
      state.images = []
    },
    cleanUpSingleMovieInfo : (state) => {
      state.movie = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(movieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        movieThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<I_MOVIE[]>>) => {
          state.pages = payload.pages;
          state.total = payload.total;
          state.movies = payload.data;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        movieThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! movieSearchThunk -----------------------------------------
      .addCase(movieSearchThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        movieSearchThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<T_MOVIE_SEARCH[]>>) => {
          state.movies = payload.data;
          state.pages = payload.pages;
          state.total = payload.total;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        movieSearchThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! movieByIdThunk -----------------------------------------
      .addCase(movieByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        movieByIdThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<T_MOVIE_SEARCH[]>>) => {
          state.movie = payload;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        movieByIdThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! movieIdImagesThunk -----------------------------------------
      .addCase(movieIdImagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        movieIdImagesThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<I_IMAGE[]>>) => {
          state.images = payload.data;
          state.pages = payload.pages;
          state.total = payload.total;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        movieIdImagesThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      );
  },
});

export const { changeMovieStateQueryParams, changeMovieStateSelectFields, movieImagesPageCleanUp, cleanUpSingleMovieInfo } =
  movieSlice.actions;
export default movieSlice.reducer;
