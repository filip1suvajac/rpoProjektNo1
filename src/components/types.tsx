export type GameCategory = "Vse" | "Sloti" | "Vživo" | "Originali" | "Miza" | "Novo";

export type Game = {
  id: string;
  title: string;
  provider: string;
  category: Exclude<GameCategory, "Vse">;
  isNew?: boolean;
  isHot?: boolean;
  image: string;
  link: string
};
