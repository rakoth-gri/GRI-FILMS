import { ReactNode } from "react";
// components
import { MyTitle } from "../MyTitle";
import { MyFlexContainer } from "../MyFlexContainer";
// types
import { SxProps, Theme } from "@mui/material";
import { I_PERSON_AWARDS } from "../../types/types";

interface I_PersonAwardsContainer {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  list: I_PERSON_AWARDS[];
  title: string;
  cb: (item: I_PERSON_AWARDS) => ReactNode;
}

export const PersonAwardsContainer = ({
  children,
  sx,
  list,
  cb,
  title,
  ...props
}: I_PersonAwardsContainer) => {
  return (
    <>
      <MyTitle align="center" component="h3" variant="h6" color={"inherit"}>
        {title}
      </MyTitle>
      <MyFlexContainer sx={sx}>{list.map(cb)}</MyFlexContainer>
    </>
  );
};
