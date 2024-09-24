import { ChangeEvent, HTMLAttributes, memo } from "react";
// components
import { Pagination, Stack, PaginationItem, styled } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
// types
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { T_ACTION_QUERY_PAYLOAD } from "../../types/types";
import "./MyPaginationComp.sass";

interface I_MyPagination extends HTMLAttributes<HTMLElement> {
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "standard";
  page: number
}

const MyPaginationStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  color: "var(--app-default-color)",
  alignItems: "center",
};

export const MyPagination = memo(({
  action,
  reducer,
  page,
  color = "primary",
  ...props
}: I_MyPagination) => {
  const dispatch = useAppDispatch();

  const pages= useAppSelector((s) => s[reducer].pages);

  const changeHandler = (e: ChangeEvent<unknown>, page: number) => {
    dispatch(action({ name: "page", value: page }));
  };

  console.log('inside pagination...');
  

  return (
    <Stack sx={{ m: "1.2rem 0" }} spacing={0}>
      <Pagination
        sx={MyPaginationStyles}
        className="myPaginationComp"
        count={pages ? pages : 1}
        size={props.size || "large"}
        variant="outlined"
        color={color}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: KeyboardDoubleArrowLeft,
              next: KeyboardDoubleArrowRight,
            }}
            {...item}
            sx={{ color: "var(--app-default-color)", fontSize: "0.9rem" }}
          />
        )}
        {...props}
        onChange={changeHandler}
      />
    </Stack>
  );
});
