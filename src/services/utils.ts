import { I_PERSON_MOVIES } from "../types/types";

// ! CREATING QUERY-STRING FOR DIFERENT REQUESTS
const getSelectFieldsParam = <T>(list: T[]): string =>
  list.reduce((a: string, f: T) => a + `selectFields=${f}&`, "");

const getNotNullFieldsParam = <T>(list: T[]): string =>
  list.reduce((a: string, f: T) => a + `notNullFields=${f}&`, "");

// ! OPTOMIZATION FOR 'MySearch' Component

const debounce = (cb: (...args: any[]) => void, delay: number) => {
  let timerId: undefined | number = undefined;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

// ! FORMATTING 'MyRange' COMPONENT VALUES:

const getRatingParamValue = (list: number[]): string =>
  list.map((r) => r / 10).join("-");

// ! OBSERVER FOR LAZY LOADING CARDS (MyMovieCard, MyPersonCard etc.) ----

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observerCB: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      let elem = e.target as HTMLImageElement;
      let src = elem?.dataset?.src;
      elem.src = src;
      observer.unobserve(elem);
    }
  });
};

const movieLengthFormat = (n: number): string => {
  return `${Math.floor(n / 60)} ч. ${n % 60} мин.`;
};

const birthDetailsFormat = (s: string): string => {
  return `${new Date(s).toLocaleDateString()} г., ${
    new Date().getFullYear() - new Date(s).getFullYear()
  } лет`;
};

// ! Функция для формирования sx Prop компоненты 'Box' MUI

interface I_GetBoxStyles {
  width?: string | Record<string, unknown>;
  height?: string | Record<string, unknown>;
  display?: string | Record<string, unknown>;
  justify?: string | Record<string, unknown>;
  align?: string | Record<string, unknown>;
  direction?: string | Record<string, unknown>;
  pd?: string | Record<string, unknown>;
  mr?: string | Record<string, unknown>;
  wrap?: string | Record<string, unknown>;
  fw?: number | Record<string, unknown>;
  fs?: string | Record<string, unknown>;
  ta?: string | Record<string, unknown>;
}

const getBoxStyles = ({
  width = "100%",
  height = "auto",
  display = "block",
  justify = "center",
  align = "start",
  direction = "column",
  pd = "0.5rem",
  mr = "0.5rem",
  wrap = "wrap",
  fw = 400,
  fs = "inherit",
  ta = "left",
}: I_GetBoxStyles) => ({
  width,
  height,
  display,
  justifyContent: justify,
  alignItems: align,
  flexDirection: direction,
  position: "relative",
  padding: pd,
  margin: mr,
  background: "inherit",
  color: "inherit",
  flexWrap: wrap,
  fontWeight: fw,
  fontSize: fs,
  textAlign: ta,
});

// ! Получение лучших фильмов для страницы SinglePagePerson

const unique = <T extends { id: number }>(l: T[]) =>
  l.reduce(
    (acc: T[], m) => (acc.find((o) => o?.id === m.id) ? acc : [...acc, m]),
    []
  );
const filtering = <T extends { rating: number }>(l: T[]) =>
  l.filter((m) => m.rating);
const sorting = <T extends { rating: number }>(l: T[]) =>
  l.slice(0).sort((m1, m2) => m2.rating - m1.rating);
const slicing = <T>(l: T[]) => l.slice(0, 8);
const mapping = <T extends Record<"id" | "name", unknown>>(l: T[]) =>
  l.map(({ id, name }) => ({ id, name }));

const compose = (...argFn: Function[]) => {
  return (list: any[]) => argFn.reduceRight((acc, fn) => fn(acc), list);
};

const composed = compose(mapping, slicing, sorting, filtering, unique);

export {
  getSelectFieldsParam,
  getNotNullFieldsParam,
  debounce,
  getRatingParamValue,
  movieLengthFormat,
  observerCB,
  options,
  getBoxStyles,
  birthDetailsFormat,
  composed,
};
