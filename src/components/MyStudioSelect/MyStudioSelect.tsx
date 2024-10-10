import { ChangeEvent, SelectHTMLAttributes, memo} from "react";
// components
import { Select, MenuItem } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
// types:
import { T_SELECT, I_STUDIO_STATE } from "../../types/types";

interface I_MyStudioSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  list: T_SELECT[];
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

export const MyStudioSelect = memo(
  ({ list, value, name, action, ...props }: I_MyStudioSelect) => {
    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      // @ts-ignore
      action({ name, value });
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
        // @ts-ignore
        onChange={changeHandler}
        value={value}
        displayEmpty={true}
        IconComponent={ArrowDropDownCircleIcon}
        {...props}
      >
        {list.map(({ value, text }) => (
          // @ts-ignore
          <MenuItem key={value} value={value}>
            {text as string}
          </MenuItem>
        ))}
      </Select>
    );
  }
);
