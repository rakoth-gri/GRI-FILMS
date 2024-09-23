// pages:
import { NotFound } from "../pages/NotFound";
import { PersonsPage } from "../pages/PersonsPage";
import { MoviesPage } from "../pages/MoviesPage";
import { SinglePersonPage } from "../pages/SinglePersonPage";
import { SingleMoviePage } from "../pages/SingleMoviePage";
import { MovieImagesPage } from "../pages/MovieImagesPage";
import { HomePage } from "../pages/HomePage";
import { ReviewsPage } from "../pages/ReviewsPage";
import { Top250Page } from "../pages/Top250Page";
import { FavoriteMoviesPage } from "../pages/FavoriteMoviesPage";
// types
import { T_ROUTES, E_ROUTES } from "../types/types";

export const ROUTES: T_ROUTES[] = [
  {
    path: E_ROUTES.home,
    Element: HomePage,
  },
  {
    path: E_ROUTES.movies,
    Element: MoviesPage,
  },
  {
    path: E_ROUTES.top250,
    Element: Top250Page,
  },
  {
    path: E_ROUTES.favoriteMovies,
    Element: FavoriteMoviesPage,
  },
  {
    path: E_ROUTES.movie,
    Element: SingleMoviePage,
  },
  {
    path: E_ROUTES.persons,
    Element: PersonsPage,
  },
  {
    path: E_ROUTES.person,
    Element: SinglePersonPage,
  },
  {
    path: E_ROUTES.image,
    Element: MovieImagesPage,
  }, 
  {
    path: E_ROUTES.review,
    Element: ReviewsPage,
  },
  {
    path: E_ROUTES.notFound,
    Element: NotFound,
  },
];
