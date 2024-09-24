import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  useCallback,
  MouseEventHandler,
} from "react";
// REDUX
import { personSearchThunk, personThunk } from "../../store/personThunks";
import {
  changePersonStateQueryParams,
  changePersonSex,
} from "../../store/personSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
// components
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { MyRange } from "../../components/MyRange";
import { MySortType } from "../../components/MySortType";
import { MySelect } from "../../components/MySelect";
import { MySearch } from "../../components/MySearch";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyPagination } from "../../components/MyPagination";
import { MyTitle } from "../../components/MyTitle";
import { MyPersonCard } from "../../components/MyPersonCard";
import Render from "../../components/Render";
import { MyLoader } from "../../components/MyLoader";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
import { Toggler } from "../../components/Toggler";
//consts
import {
  END_POINTS,
  LIMIT_PARAM_SELECT_LIST,
  PERSON_PROFESSION_SELECT_LIST,
  PERSON_SORTFIELD_SELECT_LIST,
  SORTTYPE_SELECT_LIST,
} from "../../consts/api";
// utils
import { observerCB, options } from "../../services/utils";

const personPageTogglerStyles = { fontFamily: "Roboto" };

const renderCallback = (item: any) => <MyPersonCard key={item.id} {...item} />;

export const PersonsPage = () => {
  const dispatch = useAppDispatch();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // const { query, page, loading, error, persons } = useAppSelector(
  //   (s) => s.personSliceReducer
  // );

  const query = useAppSelector((s) => s.personSliceReducer.query);
  const page = useAppSelector((s) => s.personSliceReducer.page);
  const loading = useAppSelector((s) => s.personSliceReducer.loading);
  const error = useAppSelector((s) => s.personSliceReducer.error);
  const persons = useAppSelector((s) => s.personSliceReducer.persons);

  const MyObserver = useMemo(
    () => new IntersectionObserver(observerCB, options),
    []
  );

  useEffect(() => {
    if (query)
      dispatch(
        personSearchThunk({
          url: END_POINTS.personSearch,
          method: "personSearch",
        })
      );
    else dispatch(personThunk({ url: END_POINTS.person, method: "person" }));
  }, [query, page]);

  useEffect(() => {
    if (persons.length)
      document
        .querySelectorAll(".personImage")
        .forEach((img) => MyObserver.observe(img));
  }, [persons]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(
      personThunk({
        url: END_POINTS.person,
        method: "person",
      })
    );
  };

  const stopPropagation: MouseEventHandler<HTMLElement> = useCallback(
    (e) => e.stopPropagation(),
    []
  );

  return (
    <Fragment>
      <MyTitle
        align="center"
        sx={{
          color: "var(--app-default-color)",
          fontSize: { xs: "1.3rem", md: "2rem" },
        }}
        component="h1"
        variant="h4"
      >
        {" "}
        Поиск по людям:{" "}
      </MyTitle>
      <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      <MyLoader color="info" variant="query" loading={loading} />
      <MySearch
        action={changePersonStateQueryParams}
        reducer="personSliceReducer"
        placeholder="Введите имя персоны:"
        autoFocus
      />
      <MyFilterWrapper
        isOpenFilter={isOpenFilter}
        onClick={() => setIsOpenFilter((prev) => !prev)}
        sx={{ m: "0px", p: "1rem" }}
        action={clickHandler}
      >
        <MySelect
          list={PERSON_SORTFIELD_SELECT_LIST}
          name={"sortField"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
        />
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
        />
        <MySelect
          list={PERSON_PROFESSION_SELECT_LIST}
          name={"profession"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="personSliceReducer"
          action={changePersonStateQueryParams}
          onClick={stopPropagation}
        />
        {/* <MyRange
          label={"Рост Персонажа"}
          name={"growth"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
          min={140}
          max={235}
        /> */}
        <MyRange
          label={"Возраст Персонажа"}
          name={"age"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
          min={5}
          max={100}
        />
        {/* <MyRange
          label={"Количество наград"}
          name={"countAwards"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
          min={0}
          max={60}
        /> */}
        {/* <MyRange
          label={"Рейтинг фильмов"}
          name={"moviesRating"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
          min={0}
          max={100}
        /> */}
        <Toggler
          sx={personPageTogglerStyles}
          action={changePersonSex}
          reducer={"personSliceReducer"}
          name={"sex"}
          onClick={stopPropagation}
        />
      </MyFilterWrapper>
      <MyFlexContainer spacing={2} sx={{ minHeight: "45vh" }}>
        <Render
          list={persons}
          loading={loading}
          error={error}
          cb={renderCallback}
        />
      </MyFlexContainer>
      <MyPagination
        action={changePersonStateQueryParams}
        reducer="personSliceReducer"
        page={page}
      />
    </Fragment>
  );
};
