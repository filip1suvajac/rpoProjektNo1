import { useEffect } from "react";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-2xl bg-slate-800 text-slate-100 shadow-2xl ring-1 ring-white/10">
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700/60 ring-1 ring-white/10">
                <svg
                  className="h-5 w-5 text-slate-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 4h16v14H4V4zm2 2v10h12V6H6zm-2 14h16v2H4v-2z" />
                </svg>
              </div>
              <div className="text-lg font-semibold">Statistika</div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white transition"
              aria-label="Zapri"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.29 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.3-6.3 1.41 1.42Z" />
              </svg>
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="text-slate-300 mb-5">
              Za ogled statistike se morate prijaviti...
            </div>
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-xl bg-slate-600/70 px-5 py-3 font-semibold text-white ring-1 ring-white/10 hover:bg-slate-600 transition"
                onClick={onClose}
              >
                Prijavi se
              </button>
              <button
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500 transition"
                onClick={onClose}
              >
                Registriraj se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;