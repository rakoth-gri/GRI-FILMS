import { useState, useCallback, useMemo, useRef} from "react";
import { MyTitle } from "../../components/MyTitle";
import { Box } from "@mui/material";
// FAKE COMPONENT
import { Wax } from "../../components/Wax/Wax";

interface I_POST {
  id: number;
  date: string;
  title: string;
}

const pStyles = {
  p: "0.5rem",
  textIndent: "0.5rem",
  letterSpacing: "0.5px",
  textAlign: "justify",
  lineHeight: "1.5em",
  "&::first-letter": { fontSize: "1.3em", color: "#c62828" },
  "&:last-child": { fontVariant: "small-caps", fontSize: "1.18em" },
};

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // let ref = useRef()
  const [posts, setPosts] = useState<Array<I_POST>>([])

  // ref.current = posts

  const handleClick = () => {
    setCount(count + 1);
    setIsLoading(!isLoading);
    // Выводит текущий стэйт, не изменившийся, т.к. setCount - асинхронен...
    console.log(count);
  };

  console.log(count, isLoading, posts);

  const handlePosts = useCallback(() => {
    const title = prompt('Введите строку...') as string
    // setPosts([...posts, {id: Date.now(), date: new Date().toJSON(), title}])
    // setPosts([...ref.current, {id: Date.now(), date: new Date().toJSON(), title}])
    setPosts(p => ([...p, {id: Date.now(), date: new Date().toJSON(), title}]))
  }, [])

  const text = useCallback(() => {
    console.log("Test Callback Function");
  }, []);

  return (
    <>
      <MyTitle variant="h4" onClick={handleClick}>
        ГЛАВНАЯ
      </MyTitle>
      <Box component={"section"} sx={{ p: "1rem" }}>
        <Box component="p" sx={pStyles} onClick={handlePosts} style={{cursor: 'pointer'}}>
          Добро пожаловать на наш уникальный сайт, посвященный миру кино и
          блестящим актерам! Здесь, среди ярких постеров и захватывающих
          трейлеров, вы найдете всё, что нужно для истинного ценителя искусства
          седьмого экрана. Мы предлагаем широкий выбор фильмов — от классики до
          современных шедевров, от драм до комедий, от триллеров до анимации.
          Каждый пользователь сможет легко ориентироваться в нашем обширном
          каталоге, где скрыты настоящие киношедевры.
        </Box>
        <Box component="p" sx={pStyles}>
          На нашем сайте также представлено множество увлекательных биографий
          известных актеров и режиссеров, которые вдохнули жизнь в незабываемые
          образы. Узнайте о их карьере. Мы обновляем нашу бибилиотеку мира кино,
          а также рецензии и рекомендации фильмов, чтобы помочь вам выбрать
          идеальное кино для вечернего просмотра.
        </Box>
        <Box component="p" sx={pStyles}>
          Присоединяйтесь к нашему сообществу киноманов, делитесь впечатлениями,
          открывайте новые горизонты и получайте удовольствие от волшебства
          кино! Откройте для себя бесконечные возможности на нашем сайте — вашем
          личном путеводителе в интернете.
        </Box>
        <Wax cb={text}/>
      </Box>
    </>
  );
};
