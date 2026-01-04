import "./BetControls.css";

type BetControlsProps = {
  betAmount: string; 
  onBetChange: (value: string) => void; 
  payoutMultiplier: number;
};

export default function BetControls({
  betAmount,
  onBetChange,
  payoutMultiplier,
}: BetControlsProps) {
  return (
    <div className="bet-controls">
      <div className="bet-input">
        <label>Bet Amount</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={betAmount}
          onChange={(e) => onBetChange(e.target.value)} 
        />
      </div>

      <div className="bet-multiplier">
        <label>Multiplier</label>
        <div className="value">{payoutMultiplier.toFixed(2)}x</div>
      </div>
    </div>
  );
}
