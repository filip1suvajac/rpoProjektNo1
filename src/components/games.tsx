import type { Game } from "./types";
import plinkoImg from "../assets/games/plinko.jpg";
import minesImg from "../assets/games/mines.jpg";
import crashImg from "../assets/games/crash.jpg";
import rouletteImg from "../assets/games/roulette.jpg";
import blackjackImg from "../assets/games/blackjack.jpg";
import sweetImg from "../assets/games/sweet-bonanza.jpg";
import diceImg from "../assets/games/dice.jpg";
import limboImg from "../assets/games/limbo.jpg";
import kenoImg from "../assets/games/keno.jpg";
import slot1Img from "../assets/games/slot1.jpg";
import slot2Img from "../assets/games/slot2.jpg";
import monopolyImg from "../assets/games/monopoly.jpg";


export const games: Game[] = [
  // ===== ORIGINALS =====
  {
    id: "plinko",
    title: "Plinko",
    provider: "Originali",
    category: "Originali",
    isNew: true,
    isHot: true,
    image: plinkoImg,
  },
  {
    id: "mines",
    title: "Mines",
    provider: "Originali",
    category: "Originali",
    isHot: true,
    image: minesImg,
  },
  {
    id: "crash",
    title: "Crash",
    provider: "Originali",
    category: "Originali",
    image: crashImg,
  },
  {
    id: "dice",
    title: "Kocke",
    provider: "Originali",
    category: "Originali",
    image: diceImg,
  },
  {
    id: "limbo",
    title: "Limbo",
    provider: "Originali",
    category: "Originali",
    image: limboImg,
  },
  {
    id: "keno",
    title: "Keno",
    provider: "Originali",
    category: "Originali",
    image: kenoImg,
  },

  // ===== LIVE CASINO =====
  {
    id: "roulette-live",
    title: "Ruleta",
    provider: "Vživo Dealer",
    category: "Vživo",
    isHot: true,
    image: rouletteImg,
  },
  {
    id: "blackjack-live",
    title: "Blackjack",
    provider: "Vživo Dealer",
    category: "Vživo",
    image: blackjackImg,
  },
  {
    id: "monopoly-live",
    title: "Monopoli Vživo",
    provider: "Evolution",
    category: "Vživo",
    isNew: true,
    image: monopolyImg,
  },

  // ===== SLOTS =====
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    provider: "Pragmatična Igra",
    category: "Sloti",
    isHot: true,
    image: sweetImg,
  },
  {
    id: "slot-1",
    title: "Slot Machine X",
    provider: "Pragmatična Igra",
    category: "Sloti",
    image: slot1Img,
  },
  {
    id: "slot-2",
    title: "Slot Machine Y",
    provider: "Play'n GO",
    category: "Sloti",
    image: slot2Img,
  },

  // ===== TABLE =====
  {
    id: "roulette-table",
    title: "Ruleta (Miza)",
    provider: "Miza",
    category: "Miza",
    image: rouletteImg,
  },
  {
    id: "blackjack-table",
    title: "Blackjack (Miza)",
    provider: "Miza",
    category: "Miza",
    image: blackjackImg,
  },
];
