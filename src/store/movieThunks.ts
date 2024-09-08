import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { queryConstructor } from "../services/queryConstructor";
import { Server } from "../services/Server";
// types
import {
  I_API_OBJECT,
  I_MOVIE,
  T_OBJ_KEYS,
  T_OBJ_VALUES,
  T_MOVIE_SEARCH,
  I_IMAGE,
} from "../types/types";
// consts
import { END_POINTS } from "../consts/api";
// utils
import { getRatingParamValue } from "../services/utils";

const movieThunk = createAsyncThunk<
  string | I_API_OBJECT<I_MOVIE[]>,
  {
    url: T_OBJ_VALUES<typeof END_POINTS>;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "movie/movieThunk",
  async ({ url, method }, { rejectWithValue, getState }) => {
    const {
      sortField,
      sortType,
      page,
      limit,
      type,
      genre,
      countries,
      selectFields,
      // ratingIMDB,
      ratingKp,
    } = getState().movieSliceReducer;

    const res = await Server[method](
      url,
      {
        sortField,
        sortType: `${sortType}`,
        page: `${page}`,
        limit: `${limit}`,
        type,
        genre,
        countries,
        ratingKp: getRatingParamValue(ratingKp),
        // ratingIMDB: getRatingParamValue(ratingIMDB),
      },
      method,
      selectFields
    );

    if (res instanceof Object) {
      return res as I_API_OBJECT<I_MOVIE[]>;
    }
    return rejectWithValue(res as string);
  }
);

const movieSearchThunk = createAsyncThunk<
  string | I_API_OBJECT<T_MOVIE_SEARCH[]>,
  {
    url: T_OBJ_VALUES<typeof END_POINTS>;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "movie/movieSearchThunk",
  async ({ url, method }, { rejectWithValue, getState }) => {
    const { query, page, limit } = getState().movieSliceReducer;

    const res = await Server[method](
      url,
      {
        query,
        page: page.toString(),
        limit: `${limit}`,
      },
      method
    );

    if (res instanceof Object) {
      return res as I_API_OBJECT<T_MOVIE_SEARCH[]>;
    }
    return rejectWithValue(res as string);
  }
);

const movieByIdThunk = createAsyncThunk<
  string | I_MOVIE,
  {
    url: string;
    id: number;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>("movie/movieByIdThunk", async ({ url, id, method }, { rejectWithValue }) => {
  const res = await Server[method](url, { id: `${id}` }, method);
  if (res instanceof Object) {
    return res as I_MOVIE;
  }
  return rejectWithValue(res as string);
});

// ! movieImageThunk ------------

const movieIdImagesThunk = createAsyncThunk<
  string | I_API_OBJECT<I_IMAGE[]>,
  {
    url: string;
    movieId: string;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "movie/movieIdImagesThunk",
  async ({ url, movieId, method }, { rejectWithValue, getState }) => {
    const { limit, page, sortType } = getState().movieSliceReducer;

    const res = await Server[method](
      url,
      { movieId, limit: `${limit}`, page: `${page}`, sortType },
      method
    );
    if (res instanceof Object) {
      return res as I_API_OBJECT<I_IMAGE[]>;
    }
    return rejectWithValue(res as string);
  }
);



export { movieThunk, movieSearchThunk, movieByIdThunk, movieIdImagesThunk };
