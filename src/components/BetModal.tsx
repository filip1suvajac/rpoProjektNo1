import { useEffect } from "react";

export type Bet = {
  id: string;
  game: string;
  user: string;
  time: string;
  betAmount: number;
  multiplier: number;
  payout: number;
  placedAt?: string;
};

type BetModalProps = {
  bet: Bet;
  onClose: () => void;
};

const BetModal: React.FC<BetModalProps> = ({ bet, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const placedAtText = bet.placedAt ?? `dne 21.12.2025 ob ${bet.time}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-800 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-700/60 flex items-center justify-center text-slate-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M7 3h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <div className="text-lg font-semibold">Stava</div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-white/10 flex items-center justify-center text-slate-200"
            aria-label="Zapri"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6">
          <div className="text-center space-y-2">
            <div className="text-2xl font-semibold">{bet.game}</div>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <span className="text-sm">ID {bet.id}</span>
              <button
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                onClick={() => navigator.clipboard?.writeText(bet.id)}
                title="Kopiraj ID"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 9h10v10H9z" />
                  <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                </svg>
              </button>
              <button
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                title="Deli"
                onClick={() => {}}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 8a3 3 0 1 0-2.83-4H12a3 3 0 0 0 3 3z" />
                  <path d="M6 14a3 3 0 1 0 2.83 4H9a3 3 0 0 0-3-3z" />
                  <path d="M18 13a3 3 0 1 0 2.83 4H21a3 3 0 0 0-3-3z" />
                  <path d="M8.7 15.3l6.6-3.6" />
                  <path d="M8.7 8.7l6.6 3.6" />
                </svg>
              </button>
            </div>
            <div className="text-slate-300">
              Stavo je oddal{" "}
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded-full bg-slate-600/60" />
                <span className="font-semibold">{bet.user}</span>
              </span>
            </div>
            <div className="text-slate-400">{placedAtText}</div>
          </div>
          <div className="my-6 flex items-center justify-center gap-4 text-slate-300">
            <div className="h-px w-32 bg-white/10" />
          </div>
          <div className="rounded-2xl bg-slate-900/40 ring-1 ring-white/10 px-4 py-5">
            <div className="grid grid-cols-3 text-center">
              <div className="px-3">
                <div className="text-slate-400 text-sm font-semibold">Stava</div>
                <div className="mt-2 text-xl font-semibold">${bet.betAmount.toFixed(2)}</div>
              </div>
              <div className="px-3 border-x border-white/10">
                <div className="text-slate-400 text-sm font-semibold">Množitelj</div>
                <div className="mt-2 text-xl font-semibold">{bet.multiplier.toFixed(2)}×</div>
              </div>
              <div className="px-3">
                <div className="text-slate-400 text-sm font-semibold">Izplačilo</div>
                <div className="mt-2 text-xl font-semibold text-green-400">${bet.payout.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="px-8 py-3 rounded-xl bg-slate-600/60 hover:bg-slate-600 text-white font-semibold transition">
              Predvajaj {bet.game}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetModal;