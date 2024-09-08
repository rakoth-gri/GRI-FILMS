import { I_IMAGE } from "../types/types";
import FAKE from "../assets/await.jpg"

export const imageResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const imageList: I_IMAGE[] = docs?.map((image: any) => ({
    id: image?.id ?? "Нет данных",
    url: image?.url ?? FAKE,
    height: image?.height ?? 0,
    width: image?.width ?? 0,
    updatedAt: image?.updatedAt ?? "Нет данных",
    type: image?.type ?? "Нет данных",
    movieId: image?.movieId ?? 0,
  }));

  return {
    data: imageList,
    total,
    limit,
    page,
    pages,
  };
};
