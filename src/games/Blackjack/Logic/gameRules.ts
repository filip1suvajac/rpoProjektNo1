import type { Card, Rank } from './deck';

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
    return calculateHandValue(cards) > 21;
}

export function shouldDealerHit(cards: Card[]): boolean{
    return calculateHandValue(cards)<17;
}

export type GameResult = 'player-win' | 'dealer-win' | 'push' | 'player-blackjack';

export function determineWinner(
    playerCards: Card[],
    dealerCards: Card[]
): GameResult {
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);
    const playerBJ = isBlackjack(playerCards);
    const dealerBJ = isBlackjack(dealerCards);

    if(isBust(playerCards)) return 'dealer-win';

    if(isBust(dealerCards)) return 'player-win';

    if(playerBJ && dealerBJ) return 'push';

    if(playerBJ) return 'player-blackjack';

    if(dealerBJ) return 'dealer-win';

    if(playerValue > dealerValue) return 'player-win';
    if(dealerValue > playerValue) return 'dealer-win';

    return 'push';
}

export function calculatePayout(result: GameResult, bet: number): number{
    switch(result){
        case 'player-blackjack':
            return bet*2.5;
        case 'player-win':
            return bet*2;
        case 'push':
            return bet;
        case 'dealer-win':
            return 0;
    }
}