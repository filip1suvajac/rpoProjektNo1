import { motion } from 'framer-motion';
import type { Card as CardType } from '../Logic/deck';

interface CardProps {
  card: CardType;
  isFlipped?: boolean;
  delay?: number;
}

const suitSymbols: Record<string, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const suitColors: Record<string, string> = {
  hearts: 'text-red-500',
  diamonds: 'text-red-500',
  clubs: 'text-black',
  spades: 'text-black',
};

export function Card({ card, isFlipped = false, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5, delay }}
      className="perspective"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={`w-20 h-28 md:w-24 md:h-32 rounded-xl border-2 flex flex-col items-center justify-between p-2 font-bold ${
          isFlipped
            ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-400'
            : 'bg-white border-gray-200 shadow-lg'
        }`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {!isFlipped ? (
          <>
            <div className="flex flex-col items-center">
              <div className={`text-lg md:text-xl ${suitColors[card.suit]}`}>
                {suitSymbols[card.suit]}
              </div>
              <div className="text-lg md:text-2xl font-bold text-gray-900">
                {card.rank}
              </div>
            </div>
            <div className={`text-lg md:text-xl ${suitColors[card.suit]}`}>
              {suitSymbols[card.suit]}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-2xl font-bold text-indigo-200">★</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
