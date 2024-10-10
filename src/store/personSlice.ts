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
  awardsSortField: "",
  sortType: -1,
  awardsSortType: -1,
  page: 1,
  awardsPage: 1,
  query: "",
  limit: 10,
  awardsLimit: 10,
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
      // @ts-ignore
      state[name as keyof I_PERSON_STATE] = value;
      if (name !== "page" && name !== "awardsPage") state.page = 1;
    },
    changePersonSex(state, { payload }: PayloadAction<"sex">) {
      state[payload] = state.sex === "Мужской" ? "Женский" : "Мужской";
    },
    cleanUpSinglePersonInfo(state) {
      state.personAwards = [];
      state.person = {};
      state.awardsPage = 1;
      state.awardsLimit = 10;
      state.awardsSortType = -1;
      state.awardsSortField = "";
    },
    cleanUpPersonsInfo(state) {},
  },
  extraReducers: (builder) => {
    builder
      // ! personThunk -----------------------------------------
      .addCase(personThunk.pending, (state) => {
        state.loading = true;
      })
      // @ts-ignore
      .addCase(
        personThunk.fulfilled,
        (state, { payload }: PayloadAction<I_API_OBJECT<I_PERSON_FULL[]>>) => {
          state.persons = payload.data;
          state.total = payload.total;
          state.pages = payload.pages;
          state.error = "";
          state.loading = false;
        }
      )
      // @ts-ignore
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
      // @ts-ignore
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
      // @ts-ignore
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
      // @ts-ignore
      .addCase(
        personByIdThunk.fulfilled,
        (state, { payload }: PayloadAction<I_PERSON_FULL>) => {
          state.person = payload;
          state.error = "";
          state.loading = false;
        }
      )
      // @ts-ignore
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
      // @ts-ignore
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
      // @ts-ignore
      .addCase(
        personAwardsThunk.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload;
          state.loading = false;
        }
      );
  },
});

export const {
  changePersonStateQueryParams,
  cleanUpSinglePersonInfo,
  changePersonSex,
  cleanUpPersonsInfo,
} = personSlice.actions;
export default personSlice.reducer;
