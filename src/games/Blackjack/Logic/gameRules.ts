import { Card, Rank } from './deck';

export function getCardValue(rank: Rank): number {
    if (rank === 'A') return 11;
    if(rank === 'J' || rank === 'Q' || rank === 'K') return 10;
    return parseInt(rank);
}