import "./DiceSlider.css";

type DiceSliderProps = {
  value: number;
  onChange: (value: number) => void;
  /** optional: children such as DiceRollPopup for preview wiring */
  children?: React.ReactNode;
};

export default function DiceSlider({ value, onChange, children }: DiceSliderProps) {
  return (
    <div className="dice-slider">
      <label className="dice-slider-label">
        Target: <span>{value.toFixed(2)}</span>
      </label>

      <div className="dice-slider-track">
        <input
          type="range"
          min={0}
          max={100}
          step={0.01}
          value={value}
          style={{ ["--value" as any]: value }}
          onChange={(e) => onChange(Number(e.target.value))}
        />

        {/* slot for popup/marker. Parent can render DiceRollPopup here */}
        <div className="dice-slider-slot">{children}</div>
      </div>

      <div className="dice-slider-labels">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}
