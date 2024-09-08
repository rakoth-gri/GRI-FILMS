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
  }: // ratingIMDB,
  Record<
    | "sortField"
    | "sortType"
    | "page"
    | "limit"
    | "type"
    | "genre"
    | "countries"
    | "ratingKp"
    | "ratingIMDB",
    string
  >) => ({
    sortField: sortField || "rating.imdb",
    sortType,
    page,
    limit,
    type,
    ["genres.name"]: genre,
    ["countries.name"]: countries || "США",
    ["rating.kp"]: ratingKp,
    // ["rating.imdb"]: ratingIMDB,
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
  personSearch: ({
    page = "1",
    limit = "3",
    query,
  }: Record<"page" | "limit" | "query", string>) => ({
    page,
    limit,
    query: query || "Арнольд Шварцнеггер",
  }),
  personById: ({ id }: { id: string }) => ({
    id,
  }),
  personAwards: ({
    page = "1",
    limit = "10",
    sortType = "-1",
    personId = "8816",
    sortField = "movies.id",
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
    sortType: string;
    sortField: string;
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
    sortField = "authorId",
    movieId,
    page = "1",
    limit = "10",
    sortType = "-1",
  }: {
    sortField: string;
    movieId: string;
    page: string;
    limit: string;
    sortType: string;
  }) => ({
    movieId,
    page,
    limit,
    sortField,
    sortType,
  }),
  reviewByAuthorId: ({
    sortField = "id",
    authorId,
    page = "1",
    limit = "10",
    sortType = "-1",
  }: {
    sortField: string;
    authorId: string;
    page: string;
    limit: string;
    sortType: string;
  }) => ({
    authorId,
    page,
    limit,
    sortField,
    sortType,
  }),
  top250: ({
    sortField = 'top250',
    sortType = "1",
    page = "1",
    limit = "15",
    type = "movie",
    lists = "top250",
  }: {
    sortField: string;
    sortType?: string;
    page: string;
    limit?: string;
    type?: string;
    lists?: string;
  }
  ) => ({
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
  | ReturnType<typeof queryConstructor.reviewByAuthorId>
  | ReturnType<typeof queryConstructor.reviewByMovieId>
  | ReturnType<typeof queryConstructor.image>;
