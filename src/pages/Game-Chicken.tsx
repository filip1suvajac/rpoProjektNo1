import React from "react";
import { useChickenGame } from "../components/Chicken-useGame";
import ChickenBetPanel from "../components/Chicken-BetPanel";
import ChickenGameBoard from "../components/Chicken-GameBoard";
import ChickenStatisticsPanel from '../components/Chicken-StatisticsPanel';

const ChickenRoadGame: React.FC = () => {
  const game = useChickenGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4">
      <div className="max-w-[1600px] mx-auto mb-4">
        <div className="text-center mb-2">
          <h1 className="text-4xl font-black mb-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🐔 CHICKEN ROAD CROSSING
          </h1>
          <p className="text-slate-400">
            Prečkajte cesto in se izognite avtomobilom!
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3">
          <ChickenBetPanel
            gameState={game.gameState}
            onBetChange={game.setBetAmount}
            onDifficultyChange={game.setDifficulty}
            onStart={game.startGame}
            onCashOut={game.cashOut}
            onReset={game.resetGame}
          />
        </div>

        {/*Sem bom jaz se dodal koto*/}

        <div className="lg:col-span-3">
          <ChickenStatisticsPanel 
            history={game.betHistory}
            balance={game.gameState.balance}
          />
        </div>
      </div>
    </div>
  );
};

export default ChickenRoadGame;
