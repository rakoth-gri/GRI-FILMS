import {
  T_SELECT,
  T_SORTFIELD_SELECT,
  T_PERSON_SORTFIELD,
  T_MOVIE_SORTFIELD,
  T_IMAGES_SORTFIELD,
  T_REVIEW_SORTFIELD,
  T_MOVIE_TYPES,
  T_PERSON_AWARDS_SORTFIELD,
  T_MAIN_MENU_LIST_ITEM,
  E_ROUTES,
  T_PERSON_PROFESSIONS,
} from "../types/types";

// ! END POINTS ------------------------

const BASE_URL = "https://api.kinopoisk.dev/v1.4/";

const END_POINTS = {
  movie: "movie",
  movieSearch: "movie/search",
  person: "person",
  personSearch: "person/search",
  personAwards: "person/awards",
  image: "image",
  review: "review",
} as const;

// ! SELECT UI COMPONENT LISTS: ------------------------

const GENRES_SELECT_LIST: T_SELECT[] = [
  {
    value: "",
    text: "Выберите жанр",
  },
  {
    value: "триллер",
    text: "триллер",
  },
  {
    value: "драма",
    text: "драма",
  },
  {
    value: "аниме",
    text: "аниме",
  },
  {
    value: "биография",
    text: "биография",
  },
  {
    value: "боевик",
    text: "боевик",
  },
  {
    value: "вестерн",
    text: "вестерн",
  },
  {
    value: "военный",
    text: "военный",
  },
  {
    value: "для взрослых",
    text: "для взрослых",
  },
  {
    value: "игра",
    text: "игра",
  },
  {
    value: "концерт",
    text: "концерт",
  },
  {
    value: "короткометражка",
    text: "короткометражка",
  },
  {
    value: "мелодрама",
    text: "мелодрама",
  },
  {
    value: "криминал",
    text: "криминал",
  },
  {
    value: "музыка",
    text: "музыка",
  },
  {
    value: "фэнтези",
    text: "фэнтези",
  },
  {
    value: "комедия",
    text: "комедия",
  },
  {
    value: "детский",
    text: "детский",
  },
  {
    value: "история",
    text: "история",
  },
  {
    value: "мультфильм",
    text: "мультфильм",
  },
  {
    value: "мюзикл",
    text: "мюзикл",
  },
  {
    value: "приключения",
    text: "приключения",
  },
  {
    value: "фантастика",
    text: "фантастика",
  },
  {
    value: "ужасы",
    text: "ужасы",
  },
  {
    value: "спорт",
    text: "спорт",
  },
  {
    value: "семейный",
    text: "семейный",
  },
  {
    value: "церемония",
    text: "церемония",
  },
  {
    value: "ток-шоу",
    text: "ток-шоу",
  },
  {
    value: "реальное ТВ",
    text: "реальное ТВ",
  },
];

const MOVIE_SORTFIELD_SELECT_LIST: T_SORTFIELD_SELECT<T_MOVIE_SORTFIELD>[] = [
  {
    value: "",
    text: "Сортировать по:",
  },
  {
    value: "id",
    text: "По id",
  },
  {
    value: "enName",
    text: "По англ. названию",
  },
  {
    value: "description",
    text: "По описанию",
  },
  {
    value: "shortDescription",
    text: "По слогану",
  },
  {
    value: "year",
    text: "По году выхода",
  },
  {
    value: "rating.kp",
    text: "По рейтингу KP",
  },
  {
    value: "rating.imdb",
    text: "По рейтингу IMDB",
  },
  {
    value: "votes.kp",
    text: "По отзывам KP",
  },
  {
    value: "votes.imdb",
    text: "По отзывам IMDB",
  },
  {
    value: "budget.value",
    text: "По бюджету",
  },
  {
    value: "movieLength",
    text: "По продолжительности",
  },
  {
    value: "ageRating",
    text: "По возрастному рейтингу",
  },
  {
    value: "fees.world.value",
    text: "По сборам в мире",
  },
  {
    value: "fees.russia.value",
    text: "По сборам РФ",
  },
  {
    value: "premiere.world",
    text: "По дате премьеры в мире",
  },
  {
    value: "premiere.russia",
    text: "По дате премьеры в РФ",
  },
  {
    value: "createdAt",
    text: "По дате добавления",
  },
];

