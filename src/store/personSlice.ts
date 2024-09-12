import { createSlice } from "@reduxjs/toolkit";
import {
  personThunk,
  personByIdThunk,
  personSearchThunk,
  personAwardsThunk,
} from "./personThunks";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  T_ACTION_QUERY_PAYLOAD,
  I_API_OBJECT,
  I_PERSON_SEARCH,
  I_PERSON_STATE,
  I_PERSON_FULL,
  I_PERSON_AWARDS,
} from "../types/types";
// consts
import { PERSON_SELECTFIELDS_LIST } from "../consts/api";

const initialState = {
  selectFields: PERSON_SELECTFIELDS_LIST,
  sortField: "countAwards",
  sortType: -1,
  page: 1,
  query: "",
  limit: 10,
  id: 0,
  loading: false,
  error: "",
  total: 0,
  pages: 0,
  personAwards: [],
  person: {},
  persons: [],
  sex: "Мужской",
  // growth: [168, 180],
  age: [5, 100],
  // countAwards: [1, 30],
  profession: "",
  // moviesRating: [70,90],
} satisfies I_PERSON_STATE as I_PERSON_STATE;

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    changePersonStateQueryParams(
      state,
      { payload: { name, value } }: PayloadAction<T_ACTION_QUERY_PAYLOAD>
    ) {
      state[name as keyof I_PERSON_STATE] = value;
      if (name !== "page") state.page = 1;
    },
    changePersonSex(state, {payload}: PayloadAction<keyof I_PERSON_STATE>) {
      console.log(payload);
      
      state[payload] = state.sex === 'Мужской' ? 'Женский' : 'Мужской'
    },
    cleanUpSinglePersonInfo(state) {
      state.personAwards = [];
      state.person = {};
      state.sortField = "countAwards";
      state.sortType = -1;
      state.limit = 5;
    },
  },
  extraReducers: (builder) => {
    builder
      // ! personThunk -----------------------------------------
      .addCase(personThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        personThunk.fulfilled,
        (
          state,
          { payload }: PayloadAction<I_API_OBJECT<I_PERSON_FULL[]>>
        ) => {
          state.persons = payload.data;
          state.total = payload.total;
          state.pages = payload.pages;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        personThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! personSearchThunk -----------------------------------------
      .addCase(personSearchThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        personSearchThunk.fulfilled,
        (
          state,
          { payload }: PayloadAction<I_API_OBJECT<I_PERSON_SEARCH[]>>
        ) => {
          state.persons = payload.data;
          state.total = payload.total;
          state.pages = payload.pages;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        personSearchThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! personByIdThunk -----------------------------------------
      .addCase(personByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        personByIdThunk.fulfilled,
        (state, { payload }: PayloadAction<I_PERSON_FULL>) => {
          state.person = payload;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        personByIdThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      )
      // ! personAwardsThunk -----------------------------------------
      .addCase(personAwardsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        personAwardsThunk.fulfilled,
        (
          state,
          { payload }: PayloadAction<I_API_OBJECT<I_PERSON_AWARDS[]>>
        ) => {
          state.personAwards = payload.data;
          state.total = payload.total;
          state.pages = payload.pages;
          state.error = "";
          state.loading = false;
        }
      )
      .addCase(
        personAwardsThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      );
  },
});

export const { changePersonStateQueryParams, cleanUpSinglePersonInfo, changePersonSex } =
  personSlice.actions;
export default personSlice.reducer;
