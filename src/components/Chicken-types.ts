export const GAME_CONFIG = {
  MIN_BET: 0.1,
  MAX_BET: 1000,
  DIFFICULTY_OPTIONS: ['Easy', 'Medium', 'Hard', 'Extreme'],
  STARTING_BALANCE: 1000,
  MAX_MULTIPLIER: 1000,
  BARRIER_CHANCE: {
    Easy: 0.80,
    Medium: 0.50,
    Hard: 0.30,
    Extreme: 0.15,
  },
  CAR_SPEED: 4.5,
  ROAD_WIDTH: 120,
  CHICKEN_Y: 280,
  CRASH_CAR_Y: 420,
};

export interface Car {
  id: string;
  y: number;
  speed: number;
  color: string;
}

export interface Road {
  id: number;
  hasBarrier: boolean | null;
  multiplier: number;
  cars: Car[];
  barrierY: number;
  crashed: boolean;
  showCrashedCar?: boolean;
}

export interface GameState {
  gameActive: boolean;
  gameOver: boolean;
  currentRoad: number;
  balance: number;
  betAmount: number;
  difficulty: string;
  currentMultiplier: number;
  profit: number;
  gameResult: 'none' | 'win' | 'loss';
  roads: Road[];
  isJumping: boolean;
  cameraOffset: number;
}

export interface BetHistory {
  id: string;
  timestamp: Date;
  betAmount: number;
  difficulty: string;
  roadsCompleted: number;
  multiplier: number;
  profit: number;
  result: 'win' | 'loss';
}