const PERSON_SORTFIELD_SELECT_LIST: T_SORTFIELD_SELECT<T_PERSON_SORTFIELD>[] = [
  {
    value: "",
    text: "Сортировать по:",
  },
  {
    value: "id",
    text: "Сортировать по ID:",
  },
  {
    value: "name",
    text: "Сортировать по имени:",
  },
  {
    value: "sex",
    text: "Сортировать по полу:",
  },
  {
    value: "growth",
    text: "Сортировать по росту:",
  },
  {
    value: "death",
    text: "По дате смерти:",
  },
  {
    value: "age",
    text: "По возрасту:",
  },
  {
    value: "countAwards",
    text: "По кол-ву наград:",
  },
  {
    value: "profession.value",
    text: "По профессии:",
  },
  {
    value: "facts.value",
    text: "По фактам:",
  },
  {
    value: "movies.name",
    text: "По именам фильмов:",
  },
  {
    value: "movies.description",
    text: "По описанию фильмов",
  },
];

const PERSON_AWARDS_SORTFIELD_SELECT_LIST: T_SORTFIELD_SELECT<T_PERSON_AWARDS_SORTFIELD>[] =
  [
    {
      value: "",
      text: "Сортировать по:",
    },
    {
      value: "personId",
      text: "По id персоны",
    },
    {
      value: "winning",
      text: "По победам",
    },
    {
      value: "nomination.award.year",
      text: "По году номинации",
    },
    {
      value: "movies.id",
      text: "По id картины",
    },
    {
      value: "updatedAt",
      text: "По дате обновления",
    },
    {
      value: "nomination.award.title",
      text: "По номинации",
    },
  ];

const REVIEW_SORTFIELD_SELECT_LIST: T_SORTFIELD_SELECT<T_REVIEW_SORTFIELD>[] = [
  {
    value: "",
    text: "Сортировать по:",
  },
  {
    value: "id",
    text: "По id отзыва",
  },
  {
    value: "movieId",
    text: "По id картины",
  },
  {
    value: "title",
    text: "По названию",
  },
  {
    value: "type",
    text: "По типу отзыва",
  },
  {
    value: "authorId",
    text: "По id автора",
  },
  {
    value: "author",
    text: "По автору",
  },
  {
    value: "review",
    text: "По содержанию",
  },
  {
    value: "date",
    text: "По дате",
  },
  {
    value: "updatedAt",
    text: "По дате обновления",
  },
  {
    value: "createdAt",
    text: "По дате создания",
  },
];

const SORTTYPE_SELECT_LIST: T_SORTFIELD_SELECT<-1 | 1>[] = [
  {
    value: -1,
    text: "По убыванию",
  },
  {
    value: 1,
    text: "По возрастанию",
  },
];

const IMAGES_SORTFIELD_SELECT_LIST: T_SORTFIELD_SELECT<T_IMAGES_SORTFIELD>[] = [
  {
    value: "",
    text: "Сортировать по:",
  },
  {
    value: "personId",
    text: "По id персоны",
  },
  {
    value: "url",
    text: "По URL",
  },
  {
    value: "type",
    text: "По типу изображения",
  },
  {
    value: "height",
    text: "По высоте",
  },
  {
    value: "width",
    text: "По ширине",
  },
  {
    value: "movieId",
    text: "По id картины",
  },
  {
    value: "updatedAt",
    text: "По дате обновления",
  },
  {
    value: "createdAt",
    text: "По дате создания",
  },
];

