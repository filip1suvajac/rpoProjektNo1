import { useState } from 'react';
import { Table } from '../games/Blackjack/components/Table';
import { BettingPanel } from '../games/Blackjack/components/BettingPanel';

import {
  createDeck,
  shuffleDeck,
  dealCards,
  dealCard,
} from '../games/Blackjack/Logic/deck';
import {
  calculateHandValue,
  determineWinner,
  shouldDealerHit,
} from '../games/Blackjack/Logic/gameRules';
import type { Card } from '../games/Blackjack/Logic/deck';

function Blackjack() {
  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(0);
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [gameActive, setGameActive] = useState(false);
  const [dealerRevealed, setDealerRevealed] = useState(false);
  const [playerBusted, setPlayerBusted] = useState(false);
  const [dealerBusted, setDealerBusted] = useState(false);

  const handleBet = (amount: number) => {
    if (gameActive) return;
    if (amount <= 0) return;
    if (amount > balance) return;

    setCurrentBet(amount);
    setBalance((prev) => prev - amount);
    startNewGame();
  };

  const startNewGame = () => {
    let newDeck = deck;
    if (newDeck.cards.length < 20) {
      newDeck = shuffleDeck(createDeck());
    }

    const { cards: playerCards, remainingDeck: deck1 } = dealCards(newDeck, 2);
    const { cards: dealerCards, remainingDeck: finalDeck } = dealCards(deck1, 2);

    setDeck(finalDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameActive(true);
    setDealerRevealed(false);
    setPlayerBusted(false);
    setDealerBusted(false);
    setGameStatus('');
  };

  const handleHit = () => {
    if (!gameActive) return;

    const { card, remainingDeck } = dealCard(deck);
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    setDeck(remainingDeck);

    const handValue = calculateHandValue(newHand);
    if (handValue > 21) {
      setPlayerBusted(true);
      setDealerRevealed(true); // reveal dealer when player busts
      endGame(newHand, dealerHand);
    }
  };

  const handleStand = () => {
    if (!gameActive) return;
    setDealerRevealed(true);
    dealerTurn(dealerHand);
  };

  const dealerTurn = async (currentDealerHand: Card[]) => {
    let newDealerHand = currentDealerHand;
    let newDeck = deck;

    while (shouldDealerHit(newDealerHand)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { card, remainingDeck } = dealCard(newDeck);
      newDealerHand = [...newDealerHand, card];
      newDeck = remainingDeck;

      // Update UI with new card
      setDealerHand(newDealerHand);
      setDeck(newDeck);
    }

    const dealerValue = calculateHandValue(newDealerHand);
    if (dealerValue > 21) {
      setDealerBusted(true);
    }

    endGame(playerHand, newDealerHand);
  };

  const endGame = (finalPlayerHand: Card[], finalDealerHand: Card[]) => {
    const result = determineWinner(finalPlayerHand, finalDealerHand);

    let payout = 0;
    switch (result) {
      case 'dealer-win':
        payout = 0; 
        break;
      case 'push':
        payout = currentBet; 
        break;
      case 'player-win':
        payout = currentBet * 2; 
        break;
      case 'player-blackjack':
        payout = Math.floor(currentBet * 2.5); 
        break;
      default:
        payout = 0;
        break;
    }

    let statusMessage = '';
    switch (result) {
      case 'player-blackjack':
        statusMessage = 'BLACKJACK! You Win!';
        break;
      case 'player-win':
        statusMessage = 'You Win!';
        break;
      case 'dealer-win':
        statusMessage = 'Dealer Wins';
        break;
      case 'push':
        statusMessage = '= Push (Tie)';
        break;
    }

    setGameStatus(statusMessage);
    setBalance((prev) => prev + payout);
    setGameActive(false);
  };

  const handleReset = () => {
    setCurrentBet(0);
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus('');
    setGameActive(false);
    setDealerRevealed(false);
    setPlayerBusted(false);
    setDealerBusted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table */}
          <div className="lg:col-span-2">
            <Table
              dealerHand={dealerHand}
              playerHand={playerHand}
              dealerRevealed={dealerRevealed}
              playerBusted={playerBusted}
              dealerBusted={dealerBusted}
              gameStatus={gameStatus}
              onHit={handleHit}
              onStand={handleStand}
              canAct={gameActive && !playerBusted}
            />
          </div>

          {/* Betting Panel */}
          <div>
            <BettingPanel
              balance={balance}
              onBet={handleBet}
              onReset={handleReset}
              isDisabled={gameActive}
              gameOver={!gameActive && currentBet > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blackjack;






//BAZO 
// import { useEffect, useState } from 'react';
// import { Table } from '../games/Blackjack/components/Table';
// import { BettingPanel } from '../games/Blackjack/components/BettingPanel';

// import { supabase } from '../supabaseClient';
// import { useAuth } from '../AuthContext';

// import {
//   createDeck,
//   shuffleDeck,
//   dealCards,
//   dealCard,
// } from '../games/Blackjack/Logic/deck';
// import {
//   calculateHandValue,
//   determineWinner,
//   shouldDealerHit,
// } from '../games/Blackjack/Logic/gameRules';
// import type { Card } from '../games/Blackjack/Logic/deck';

// function Blackjack() {
//   const { user } = useAuth();

//   // balance comes from DB (default 0 until loaded)
//   const [balance, setBalance] = useState(0);

//   const [currentBet, setCurrentBet] = useState(0);
//   const [deck, setDeck] = useState(createDeck());
//   const [playerHand, setPlayerHand] = useState<Card[]>([]);
//   const [dealerHand, setDealerHand] = useState<Card[]>([]);
//   const [gameStatus, setGameStatus] = useState<string>('');
//   const [gameActive, setGameActive] = useState(false);
//   const [dealerRevealed, setDealerRevealed] = useState(false);
//   const [playerBusted, setPlayerBusted] = useState(false);
//   const [dealerBusted, setDealerBusted] = useState(false);

//   // Load balance from DB when user is available
//   useEffect(() => {
//     if (!user?.id) return;

//     (async () => {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('balance')
//         .eq('id', user.id)
//         .single();

//       if (error) {
//         console.error('Failed to load balance:', error);
//         setGameStatus('Failed to load balance.');
//         return;
//       }

//       setBalance(Number(data?.balance ?? 0));
//     })();
//   }, [user?.id]);

//   const handleBet = (amount: number) => {
//     if (!user?.id) return; // must be logged in to play (DB balance)
//     if (gameActive) return;
//     if (amount <= 0) return;
//     if (amount > balance) return;

//     setCurrentBet(amount);
//     setBalance((prev) => prev - amount);
//     startNewGame();
//   };

//   const startNewGame = () => {
//     let newDeck = deck;
//     if (newDeck.cards.length < 20) {
//       newDeck = shuffleDeck(createDeck());
//     }

//     const { cards: playerCards, remainingDeck: deck1 } = dealCards(newDeck, 2);
//     const { cards: dealerCards, remainingDeck: finalDeck } = dealCards(deck1, 2);

//     setDeck(finalDeck);
//     setPlayerHand(playerCards);
//     setDealerHand(dealerCards);
//     setGameActive(true);
//     setDealerRevealed(false);
//     setPlayerBusted(false);
//     setDealerBusted(false);
//     setGameStatus('');
//   };

//   const handleHit = () => {
//     if (!gameActive) return;

//     const { card, remainingDeck } = dealCard(deck);
//     const newHand = [...playerHand, card];
//     setPlayerHand(newHand);
//     setDeck(remainingDeck);

//     const handValue = calculateHandValue(newHand);
//     if (handValue > 21) {
//       setPlayerBusted(true);
//       setDealerRevealed(true); 
//       endGame(newHand, dealerHand);
//     }
//   };

//   const handleStand = () => {
//     if (!gameActive) return;
//     setDealerRevealed(true);
//     dealerTurn(dealerHand);
//   };

//   const dealerTurn = async (currentDealerHand: Card[]) => {
//     let newDealerHand = currentDealerHand;
//     let newDeck = deck;

//     while (shouldDealerHit(newDealerHand)) {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const { card, remainingDeck } = dealCard(newDeck);
//       newDealerHand = [...newDealerHand, card];
//       newDeck = remainingDeck;

//       setDealerHand(newDealerHand);
//       setDeck(newDeck);
//     }

//     const dealerValue = calculateHandValue(newDealerHand);
//     if (dealerValue > 21) {
//       setDealerBusted(true);
//     }

//     endGame(playerHand, newDealerHand);
//   };

//   const endGame = (finalPlayerHand: Card[], finalDealerHand: Card[]) => {
//     const result = determineWinner(finalPlayerHand, finalDealerHand);


//     let payout = 0;
//     switch (result) {
//       case 'dealer-win':
//         payout = 0;
//         break;
//       case 'push':
//         payout = currentBet;
//         break;
//       case 'player-win':
//         payout = currentBet * 2;
//         break;
//       case 'player-blackjack':
//         payout = Math.floor(currentBet * 2.5);
//         break;
//       default:
//         payout = 0;
//         break;
//     }

//     let statusMessage = '';
//     switch (result) {
//       case 'player-blackjack':
//         statusMessage = 'BLACKJACK! You Win!';
//         break;
//       case 'player-win':
//         statusMessage = 'You Win!';
//         break;
//       case 'dealer-win':
//         statusMessage = 'Dealer Wins';
//         break;
//       case 'push':
//         statusMessage = '= Push (Tie)';
//         break;
//     }

//     setGameStatus(statusMessage);

//     // Update local balance + persist to DB (minimal, no async refactor)
//     setBalance((prev) => {
//       const newBalance = prev + payout;

//       if (user?.id) {
//         supabase
//           .from('profiles')
//           .update({ balance: newBalance })
//           .eq('id', user.id)
//           .then(({ error }) => {
//             if (error) console.error('Failed to update balance:', error);
//           });
//       }

//       return newBalance;
//     });

//     setGameActive(false);
//   };

//   const handleReset = () => {
//     setCurrentBet(0);
//     setPlayerHand([]);
//     setDealerHand([]);
//     setGameStatus('');
//     setGameActive(false);
//     setDealerRevealed(false);
//     setPlayerBusted(false);
//     setDealerBusted(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Table */}
//           <div className="lg:col-span-2">
//             <Table
//               dealerHand={dealerHand}
//               playerHand={playerHand}
//               dealerRevealed={dealerRevealed}
//               playerBusted={playerBusted}
//               dealerBusted={dealerBusted}
//               gameStatus={gameStatus}
//               onHit={handleHit}
//               onStand={handleStand}
//               canAct={gameActive && !playerBusted}
//             />
//           </div>

//           {/* Betting Panel */}
//           <div>
//             <BettingPanel
//               balance={balance}
//               onBet={handleBet}
//               onReset={handleReset}
//               isDisabled={gameActive}
//               gameOver={!gameActive && currentBet > 0}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Blackjack;
