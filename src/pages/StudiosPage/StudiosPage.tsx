import { useState, useEffect, MouseEvent } from "react";
import { useFetching } from "../../hooks/useFetching";
// components
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyStudioCard } from "../../components/MyStudioCard";
import { MyStudioSearch } from "../../components/MyStudioSearch";
import { MyStudioPagination } from "../../components/MyStudioPagination";
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { MyStudioSelect } from "../../components/MyStudioSelect";
import { MyStudioSortType } from "../../components/MyStudioSortType";
import Render from "../../components/Render";
// consts
import {
  END_POINTS,
  LIMIT_PARAM_SELECT_LIST,
  STUDIO_SORTFIELD_SELECT_LIST,
  SORTTYPE_SELECT_LIST,
} from "../../consts/api";
import { I_STUDIO } from "../../types/types";

const StudiosPageCB = (item: I_STUDIO, i?: number) => (
  <MyStudioCard key={item.id} {...item} />
);

const stopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation();

export const StudiosPage = () => {
  const {
    loading,
    error,
    studios,
    title,
    pages,
    page,
    sortField,
    sortType,
    limit,
    isOpenFilter,
    fetchData,
    changeStudioStateQueryParams,
    setIsOpenFilter,
  } = useFetching();

  useEffect(() => {
    fetchData(
      END_POINTS.studio,
      {
        sortField,
        page: `${page}`,
        limit: `${limit}`,
        sortType,
        title,
      },
      END_POINTS.studio
    );
  }, [page, title]);

  const clickHandler = () =>
    fetchData(
      END_POINTS.studio,
      {
        sortField,
        page: `${page}`,
        limit: `${limit}`,
        sortType,
        title,
      },
      END_POINTS.studio
    );

  return (
    <>
      <MyTitle
        variant="h4"
        sx={{ fontSize: { xs: "1.35em", lg: "2em" } }}
        component="h1"
        color="inherit"
      >
        {" "}
        список студий{" "}
      </MyTitle>
      <MyFilterTrigger onClick={setIsOpenFilter} />
      <MyStudioSearch name="title" action={changeStudioStateQueryParams} />
      <MyLoader loading={loading} />
      <MyFilterWrapper
        onClick={setIsOpenFilter}
        isOpenFilter={isOpenFilter}
        sx={{ m: "0px", p: "1rem" }}
        action={clickHandler}
      >
        <MyStudioSelect
          list={STUDIO_SORTFIELD_SELECT_LIST}
          name="sortField"
          value={sortField}
          action={changeStudioStateQueryParams}
          onClick={stopPropagation}
        />
        <MyStudioSelect
          list={LIMIT_PARAM_SELECT_LIST}
          name="limit"
          // @ts-ignore
          value={limit}
          action={changeStudioStateQueryParams}
          onClick={stopPropagation}
        />
        <MyStudioSortType
          list={SORTTYPE_SELECT_LIST}
          name="sortType"
          value={sortType}
          action={changeStudioStateQueryParams}
          onClick={stopPropagation}
        />
      </MyFilterWrapper>
      <MyFlexContainer spacing={2} sx={{ minHeight: "45vh", m: {xs: '0px', sm: '0.5rem'} }}>
        <Render
          list={studios}
          loading={loading}
          error={error}
          // @ts-ignore
          cb={StudiosPageCB}
        />
      </MyFlexContainer>
      <MyStudioPagination
        action={changeStudioStateQueryParams}
        page={page}
        pages={pages}
        size="large"
      />
    </>
  );
};
