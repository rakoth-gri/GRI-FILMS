import { AxiosRequestConfig } from "axios";
import { queryConstructor } from "./queryConstructor";
// types
import { T_OBJ_KEYS } from "../types/types";

const getAxiosConfig = (
  url: string,
  params: Record<string, unknown>,
  method: T_OBJ_KEYS<typeof queryConstructor>
) =>
  ({
    url,
    method: "get",
    baseURL: "https://api.kinopoisk.dev/v1.4/",
    // @ts-ignore
    params: queryConstructor[method](params),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-API-KEY": import.meta.env.VITE_REACT_API_KEY,
    },
  } as AxiosRequestConfig<typeof getAxiosConfig>);

export { getAxiosConfig };
