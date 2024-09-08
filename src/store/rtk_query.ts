import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// consts
import {
  END_POINTS,
  BASE_URL,
  MOVIE_NOT_NULL_FIELDS_LIST,
  MOVIE_SELECTFIELDS_LIST,
} from "../consts/api";
// utils and Services
import { getSelectFieldsParam, getNotNullFieldsParam } from "../services/utils";
import { queryConstructor } from "../services/queryConstructor";
// types
import { I_API_OBJECT, I_MOVIE, T_OBJ_KEYS } from "./../types/types";
import { responseConstructor } from "../services/responseConstructor";

export const Top250MoviesApi = createApi({
  reducerPath: "Top250MoviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", [import.meta.env.VITE_REACT_API_KEY]);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTop250Movies: builder.query<
      I_API_OBJECT<I_MOVIE>,
      {
        endPoint: string;
        selectFieldList: string[];
        method: T_OBJ_KEYS<typeof queryConstructor>;
        page: number;
      }
    >({
      query: ({ endPoint, selectFieldList, method, page }) =>
        `${endPoint}?${getSelectFieldsParam(
          selectFieldList
        )}${getNotNullFieldsParam(
          MOVIE_NOT_NULL_FIELDS_LIST
        )}${new URLSearchParams(
          queryConstructor[method]({ sortField: "top250", page: `${page}` })
        )}`,
      transformResponse: (response: I_API_OBJECT<I_MOVIE>) => {
        // приводим данные ответа к нужному формату
        return responseConstructor.movie(response)
      },
    }),
  }),
});

export const { useGetTop250MoviesQuery } = Top250MoviesApi;
