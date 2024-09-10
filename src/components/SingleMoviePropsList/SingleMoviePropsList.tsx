import { ReactNode } from "react";
import { Box } from "@mui/material";
import { MyTitle } from "../MyTitle";
import { ContainerForLists } from "../ContainerForLists";

interface I_SingleMoviePropsList {
  list: any[];
  title: string;
  cb: (item: any, i?: number) => ReactNode;
}

export const SingleMoviePropsList = ({
  list,
  title,
  cb,
}: I_SingleMoviePropsList) => {
  return (
    <Box component={"section"} sx={{ padding: "0.5rem" }}>
      <MyTitle align="center" component="h3" variant="h6" color={"inherit"}>
        {title}
      </MyTitle>
      <ContainerForLists list={list} cb={cb} />
    </Box>
  );
};
