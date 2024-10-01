import { useCallback, useState, memo } from "react";
// components:
import { Box, styled, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// types:
import { InputHTMLAttributes, ChangeEventHandler } from "react";
import { I_STUDIO_STATE } from "../../types/types";
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

const myStudioSearchIcon = {
  color: "inherit",
  position: "absolute",
  left: "0%",
  top: "50%",
  transform: "translateY(-50%)",
  opacity: "0.65",
};

interface I_MyStudioSearch extends InputHTMLAttributes<HTMLInputElement> {
  action: ({
    name,
    value,
  }: {
    name: keyof I_STUDIO_STATE;
    value: unknown;
  }) => void;
  color?: "error" | "primary" | "secondary" | "info" | "success" | "warning";
  autoFocus?: boolean;
  name: keyof I_STUDIO_STATE;
}

export const MyStudioSearch = memo(
  ({ action, name, color = "primary", ...props }: I_MyStudioSearch) => {
    const [query, setQuery] = useState("");

    const debouncedAction = useCallback(
      debounce(({ name, value }) => action({ name, value }), 610),
      []
    );

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name, value } = e.target;
      setQuery(value);
      debouncedAction({ name, value });
    };

    return (
      <MySearchBox component="search">
        <Box sx={{ position: "relative" }}>
          <SearchIcon sx={myStudioSearchIcon} fontSize="large" />
          <Input
            type="search"
            name={name}
            id="title"
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
  }
);
