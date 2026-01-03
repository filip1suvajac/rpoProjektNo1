import { useState, useEffect, useCallback, useRef } from 'react';
import { GAME_CONFIG, type GameState, type BetHistory, type Road, type Car } from '../components/Chicken-types';

export const useChickenGame = () => {

  const [gameState, setGameState] = useState<GameState>({
    gameActive: false,
    gameOver: false,
    currentRoad: 0,
    balance: GAME_CONFIG.STARTING_BALANCE,
    betAmount: 1.0,
    difficulty: 'Medium',
    currentMultiplier: 1.0,
    profit: 0,
    gameResult: 'none',
    roads: [],
    isJumping: false,
    cameraOffset: 0,
  });

  const [betHistory, setBetHistory] = useState<BetHistory[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const carColors = ['#ef4444', '#3b82f6', '#eab308', '#8b5cf6', '#06b6d4', '#ec4899'];


  const calculateMultiplier = useCallback((road: number, difficulty: string): number => {
    if (road === 0) return 1.0;

    const baseMultiplier = 1 + (road * 0.15);
    const difficultyBonus = {
      Easy: 1.0,
      Medium: 1.15,
      Hard: 1.3,
      Extreme: 1.5,
    }[difficulty] || 1.0;

    return Number(
      (Math.min(baseMultiplier * difficultyBonus, GAME_CONFIG.MAX_MULTIPLIER)).toFixed(2)
    );
  }, []);


  const spawnCar = useCallback((road: Road): Car => {
    return {
      id: `${Date.now()}-${Math.random()}`,
      y: -100,
      speed: GAME_CONFIG.CAR_SPEED * (0.9 + Math.random() * 0.2),
      color: carColors[Math.floor(Math.random() * carColors.length)],
    };
  }, [carColors]);


  const initializeRoads = useCallback((count: number = 8) => {
    const roads: Road[] = [];
    for (let i = 0; i < count; i++) {
      roads.push({
        id: i,
        hasBarrier: null,
        multiplier: calculateMultiplier(i, gameState.difficulty),
        cars: [],
        barrierY: 240,
        crashed: false,
      });
    }
    return roads;
  }, [calculateMultiplier, gameState.difficulty]);


  const startGame = useCallback(() => {
    if (gameState.betAmount > gameState.balance) return;

    setGameState(prev => ({
      ...prev,
      gameActive: true,
      gameOver: false,
      currentRoad: 0,
      currentMultiplier: 1.0,
      profit: 0,
      balance: prev.balance - prev.betAmount,
      gameResult: 'none',
      roads: initializeRoads(),
      isJumping: false,
      cameraOffset: 0,
    }));
  }, [gameState.betAmount, gameState.balance, initializeRoads]);


  // OSEBA 2 
  // naredi tako kot smo se zmenili na sestanku




  return {
    gameState,
    betHistory,
    startGame,
    //sem dodaj se funkcije ki manjkajo

  };
};