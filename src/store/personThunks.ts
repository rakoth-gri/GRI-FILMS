import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { queryConstructor } from "../services/queryConstructor";
import { Server } from "../services/Server";
// types
import {
  I_API_OBJECT,
  I_PERSON_SEARCH,
  T_OBJ_KEYS,
  T_OBJ_VALUES,
  I_PERSON_FULL,
  I_PERSON_AWARDS,
} from "../types/types";
import { END_POINTS } from "../consts/api";
import { getRatingParamValue } from "../services/utils";

const personThunk = createAsyncThunk<
  string | I_API_OBJECT<I_PERSON_FULL[]>,
  {
    url: T_OBJ_VALUES<typeof END_POINTS>;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "person/personThunk",
  async ({ url, method }, { rejectWithValue, getState }) => {
    const {
      page,
      limit,
      sortField,
      selectFields,
      sex,
      sortType,
      // growth,
      age,
      // countAwards,
      profession,
      // moviesRating,
    } = getState().personSliceReducer;
    const res = await Server[method](
      url,
      {
        page: `${page}`,
        limit: `${limit}`,
        sortField,
        sortType: `${sortType}`,        
        sex,
        // growth: growth.join('-'),
        age: age.join('-'),
        // countAwards: countAwards.join('-'),
        profession,
        // moviesRating: getRatingParamValue(moviesRating),
      },
      method,
      selectFields
    );

    if (res instanceof Object) {
      return res as I_API_OBJECT<I_PERSON_FULL[]>;
    }
    return rejectWithValue(res as string);
  }
);

// ! personSearchThunk ----------------------

const personSearchThunk = createAsyncThunk<
  string | I_API_OBJECT<I_PERSON_SEARCH[]>,
  {
    url: T_OBJ_VALUES<typeof END_POINTS>;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "person/personSearchThunk",
  async ({ url, method }, { rejectWithValue, getState }) => {
    const { query, page, limit } = getState().personSliceReducer;
    const res = await Server[method](
      url,
      { query, page: `${page}`, limit: `${limit}` },
      method
    );

    if (res instanceof Object) {
      return res as I_API_OBJECT<I_PERSON_SEARCH[]>;
    }
    return rejectWithValue(res as string);
  }
);

const personByIdThunk = createAsyncThunk<
  string | I_PERSON_FULL,
  {
    url: string;
    id: number;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "person/personByIdThunk",
  async ({ url, id, method }, { rejectWithValue }) => {
    const res = await Server[method](url, { id: `${id}` }, method);
    if (res instanceof Object) {
      return res as I_PERSON_FULL;
    }
    return rejectWithValue(res as string);
  }
);

const personAwardsThunk = createAsyncThunk<
  string | I_API_OBJECT<I_PERSON_AWARDS[]>,
  {
    url: string;
    personId: string;
    method: T_OBJ_KEYS<typeof queryConstructor>;
  },
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "person/personAwardsThunk",
  async ({ url, personId, method }, { rejectWithValue, getState }) => {
    const { limit, sortType, page } = getState().personSliceReducer;

    const res = await Server[method](
      url,
      {
        personId,        
        limit: `${limit}`,
        sortType: `${sortType}`,
        page: `${page}`,
      },
      method
    );
    if (res instanceof Object) {
      return res as I_API_OBJECT<I_PERSON_AWARDS[]>;
    }
    return rejectWithValue(res as string);
  }
);

export { personByIdThunk, personSearchThunk, personAwardsThunk, personThunk };
