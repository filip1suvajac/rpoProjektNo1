import React from "react";
import { type GameState, GAME_CONFIG } from "./Chicken-types";

interface BetPanelProps {
  gameState: GameState;
  onBetChange: (amount: number) => void;
  onDifficultyChange: (difficulty: string) => void;
  onStart: () => void;
  onCashOut: () => void;
  onReset: () => void;
}

const ChickenBetPanel: React.FC<BetPanelProps> = ({
  gameState,
  onBetChange,
  onDifficultyChange,
  onStart,
  onCashOut,
  onReset,
}) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50 sticky top-6">
      <h2 className="text-xl font-bold mb-4 text-slate-200">NASTAVITVE</h2>

      <div className="space-y-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
            Stanje
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            ${gameState.balance.toFixed(2)}
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 mb-3 uppercase tracking-wide">
            Stava
          </div>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => onBetChange(gameState.betAmount / 2)}
              disabled={gameState.gameActive}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 font-semibold"
            >
              ½
            </button>
            <div className="text-2xl font-bold text-white">
              ${gameState.betAmount.toFixed(2)}
            </div>
            <button
              onClick={() => onBetChange(gameState.betAmount * 2)}
              disabled={gameState.gameActive}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 font-semibold"
            >
              2×
            </button>
          </div>
          <input
            type="range"
            min={GAME_CONFIG.MIN_BET}
            max={Math.min(GAME_CONFIG.MAX_BET, gameState.balance)}
            step="0.1"
            value={gameState.betAmount}
            onChange={(e) => onBetChange(parseFloat(e.target.value))}
            disabled={gameState.gameActive}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide">
            Težavnost
          </div>
          <select
            value={gameState.difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            disabled={gameState.gameActive}
            className="w-full bg-slate-700 text-white p-3 rounded-lg font-semibold cursor-pointer hover:bg-slate-600 transition-colors"
          >
            {GAME_CONFIG.DIFFICULTY_OPTIONS.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 rounded-lg border border-amber-500/20 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Multiplikator:</span>
            <span className="font-bold text-2xl text-amber-400">
              {gameState.currentMultiplier.toFixed(2)}×
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Cest prečkano:</span>
            <span className="font-bold text-white text-lg">
              {gameState.currentRoad}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
            <span className="text-slate-400 text-sm">Dobiček:</span>
            <span
              className={`font-bold text-xl ${
                gameState.profit >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              ${gameState.profit.toFixed(2)}
            </span>
          </div>
        </div>

        {!gameState.gameActive && !gameState.gameOver && (
          <button
            onClick={onStart}
            disabled={gameState.betAmount > gameState.balance}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-700 disabled:to-slate-600 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            🎮 ZAČNI IGRO
          </button>
        )}

        {gameState.gameActive && (
          <button
            onClick={onCashOut}
            disabled={gameState.currentRoad === 0}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-slate-700 disabled:to-slate-600 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            💰 IZPLAČAJ ${(gameState.betAmount + gameState.profit).toFixed(2)}
          </button>
        )}

        {gameState.gameOver && (
          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            🔄 NOVA IGRA
          </button>
        )}

        {gameState.gameResult === "win" && (
          <div className="bg-gradient-to-r from-emerald-900/80 to-emerald-800/80 border-2 border-emerald-500 p-5 rounded-xl text-center">
            <div className="text-2xl font-bold text-emerald-300 mb-1">
              🎉 ZMAGALI!
            </div>
            <div className="text-3xl font-black text-white">
              +${gameState.profit.toFixed(2)}
            </div>
          </div>
        )}

        {gameState.gameResult === "loss" && (
          <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 border-2 border-red-500 p-5 rounded-xl text-center">
            <div className="text-2xl font-bold text-red-300 mb-1">
              💥 CRASH!
            </div>
            <div className="text-lg text-white">Avto vas je povozil!</div>
            <div className="text-2xl font-black text-white mt-1">
              -${gameState.betAmount.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChickenBetPanel;
