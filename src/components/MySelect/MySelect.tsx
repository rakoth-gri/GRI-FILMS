import { ChangeEvent, SelectHTMLAttributes, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
// components
import { Select, MenuItem } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
// types:
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  T_SELECT,
  T_ACTION_QUERY_PAYLOAD,
  I_MOVIE_STATE,
  I_PERSON_STATE,
  I_REVIEW_STATE,
} from "../../types/types";
import { RootState } from "../../store/store";

interface I_MySelect extends SelectHTMLAttributes<HTMLSelectElement> {
  list: T_SELECT[];
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  reducer: keyof RootState;
  name: keyof I_MOVIE_STATE | keyof I_PERSON_STATE | keyof I_REVIEW_STATE;
}

export const MySelect = memo(({
  list,
  name,
  action,
  reducer,
  ...props
}: I_MySelect) => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((s) => s[reducer][name]);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(action({ name, value }));
  };

  return (
    <Select
      sx={{
        color: "inherit",
        fontSize: "inherit",
        width: { xs: "100%", sm: "90%" },
      }}
      label="select"
      name={name}
      onChange={changeHandler}
      value={value}
      displayEmpty={true}
      IconComponent={ArrowDropDownCircleIcon}
      {...props}
    >
      {list.map(({ value, text }) => (
        <MenuItem key={value} value={value}>
          {text as string}
        </MenuItem>
      ))}
    </Select>
  );
});
