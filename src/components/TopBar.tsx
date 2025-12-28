import { Link } from "react-router-dom";

export default function TopBar({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <header
  className={`fixed top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#1A2C38] border-b border-white/10 transition-all duration-300`}
  style={{ left: sidebarOpen ? '16rem' : '4rem', width: `calc(100% - ${sidebarOpen ? '16rem' : '4rem'})` }}
>


      <div className="text-2xl font-bold text-white">
        Zlahtic Palace
      </div>

      <div className="flex gap-3">
        <Link
          to="/login"
          className="px-4 py-2 rounded-md border border-slate-600 text-white hover:bg-slate-800"
        >
          Prijava
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400"
        >
          Registracija
        </Link>
      </div>
    </header>
  );
}
