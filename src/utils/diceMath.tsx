export type DiceMode = "roll_under" | "roll_over";

export const DEFAULT_HOUSE_EDGE_PERCENT = 1; 
export const MIN_CHANCE = 0.01;
export const MAX_CHANCE = 99.99;

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function roundTo(n: number, decimals: number): number {
  const p = 10 ** decimals;
  return Math.round((n + Number.EPSILON) * p) / p;
}

export function rollDice(): number {
  if (typeof crypto === "undefined" || typeof crypto.getRandomValues !== "function") {
    throw new Error("crypto.getRandomValues is not available in this environment.");
  }

  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const r = buf[0] / 2 ** 32; 

  const int = Math.floor(r * 10000); 
  return int / 100;
}


export function chanceToTarget(chance: number, mode: DiceMode): number {
  const c = clamp(roundTo(chance, 2), MIN_CHANCE, MAX_CHANCE);
  const target = mode === "roll_under" ? c : 100 - c;
  return clamp(roundTo(target, 2), MIN_CHANCE, MAX_CHANCE);
}


export function isWin(roll: number, target: number, mode: DiceMode): boolean {
  const t = clamp(roundTo(target, 2), MIN_CHANCE, MAX_CHANCE);
  if (mode === "roll_under") return roll < t;
  return roll > t;
}


export function calculateMultiplier(
  chance: number,
  houseEdgePercent: number = DEFAULT_HOUSE_EDGE_PERCENT,
  precisionDecimals: number = 4
): number {
  const c = clamp(roundTo(chance, 2), MIN_CHANCE, MAX_CHANCE);
  const he = clamp(houseEdgePercent, 0, 10); 
  const raw = (100 - he) / c;

  return roundTo(raw, precisionDecimals);
}

export function calculateProfit(
  bet: number,
  win: boolean,
  multiplier: number
): number {
  if (bet <= 0 || !Number.isFinite(bet)) return 0;
  return win ? bet * (multiplier - 1) : -bet;
}
