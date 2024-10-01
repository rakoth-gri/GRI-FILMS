// types
import { I_STUDIO } from "../types/types";
// consts:
import FAKE from "../assets/await.jpg";

export const studioResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const studioList: I_STUDIO[] = docs?.map((studio: any) => ({
    id: studio?.id ?? "",
    subType: studio?.subType ?? "",
    title: studio?.title ?? "",
    type: studio?.type ?? "",
    movies:
      studio?.movies ? studio?.movies?.map((item: { id: number }) => item.id): [],
    updatedAt: studio?.updatedAt || "",
    createdAt: studio?.createdAt || "",
  }));

  return {
    data: studioList,
    total,
    limit,
    page,
    pages,
  };
};
