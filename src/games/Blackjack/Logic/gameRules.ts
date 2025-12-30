import { Card, Rank } from './deck';

export function getCardValue(rank: Rank): number {
    if (rank === 'A') return 11;
    if(rank === 'J' || rank === 'Q' || rank === 'K') return 10;
    return parseInt(rank);
}

export function calculateHandValue(cards: Card[]): number{
    let total = 0;
    let aces = 0;

    cards.forEach(card=> {
        const value = getCardValue(card.rank);
        total += value;
        if(card.rank === 'A') aces++;
    });

    while(total > 21 && aces > 0){
        total -= 10;
        aces--;
    }

    return total;
}

export function isBlackjack(cards: Card[]): boolean {
    return cards.length === 2 && calculateHandValue(cards) === 21;
}

export function isBust(cards: Card[]): boolean{
    return calculateHandValue(cards) < 21;
}

export function shouldDealerHit(cards: Card[]): boolean{
    return calculateHandValue(cards)<17;
}

export type GameResult = 'player-win' | 'dealer-win' | 'push' | 'player-blackjack';

