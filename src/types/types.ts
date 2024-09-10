import { FC } from "react";

// ! Общие сущности ----
export type T_SELECT = Record<"value" | "text", unknown>;

export interface I_PAGINATION {
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export type T_QUERY_KEYS =
  | "sortField"
  | "sortType"
  | "page"
  | "type"
  | "genre"
  | "countries"
  | "query"
  | "id"
  | "limit";

// ! Универсальные типы --------
export type T_OBJ_KEYS<T extends object> = keyof T;

export interface I_API_OBJECT<T> extends I_PAGINATION {
  data: T;
}

export type T_OBJ_VALUES<T extends object> = T[keyof T];

export type T_OBJECT<T extends object> = { [K in keyof T]: T[K] };

export type T_SORTFIELD_SELECT<S> = {
  value: S | "";
  text: string;
};

//! MOVIE сущности запрос '/movie':
export interface I_MOVIE_PERSONS_PROP {
  id: number;
  photo: string;
  name: string;
  enName: string;
  description: string;
  profession: string;
}

export interface I_SIMILAR_MOVIES_PROP {
  id: number;
  poster: {
    [key: string]: string;
  };
  name: string;
  enName: string;
  type: string;
  year?: number;
  rating?: {
    [key: string]: number;
  };
}

export interface I_FEES {
  world: {
    value?: number;
    currency: string;
  };
  russia: {
    value?: number;
    currency: string;
  };
}

export interface I_MOVIE {
  id: number;
  name: string;
  enName: string;
  year: number;
  type: string;
  description: string;
  shortDescription: string;
  videos: { url: string; name: string };
  slogan: string;
  status: string;
  ratingKp: number;
  ratingImdb: number;
  votesKp: number;
  votesImdb: number;
  movieLength: number;
  ageRating: number;
  genres: string[];
  countries: string[];
  persons: I_MOVIE_PERSONS_PROP[];
  premiereWorld: string;
  premiereRussia: string;
  budget: string;
  similarMovies: I_SIMILAR_MOVIES_PROP[];
  sequelsAndPrequels: I_SIMILAR_MOVIES_PROP[];
  poster: string;
  feesWorld: string;
  feesRussia: string;
  top250: number;
}

export type T_MOVIE_SEARCH = Omit<
  I_MOVIE,
  | "feesWorld"
  | "feesRussia"
  | "similarMovies"
  | "sequelsAndPrequels"
  | "premiereWorld"
  | "premiereRussia"
  | "budget"
  | "videos"
  | "slogan"
  | "persons"
>;

export type T_MOVIE_SORTFIELD =
  | "id"
  | "name"
  | "enName"
  | "description"
  | "shortDescription"
  | "year"
  | "rating.kp"
  | "rating.imdb"
  | "ageRating"
  | "votes.kp"
  | "votes.imdb"
  | "budget.value"
  | "movieLength"
  | "ageRating"
  | "fees.world.value"
  | "fees.russia.value"
  | "premiere.world"
  | "premiere.russia"
  | "createdAt";

export type T_MOVIE_TYPES =
  | "movie"
  | "tv-series"
  | "cartoon"
  | "animated-series"
  | "anime";

export type T_MY_MOVIE_CARD = Omit<
  T_MOVIE_SEARCH,
  "type" | "votesKp" | "votesImdb" | "genres" | "countries" | "persons"
>;

//! PERSON сущности  '/person' --------------------

export interface I_PERSON_SEARCH {
  id: number;
  photo: string;
  name: string;
  enName: string;
  sex: string;
  growth: number;
  birthday: string;
  death: string | null;
  age: number;
}

export interface I_PERSON_MOVIES {
  id: number;
  name: string;
  alternativeName: string;
  rating: number;
  general: string;
  description: string;
  enProfession: string;
}

export interface I_PERSON_FULL extends I_PERSON_SEARCH {
  birthPlace: string;
  deathPlace: string;
  profession: string;
  countAwards: number;
  facts: string[];
  movies: I_PERSON_MOVIES[];
}

export interface I_PERSON_AWARDS {
  id: string;
  winning: boolean | string;
  personId: number;
  updatedAt: string;
  moviesId: number;
  movieName: string;
  year: number;
  filmAward: string;
  nomination: string;
}

export type T_PERSON_PROFESSIONS =
  | ""
  | "Актер"
  | "Актер дубляжа"
  | "Актриса"
  | "Актриса дубляжа"
  | "В титрах не указаны"
  | "Группа: играют самих себя"
  | "Директор фильма"
  | "Композитор"
  | "Монтажер"
  | "Оператор"
  | "Переводчик"
  | "Продюсер"
  | "Режиссер"
  | "Сценарист"
  | "Художник";

export type T_PERSON_AWARDS_SORTFIELD =
  | "personId"
  | "winning"
  | "nomination.award.year"
  | "movies.id"
  | "updatedAt"
  | "nomination.award.title";

export type T_PERSON_SORTFIELD =
  | ""
  | "id"
  | "photo"
  | "name"
  | "enName"
  | "sex"
  | "growth"
  | "birthday"
  | "death"
  | "age"
  | "countAwards"
  | "profession.value"
  | "facts.value"
  | "movies.name"
  | "movies.rating"
  | "movies.description";

//! IMAGE сущности  '/image' ------------------------------

export interface I_IMAGE {
  id: string;
  movieId: number;
  url: string;
  height: number;
  width: number;
  type: string;
  updatedAt: string;
}

export type T_IMAGES_SORTFIELD =
  | "personId"
  | "type"
  | "url"
  | "movieId"
  | "height"
  | "width"
  | "updatedAt"
  | "createdAt";

//! REVIEW сущности  '/review'

export interface I_REVIEW {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  authorId: number;
  date: string;
  author: string;
}

export type T_REVIEW_SORTFIELD =
  | "id"
  | "movieId"
  | "title"
  | "type"
  | "review"
  | "date"
  | "authorId"
  | "author"
  | "updatedAt"
  | "createdAt";

// ! -----------------  REDUX TYPES ------------------------------
// ! -----------------  <<><<><><>> ------------------------------

export interface I_MOVIE_STATE {
  sortField: T_MOVIE_SORTFIELD | "";
  sortType: number;
  page: number;
  limit: number;
  type: T_MOVIE_TYPES | "";
  genre: string;
  countries: string;
  ratingKp: number[];
  ratingIMDB: number[];
  year: number[];
  loading: boolean;
  query: string;
  error: string;
  id: number | null;
  total: number;
  pages: number;
  movies: I_MOVIE[] | T_MOVIE_SEARCH[];
  movie: I_MOVIE | object;
  images: I_IMAGE[];
  selectFields: string[];
}

export interface I_PERSON_STATE {
  sortField: T_PERSON_SORTFIELD;
  sortType: number;
  page: number;
  query: string;
  limit: number;
  id: number;
  loading: boolean;
  error: string;
  personAwards: I_PERSON_AWARDS[];
  total: number;
  pages: number;
  person: object | I_PERSON_FULL;
  sex: "Мужской" | "Женский";
  growth: number[];
  age: number[];
  countAwards: number[];
  profession: T_PERSON_PROFESSIONS;
  moviesRating: number[];
  persons: I_PERSON_SEARCH[];
  selectFields: string[];
}

export type T_ACTION_QUERY_PAYLOAD = Record<"name" | "value", unknown>;

export interface I_REVIEW_STATE {
  sortField: string;
  sortType: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string;
  reviewsByMovieId: I_REVIEW[];
  total: number;
  pages: number;
  reviewsByAuthorId: I_REVIEW[];
}

// ! -----------------  ROUTE TYPED ------------------------------
// ! -----------------  <<><<><><>> ------------------------------

export enum E_ROUTES {
  home = "/",
  movies = "/movies",
  movie = "/movies/:movieId",
  persons = "/persons",
  person = "/persons/:personId",
  images = "/movies/images",
  image = "/movies/images/:movieId",
  top250 = "/movies/top250",
  notFound = "*",
}

export type T_ROUTES = {
  path: E_ROUTES;
  Element: FC;
};

export type T_MAIN_MENU_LIST_ITEM = {
  to: E_ROUTES;
  text: string;
};
