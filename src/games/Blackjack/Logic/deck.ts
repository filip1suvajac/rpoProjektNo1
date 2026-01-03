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

function getRandomInt(max: number): number {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
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
        id: `${rank}-${suit}-${crypto.randomUUID()}`
      });
    });
  });
  return shuffleDeck({ cards });
}

export function shuffleDeck(deck: Deck): Deck {
  const cards = [...deck.cards];
  
  for (let i = cards.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  return { cards };
}

export function dealCard(deck: Deck): { card: Card; remainingDeck: Deck}{
    if(deck.cards.length === 0){
        throw new Error('Deck is empty');
    }

    const [card, ...remainingCards] = deck.cards;

    return{
        card,
        remainingDeck: { cards: remainingCards}
    };
}

export function dealCards(deck: Deck, count: number): { cards: Card[]; remainingDeck: Deck } {
    const dealtCards: Card[] = [];
    let currentDeck = deck;

    for(let i = 0; i<count; i++){
        const { card, remainingDeck } = dealCard(currentDeck);
        dealtCards.push(card);
        currentDeck = remainingDeck;
    }

    return {
        cards: dealtCards,
        remainingDeck: currentDeck
    };
}