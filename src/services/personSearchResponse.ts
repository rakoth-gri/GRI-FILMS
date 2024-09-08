// types
import { I_PERSON_SEARCH } from "../types/types";
// consts:
import FAKE from "../assets/await.jpg";

export const personSearchResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const personList: I_PERSON_SEARCH[] = docs?.map((person: any) => ({
    id: person?.id ?? 0,
    name: person?.name ?? "Нет данных",
    enName: person?.enName ?? "Нет данных",
    photo: person?.photo || FAKE,
    sex: person?.sex ?? "Нет данных",
    growth: person?.growth ?? 0,
    birthday: person?.birthday || "",
    death: person?.death || null,
    age: person?.age || 0,
  }));

  return {
    data: personList,
    total,
    limit,
    page,
    pages,
  };
};
