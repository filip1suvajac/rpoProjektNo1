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

  const gameLoop = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameActive || prev.gameOver) return prev;

      const newRoads = prev.roads.map((road, index) => {
        const isCurrentRoad = index === prev.currentRoad;
        const isPastRoad = index < prev.currentRoad;
        const isNextRoad = index === prev.currentRoad + 1;
        const isFutureRoad = index > prev.currentRoad + 1;

        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

        if (isPastRoad || isCurrentRoad) {
          const shouldStop = isCurrentRoad && road.hasBarrier === true;
          const updatedCars = road.cars
            .map(car => {
              const targetY = shouldStop && car.y + car.speed >= road.barrierY - 70 ? road.barrierY - 70 : car.y + car.speed;
              const newY = lerp(car.y, targetY, 0.3); 
              return { ...car, y: newY };
            })
            .filter(car => car.y < 800);
          return { ...road, cars: updatedCars };
        }

        if (isNextRoad) {
          const updatedCars = road.cars
            .map(car => ({ ...car, y: lerp(car.y, car.y + car.speed, 0.3) }))
            .filter(car => car.y < 800);
          return { ...road, cars: updatedCars };
        }

        if (isFutureRoad && road.cars.length === 0 && Math.random() < 0.01) {
          return { ...road, cars: [spawnCar(road)] };
        }

        const updatedCars = road.cars
          .map(car => ({ ...car, y: lerp(car.y, car.y + car.speed, 0.3) }))
          .filter(car => car.y < 800);

        return { ...road, cars: updatedCars };
      });

      return { ...prev, roads: newRoads };
    });

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [spawnCar]);

  useEffect(() => {
    if (gameState.gameActive && !gameState.gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState.gameActive, gameState.gameOver, gameLoop]);

  const goNextRoad = useCallback(() => {
    if (!gameState.gameActive || gameState.gameOver || gameState.isJumping) return;

    const nextRoad = gameState.currentRoad + 1;
    const barrierChance = GAME_CONFIG.BARRIER_CHANCE[gameState.difficulty as keyof typeof GAME_CONFIG.BARRIER_CHANCE];
    const hasBarrier = Math.random() < barrierChance;
    const shouldCarCrashIntoBarrier = Math.random() < 0.6;

    setGameState(prev => {
      const newRoads = [...prev.roads];
      if (newRoads[nextRoad]) newRoads[nextRoad] = { ...newRoads[nextRoad], cars: [] };
      return { 
        ...prev, 
        roads: newRoads,
        isJumping: true,
        currentRoad: nextRoad,
        cameraOffset: prev.cameraOffset + GAME_CONFIG.ROAD_WIDTH * 0.9, 
      };
    });

    setTimeout(() => {
      setGameState(prev => {
        const newRoads = [...prev.roads];
        if (newRoads[nextRoad]) {
          const newCar = spawnCar(newRoads[nextRoad]);
          newRoads[nextRoad] = { ...newRoads[nextRoad], cars: [newCar] };
        }
        return { ...prev, roads: newRoads };
      });
    }, 100);

    setTimeout(() => {
      if (hasBarrier) {
        const newMultiplier = calculateMultiplier(nextRoad, gameState.difficulty);
        const newProfit = gameState.betAmount * newMultiplier - gameState.betAmount;

        setGameState(prev => {
          const newRoads = [...prev.roads];
          if (newRoads[nextRoad]) {
            newRoads[nextRoad] = { ...newRoads[nextRoad], hasBarrier: true, cars: [], showCrashedCar: shouldCarCrashIntoBarrier };
          }

          const newRoadData: Road = {
            id: prev.roads.length,
            hasBarrier: null,
            multiplier: calculateMultiplier(prev.roads.length, prev.difficulty),
            cars: [],
            barrierY: 240,
            crashed: false,
          };
          newRoads.push(newRoadData);

          return {
            ...prev,
            roads: newRoads,
            currentMultiplier: newMultiplier,
            profit: newProfit,
            isJumping: false,
          };
        });
      } else {
        setGameState(prev => {
          const newRoads = [...prev.roads];
          if (newRoads[nextRoad]) newRoads[nextRoad] = { ...newRoads[nextRoad], hasBarrier: false, crashed: true, cars: newRoads[nextRoad].cars.slice(0, 1) };

          newRoads.forEach((road, idx) => {
            if (idx !== nextRoad) road.cars = [];
          });

          setBetHistory(prevHistory => [...prevHistory, {
            id: Date.now().toString(),
            timestamp: new Date(),
            betAmount: prev.betAmount,
            difficulty: prev.difficulty,
            roadsCompleted: nextRoad - 1,
            multiplier: prev.currentMultiplier,
            profit: -prev.betAmount,
            result: 'loss',
          }]);

          return { ...prev, roads: newRoads, gameActive: false, gameOver: true, gameResult: 'loss', profit: -prev.betAmount, isJumping: false };
        });
      }
    }, 600);
  }, [gameState, calculateMultiplier, spawnCar]);

  const cashOut = useCallback(() => {
    if (!gameState.gameActive || gameState.gameOver || gameState.currentRoad === 0) return;

    const totalWin = gameState.betAmount + gameState.profit;

    setTimeout(() => { 
      setGameState(prev => ({
        ...prev,
        gameActive: false,
        gameOver: true,
        balance: prev.balance + totalWin,
        gameResult: 'win',
      }));

      setBetHistory(prev => [...prev, {
        id: Date.now().toString(),
        timestamp: new Date(),
        betAmount: gameState.betAmount,
        difficulty: gameState.difficulty,
        roadsCompleted: gameState.currentRoad,
        multiplier: gameState.currentMultiplier,
        profit: gameState.profit,
        result: 'win',
      }]);
    }, 150);
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameActive: false,
      gameOver: false,
      currentRoad: 0,
      currentMultiplier: 1.0,
      profit: 0,
      gameResult: 'none',
      roads: [],
      isJumping: false,
      cameraOffset: 0,
    }));
  }, []);

  const setBetAmount = useCallback((amount: number) => {
    if (gameState.gameActive) return;
    setGameState(prev => ({ ...prev, betAmount: Math.max(GAME_CONFIG.MIN_BET, Math.min(GAME_CONFIG.MAX_BET, amount)) }));
  }, [gameState.gameActive]);

  const setDifficulty = useCallback((difficulty: string) => {
    if (gameState.gameActive) return;
    setGameState(prev => ({ ...prev, difficulty }));
  }, [gameState.gameActive]);


  return {
    gameState,
    betHistory,
    startGame,
    goNextRoad,
    cashOut,
    resetGame,
    setBetAmount,
    setDifficulty,
  };
};
