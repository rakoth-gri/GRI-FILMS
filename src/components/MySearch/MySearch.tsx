import { useCallback, useEffect, useState, memo } from "react";
import { useAppDispatch, RootState, useAppSelector } from "../../store/store";
// components:
import { Box, styled, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
// types:
import { InputHTMLAttributes, ChangeEventHandler } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { T_ACTION_QUERY_PAYLOAD } from "../../types/types";
// utils:
import { debounce } from "../../services/utils";

const MySearchBox = styled(Box)(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: 1,
  margin: "0.5rem",
  color: "var(--app-default-color)",
  fontSize: "1.3em",
  [theme.breakpoints.down("md")]: {
    fontSize: "1em",
    margin: "0",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "14px",
  },
}));

interface I_MySearch extends InputHTMLAttributes<HTMLInputElement> {
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  color?: "error" | "primary" | "secondary" | "info" | "success" | "warning";
  autoFocus?: boolean;
}

export const MySearch = memo(({
  reducer,
  action,
  color = "primary",
  ...props
}: I_MySearch) => {
  const dispatch = useAppDispatch();

  const reduxQuery = useAppSelector((s) => s[reducer].query);

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
    setQuery(reduxQuery);
  }, []);

  return (
    <MySearchBox component="search">
      <Box sx={{position: 'relative'}}>
        <SearchIcon sx={{color: 'inherit', position: 'absolute', left: '0%', top: '50%', transform: 'translateY(-50%)', opacity: '0.65'}} fontSize="large"/>
        <Input
          type="search"
          name="query"
          id="query"
          onChange={changeHandler}
          value={query}
          sx={{
            fontSize: "inherit",
            color: "inherit",
            p: "0.5rem 3rem",
            letterSpacing: "0.85px",
          }}          
          fullWidth
          placeholder="Начните поиск:"
        />
      </Box>
    </MySearchBox>
  );
});
