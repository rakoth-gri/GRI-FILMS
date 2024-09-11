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
  return `${Math.floor(n / 60)} ч. ${n % 60} мин.`
}

const birthDetailsFormat = (s: string): string => {
  return `${new Date(s).toLocaleDateString()} г., ${new Date().getFullYear() - new Date(s).getFullYear()} лет`;
}

// ! Функция для формирования sx Prop компоненты 'Box' MUI

interface I_GetBoxStyles {
  width?: string
  height?: string
  display?:string
  justify?: string
  align?: string
  direction?: string
  pd?: string
  mr?: string
  wrap?: string
  fw?: number,
  fs?: string
  ta?: string
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

const getBestMovies = (m : I_PERSON_MOVIES[]) => m
  .filter(m => m.rating)
  .sort((m1, m2) => m2.rating - m1.rating ? 1 : -1)
  .slice(0, 8)
  .map(({id, name}) => ({id, name}))

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
  getBestMovies,
};
