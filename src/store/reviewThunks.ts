import { createAsyncThunk } from "@reduxjs/toolkit";
import { queryConstructor } from "../services/queryConstructor";
import { Server } from "../services/Server";
// types
import { RootState } from "./store";
import {
  I_API_OBJECT,
  T_OBJ_KEYS,
  T_OBJ_VALUES,
  I_REVIEW,
} from "../types/types";
// consts:
import { END_POINTS } from "../consts/api";

const reviewByMovieIdThunk = createAsyncThunk<
  string | I_API_OBJECT<I_REVIEW[]>,
  {
    url: T_OBJ_VALUES<typeof END_POINTS>;
    method: T_OBJ_KEYS<typeof queryConstructor>;
    movieId: string;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "review/reviewByMovieIdThunk",
  async ({ url, movieId, method }, { rejectWithValue, getState }) => {
    const { limit, sortField, sortType, page } = getState().reviewSliceReducer;

    

    const res = await Server[method](
      url,
      {
        movieId,
        limit: `${limit}`,
        sortField,
        sortType: `${sortType}`,
        page: `${page}`,
      },
      method
    );

    if (res instanceof Object) {
      return res as I_API_OBJECT<I_REVIEW[]>;
    }
    return rejectWithValue(res as string);
  }
);

const reviewByAuthorIdThunk = createAsyncThunk<
  string | I_API_OBJECT<I_REVIEW[]>,
  {
    url: string;
    authorId: string;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "review/reviewByAuthorIdThunk",
  async ({ url, authorId, method }, { rejectWithValue, getState }) => {
    const { limit, sortField, sortType, page } = getState().reviewSliceReducer;

    const res = await Server[method](
      url,
      {
        authorId,
        limit: `${limit}`,
        sortField,
        sortType: `${sortType}`,
        page: `${page}`,
      },
      method
    );
    if (res instanceof Object) {
      return res as I_API_OBJECT<I_REVIEW[]>;
    }
    return rejectWithValue(res as string);
  }
);

export { reviewByAuthorIdThunk, reviewByMovieIdThunk };
