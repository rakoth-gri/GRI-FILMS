import { ReactNode, memo } from "react";
import { MyError } from "../MyError/MyError";

interface I_Render<T> {
  list: T[];
  loading: boolean;
  error: string;
  cb: (item: T, i?: number) => ReactNode;
}

function Render<T extends { id: number | string }>({
  list,
  loading,
  error,
  cb,
}: I_Render<T>) {
  return list.length && !loading ? (
    list.map(cb)
  ) : !list.length && !error ? (
    <MyError> по вашему запросу пока ничего не найдено... </MyError>
  ) : (
    <MyError> {error} </MyError>
  );
}

export default memo(Render)
