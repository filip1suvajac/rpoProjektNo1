export type GameCategory = "All" | "Slots" | "Live" | "Originals" | "Table" | "New";

export type Game = {
  id: string;
  title: string;
  provider: string;
  category: Exclude<GameCategory, "All">;
  isNew?: boolean;
  isHot?: boolean;
  image: string;
};
