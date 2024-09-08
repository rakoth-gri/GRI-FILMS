import { ReactNode } from "react";
import { MyError } from "../MyError/MyError";

interface I_Render<T> {
  list: T[];
  loading: boolean;
  error: string;
  cb: (item: T) => ReactNode;
}

export function Render<T extends { id: number | string }>({
  list,
  loading,
  error,
  cb,
}: I_Render<T>) {
  return list.length && !loading ? (
    list.map(cb)
  ) : !list.length && !error ? (
    <MyError> По Вашему запросу ничего не найдено... </MyError>
  ) : (
    <MyError> {error} </MyError>
  );
}
