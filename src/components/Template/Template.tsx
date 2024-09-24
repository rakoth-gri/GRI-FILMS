import { ReactNode, memo } from "react";
import { Header } from "../Header";
import { AppContainer } from "../AppContainer";

interface I_Template {
  children: ReactNode;
}

export const Template = memo(({ children }: I_Template) => {
  return (
    <>
      <Header />
      <AppContainer h='60vh'>{children}</AppContainer>
    </>
  );
});
