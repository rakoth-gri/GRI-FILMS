// types
import { T_MOVIE_SEARCH } from "../types/types";
// consts:
import FAKE from "../assets/await.jpg";

export const movieSearchResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  // @ts-ignore
  const movieSearchList: T_MOVIE_SEARCH[] = docs?.map((movie: any) => ({
    id: movie?.id || 0,
    name: movie?.name || "Нет данных",
    enName: movie?.enName || "Нет данных",
    type: movie?.type || "Нет данных",
    year: movie?.year || 0,
    description: movie?.description || "Нет данных",
    shortDescription: movie?.shortDescription || "Нет данных",
    status: movie?.status || "Нет данных",
    ratingKp: movie?.rating?.kp || 0,
    ratingImdb: movie?.rating?.imdb || 0,
    votesKp: movie?.votes?.kp || 0,
    votesImdb: movie?.votes?.imdb || 0,
    movieLength: movie?.movieLength || 0,
    ageRating: movie?.ageRating || 0,
    genres: movie?.genres?.length
      ? movie.genres.map((genre: { name: string }) => genre.name)
      : [],
    countries: movie?.countries?.length
      ? movie.countries.map((country: { name: string }) => country.name)
      : [],
    poster: movie?.poster?.previewUrl ?? FAKE,
    top250: movie?.top250 || 0,
  }));

  return {
    data: movieSearchList,
    total,
    limit,
    page,
    pages,
  };
};
