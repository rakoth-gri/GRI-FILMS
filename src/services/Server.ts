import axios from "axios";
import { queryConstructor } from "./queryConstructor";
import { responseConstructor } from "./responseConstructor";
import { getAxiosConfig } from "./getAxiosConfig";
// consts
import {
  REVIEW_SELECTFIELDS_LIST,
  IMAGE_SELECTFIELDS_LIST,
  PERSON_AWARDS_SELECTFIELDS_LIST,
  MOVIE_NOT_NULL_FIELDS_LIST,
  BASE_URL,
} from "../consts/api";
// utils
import { getSelectFieldsParam, getNotNullFieldsParam } from "./utils";
// types:
import {
  T_OBJ_KEYS,
  I_API_OBJECT,
  I_MOVIE,
  T_MOVIE_SEARCH,
  I_PERSON_FULL,
  I_PERSON_SEARCH,
  I_PERSON_AWARDS,
  I_IMAGE,
  I_REVIEW,
} from "../types/types";

class Server {
  static fetchindDataBySelectFields = async (
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof queryConstructor>,
    selectFieldList: string[]
  ) => {
    return await axios({
      url: `${BASE_URL}${url}?${getSelectFieldsParam(selectFieldList)}${
        method === "movie"
          ? getNotNullFieldsParam(MOVIE_NOT_NULL_FIELDS_LIST)
          : ""
      }${new URLSearchParams(queryConstructor[method](queryParams))}`,
      method: "get",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "X-API-KEY": import.meta.env.VITE_REACT_API_KEY,
      },
    });
  };

  //! MOVIE  -----------------------------------------------------
  static async movie(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>,
    selectFields: string[]
  ): Promise<string | I_API_OBJECT<I_MOVIE[]>> {
    try {
      let res = await Server.fetchindDataBySelectFields(
        url,
        queryParams,
        method,
        selectFields
      );
      if (res.status !== 200) throw new Error(res.data);
      return responseConstructor[method](res.data) as I_API_OBJECT<I_MOVIE[]>;
    } catch (e) {
      return (e as Error).message as string;
    }
  }

  static async movieSearch(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof queryConstructor>
  ): Promise<string | I_API_OBJECT<T_MOVIE_SEARCH[]>> {
    try {
      let res = await axios(getAxiosConfig(url, queryParams, method));
      if (res.status !== 200) {
        throw new Error(res.data);
      }
      return responseConstructor[method](res.data) as I_API_OBJECT<
        T_MOVIE_SEARCH[]
      >;
    } catch (e) {
      return (e as Error).message as string;
    }
  }

  static async movieById(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ): Promise<string | I_MOVIE> {
    try {
      let res = await axios(getAxiosConfig(url, queryParams, method));
      if (res.status !== 200) {
        throw new Error(res.data);
      }
      return responseConstructor[method](res.data) as I_MOVIE;
    } catch (e) {
      return (e as Error).message as string;
    }
  }

  //! PERSON  -----------------------------------------------------

  static async personSearch(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ): Promise<string | I_API_OBJECT<I_PERSON_SEARCH[]>> {
    try {
      let res = await axios(getAxiosConfig(url, queryParams, method));
      if (res.status !== 200) {
        throw new Error(res.data);
      }
      return responseConstructor[method](res.data) as I_API_OBJECT<
        I_PERSON_SEARCH[]
      >;
    } catch (e) {
      return (e as Error).message;
    }
  }

  static async personById(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ): Promise<I_PERSON_FULL | string> {
    try {
      let res = await axios(getAxiosConfig(url, queryParams, method));
      if (res.status !== 200) {
        throw new Error(res.data);
      }
      return responseConstructor[method](res.data) as I_PERSON_FULL;
    } catch (e) {
      return (e as Error).message as string;
    }
  }

  static async personAwards(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ): Promise<string | I_API_OBJECT<I_PERSON_AWARDS[]>> {
    try {
      let res = await Server.fetchindDataBySelectFields(
        url,
        queryParams,
        method,
        PERSON_AWARDS_SELECTFIELDS_LIST
      );
      if (res.status !== 200) throw new Error(res.data);
      return responseConstructor[method](res.data) as I_API_OBJECT<
        I_PERSON_AWARDS[]
      >;
    } catch (e) {
      return (e as Error).message as string;
    }
  }

  //! IMAGE  -----------------------------------------------------

  static async image(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ) {
    try {
      let res = await Server.fetchindDataBySelectFields(
        url,
        queryParams,
        method,
        IMAGE_SELECTFIELDS_LIST
      );
      if (res.status !== 200) throw new Error(res.data);
      return responseConstructor[method](res.data) as I_API_OBJECT<I_IMAGE[]>;
    } catch (e) {
      return (e as Error).message as string;
    }
  }

  //! REVIEW  -----------------------------------------------------

  static async reviewByMovieId(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ): Promise<string | I_API_OBJECT<I_REVIEW[]>> {
    try {
      let res = await Server.fetchindDataBySelectFields(
        url,
        queryParams,
        method,
        REVIEW_SELECTFIELDS_LIST
      );
      if (res.status !== 200) throw new Error(res.data);
      return responseConstructor[method](res.data) as I_API_OBJECT<I_REVIEW[]>;
    } catch (e) {
      return (e as Error).message;
    }
  }

  static async reviewByAuthorId(
    url: string,
    queryParams: Record<string, string>,
    method: T_OBJ_KEYS<typeof responseConstructor>
  ): Promise<string | I_API_OBJECT<I_REVIEW[]>> {
    try {
      let res = await Server.fetchindDataBySelectFields(
        url,
        queryParams,
        method,
        REVIEW_SELECTFIELDS_LIST
      );
      if (res.status !== 200) throw new Error(res.data);
      return responseConstructor[method](res.data) as I_API_OBJECT<I_REVIEW[]>;
    } catch (e) {
      return (e as Error).message;
    }
  }
}

export { Server };
