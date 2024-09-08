import { Fragment, useEffect, useState, MouseEventHandler } from "react";
// REDUX
import { personSearchThunk } from "../../store/personThunks";
import { changePersonStateQueryParams } from "../../store/personSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
// components
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { Button } from "@mui/material";
import { MySelect } from "../../components/MySelect";
import { MySearch } from "../../components/MySearch";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyPagination } from "../../components/MyPagination";
import { MyTitle } from "../../components/MyTitle";
import { MyPersonCard } from "../../components/MyPersonCard";
import { Render } from "../../components/Render";
import { MyLoader } from "../../components/MyLoader";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
//consts
import { END_POINTS, LIMIT_PARAM_SELECT_LIST } from "../../consts/api";

export const PersonsPage = () => {
  const dispatch = useAppDispatch();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const { query, page, loading, error, persons } = useAppSelector(
    (s) => s.personSliceReducer
  );

  useEffect(() => {
    dispatch(
      personSearchThunk({
        url: END_POINTS.personSearch,
        method: "personSearch",
      })
    );
  }, [query, page]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(
      personSearchThunk({
        url: END_POINTS.personSearch,
        method: "personSearch",
      })
    );
  };

  return (
    <Fragment>
      <MyTitle align="center" color="primary" component="h1" variant="h4">
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
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
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
