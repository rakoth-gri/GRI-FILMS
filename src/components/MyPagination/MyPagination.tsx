import { ChangeEvent, HTMLAttributes } from "react";
// components
import { Pagination, Stack, PaginationItem } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
// types
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { T_ACTION_QUERY_PAYLOAD } from "../../types/types";

interface I_MyPagination extends HTMLAttributes<HTMLElement> {
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "standard";
}

const myPaginationStyles = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
};

export const MyPagination = ({
  action,
  reducer,
  color = "primary",
  ...props
}: I_MyPagination) => {
  const dispatch = useAppDispatch();

  const {pages, page} = useAppSelector((s) => s[reducer]);

  const changeHandler = (e: ChangeEvent<unknown>, page: number) => {
    dispatch(action({ name: "page", value: page }));
  };

  return (
    <Stack sx={{ m: "1.5rem" }}>
      <Pagination
        count={pages ? pages : 1}
        sx={myPaginationStyles}
        size={props.size || 'large'}
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
          />
        )}
        {...props}
        onChange={changeHandler}
      />
    </Stack>
  );
};
