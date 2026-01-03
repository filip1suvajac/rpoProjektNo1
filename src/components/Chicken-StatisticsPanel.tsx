import React from 'react';
import type { BetHistory } from './Chicken-types';

interface StatisticsPanelProps {
  history: BetHistory[];
  balance: number;
}

const ChickenStatisticsPanel: React.FC<StatisticsPanelProps> = ({ history, balance }) => {
  const totalBets = history.length;
  const wins = history.filter(h => h.result === 'win').length;
  const losses = history.filter(h => h.result === 'loss').length;
  const totalProfit = history.reduce((sum, h) => sum + h.profit, 0);
  const winRate = totalBets > 0 ? ((wins / totalBets) * 100).toFixed(1) : '0.0';
  const maxMultiplier = totalBets > 0 ? Math.max(...history.map(h => h.multiplier)).toFixed(2) : '0.00';
  const biggestWin = totalBets > 0 ? Math.max(...history.map(h => h.profit)).toFixed(2) : '0.00';

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50">
      <h2 className="text-xl font-bold mb-4 text-slate-200">📊 STATISTIKA</h2>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 uppercase">Zmage</div>
          <div className="text-2xl font-bold text-emerald-400">{wins}</div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 uppercase">Porazi</div>
          <div className="text-2xl font-bold text-red-400">{losses}</div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 uppercase">Win Rate</div>
          <div className="text-2xl font-bold text-amber-400">{winRate}%</div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
          <div className="text-xs text-slate-400 uppercase">Max Multi</div>
          <div className="text-2xl font-bold text-blue-400">{maxMultiplier}×</div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border mb-4 ${
        totalProfit >= 0 
          ? 'bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-700/30' 
          : 'bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-700/30'
      }`}>
        <div className={`text-xs uppercase ${totalProfit >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
          Skupni profit
        </div>
        <div className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 p-3 rounded-lg border border-amber-700/30 mb-4">
        <div className="text-xs text-amber-300 uppercase">Največja zmaga</div>
        <div className="text-2xl font-bold text-amber-400">${biggestWin}</div>
      </div>
      
      <div>
        <h3 className="text-sm font-bold mb-2 text-slate-300">Zadnje igre</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {history.length === 0 ? (
            <div className="text-center text-slate-500 py-8 text-sm">Še ni zgodovine</div>
          ) : (
            history.slice().reverse().slice(0, 10).map((bet) => (
              <div 
                key={bet.id}
                className={`p-3 rounded-lg border-l-4 text-sm ${
                  bet.result === 'win' 
                    ? 'bg-emerald-900/20 border-emerald-500' 
                    : 'bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">
                    {bet.timestamp.toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`font-bold ${bet.result === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {bet.profit >= 0 ? '+' : ''}${bet.profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{bet.roadsCompleted} cest</span>
                  <span className="text-amber-400 font-bold">{bet.multiplier.toFixed(2)}×</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(15, 23, 42);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(71, 85, 105);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default ChickenStatisticsPanel;
