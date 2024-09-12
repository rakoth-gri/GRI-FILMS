import { ReactNode } from "react";
import { MyFlexContainer } from "../MyFlexContainer";

interface I_MoviePropListContainer<T> {
  list: T[];
  cb: (item: T, i?: number) => ReactNode;
  type?: "awards";
}

export function ContainerForLists<T>({
  list,
  cb,
  type,
}: I_MoviePropListContainer<T>) {
  return (
    <MyFlexContainer
      id="moviePropListComp"
      align="start"
      justify={type === "awards" ? "center" : "flex-start"}
      sx={{ margin: "0.8rem 0" }}
      wrap="nowrap"
    >
      {list.map(cb)}
    </MyFlexContainer>
  );
}
