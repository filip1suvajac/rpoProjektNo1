import React, { useRef } from 'react';
import { type GameState, GAME_CONFIG } from './Chicken-types';
import ChickenCar from './Chicken-Car';
import ChickenBarrier from './Chicken-Barrier';
import ChickenRoasted from './Chicken-Roasted';

interface GameBoardProps {
  gameState: GameState;
  onGoNext: () => void;
}

const ChickenGameBoard: React.FC<GameBoardProps> = ({ gameState, onGoNext }) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50">
      <h2 className="text-xl font-bold mb-4 text-slate-200">🐔 CHICKEN ROAD</h2>
      
      <div 
        ref={viewportRef}
        className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl overflow-hidden"
        style={{ height: '600px', width: '100%' }}
      >
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${gameState.cameraOffset}px)` }}
        >
          <div className="flex h-full">
            
            {/* OSEBA 2: START DEL + CESTE (roads.map) */}
            
            
          </div>
        </div>

        {/* OSEBA 3: CHICKEN + WELCOME SCREEN */}
        
        
      </div>

      {/* OSEBA 4: KONTROLE (buttons) + CSS ANIMACIJE */}
      
    </div>
  );
};

export default ChickenGameBoard;