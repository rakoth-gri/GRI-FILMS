// types
import {
  I_SIMILAR_MOVIES_PROP,
  I_MOVIE,
  I_MOVIE_PERSONS_PROP,
  I_FEES,
} from "../types/types";
// consts:
import FAKE from "../assets/await.jpg";

export const movieResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const moviesList: I_MOVIE[] = docs?.map((movie: any) => ({
    id: movie?.id || 0,
    name: movie?.name || "Нет данных",
    enName: movie?.enName || "Нет данных",
    type: movie?.type || "Нет данных",
    year: movie?.year || 0,
    videos: movie?.videos?.trailers?.length
      ? movie?.videos?.trailers[0].url
      : "Нет данных",
    description: movie?.description || "Нет данных",
    shortDescription: movie?.shortDescription || "Нет данных",
    slogan: movie?.slogan || "Нет данных",
    status: movie?.status || "Нет данных",
    ratingKp: movie?.rating?.kp || 0,
    ratingImdb: movie?.rating?.imdb || 0,
    votesKp: movie?.votes?.kp?.toLocaleString() || 0,
    votesImdb: movie?.votes?.imdb?.toLocaleString() || 0,
    movieLength: movie?.movieLength || 0,
    ageRating: movie?.ageRating || 0,
    genres: movie?.genres?.length
      ? movie.genres.map((genre: { name: string }) => genre.name)
      : [],
    countries: movie?.countries?.length
      ? movie.countries.map((country: { name: string }) => country.name)
      : [],
    persons: movie?.persons?.length
      ? movie.persons.map(
          ({
            id,
            photo,
            name,
            enName,
            description,
            profession,
          }: I_MOVIE_PERSONS_PROP): I_MOVIE_PERSONS_PROP => ({
            id,
            photo: photo || FAKE,
            name: name ?? "Нет данных",
            enName: enName ?? "Нет данных",
            description: description ?? "Нет данных",
            profession: profession ?? "Нет данных",
          })
        )
      : [],
    premiereWorld: movie?.premiere?.world || "",
    premiereRussia: movie?.premiere?.russia || "",
    budget: movie?.budget?.value
      ? movie.budget.value.toLocaleString() + " " + movie.budget.currency
      : "Нет данных",
    similarMovies: movie?.similarMovies?.length
      ? movie.similarMovies.map(
          ({
            id,
            type,
            name,
            enName,
            poster,
            rating,
            year,
          }: I_SIMILAR_MOVIES_PROP): I_SIMILAR_MOVIES_PROP => ({
            id,
            type: type ?? "Нет данных",
            name: name ?? "Нет данных",
            enName: enName ?? "Нет данных",
            poster: { url: poster?.previewUrl ?? FAKE },
            rating: { kp: rating?.kp || 0, imdb: rating?.imdb || 0 },
            year,
          })
        )
      : [],
    sequelsAndPrequels: movie?.sequelsAndPrequels?.length
      ? movie.sequelsAndPrequels.map(
          ({
            id,
            type,
            name,
            enName,
            poster,
            year,
            rating,
          }: I_SIMILAR_MOVIES_PROP): I_SIMILAR_MOVIES_PROP => ({
            id,
            type: type ?? "Нет данных",
            name: name ?? "Нет данных",
            enName: enName ?? "Нет данных",
            poster: { url: poster?.previewUrl ?? FAKE },
            rating: { kp: rating?.kp || 0, imdb: rating?.imdb || 0 },
            year,
          })
        )
      : [],
    poster: movie?.poster?.previewUrl ?? FAKE,
    feesWorld: (movie?.fees as I_FEES)?.world?.value
      ? movie.fees.world.value.toLocaleString() +
        " " +
        movie.fees?.world?.currency
      : "Нет данных",
    feesRussia: (movie?.fees as I_FEES)?.russia?.value
      ? movie.fees.russia.value.toLocaleString() +
        " " +
        movie.fees?.russia?.currency
      : "Нет данных",
    top250: movie?.top250 || 0,
    facts: movie?.facts?.length ? movie?.facts?.map((f: {value: string}) => f.value) : []
  }));

  return {
    data: moviesList,
    total,
    limit,
    page,
    pages,
  };
};