const MOVIE_TYPES_SELECT_LIST: T_SORTFIELD_SELECT<T_MOVIE_TYPES>[] = [
  {
    value: "",
    text: "Тип ресурса:",
  },
  {
    value: "movie",
    text: "фильмы",
  },
  {
    value: "tv-series",
    text: "ТВ-сериалы",
  },
  {
    value: "cartoon",
    text: "мультфильмы",
  },
  {
    value: "animated-series",
    text: "анимационные сериалы",
  },
  {
    value: "anime",
    text: "анимэ",
  },
];

const LIMIT_PARAM_SELECT_LIST: T_SORTFIELD_SELECT<number>[] = [
  {
    value: 1,
    text: "Кол-во карточек на стр.:",
  },
  {
    value: 5,
    text: "5 карточек",
  },
  {
    value: 10,
    text: "10 карточек",
  },
  {
    value: 15,
    text: "15 карточек",
  },
  {
    value: 20,
    text: "20 карточек",
  },
];

const COUNTRIES_SELECT_LIST: T_SORTFIELD_SELECT<string>[] = [
  {
    value: "",
    text: "Выберите страну:",
  },
  {
    value: "США",
    text: "США",
  },
  {
    value: "Россия",
    text: "Россия",
  },
  {
    value: "Актриса",
    text: "Россия и США",
  },
  {
    value: "Великобритания+США",
    text: "Британия и США",
  },
  {
    value: "Франция",
    text: "Франция",
  },
  {
    value: "Германия",
    text: "Германия",
  },
  {
    value: "Австралия",
    text: "Австралия",
  },
  {
    value: "Азербайджан",
    text: "Азербайджан",
  },
  {
    value: "Беларусь",
    text: "Беларусь",
  },
  {
    value: "Босния и Герцеговина",
    text: "Босния и Герцеговина",
  },
  {
    value: "Венесуэла",
    text: "Венесуэла",
  },
  {
    value: "Вьетнам",
    text: "Вьетнам",
  },
  {
    value: "Германия (ГДР)",
    text: "Германия (ГДР)",
  },
  {
    value: "Гонконг",
    text: "Гонконг",
  },
  {
    value: "Греция",
    text: "Греция",
  },
  {
    value: "Грузия",
    text: "Грузия",
  },
  {
    value: "Дания",
    text: "Дания",
  },
  {
    value: "Египет",
    text: "Египет",
  },
  {
    value: "Индонезия",
    text: "Индонезия",
  },
  {
    value: "Ирак",
    text: "Ирак",
  },

  {
    value: "Иран",
    text: "Иран",
  },
  {
    value: "Ирландия",
    text: "Ирландия",
  },
  {
    value: "Казахстан",
    text: "Казахстан",
  },
  {
    value: "Камерун",
    text: "Камерун",
  },
  {
    value: "Канада",
    text: "Канада",
  },
  {
    value: "Корея Южная",
    text: "Корея Южная",
  },
  {
    value: "Латвия",
    text: "Латвия",
  },
  {
    value: "Люксембург",
    text: "Люксембург",
  },
  {
    value: "Македония",
    text: "Македония",
  },
  {
    value: "Мексика",
    text: "Мексика",
  },
  {
    value: "Монако",
    text: "Монако",
  },
  {
    value: "Норвегия",
    text: "Норвегия",
  },
  {
    value: "Польша",
    text: "Польша",
  },
  {
    value: "Португалия",
    text: "Португалия",
  },
  {
    value: "СССР",
    text: "СССР",
  },
  {
    value: "Сирия",
    text: "Сирия",
  },
  {
    value: "Сингапур",
    text: "Сингапур",
  },
  {
    value: "Словакия",
    text: "Словакия",
  },
  {
    value: "Таиланд",
    text: "Таиланд",
  },
  {
    value: "Чехия",
    text: "Чехия",
  },
  {
    value: "Испания",
    text: "Испания",
  },
  {
    value: "Чили",
    text: "Чили",
  },
  {
    value: "Швейцария",
    text: "Швейцария",
  },
  {
    value: "Швеция",
    text: "Швеция",
  },
  {
    value: "Эстония",
    text: "Эстония",
  },
  {
    value: "ЮАР",
    text: "ЮАР",
  },
  {
    value: "Югославия",
    text: "Югославия",
  },
  {
    value: "Кувейт",
    text: "Кувейт",
  },
  {
    value: "Мали",
    text: "Мали",
  },
  {
    value: "Япония",
    text: "Япония",
  },
  {
    value: "Италия",
    text: "Италия",
  },
  {
    value: "Украина",
    text: "Украина",
  },
  {
    value: "Румыния",
    text: "Румыния",
  },
  {
    value: "Хорватия",
    text: "Хорватия",
  },
  {
    value: "Турция",
    text: "Турция",
  },
  {
    value: "Бразилия",
    text: "Бразилия",
  },
  {
    value: "Аргентина",
    text: "Аргентина",
  },
  {
    value: "Китай",
    text: "Китай",
  },
  {
    value: "Великобритания",
    text: "Великобритания",
  },
];

