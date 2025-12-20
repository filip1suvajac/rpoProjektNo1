import React from 'react';

const dummyBets = [
  { game: 'Dice', user: 'Hidden', time: '12:41', betAmount: 25, multiplier: 2.1, payout: 52.5 },
  { game: 'Roulette', user: 'Alice', time: '12:42', betAmount: 10, multiplier: 5.0, payout: 50 },
  { game: 'Coin Flip', user: 'Bob', time: '12:43', betAmount: 15, multiplier: 1.9, payout: 28.5 },
  { game: 'Slots', user: 'Hidden', time: '12:44', betAmount: 5, multiplier: 10, payout: 50 },
  { game: 'Dice', user: 'Charlie', time: '12:45', betAmount: 40, multiplier: 1.5, payout: 60 },
  { game: 'Roulette', user: 'Hidden', time: '12:46', betAmount: 20, multiplier: 3.2, payout: 64 },
  { game: 'Coin Flip', user: 'Alice', time: '12:47', betAmount: 12, multiplier: 2.0, payout: 24 },
];

const CasinoBetsTable: React.FC = () => (
  <div className="w-full bg-slate-800 rounded-xl p-4 text-base text-slate-200 font-medium">
    <div className="grid grid-cols-6 gap-4 text-slate-400 mb-2 text-sm tracking-wide">
      <span className="text-left">Game</span>
      <span className="text-left">User</span>
      <span className="text-right">Time</span>
      <span className="text-right">Bet</span>
      <span className="text-right">Multiplier</span>
      <span className="text-right">Payout</span>
    </div>

    <div className="space-y-2">
      {dummyBets.map((bet, index) => (
        <div
          key={index}
          className={`grid grid-cols-6 gap-4 p-3 rounded-lg text-base ${
            index % 2 === 0 ? 'bg-slate-700/60' : 'bg-slate-800'
          }`}
        >
          <span className="flex items-center space-x-2 group cursor-pointer">
            <span className="w-5 h-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-white">
              {bet.game === 'Dice' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="7" cy="7" r="1.5" fill="#1f2937" />
                  <circle cx="17" cy="17" r="1.5" fill="#1f2937" />
                  <circle cx="12" cy="12" r="1.5" fill="#1f2937" />
                </svg>
              )}
              {bet.game === 'Roulette' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="3.75" />
                  <line x1="4" y1="4" x2="20" y2="20" strokeWidth="4" />
                  <line x1="4" y1="20" x2="20" y2="4" strokeWidth="4" />
                </svg>
              )}
              {bet.game === 'Slots' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <text x="2" y="18" fontSize="14" fontWeight="900" stroke="currentColor" strokeWidth="2">7</text>
                  <text x="9" y="18" fontSize="15" fontWeight="900" stroke="currentColor" strokeWidth="2">7</text>
                  <text x="16" y="18" fontSize="14" fontWeight="900" stroke="currentColor">7</text>
                </svg>
              )}
              {bet.game === 'Coin Flip' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="4.5" fill="currentColor" />
                  <rect x="8" y="8" width="8" height="8" fill="#1f2937" />
                </svg>
              )}
            </span>
            <span>{bet.game}</span>
          </span>

          <span className="text-left relative group cursor-pointer">
            {bet.user}
            {bet.user === 'Hidden' && (
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex items-center justify-center z-10">
                <div className="bg-white text-black text-sm px-4 py-2 shadow-lg flex items-center justify-center whitespace-nowrap rounded-xl transform transition duration-200 ease-out translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  This user has privacy enabled
                </div>
              </div>
            )}
          </span>

          <span className="text-right">{bet.time}</span>

          <span className="text-right relative group cursor-pointer">
            ${bet.betAmount}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex items-center justify-center z-10">
              <div className="bg-white text-black text-sm px-4 py-2 shadow-lg flex items-center justify-center whitespace-nowrap rounded-xl transform transition duration-200 ease-out translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                {bet.betAmount.toFixed(8)}
              </div>
            </div>
          </span>

          <span className="text-right">{bet.multiplier}x</span>

          <span className="text-right relative group cursor-pointer text-green-400 font-semibold">
            ${bet.payout}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex items-center justify-center z-10">
              <div className="bg-white text-black text-sm px-4 py-2 shadow-lg flex items-center justify-center whitespace-nowrap rounded-xl transform transition duration-200 ease-out translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                {bet.payout.toFixed(8)}
              </div>
            </div>
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default CasinoBetsTable;
