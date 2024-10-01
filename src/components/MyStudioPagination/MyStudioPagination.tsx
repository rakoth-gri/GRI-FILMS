import { ChangeEvent, HTMLAttributes, memo } from "react";
// components
import { Pagination, Stack, PaginationItem } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
// types
import {I_STUDIO_STATE } from "../../types/types";
import "./MyStudioPagination.sass";

interface I_MyStudioPagination extends HTMLAttributes<HTMLElement> {
  action: ({
    name,
    value,
  }: {
    name: keyof I_STUDIO_STATE;
    value: unknown;
  }) => void;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "standard";
  page: number;
  pages: number;
}

const myStudioPaginationStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  color: "var(--app-default-color)",
  alignItems: "center",
};

export const MyStudioPagination = memo(
  ({
    action,
    page,
    pages,
    color = "primary",
    ...props
  }: I_MyStudioPagination) => {
    const changeHandler = (e: ChangeEvent<unknown>, page: number) => {
      action({ name: "page", value: page });
    };

    console.log("inside pagination...");

    return (
      <Stack sx={{ m: "1.2rem 0" }} spacing={0}>
        <Pagination
          sx={myStudioPaginationStyles}
          className="myStudioPagination"
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
  }
);
