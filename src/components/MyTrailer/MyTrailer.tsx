import { HTMLAttributes } from "react";
import { MyModalWrapper } from "../MyModalWrapper";
import { MyTitle } from "../MyTitle";
// types:
import { SxProps, Theme } from "@mui/material";

interface I_MyTrailer extends HTMLAttributes<HTMLDivElement> {
  name: string;
  url: string;
  sx: SxProps<Theme> | undefined;
}

export const MyTrailer = ({ url, name, sx, ...props }: I_MyTrailer) => {
  return (
    <MyModalWrapper sx={sx} {...props}>
      <MyTitle variant="h4" component={"h2"}>
        {" "}
        {name}{" "}
      </MyTitle>
      <iframe
        style={{ margin: "0.25rem auto", width: "70%", height: "500px" }}
        title={name}
        frameBorder="0"
        src={url}
        allow="autoplay;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </MyModalWrapper>
  );
};
