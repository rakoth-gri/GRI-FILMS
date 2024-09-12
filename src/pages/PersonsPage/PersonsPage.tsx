import { Fragment, useEffect, useRef, useState, MouseEventHandler } from "react";
// REDUX
import { personSearchThunk, personThunk } from "../../store/personThunks";
import { changePersonStateQueryParams, changePersonSex } from "../../store/personSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
// components
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { Button } from "@mui/material";
import { MyRange } from "../../components/MyRange";
import { MySortType } from "../../components/MySortType";
import { MySelect } from "../../components/MySelect";
import { MySearch } from "../../components/MySearch";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyPagination } from "../../components/MyPagination";
import { MyTitle } from "../../components/MyTitle";
import { MyPersonCard } from "../../components/MyPersonCard";
import { Render } from "../../components/Render";
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

export const PersonsPage = () => {
  const dispatch = useAppDispatch();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const { query, page, loading, error, persons } = useAppSelector(
    (s) => s.personSliceReducer
  );

  const ref = useRef<IntersectionObserver | null>(null);
  ref.current = new IntersectionObserver(observerCB, options);

  useEffect(() => {
    if (query)
      dispatch(
        personSearchThunk({
          url: END_POINTS.personSearch,
          method: "personSearch",
        })
      );
  }, [query, page]);

  useEffect(() => {
    if (!query)
      dispatch(personThunk({ url: END_POINTS.person, method: "person" }));
  }, [page, query]);

  useEffect(() => {
    let personImages = document.querySelectorAll(".personImage");
    if (persons.length)
      personImages.forEach((personImage) =>
        (ref.current as IntersectionObserver).observe(personImage)
      );
  }, [persons]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(
      personThunk({
        url: END_POINTS.person,
        method: "person",
      })
    );
  };

  return (
    <Fragment>
      <MyTitle align="center" sx={{color: 'var(--app-default-color)'}} component="h1" variant="h4">
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
      >
        <MySelect
          list={PERSON_SORTFIELD_SELECT_LIST}
          name={"sortField"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={PERSON_PROFESSION_SELECT_LIST}
          name={"profession"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="personSliceReducer"
          action={changePersonStateQueryParams}
          onClick={(e) => e.stopPropagation()}
        />
        {/* <MyRange
          label={"Рост Персонажа"}
          name={"growth"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
          min={140}
          max={235}
        /> */}
        <MyRange
          label={"Возраст Персонажа"}
          name={"age"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
          min={5}
          max={100}
        />
        {/* <MyRange
          label={"Количество наград"}
          name={"countAwards"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
          min={0}
          max={60}
        /> */}
        {/* <MyRange
          label={"Рейтинг фильмов"}
          name={"moviesRating"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
          min={0}
          max={100}
        /> */}
        <Toggler
          action={changePersonSex}
          reducer={"personSliceReducer"}
          title={"Выберите пол"}
          name={"sex"}          
          onClick={(e: any) => e.stopPropagation()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "0.5rem", width: "90%" }}
          onClick={clickHandler}
        >
          {" "}
          начать поиск{" "}
        </Button>
      </MyFilterWrapper>
      <MyFlexContainer spacing={4} sx={{ minHeight: "45vh" }}>
        <Render
          list={persons}
          loading={loading}
          error={error}
          cb={(item: any) => <MyPersonCard key={item.id} {...item} />}
        />
      </MyFlexContainer>
      <MyPagination
        action={changePersonStateQueryParams}
        reducer="personSliceReducer"
      />
    </Fragment>
  );
};
