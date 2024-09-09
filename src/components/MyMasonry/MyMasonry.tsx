import React from "react";
// components:
import { Render } from "../Render";
import { ImageList, ImageListItem } from "@mui/material";
import { I_IMAGE } from "../../types/types";

interface I_MyMasonry {
    error: string;
    isLoading: boolean;
    images: I_IMAGE[];
    ImagesModalHandler: (t: number) => void
}

export const MyMasonry = ({error, isLoading, images, ImagesModalHandler}: I_MyMasonry) => {
  return (
    <ImageList variant="masonry" cols={3} gap={6}>
      <Render
        list={images}
        loading={isLoading}
        error={error}
        cb={(image: I_IMAGE, i: number) => (
          <ImageListItem key={image.id}>
            <img
              data-src={`${image.url}?w=248&fit=crop&auto=format`}
              alt={image.id}
              onClick={(e) => ImagesModalHandler(+e.target.id)}
              id={`${i}`}
              className={"movieImage"}
            />
          </ImageListItem>
        )}
      />
    </ImageList>
  );
};
