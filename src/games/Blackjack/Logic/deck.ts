export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card{
    suit: Suit;
    rank: Rank;
    id: string;
}

export interface Deck{
    cards: Card[];
}

export function createDeck(): Deck{
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const cards: Card[] = [];
  
  suits.forEach(suit => {
    ranks.forEach(rank => {
      cards.push({
        suit,
        rank,
        id: `${rank}-${suit}-${Math.random()}`
      });
    });
  });
  
  return { cards };
}
