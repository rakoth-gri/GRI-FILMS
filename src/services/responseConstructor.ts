// Response BUILDERS :
import { movieResponse } from "./movieResponse";
import { movieSearchResponse } from "./movieSearchResponse";
import { movieByIdResponse } from "./movieByIdResponse";
import { personSearchResponse } from "./personSearchResponse";
import { personByIdResponse } from "./personByIdResponse";
import { personAwardsResponse } from "./personAwardsResponse";
import { imageResponse } from "./imageResponse";
import { reviewByMovieIdResponse } from "./reviewByMovieIdResponse";
import { reviewByAuthorIdResponse } from "./reviewByAuthorIdResponse";
import { personResponse } from './personResponse';

// types:
import {
  I_MOVIE,
  I_API_OBJECT,
  I_PERSON_SEARCH,
  I_PERSON_FULL,
  I_PERSON_AWARDS,
  I_IMAGE,
  T_MOVIE_SEARCH,
  I_REVIEW,
} from "../types/types";

const responseConstructor = {
  // ! movie Response -------------------------------------
  movie: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    movies: T
  ): I_API_OBJECT<I_MOVIE[]> => {
    const { docs, total, limit, page, pages } = movies;
    return movieResponse(docs, total, limit, page, pages);
  },
  // ! movieSearch Response -------------------------------------
  movieSearch: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    movies: T
  ): I_API_OBJECT<T_MOVIE_SEARCH[]> => {
    const { docs, total, limit, page, pages } = movies;
    return movieSearchResponse(docs, total, limit, page, pages);
  },

  // ! movieById Response -------------------------------------
  movieById: (movie: any): I_MOVIE => {
    return movieByIdResponse(movie);
  },
  // ! personSearch Response -------------------------------------
  personSearch: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    persons: T
  ): I_API_OBJECT<I_PERSON_SEARCH[]> => {
    const { docs, total, limit, page, pages } = persons;
    return personSearchResponse(docs, total, limit, page, pages);
  },
  // ! person Response -------------------------------------
  person: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    person: T
  ): I_API_OBJECT<I_PERSON_FULL[]> => {
    const { docs, total, limit, page, pages } = person;
    return personResponse(docs, total, limit, page, pages);
  },
  // ! personById Response -------------------------------------
  personById: (person: any): I_PERSON_FULL => {    
    return personByIdResponse(person);
  },
  // ! personAwards Response -------------------------------------
  personAwards: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    person: T
  ): I_API_OBJECT<I_PERSON_AWARDS[]> => {
    const { docs, total, limit, page, pages } = person;
    return personAwardsResponse(docs, total, limit, page, pages);
  },
  // ! image Response -------------------------------------
  image: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    image: T
  ): I_API_OBJECT<I_IMAGE[]> => {
    const { docs, total, limit, page, pages } = image;
    return imageResponse(docs, total, limit, page, pages);
  },

  // ! reviewByMovieId Response -------------------------------------
  reviewByMovieId: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    review: T
  ): I_API_OBJECT<I_REVIEW[]> => {
    const { docs, total, limit, page, pages } = review;
    return reviewByMovieIdResponse(docs, total, limit, page, pages);
  },

  reviewByAuthorId: <
    T extends {
      total: number;
      limit: number;
      page: number;
      pages: number;
      docs: unknown[];
    }
  >(
    review: T
  ): I_API_OBJECT<I_REVIEW[]> => {
    const { docs, total, limit, page, pages } = review;
    return reviewByAuthorIdResponse(docs, total, limit, page, pages);
  },
};

export { responseConstructor };
