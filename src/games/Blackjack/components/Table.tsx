import { motion } from 'framer-motion';
import { Hand } from './Hand';
import type { Card } from '../Logic/deck';

interface TableProps {
  dealerHand: Card[];
  playerHand: Card[];
  dealerRevealed?: boolean;
  playerBusted?: boolean;
  dealerBusted?: boolean;
  gameStatus?: string;
  onHit?: () => void;
  onStand?: () => void;
  canAct?: boolean;
}

export function Table({
  dealerHand,
  playerHand,
  dealerRevealed = false,
  playerBusted = false,
  dealerBusted = false,
  gameStatus,
  onHit,
  onStand,
  canAct = false,
}: TableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Game Table */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700">
        {/* Dealer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-end gap-8 justify-center">
            <div className="flex-1">
              <Hand
                cards={dealerHand}
                label="DEALER"
                hideFirstCard={!dealerRevealed}
                isDealer={true}
              />
            </div>
            {dealerBusted && (
              <motion.div
                initial={{ scale: 0, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-red-500 font-bold text-3xl mb-2"
              >
                BUST
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Game Status */}
        {gameStatus && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className={`text-center text-3xl font-bold mb-12 py-4 rounded-xl ${
              gameStatus.includes('Blackjack')
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                : gameStatus.includes('Win')
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : gameStatus.includes('Lose')
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}
          >
            {gameStatus}
          </motion.div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-600 my-10"></div>

        {/* Player Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-end gap-8 justify-center">
            <div className="flex-1">
              <Hand
                cards={playerHand}
                label="YOUR HAND"
                showValue={true}
                hideFirstCard={false}
                isDealer={false}
              />
            </div>
            {playerBusted && (
              <motion.div
                initial={{ scale: 0, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-red-500 font-bold text-3xl mb-2"
              >
                BUST
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        {canAct && !playerBusted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onHit}
              className="px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg text-lg transition shadow-lg"
            >
              HIT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onStand}
              className="px-10 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg text-lg transition shadow-lg"
            >
              STAND
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
