import { motion } from 'framer-motion';
import { useState } from 'react';

interface BettingPanelProps {
  balance: number;
  onBet: (amount: number) => void;
  onReset: () => void;
  isDisabled?: boolean;
  gameOver?: boolean;
}

export function BettingPanel({
  balance,
  onBet,
  onReset,
  isDisabled = false,
  gameOver = false,
}: BettingPanelProps) {
  const [betAmount, setBetAmount] = useState(10);
  const maxBet = Math.min(balance, 1000);

  const handleBet = () => {
    if (betAmount > 0 && betAmount <= balance) {
      onBet(betAmount);
    }
  };

  const quickBets = [10, 25, 50, 100];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl"
    >
      {/* Balance Display */}
      <motion.div
        className="mb-8 text-center bg-slate-700/50 rounded-xl py-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Balance</p>
        <p className="text-white text-4xl font-bold mt-1">${balance.toLocaleString()}</p>
      </motion.div>

      {/* Bet Amount Display */}
      <div className="mb-6">
        <label className="text-white text-xs uppercase tracking-wider font-semibold mb-3 block">
          Bet Amount
        </label>
        <div className="bg-slate-700/50 rounded-lg p-4 mb-3">
          <p className="text-slate-400 text-sm mb-1">Current Bet</p>
          <p className="text-indigo-400 text-3xl font-bold">${betAmount.toLocaleString()}</p>
        </div>

        <div className="flex gap-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBetAmount(Math.max(1, betAmount - 10))}
            disabled={isDisabled || betAmount <= 1}
            className="flex-1 px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            -
          </motion.button>
          <input
            type="number"
            min="1"
            max={maxBet}
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
            disabled={isDisabled}
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 outline-none disabled:opacity-50 text-center font-semibold"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBetAmount(Math.min(maxBet, betAmount + 10))}
            disabled={isDisabled || betAmount >= maxBet}
            className="flex-1 px-3 py-2 bg-green-600/80 hover:bg-green-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            +
          </motion.button>
        </div>
      </div>

      {/* Quick Bet Buttons */}
      <div className="mb-6">
        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Quick Bet</p>
        <div className="grid grid-cols-4 gap-2">
          {quickBets.map((bet) => (
            <motion.button
              key={bet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBetAmount(Math.min(maxBet, bet))}
              disabled={isDisabled || bet > balance}
              className="px-2 py-2 bg-slate-700 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition border border-slate-600 hover:border-indigo-500"
            >
              ${bet}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(79, 172, 254, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBet}
          disabled={isDisabled || betAmount > balance || betAmount <= 0}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg uppercase text-sm tracking-wider"
        >
          Place Bet
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition border border-slate-600 hover:border-slate-500 uppercase text-sm"
      >
        Reset
      </motion.button>

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-amber-900/30 border border-amber-600/50 rounded-lg text-amber-200 text-xs text-center uppercase tracking-wider"
        >
          Place a new bet to continue
        </motion.div>
      )}
    </motion.div>
  );
}
