import React, { useRef } from "react";
import { type GameState, GAME_CONFIG } from "./Chicken-types";
import ChickenCar from "./Chicken-car";
import ChickenBarrier from "./Chicken-Barrier";
import ChickenRoasted from "./Chicken-Roasted";

interface GameBoardProps {
  gameState: GameState;
  onGoNext: () => void;
}

const ChickenGameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onGoNext,
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50">
      <h2 className="text-xl font-bold mb-4 text-slate-200">🐔 CHICKEN ROAD</h2>

      <div
        ref={viewportRef}
        className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl overflow-hidden"
        style={{ height: "600px", width: "100%" }}
      >
        {/* Smooth kamera + roads */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${gameState.cameraOffset}px)` }}
        >
          <div className="flex h-full">
            {/* OSEBA 2: START DEL + CESTE (roads.map) */}
            {/* START ZONA - zelena cona */}
            <div
              className="relative flex-shrink-0 h-full bg-gradient-to-b from-emerald-900/60 to-emerald-800/30 border-r-4 border-emerald-700 shadow-inner"
              style={{ width: `${GAME_CONFIG.ROAD_WIDTH}px` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none">
                <div className="text-4xl mb-2 animate-bounce">🏁</div>
                <div className="text-xs text-emerald-400 font-bold tracking-wider">START</div>
              </div>
            </div>

            {/* CESTE - vse roads */}
            {gameState.roads.map((road, index) => (
              <div
                key={road.id}
                className="relative flex-shrink-0 h-full border-x-4 border-slate-700 shadow-inner"
                style={{
                  width: `${GAME_CONFIG.ROAD_WIDTH}px`,
                  background: 'linear-gradient(to bottom, #1e293b 0%, #1e293b 48%, #fbbf24 49%, #fbbf24 51%, #1e293b 52%, #1e293b 100%)',
                  backgroundSize: '100% 100px',
                }}
              >
                {/* Lane markers */}
                <div className="absolute inset-0 flex flex-col justify-around opacity-30">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-12 bg-white mx-auto rounded"
                      style={{ boxShadow: '0 0 2px rgba(255,255,255,0.5)' }}
                    />
                  ))}
                </div>

                {/* Multiplier badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 px-3 py-1 rounded-full border border-amber-500/50 shadow-md">
                  <span className="text-amber-400 font-bold text-sm select-none">{road.multiplier.toFixed(2)}×</span>
                </div>

                {/* Avtomobili */}
                {road.cars.map(car => (
                  <ChickenCar key={car.id} car={car} stopped={road.hasBarrier === true} />
                ))}

                {/* Bariera */}
                {road.hasBarrier === true && (
                  <ChickenBarrier y={road.barrierY} showCrashedCar={road.showCrashedCar} />
                )}

                {/* Crash efekti */}
                {road.crashed && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{ top: `${GAME_CONFIG.CHICKEN_Y}px` }}
                  >
                    <div className="relative">
                      <div className="text-6xl animate-ping absolute top-0 left-1/2 -translate-x-1/2">💥</div>
                      <div className="text-6xl animate-pulse absolute top-0 left-1/2 -translate-x-1/2">💥</div>
                      <div className="text-4xl animate-bounce absolute top-2 -left-6" style={{ animationDuration: '1s' }}>🔥</div>
                      <div className="text-4xl animate-bounce absolute top-2 -right-6" style={{ animationDuration: '1.2s' }}>🔥</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* OSEBA 3: CHICKEN + WELCOME SCREEN */}
        <div
          className={`absolute transition-all duration-200 z-50 ${
            gameState.isJumping ? "scale-125" : ""
          }`}
          style={{
            left: `${
              (gameState.currentRoad + 1) * GAME_CONFIG.ROAD_WIDTH -
              gameState.cameraOffset +
              60
            }px`,
            top: `${GAME_CONFIG.CHICKEN_Y}px`,
            transform: `translateX(-50%) translateY(-50%) ${
              gameState.isJumping ? "translateY(-30px) scale(1.25)" : ""
            }`,
            filter: gameState.gameActive
              ? "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))"
              : "none",
          }}
        >
          {gameState.gameResult === "loss" ? (
            <ChickenRoasted />
          ) : (
            <div
              className="text-6xl drop-shadow-2xl animate-bob"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))",
              }}
            >
              🐔
            </div>
          )}
        </div>

        {/* WELCOME SCREEN */}
        {!gameState.gameActive && !gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 rounded-xl z-50">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🐔</div>
              <div className="text-2xl font-bold text-white mb-2">
                Chicken Road
              </div>
              <div className="text-slate-400">Kliknite ZAČNI IGRO</div>
            </div>
          </div>
        )}
      </div>

      {/* OSEBA 4: KONTROLE (buttons) + CSS ANIMACIJE */}
      <div className="mt-6 space-y-3">
        {/* GO NEXT ROAD gumb */}
        {gameState.gameActive && !gameState.isJumping && (
          <button
            onClick={onGoNext}
            disabled={gameState.currentMultiplier >= GAME_CONFIG.MAX_MULTIPLIER}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-700 disabled:opacity-50 px-8 py-4 rounded-xl font-bold text-2xl transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-blue-500/50 animate-pulse-slow"
          >
            ▶️ GO NEXT ROAD
          </button>
        )}

        {/* Skok v teku sporočilo */}
        {gameState.isJumping && (
          <div className="text-center py-4 text-blue-400 animate-pulse font-bold">
            ⏳ Skok v teku...
          </div>
        )}
      </div>

      {/* CSS ANIMACIJE */}
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-bob {
          animation: bob 1s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        
        @keyframes barrier-appear {
          0% { transform: scale(0) translateY(-20px); opacity: 0; }
          50% { transform: scale(1.2) translateY(0); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-barrier-appear {
          animation: barrier-appear 0.5s ease-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChickenGameBoard;
