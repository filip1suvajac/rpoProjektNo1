import DiceSlider from "../components/DiceSlider";
import BetControls from "../components/BetControls";
import RollButton from "../components/RollButton";
import ResultDisplay from "../components/ResultDisplay";
import { useGame } from "../context/GameContext";

export default function DiceGame() {
  const {
    balance,
    betAmount,
    setBetAmount,
    chance,
    setChance,
    mode,
    setMode,
    roll,
    isRolling,
    lastResult,
    error,
  } = useGame();

  return (
    <div className="space-y-4 max-w-md">
      <div className="text-lg font-semibold">
        Balance: {balance.toFixed(2)}
      </div>

      <DiceSlider
        value={chance}
        onChange={setChance}
      />

      <BetControls
        betAmount={betAmount}
        onBetChange={setBetAmount}
        payoutMultiplier={lastResult?.multiplier ?? 0}
      />

      <div className="flex gap-2">
        <button
          disabled={isRolling}
          onClick={() => setMode("roll_under")}
          className={mode === "roll_under" ? "active" : ""}
        >
          Roll Under
        </button>
        <button
          disabled={isRolling}
          onClick={() => setMode("roll_over")}
          className={mode === "roll_over" ? "active" : ""}
        >
          Roll Over
        </button>
      </div>

      <RollButton onRoll={roll} disabled={isRolling} />

      {error && <div className="text-red-500">{error}</div>}

      {lastResult && (
        <ResultDisplay
          roll={lastResult.roll}
          win={lastResult.win}
          profit={lastResult.profit}
        />
      )}
    </div>
  );
}
