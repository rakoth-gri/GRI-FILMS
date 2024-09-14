// components:
import { colors, Divider } from "@mui/material";
import { Card } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { MyFlexContainer } from "../MyFlexContainer";
import { MyTitle } from "../MyTitle";
// types
import { I_PERSON_AWARDS } from "../../types/types";
import "./PersonAwardCard.sass";

const PersonAwardCardStyles = {
  width: '180px',
  padding: "0.35rem",
  height: '215px',
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  background: colors.amber[200],
  color: colors.grey[800],
  fontSize: '0.85em'
};

const PersonAwardCardTitleStyles = {
  fontSize: '0.95em',
  m: '0.25em', 
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  color: 'inherit'
}

// ! Карточка для  отображения: similarMovies, sequelsAndPrequels
export const PersonAwardCard = ({
  id,   
  winning,  
  year,
  filmAward,
  nomination,
}: I_PERSON_AWARDS) => {
  return (
    <Card sx={PersonAwardCardStyles} id={id}>
      <MyTitle       
        variant={"subtitle1"}
        component="h5"
        sx={PersonAwardCardTitleStyles}
      >
        {nomination}
      </MyTitle>
      <Divider sx={{ width: "100%" }} />
      <MyTitle        
        variant={"subtitle2"}
        component="h6"
        sx={PersonAwardCardTitleStyles}
      > <EmojiEventsIcon sx={{mr: '0.25rem', color: colors.amber[900]}}/>
        {filmAward}
      </MyTitle>
      <Divider sx={{ width: "100%" }} />
      <MyFlexContainer justify="space-between" align='start'>
        <span> {year} </span>
        <span> {winning ? <CheckCircleRoundedIcon color='success' fontSize="small"/> : "Номинант"}</span>
      </MyFlexContainer>
    </Card>
  );
};