const PERSON_PROFESSION_SELECT_LIST: T_SORTFIELD_SELECT<T_PERSON_PROFESSIONS>[] =
  [
    {
      value: "",
      text: "Выберите профессию:",
    },
    {
      value: "Актер",
      text: "Актер",
    },
    {
      value: "Актер дубляжа",
      text: "Актер дубляжа",
    },
    {
      value: "Актриса",
      text: "Актриса",
    },
    {
      value: "Актриса дубляжа",
      text: "Актриса дубляжа",
    },
    {
      value: "В титрах не указаны",
      text: "В титрах не указаны",
    },
    {
      value: "Группа: играют самих себя",
      text: "Группа: играют самих себя",
    },
    {
      value: "Директор фильма",
      text: "Директор фильма",
    },
    {
      value: "Композитор",
      text: "Композитор",
    },
    {
      value: "Монтажер",
      text: "Монтажер",
    },
    {
      value: "Художник",
      text: "Художник",
    },
    {
      value: "Продюсер",
      text: "Продюсер",
    },
    {
      value: "Режиссер",
      text: "Режиссер",
    },
    {
      value: "Сценарист",
      text: "Сценарист",
    },
    {
      value: "Переводчик",
      text: "Переводчик",
    },
    {
      value: "Оператор",
      text: "Оператор",
    },
  ];

const PERSON_SEX_SELECT_LIST: T_SORTFIELD_SELECT<"Мужской" | "Женский">[] = [
  {
    value: "Мужской",
    text: "Мужской",
  },
  {
    value: "Женский",
    text: "Женский",
  },
];

// ! SELECTFIELDS QUERY PARAMETR LISTS: ------------------------

const MOVIE_SELECTFIELDS_LIST = [
  "id",
  "name",
  "enName",
  "description",
  "shortDescription",
  "slogan",
  "type",
  "status",
  "year",
  "releaseYears",
  "rating",
  "ageRating",
  "votes",
  "budget",
  "movieLength",
  "genres",
  "countries",
  "poster",
  "videos",
  "persons",
  "facts",
  "fees",
  "premiere",
  "similarMovies",
  "sequelsAndPrequels",
  "top250",
];

const PERSON_SELECTFIELDS_LIST = [
  "id",
  "name",
  "enName",
  "photo",
  "sex",
  "growth",
  "birthday",
  "death",
  "age",
  "birthPlace",
  "deathPlace",
  "profession",
  "countAwards",
  "facts",
  // "movies",
];

const REVIEW_SELECTFIELDS_LIST = [
  "id",
  "movieId",
  "type",
  "title",
  "review",
  "date",
  "authorId",
  "author",
];

const IMAGE_SELECTFIELDS_LIST = [
  "movieId",
  "url",
  "type",
  "language",
  "height",
  "width",
  "updatedAt",
];

