import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useDiceGame } from "../hooks/useDiceGame";
import type { DiceMode } from "../utils/diceMath";

type RollResult = {
  id: string;
  ts: number;
  roll: number;
  win: boolean;
  profit: number;
  bet: number;
  chance: number;
  mode: DiceMode;
  multiplier: number;
};

type GameContextType = {
  balance: number;
  betAmount: string; 
  isRolling: boolean;

  chance: number;
  mode: DiceMode;

  lastResult: RollResult | null;
  history: RollResult[];
  error: string | null;

  setBetAmount: (v: string) => void; 
  setChance: (v: number) => void;
  setMode: (v: DiceMode) => void;

  roll: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(1000);
  const [betAmount, setBetAmount] = useState<string>("10"); 
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    chance,
    mode,
    setChance,
    setMode,
    rollNow,
    lastResult,
    history,
    error: gameError,
  } = useDiceGame();

  const roll = () => {
    if (isRolling) return;

    const bet = Number(betAmount); 

    if (isNaN(bet) || bet <= 0) {
      setLocalError("Bet must be greater than 0");
      return;
    }

    if (bet > balance) {
      setLocalError("Insufficient balance");
      return;
    }

    setIsRolling(true);
    setLocalError(null);

    const result = rollNow(bet);

    if (result) {
      setBalance((prev) => prev + result.profit);
    }

    setIsRolling(false);
  };

  return (
    <GameContext.Provider
      value={{
        balance,
        betAmount,
        isRolling,

        chance,
        mode,

        lastResult,
        history,
        error: localError || gameError,

        setBetAmount,
        setChance,
        setMode,

        roll,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};
