### Организация запросов через CREATE_ASYNC_THUNK REDUX:
```javascript
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { END_POINTS } from "./consts/api";
// createAsyncThunks
import {
  movieThunk,
  movieSearchThunk,
  movieByIdThunk,
  movieIdImagesThunk,
} from "./store/movieThunks";
import {
  personSearchThunk,
  personByIdThunk,
  personAwardsThunk,
} from "./store/personThunks";
import {
  reviewByAuthorIdThunk,
  reviewByMovieIdThunk,
} from "./store/reviewThunks";

const personId = 8816;
const movieId = 444; // Терминатор 2
const authorId = 102193502;

function App() {
  const dispatch = useAppDispatch();

  const {
    sortField,
    genre,
    type,
    limit,
    sortType,
    query,
    page,
    loading,
    movies,
    error,
    movie,
    selectFields,
  } = useAppSelector((s) => s.movieSliceReducer);
  
  const {
    sortField,
    limit,
    sortType,
    query,
    page,
    loading,
    error,
    persons,
    personAwards,
  } = useAppSelector((s) => s.personSliceReducer);

  const { sortField, limit, sortType, page } = useAppSelector(
    (s) => s.reviewSliceReducer
  );

  // ! CREATE ASYNC THUNKS ------------------------------
  // ! movie -------------

  useEffect(() => {
     if (!query)
    dispatch(movieThunk({ url: END_POINTS.movie, method: "movie" }));
  }, [sortField, genre, type, limit, sortType, page, selectFields, query]);

  useEffect(() => {
       if (query) dispatch(
      movieSearchThunk({ url: END_POINTS.movieSearch, method: "movieSearch" })
    );
  }, [query, page, limit]);

  useEffect(() => {
    dispatch(
      movieByIdThunk({
        url: `${END_POINTS.movie}/${movieId}`,
        id: 0,
        method: "movieById",
      })
    );
  }, []);

  useEffect(() => {
  dispatch(movieIdImagesThunk({url: END_POINTS.image, movieId, method: 'image'}))
  }, [page, limit])

  ! person -------------

  useEffect(() => {
    dispatch(personSearchThunk({url: END_POINTS.personSearch, method: 'personSearch'}))
  }, [query, page, limit])

  useEffect(() => {
    dispatch(personByIdThunk({url: `${END_POINTS.person}/${personId}`, id: 0, method: 'personById'}))
  }, [])

  useEffect(() => {
    dispatch(
      personAwardsThunk({
        url: END_POINTS.personAwards,
        personId,
        method: "personAwards",
      })
    );
  }, [sortField, sortType, page]);

  // ! review -------------

  useEffect(() => {
    dispatch(
      reviewByAuthorIdThunk({
        url: END_POINTS.review,
        authorId,
        method: "reviewByAuthorId",
      })
    );
  }, [sortField, limit, sortType, page]);

  useEffect(() => {
    dispatch(reviewByMovieIdThunk({url: END_POINTS.review, movieId: '8164', method: 'reviewByMovieId'}))
    }, [sortField, limit, sortType, page])




```

### Организация запросов напрямую через SERVER CLASS:

```javascript
import { useEffect } from "react";
import { Server } from "./services/Server";
import { END_POINTS } from "./consts/api";

const personId = 8816;
const movieId = 8164;
const authorId = 102193502;

// MOVIE ------------------------------

function App() {
  useEffect(() => {
    Server.movie(END_POINTS.movie, {}, "movie");
  }, []);

  useEffect(() => {
    Server.movieSearch(
      END_POINTS.movieSearch,
      { query: "Скалолаз" },
      "movieSearch"
    );
  }, []);

  useEffect(() => {
    Server.movieById(
      `${END_POINTS.movie}/${movieId}`,
      { id: 8164 },
      "movieById"
    );
  }, []);

  // PERSON --------------------------

  useEffect(() => {
    Server.personSearch(
      END_POINTS.personSearch,
      { query: "Майкл Рукер" },
      "personSearch"
    );
  }, []);

  useEffect(() => {
    Server.personById(
      `${END_POINTS.person}/${personId}`,
      { id: 8816 },
      "personById"
    );
  }, []);

  useEffect(() => {
    Server.personAwards(
      END_POINTS.personAwards,
      { personId: 8816 },
      "personAwards"
    );
  }, []);

  // IMAGE --------------------------

  useEffect(() => {
    Server.image(END_POINTS.image, { movieId: "8164" }, "image");
  }, []);

  // REVIEW --------------------------

  useEffect(() => {
    Server.reviewByMovieId(
      END_POINTS.review,
      { movieId: 8164 },
      "reviewByMovieId"
    );
  }, []);

  useEffect(() => {
    Server.reviewByAuthorId(
      END_POINTS.review,
      { authorId: 102193502 },
      "reviewByAuthorId"
    );
  }, []);
}
```
