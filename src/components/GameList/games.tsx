import type { Game } from "./types";
import plinkoImg from "../../assets/games/plinko.jpg";
import minesImg from "../../assets/games/mines.jpg";
import crashImg from "../../assets/games/crash.jpg";
import rouletteImg from "../../assets/games/roulette.jpg";
import blackjackImg from "../../assets/games/blackjack.jpg";
import sweetImg from "../../assets/games/sweet-bonanza.jpg";
import diceImg from "../../assets/games/dice.jpg";
import limboImg from "../../assets/games/limbo.jpg";
import kenoImg from "../../assets/games/keno.jpg";
import slot1Img from "../../assets/games/slot1.jpg";
import slot2Img from "../../assets/games/slot2.jpg";
import monopolyImg from "../../assets/games/monopoly.jpg";


export const games: Game[] = [
  // ===== ORIGINALS =====
  {
    id: "plinko",
    title: "Plinko",
    provider: "Originals",
    category: "Originals",
    isNew: true,
    isHot: true,
    image: plinkoImg,
  },
  {
    id: "mines",
    title: "Mines",
    provider: "Originals",
    category: "Originals",
    isHot: true,
    image: minesImg,
  },
  {
    id: "crash",
    title: "Crash",
    provider: "Originals",
    category: "Originals",
    image: crashImg,
  },
  {
    id: "dice",
    title: "Dice",
    provider: "Originals",
    category: "Originals",
    image: diceImg,
  },
  {
    id: "limbo",
    title: "Limbo",
    provider: "Originals",
    category: "Originals",
    image: limboImg,
  },
  {
    id: "keno",
    title: "Keno",
    provider: "Originals",
    category: "Originals",
    image: kenoImg,
  },

  // ===== LIVE CASINO =====
  {
    id: "roulette-live",
    title: "Roulette",
    provider: "Live Dealer",
    category: "Live",
    isHot: true,
    image: rouletteImg,
  },
  {
    id: "blackjack-live",
    title: "Blackjack",
    provider: "Live Dealer",
    category: "Live",
    image: blackjackImg,
  },
  {
    id: "monopoly-live",
    title: "Monopoly Live",
    provider: "Evolution",
    category: "Live",
    isNew: true,
    image: monopolyImg,
  },

  // ===== SLOTS =====
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    provider: "Pragmatic Play",
    category: "Slots",
    isHot: true,
    image: sweetImg,
  },
  {
    id: "slot-1",
    title: "Slot Machine X",
    provider: "Pragmatic Play",
    category: "Slots",
    image: slot1Img,
  },
  {
    id: "slot-2",
    title: "Slot Machine Y",
    provider: "Play'n GO",
    category: "Slots",
    image: slot2Img,
  },

  // ===== TABLE =====
  {
    id: "roulette-table",
    title: "Roulette (Table)",
    provider: "Table",
    category: "Table",
    image: rouletteImg,
  },
  {
    id: "blackjack-table",
    title: "Blackjack (Table)",
    provider: "Table",
    category: "Table",
    image: blackjackImg,
  },
];
