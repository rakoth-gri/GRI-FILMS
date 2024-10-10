import { useCallback, useState } from "react";
// service:
import { Server } from "../services/Server";
// services
import { queryConstructor } from "../services/queryConstructor";
// types:
import { T_OBJ_KEYS, I_STUDIO_STATE } from "../types/types";

export const useFetching = () => {
  const [state, setState] = useState<I_STUDIO_STATE>({
    loading: false,
    isOpenFilter: false,
    title: "",
    error: "",
    studios: [],
    page: 1,
    pages: 0,
    limit: 5,
    sortField: "",
    sortType: "-1",
  });

  const fetchData = async (
    url: string,
    queryParams: Record<string, string>,
    method: Exclude<T_OBJ_KEYS<typeof queryConstructor>, "top250" | "image">
  ) => {
    try {
      setState((p) => ({ ...p, loading: true }));
      let res = await Server[method](url, queryParams, method);

      if (res instanceof Object) {
        return setState((p) => ({
          ...p,
          // @ts-ignore
          studios: res.data,
          // @ts-ignore
          pages: res.pages,
          error: "",
        }));
      }
      throw new Error(res);
    } catch (e) {
      if (e instanceof Error)
        return setState((p) => ({ ...p, error: e.message }));
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };

  const changeStudioStateQueryParams = useCallback(
    ({ name, value }: { name: keyof I_STUDIO_STATE; value: unknown }) =>
      setState((p) => ({ ...p, [name]: value })),
    []
  );

  const setIsOpenFilter = useCallback(
    () => setState((p) => ({ ...p, isOpenFilter: !p.isOpenFilter })),
    []
  );

  return {
    loading: state.loading,
    error: state.error,
    studios: state.studios,
    title: state.title,
    page: state.page,
    pages: state.pages,
    sortField: state.sortField,
    sortType: state.sortType,
    limit: state.limit,
    isOpenFilter: state.isOpenFilter,
    fetchData,
    changeStudioStateQueryParams,
    setIsOpenFilter,
  };
};
