import { useAppSelector, useAppDispatch } from "../../store/store";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
// types:
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { T_ACTION_QUERY_PAYLOAD, T_SORTFIELD_SELECT } from "../../types/types";
import { RootState } from "../../store/store";
import { ChangeEventHandler, HTMLAttributes } from "react";

const mySortTypeStyles = {
  p: "0.5rem",
  flexDirection: "row",
  gap: "1rem",
  alignItems: "center",
  width: "auto",
  justifyContent: "center",  
};

interface I_MySelect extends HTMLAttributes<HTMLDivElement> {
  list: T_SORTFIELD_SELECT<-1 | 1>[];
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  reducer: keyof RootState;
  name: string;
}

export const MySortType = ({
  list,
  reducer,
  name,
  action,
  ...props
}: I_MySelect) => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((s) => s[reducer][name]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    dispatch(action({ name, value }));
  };

  return (
    <FormControl sx={mySortTypeStyles} component="section" {...props}>
      <FormLabel
        id="demo-radio-buttons-group-label"
        style={{ fontWeight: 500 }}
      >
        <SortIcon color="primary" fontSize="large" />{" "}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name={name}
        value={value}
        onChange={changeHandler}        
      >
        {list.map(({ text, value }) => (
          <FormControlLabel
            sx={{fontSize: '10px', margin: {xs: '0px'}}}
            value={value}
            control={<Radio />}
            label={text}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
