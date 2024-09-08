import { I_PERSON_AWARDS } from "../types/types";

export const personAwardsResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const personAwards: I_PERSON_AWARDS[] = docs?.map((person: any) => ({
    winning: person?.winning ?? "Нет данных",
    personId: person?.personId ?? 0,
    updatedAt: person?.updatedAt ?? "Нет данных",
    id: person?.id ?? "Нет данных",
    moviesId: person?.movie?.id ?? 0,
    movieName: person?.movie?.name ?? "Нет данных",
    year: person?.nomination?.award?.year ?? 0,
    filmAward: person?.nomination?.award?.title ?? "Нет данных",
    nomination: person?.nomination?.title ?? "Нет данных",
  }));

  return {
    data: personAwards,
    total,
    limit,
    page,
    pages,
  };
};
