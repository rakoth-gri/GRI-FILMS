import { HTMLAttributes } from "react";
import { MyModalWrapper } from "../MyModalWrapper";
import { MyTitle } from "../MyTitle";
// types:
import { SxProps, Theme } from "@mui/material";

interface I_MyTrailer extends HTMLAttributes<HTMLDivElement> {
  videos: '' | Record<'url' | 'name', string>;
  sx: SxProps<Theme> | undefined;
}

export const MyTrailer = ({ videos, sx, ...props }: I_MyTrailer) => {

  return (
    <MyModalWrapper sx={sx} {...props}>
      <MyTitle variant="h2" component={"h1"} sx={{ fontWeight: "bold", fontSize: { xs: "1.35em", lg: "2em" } }}>
      {videos ? videos?.name : 'Нет данных'}
      </MyTitle>
      <iframe
        style={{ margin: "0.25rem auto", width: "70%", height: "500px" }}
        title={videos ? videos?.name : 'Нет данных'}
        frameBorder="0"
        src={videos ? videos?.url : undefined}
        allow="autoplay;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </MyModalWrapper>
  );
};
