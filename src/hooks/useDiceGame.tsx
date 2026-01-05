import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_HOUSE_EDGE_PERCENT,
  MIN_CHANCE,
  MAX_CHANCE,
  clamp,
  roundTo,
  rollDice,
  chanceToTarget,
  calculateMultiplier,
  isWin,
  calculateProfit,
} from "../utils/diceMath";

import type { DiceMode } from "../utils/diceMath";



export type DiceResult = {
  id: string;
  ts: number;

  mode: DiceMode;
  chance: number;    
  target: number;    
  roll: number;       

  houseEdgePercent: number;
  multiplier: number; 

  bet: number;
  win: boolean;
  profit: number;     
};

export type UseDiceGameOptions = {
  initialMode?: DiceMode;
  initialChance?: number;          
  houseEdgePercent?: number;       
  multiplierPrecisionDecimals?: 2 | 4;
  maxHistory?: number;
};

function uid(): string {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function useDiceGame(options: UseDiceGameOptions = {}) {
  const {
    initialMode = "roll_under",
    initialChance = 50,
    houseEdgePercent = DEFAULT_HOUSE_EDGE_PERCENT,
    multiplierPrecisionDecimals = 4,
    maxHistory = 50,
  } = options;

  const [mode, setMode] = useState<DiceMode>(initialMode);
  const [chance, setChanceRaw] = useState<number>(
    clamp(roundTo(initialChance, 2), MIN_CHANCE, MAX_CHANCE)
  );

  const [lastResult, setLastResult] = useState<DiceResult | null>(null);
  const [history, setHistory] = useState<DiceResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const target = useMemo(() => chanceToTarget(chance, mode), [chance, mode]);

  const multiplier = useMemo(
    () => calculateMultiplier(chance, houseEdgePercent, multiplierPrecisionDecimals),
    [chance, houseEdgePercent, multiplierPrecisionDecimals]
  );

  const setChance = useCallback((value: number) => {
    const safe = clamp(roundTo(value, 2), MIN_CHANCE, MAX_CHANCE);
    setChanceRaw(safe);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const rollNow = useCallback(
    (bet: number): DiceResult | null => {
      try {
        setError(null);

        const safeBet =
          Number.isFinite(bet) && bet > 0 ? bet : NaN;

        if (!Number.isFinite(safeBet)) {
          throw new Error("Bet must be a positive number.");
        }

        const roll = rollDice(); 
        const win = isWin(roll, target, mode);
        const profit = calculateProfit(safeBet, win, multiplier);

        const result: DiceResult = {
          id: uid(),
          ts: Date.now(),

          mode,
          chance: roundTo(chance, 2),
          target: roundTo(target, 2),
          roll,

          houseEdgePercent,
          multiplier,

          bet: safeBet,
          win,
          profit,
        };

        setLastResult(result);
        setHistory((prev) => {
          const next = [result, ...prev];
          return next.slice(0, maxHistory);
        });

        return result;
      } catch (e: any) {
        setError(e?.message ?? "Unknown error while rolling.");
        return null;
      }
    },
    [chance, houseEdgePercent, maxHistory, mode, multiplier, target]
  );

  return {
    mode,
    setMode,
    chance,
    setChance,

    target,
    houseEdgePercent,
    multiplier,

    lastResult,
    history,
    clearHistory,

    rollNow,

    error,

    limits: { MIN_CHANCE, MAX_CHANCE },
  };
}
