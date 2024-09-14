import { ReactNode } from "react";
import { Box } from "@mui/material";
import { MyFlexContainer } from "../MyFlexContainer";
import { MyTitle } from "../MyTitle";

interface I_SingleMoviePropsList {
  list: any[];
  title: string;
  cb: (item: any, i?: number) => ReactNode;
  type?: "awards";
}

export const SingleMoviePropsList = ({
  list,
  title,
  type,
  cb,
}: I_SingleMoviePropsList) => {
  return (
    <Box component={"section"} sx={{ padding: "0.5rem" }}>
      <MyTitle align="center" component="h3" variant="h6" color={"inherit"}>
        {title}
      </MyTitle>
      <MyFlexContainer
        id="moviePropListComp"
        align="start"
        justify={type === "awards" ? "center" : "flex-start"}
        sx={{ margin: "0.8rem 0" }}
        wrap="nowrap"
      >
        {list.map(cb)}
      </MyFlexContainer>
    </Box>
  );
};
