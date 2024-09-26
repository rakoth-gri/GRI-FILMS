import React from "react";
// components:
import Render from "../Render";
import { ImageList, ImageListItem } from "@mui/material";
import { I_IMAGE } from "../../types/types";

interface I_MyMasonry {
  error: string;
  isLoading: boolean;
  images: I_IMAGE[];
  ImagesModalHandler: (t: number) => void;
}

export const MyMasonry = ({
  error,
  isLoading,
  images,
  ImagesModalHandler,
}: I_MyMasonry) => {
  return (
    <ImageList variant="masonry" cols={3} gap={6}>
      <Render
        list={images}
        loading={isLoading}
        error={error}
        // @ts-ignore
        cb={(item: I_IMAGE, i: number) => (
          <ImageListItem key={item.id}>
            <img
              // data-src={`${item.url}?w=248&fit=crop&auto=format`}
              src={`${item.url}?w=248&fit=crop&auto=format`}
              alt={item.id}
              onClick={(e) => ImagesModalHandler(+(e.target as HTMLElement).id)}
              id={`${i}`}
              className={"movieImage"}
            />
          </ImageListItem>
        )}
      />
    </ImageList>
  );
};
