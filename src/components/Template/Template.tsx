import { ReactNode } from "react";
import { Header } from "../Header";
import { AppContainer } from "../AppContainer";

interface I_Template {
  children: ReactNode;
}

export const Template = ({ children }: I_Template) => {
  return (
    <>
      <Header />
      <AppContainer h='60vh'>{children}</AppContainer>
    </>
  );
};
