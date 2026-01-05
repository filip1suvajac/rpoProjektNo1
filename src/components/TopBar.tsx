import { useState } from "react";
import { useAuth } from "../AuthContext";
import LogoutModal from "./LogoutModal";

export default function TopBar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const { isAuthenticated, user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#1A2C38] border-b border-white/10 transition-all duration-300`}
        style={{ left: sidebarOpen ? "16rem" : "4rem", width: `calc(100% - ${sidebarOpen ? "16rem" : "4rem"})` }}
      >
        <div className="text-2xl font-bold text-white">Zlahtic Palace</div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-white font-semibold">{user?.email}</span>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10"
              >
                Odjava
              </button>
            </>
          ) : (
            <>
              <a href="/prijava" className="px-4 py-2 rounded-md border border-slate-600 text-white hover:bg-slate-800">
                Prijava
              </a>
              <a href="/registracija" className="px-4 py-2 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400">
                Registracija
              </a>
            </>
          )}
        </div>
      </header>

      <LogoutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
