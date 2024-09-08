import { I_REVIEW } from "../types/types";

export const reviewByMovieIdResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const reviewList: I_REVIEW[] = docs?.map((review: any) => ({
    id: review?.id ?? 0,
    authorId: review?.authorId ?? 0,
    movieId: review?.movieId ?? 0,
    author: review?.author ?? "Нет данных",
    title: review?.title ?? "Нет данных",
    type: review?.type ?? "Нет данных",
    date: review?.date ?? "Нет данных",
    review: review?.review ?? "Нет данных",
  }));

  return {
    data: reviewList,
    total,
    limit,
    page,
    pages,
  };
};
