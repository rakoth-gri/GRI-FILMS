import { useState, MouseEvent, HTMLAttributes } from "react";
// components:
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Box, CardMedia, Stack, IconButton, Chip } from "@mui/material";
import { MyModalWrapper } from "../MyModalWrapper";
// types
import { I_IMAGE } from "../../types/types";

const imagesModalBoxStyles = {
  width: "70%",
  height: "80%",  
};

const imagesModalCardMediaStyles = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  borderRadius: "0.5em",
};

interface I_MyImagesModal extends HTMLAttributes<HTMLDivElement> {
  images: I_IMAGE[];
  startIndex: number;
}

export const MyImagesModal = ({
  images,
  startIndex,
  ...props
}: I_MyImagesModal) => {
  const [count, setCount] = useState(startIndex);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget as HTMLButtonElement;
    return id === "next" ? setCount((p) => p + 1) : setCount((p) => p - 1);
  };

  return (
    <MyModalWrapper {...props} sx={{fontSize: '1.12em'}}>
      <Box sx={imagesModalBoxStyles}>
        <CardMedia
          src={images[count]?.url}
          alt={images[count]?.id}
          component="img"
          sx={imagesModalCardMediaStyles}
        />
      </Box>
      <Stack
        spacing={2}
        direction={"row"}
        component={"section"}
        alignItems={'center'}
        sx={{ p: "1rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          aria-label="previous"
          size="large"
          disabled={count === 0}
          id="prev"
          onClick={clickHandler}
          sx={{ bgcolor: "whitesmoke", "&:disabled": { opacity: 0.1 } }}
        >
          <NavigateBeforeIcon color="primary" />
        </IconButton>
        <Chip
          label={count + 1}          
          variant="outlined"
          sx={{ border: "none", color: 'inherit', fontSize: 'inherit'}}
        />
        <IconButton
          aria-label="next"
          size="large"
          disabled={count === images.length - 1}
          id="next"
          onClick={clickHandler}
          sx={{ bgcolor: "whitesmoke", "&:disabled": { opacity: 0.1 } }}
        >
          <NavigateNextIcon color="primary" />
        </IconButton>
      </Stack>
    </MyModalWrapper>
  );
};
