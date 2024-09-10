import { useState } from "react";
// service:
import { Server } from "../services/Server";

export const useFetching = () => {
  const [state, setState] = useState<{
    loading: boolean;
    error: string;
    data: unknown[];
    page: number;
    pages: number;
    limit: number;
  }>({
    loading: false,
    error: "",
    data: [],
    page: 1,
    pages: 0,
    limit: 5,
  });

  const fetchData = async (
    url: string,
    queryParams: Record<string, string>,
    method: keyof typeof Server
  ) => {
    try {
      setState((p) => ({ ...p, loading: true }));
      let res = await Server[method](url, queryParams, method);

      if (res instanceof Object) {
        return setState((p) => ({
          ...p,
          data: res.data,
          pages: res.pages,
          error: "",
        }));
      }
      throw new Error(res);
    } catch (e) {
      if (e instanceof Error)
        return setState((p) => ({ ...p, error: e.message }));
      return "";
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };

  const changeLimit = (limit: number) => setState((p) => ({ ...p, limit }));

  const changePage = (page: number) => setState((p) => ({ ...p, page }));

  return [
    state.loading,
    state.error,
    state.data,
    state.page,
    state.pages,
    fetchData,
    changeLimit,
    changePage,
  ] as const;
};

/*

  const [loading, error, data, page, pages, fetchData, changeLimit, changePage] = useFetching()

  useEffect(() => {
    personId && fetchData(END_POINTS.personAwards, {personId, page, limit}, 'personAwards')
  }, [personId, page, limit]);

  

  */
