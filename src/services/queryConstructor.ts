// utils
import { getRatingParamValue } from "./utils";
// types
import { 
  T_MOVIE_TYPES,
  T_MOVIE_SORTFIELD,
  T_PERSON_SORTFIELD,
  T_PERSON_PROFESSIONS,
  T_PERSON_AWARDS_SORTFIELD,
  T_REVIEW_SORTFIELD,
  T_IMAGES_SORTFIELD,
  T_GENRES,
  T_MOVIE_COUNTRIES,
} from "./../types/types";

// ! Генерация объектов query-параметров для разных энд-поинтов: ---
export const queryConstructor = {
  //! MOVIE  -----------------------------------------------------
  movie: ({
    // поле 'status' исключено, т.к. у большинства объектов --> null
    sortField,
    sortType = "-1",
    page = "1",
    limit = "10",
    type = "movie",
    genre = "комедия",
    countries,
    ratingKp,
    ratingIMDB,
    year,
  }: {
    sortField: T_MOVIE_SORTFIELD;
    sortType: "-1" | "1";
    page: string;
    limit: string;
    type: T_MOVIE_TYPES;
    genre: T_GENRES;
    countries: T_MOVIE_COUNTRIES;
    ratingKp: number[];
    ratingIMDB: number[];
    year: number[];
  }) => ({
    sortField: sortField || "rating.imdb",
    sortType,
    page,
    limit,
    type,
    ["genres.name"]: genre,
    ["countries.name"]: countries || "США",
    ["rating.kp"]: getRatingParamValue(ratingKp),
    ["rating.imdb"]: getRatingParamValue(ratingIMDB),
    year: year.join('-'),
  }),
  movieSearch: ({ page = "1", limit = "3", query = "" }) => ({
    page,
    limit,
    query,
  }),
  movieById: ({ id }: { id: string }) => ({
    id,
  }),
  //! PERSON  -----------------------------------------------------
  person: ({
    page = "1",
    limit = "5",
    sortField,
    sortType = "-1",
    sex = "Мужской",
    // growth = [168, 180],
    age = [35, 50],
    // countAwards = [10, 40],
    profession,
    // moviesRating = [5, 10],
  }: {
    page: string;
    limit: string;
    sortField: T_PERSON_SORTFIELD;
    sortType: "-1" | "1";
    sex: "Мужской" | "Женский";
    growth?: number[];
    age: number[];
    countAwards?: number[];
    profession: T_PERSON_PROFESSIONS;
    moviesRating?: number[];
  }) => ({
    page,
    limit,
    sortField: sortField || "name",
    sortType,
    sex,
    // growth: growth.join('-'),
    age: age.join('-'),
    // countAwards: countAwards.join('-'),
    ["profession.value"]: profession || "Актер",
    // ["movies.rating"]: getRatingParamValue(moviesRating),
  }),
  personById: ({ id }: { id: string }) => ({
    id,
  }),
  personSearch: ({
    page = "1",
    limit = "3",
    query,
  }: Record<"page" | "limit" | "query", string>) => ({
    page,
    limit,
    query: query || "Арнольд Шварцнеггер",
  }),
  personAwards: ({
    page = "1",
    limit = "5",
    sortType = "-1",
    personId = "8816",
    sortField = "winning",
  }: {
    page: string;
    limit: string;
    sortType: "-1" | "1";
    personId: string;
    sortField: T_PERSON_AWARDS_SORTFIELD;
  }) => ({
    personId,
    sortField,
    sortType,
    page,
    limit,
  }),
  //! IMAGE ----- -----------------------------------------------------
  image: ({
    sortField = "updatedAt",
    movieId,
    page = "1",
    limit = "10",
    sortType = "-1",
  }: {
    sortType: "-1" | "1";
    sortField: T_IMAGES_SORTFIELD;
    movieId: string;
    page: string;
    limit: string;
  }) => ({
    sortField,
    movieId,
    page,
    limit,
    sortType,
    height: "360-1920",
    width: "320-1080",
  }),
  //! REVIEW -----  -----------------------------------------------------
  reviewByMovieId: ({
    sortField,
    movieId,
    page = "1",
    limit = "10",
    sortType = "-1",
  }: {
    sortField: T_REVIEW_SORTFIELD;
    movieId: string;
    page: string;
    limit: string;
    sortType: "-1" | "1";
  }) => ({
    movieId,
    page,
    limit,
    sortField: sortField || "createdAt",
    sortType,
  }),
  top250: ({
    sortField = "top250",
    sortType = "1",
    page = "1",
    limit = "15",
    type = "movie",
    lists = "top250",
  }: {
    sortField: "top250";
    sortType?: "-1" | "1";
    page: string;
    limit?: string;
    type?: T_MOVIE_TYPES;
    lists?: string;
  }) => ({
    sortField,
    sortType,
    page,
    limit,
    type,
    lists,
  }),
};

export type T_QueryConctructor_Objects =
  | ReturnType<typeof queryConstructor.movie>
  | ReturnType<typeof queryConstructor.movieSearch>
  | ReturnType<typeof queryConstructor.movieById>
  | ReturnType<typeof queryConstructor.personSearch>
  | ReturnType<typeof queryConstructor.personById>
  | ReturnType<typeof queryConstructor.personAwards>
  | ReturnType<typeof queryConstructor.reviewByMovieId>
  | ReturnType<typeof queryConstructor.image>
  | ReturnType<typeof queryConstructor.person>;
