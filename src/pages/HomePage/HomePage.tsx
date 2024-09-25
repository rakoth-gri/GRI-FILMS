import { MyTitle } from "../../components/MyTitle";
import { Box, styled } from "@mui/material";

const MyHomePageText = styled(Box)(({ theme }) => ({
  fontSize: "1.2em",
  fontFamily: "inherit",
  fontWeight: 400,
  padding: "0.5rem",
  margin: "0.5rem",
  textIndent: "0.5rem",
  letterSpacing: "0.75px",
  textAlign: "justify",
  lineHeight: "1.5em",
  "&::first-letter": { fontSize: "1.3em", color: "#c62828" },
  [theme.breakpoints.down("lg")]: {
    padding: "0.25rem",
    fontSize: "14px",
  },
}));

export const HomePage = () => {
  return (
    <>
      <MyTitle
        variant="h4"
        sx={{ fontSize: { xs: "1.35em", lg: "2em" } }}
        component="h1"
        color="inherit"
      >
        главная
      </MyTitle>
      <Box component={"section"} sx={{ p: { xs: "0.25rem", md: "0.5rem" } }}>
        <MyHomePageText component="p">
          Добро пожаловать на наш уникальный сайт, посвященный миру кино и
          блестящим актерам! Здесь, среди ярких постеров и захватывающих
          трейлеров, вы найдете всё, что нужно для истинного ценителя искусства
          седьмого экрана. Мы предлагаем широкий выбор фильмов — от классики до
          современных шедевров, от драм до комедий, от триллеров до анимации.
          Каждый пользователь сможет легко ориентироваться в нашем обширном
          каталоге, где скрыты настоящие киношедевры.
        </MyHomePageText>
        <MyHomePageText component="p">
          На нашем сайте также представлено множество увлекательных биографий
          известных актеров и режиссеров, которые вдохнули жизнь в незабываемые
          образы. Узнайте о их карьере. Мы обновляем нашу библиотеку мира кино,
          а также рецензии и рекомендации фильмов, чтобы помочь вам выбрать
          идеальное кино для вечернего просмотра.
        </MyHomePageText>
        <MyHomePageText component="p">
          Присоединяйтесь к нашему сообществу киноманов, делитесь впечатлениями,
          открывайте новые горизонты и получайте удовольствие от волшебства
          кино! Откройте для себя бесконечные возможности на нашем сайте — вашем
          личном путеводителе в интернете.
        </MyHomePageText>
      </Box>
    </>
  );
};
