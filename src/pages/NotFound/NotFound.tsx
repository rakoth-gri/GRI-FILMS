import React from "react";
import { MyTitle } from "../../components/MyTitle";

export const NotFound = () => {
  return (
    <MyTitle      
      color="inherit"
      component="h1"
      variant="h4"
      sx={{ fontWeight: 500, fontSize: { xs: "1.35em", lg: "2em" } }}
    >
      упсс, такая страница не найдена...
    </MyTitle>
  );
};
