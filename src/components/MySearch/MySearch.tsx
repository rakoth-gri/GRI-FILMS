import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, RootState, useAppSelector } from "../../store/store";
// components:
import { Box, styled, TextField } from "@mui/material";
// types:
import { InputHTMLAttributes, ChangeEventHandler } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { T_ACTION_QUERY_PAYLOAD } from "../../types/types";
// utils:
import { debounce } from "../../services/utils";

const MyBox = styled(Box)(() => ({
  padding: "0.5rem",
  borderRadius: 1,
  margin: "0.5rem",
}));

interface I_MySearch extends InputHTMLAttributes<HTMLInputElement> {
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  color?: "error" | "primary" | "secondary" | "info" | "success" | "warning";
  autoFocus?: boolean;
}

export const MySearch = ({
  reducer,
  action,
  color = "primary",
  autoFocus = false,
  ...props
}: I_MySearch) => {
  const dispatch = useAppDispatch();

  const reduxQuery = useAppSelector(s => s[reducer].query)

  const [query, setQuery] = useState("");
  const debouncedAction = useCallback(
    debounce(({ name, value }) => dispatch(action({ name, value })), 610),
    []
  );

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setQuery(value);
    debouncedAction({ name, value });
  };

  useEffect(() => {
    setQuery(reduxQuery)
  }, [])

  return (
    <MyBox component="section">
      <TextField
        name="query"
        id="query"
        autoFocus={autoFocus}
        type="search"
        fullWidth={true}
        variant="outlined"
        {...props}
        color={color}
        value={query}
        onChange={changeHandler}
      />
    </MyBox>
  );
};
