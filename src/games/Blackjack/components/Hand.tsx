import { motion } from 'framer-motion';
import { Card } from './Card';
import { calculateHandValue } from '../Logic/gameRules';
import type { Card as CardType } from '../Logic/deck';

interface HandProps {
  cards: CardType[];
  label: string;
  value?: number;
  showValue?: boolean;
  hideFirstCard?: boolean;
  isDealer?: boolean;
}

export function Hand({
  cards,
  label,
  showValue = true,
  hideFirstCard = false,
}: HandProps) {
  const handValue = calculateHandValue(cards);
  const visibleCards = hideFirstCard ? cards.slice(1) : cards;
  const hasHiddenCard = hideFirstCard && cards.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="text-white font-bold text-lg uppercase tracking-wider">{label}</h3>
        {showValue && !hideFirstCard && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: cards.length * 0.08 }}
            className="bg-indigo-600 text-white px-4 py-1 rounded-lg font-bold text-lg"
          >
            {handValue}
          </motion.div>
        )}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {hasHiddenCard && <Card card={cards[0]} isFlipped={true} delay={0} />}
        {visibleCards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            delay={hideFirstCard ? index * 0.08 + 0.1 : index * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
}
