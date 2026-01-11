import type { Game } from "./types";
import blackjackImg from "../assets/games/blackjack.jpg";
import diceImg from "../assets/games/dice.jpg";
import chickenImg from "../assets/games/chicken.jpg"

export const games: Game[] = [
  // ===== ORIGINALS =====
  {
    id: "dice",
    title: "Kocke",
    provider: "Originali",
    category: "Originali",
    image: diceImg,
    link: "dice"
  },
  {
    id: "chicken",
    title: "Chicken",
    provider: "AnimalFarm",
    category: "Novo",
    image: chickenImg,
    link: "chicken",
  },
  {
    id: "blackjack-live",
    title: "Blackjack",
    provider: "Vživo Dealer",
    category: "Vživo",
    image: blackjackImg,
    link: "blackjack",
  }
]