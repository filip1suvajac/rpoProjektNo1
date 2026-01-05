// src/components/ResultDisplay.tsx
import "./ResultDisplay.css";

type ResultDisplayProps = {
  roll?: number;
  win?: boolean;
  profit?: number;
};

export default function ResultDisplay({
  roll,
  win,
  profit,
}: ResultDisplayProps) {
  if (roll === undefined) return null;

  return (
    <div className={`result ${win ? "win" : "lose"}`}>
      <div className="roll">Roll: {roll.toFixed(2)}</div>
      <div className="outcome">{win ? "WIN" : "LOSE"}</div>
      {profit !== undefined && (
        <div className="profit">
          {profit >= 0 ? "+" : ""}
          {profit.toFixed(2)}
        </div>
      )}
    </div>
  );
}
