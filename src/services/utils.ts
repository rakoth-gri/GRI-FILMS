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

export {
  getSelectFieldsParam,
  getNotNullFieldsParam,
  debounce,
  getRatingParamValue,
  movieLengthFormat,
  observerCB,
  options,
};
