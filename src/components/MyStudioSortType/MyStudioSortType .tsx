import { memo, ChangeEventHandler, HTMLAttributes } from "react";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
// types:
import { T_SORTFIELD_SELECT, I_STUDIO_STATE } from "../../types/types";
// sass styling:
import "./MyStudioSortType.sass";

const mySortTypeStyles = {
  p: "0.5rem",
  flexDirection: "row",
  gap: "1rem",
  alignItems: "center",
  width: "auto",
  justifyContent: "center",
};

interface I_MyStudioSortType extends HTMLAttributes<HTMLDivElement> {
  list: T_SORTFIELD_SELECT<-1 | 1>[];
  action: ({
    name,
    value,
  }: {
    name: keyof I_STUDIO_STATE;
    value: unknown;
  }) => void;
  value: string;
  name: keyof I_STUDIO_STATE;
}

export const MyStudioSortType = memo(
  ({ list, name, value, action, ...props }: I_MyStudioSortType) => {
    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name, value } = e.target;
      // @ts-ignore
      action({ name, value });
    };

    return (
      // @ts-ignore
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
              className="sortFormControlLabel"
              sx={{ margin: { xs: "0px" } }}
              value={value}
              control={<Radio />}
              label={text}
              key={value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
);