const PERSON_AWARDS_SELECTFIELDS_LIST = [
  "personId",
  "winning",
  "movies",
  "nomination",
  "updatedAt",
  "movies",
  "updatedAt",
];

const MOVIE_SELECTFIELDS_FILTER = [
  {
    value: "slogan",
    text: "Слоган",
  },
  {
    value: "releaseYears",
    text: "Год релиза",
  },
  {
    value: "votes",
    text: "Количество голосов",
  },
  {
    value: "budget",
    text: "Бюджет",
  },
  {
    value: "videos",
    text: "Трейлеры",
  },
  {
    value: "persons",
    text: "Команда",
  },

  {
    value: "facts",
    text: "Факты",
  },
  {
    value: "fees",
    text: "Сборы",
  },
  {
    value: "premiere",
    text: "Дата премьеры",
  },
  {
    value: "similarMovies",
    text: "Схожие картины",
  },
  {
    value: "sequelsAndPrequels",
    text: "Сиквелы и приквелы",
  },
  {
    value: "top250",
    text: "ТОП 250",
  },
];

// ! NOT_NULL_FIELDS QUERY PARAMETR LISTS: ------------------------

const MOVIE_NOT_NULL_FIELDS_LIST = [
  "id",
  "name",
  // "enName",
  "description",
  "shortDescription",
  // "slogan",
  "type",
  // "status",
  "year",
  "rating.imdb",
  "ageRating",
  // "votes.kp",
  // "votes.imdb",
  // "budget.value",
  // "movieLength",
  "genres.name",
  "countries.name",
  "poster.url",
  // "videos.trailers.url",
  // "fees.world.value",
  // "fees.russia.value",
  // "premiere.world",
  // "premiere.russia",
  // "similarMovies.id",
  // "similarMovies.name",
  // "similarMovies.rating.kp",
  // "similarMovies.rating.imdb",
  // "similarMovies.year",
  // "similarMovies.poster.url",
];

const PERSON_NOT_NULL_FIELDS_LIST = [
  "id",
  "name",
  "enName",
  "photo",
  "sex",
  "growth",
  "birthday",
  // "death",
  "age",
  "birthday",
  // 'deathPlace',
  "profession.value",
  // 'countAwards',
  // 'facts',
  // 'movies'
];

// ! MENU -- HEADER: ------------------------

const MAIN_MENU_LIST: T_MAIN_MENU_LIST_ITEM[] = [
  {
    to: E_ROUTES.home,
    text: "на главную",
  },
  {
    to: E_ROUTES.movies,
    text: "кинокартины",
  },
  {
    to: E_ROUTES.persons,
    text: "персоналии",
  },
  {
    to: E_ROUTES.top250,
    text: "ТОП 250",
  },
];

export {
  END_POINTS,
  GENRES_SELECT_LIST,
  MOVIE_SELECTFIELDS_LIST,
  REVIEW_SELECTFIELDS_LIST,
  IMAGE_SELECTFIELDS_LIST,
  PERSON_AWARDS_SELECTFIELDS_LIST,
  MOVIE_NOT_NULL_FIELDS_LIST,
  BASE_URL,
  IMAGES_SORTFIELD_SELECT_LIST,
  REVIEW_SORTFIELD_SELECT_LIST,
  PERSON_AWARDS_SORTFIELD_SELECT_LIST,
  MOVIE_SORTFIELD_SELECT_LIST,
  MOVIE_TYPES_SELECT_LIST,
  LIMIT_PARAM_SELECT_LIST,
  SORTTYPE_SELECT_LIST,
  MAIN_MENU_LIST,
  COUNTRIES_SELECT_LIST,
  PERSON_NOT_NULL_FIELDS_LIST,
  PERSON_SELECTFIELDS_LIST,
  PERSON_SORTFIELD_SELECT_LIST,
  PERSON_PROFESSION_SELECT_LIST,
  PERSON_SEX_SELECT_LIST,
  MOVIE_SELECTFIELDS_FILTER,
};
