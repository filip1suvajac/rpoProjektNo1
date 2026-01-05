import "./RollButton.css";

type RollButtonProps = {
  onRoll: () => void;
  disabled?: boolean;
};

export default function RollButton({ onRoll, disabled }: RollButtonProps) {
  return (
    <button
      className="roll-button"
      onClick={onRoll}
      disabled={disabled}
    >
      ROLL
    </button>
  );
}
