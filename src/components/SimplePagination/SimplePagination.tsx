import {MouseEvent} from "react";
// components:
import { IconButton } from "@mui/material";
import { MyFlexContainer } from "../MyFlexContainer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface I_SimplePagination {
    page: number;
    pages: number;
    clickHandler: (e: MouseEvent<HTMLButtonElement>) => void
}


export const SimplePagination = ({page, pages, clickHandler}: I_SimplePagination) => {
  return (
    <MyFlexContainer w="100%">
      <IconButton
        aria-label="prev"
        onClick={clickHandler}
        size="large"
        disabled={page === 1}
        id="prev"
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton onClick={clickHandler} size="large">
        {page}
      </IconButton>
      <IconButton
        aria-label="next"
        id="next"
        onClick={clickHandler}
        size="large"
        disabled={page === pages}
      >
        <NavigateNextIcon />
      </IconButton>
    </MyFlexContainer>
  );
};
