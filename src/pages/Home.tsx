import FAQList, { type FAQ } from "../components/FAQ";
import { useState } from "react";
import { GameList } from "../components/GameList";
import Tabs from "../components/Tabs";
import CasinoBetsTable from "../components/CasinoBetsTable";
import LeaderboardTable from "../components/LeaderboardTable";
import { Link } from "react-router-dom";

const sampleFaqs: FAQ[] = [
  {
    id: "1",
    question: "Kako deluje ta casino simulator?",
    answer:
      "Ta simulator igralnice je izdelan samo za izobraževalne namene. Vse igre so simulirane in dejansko denarja ni vpletenega.",
  },
  {
    id: "2",
    question: "Ali lahko položim ali dvignem pravi denar?",
    answer:
      "Ne. Polaganje in dvig pravi denar nista mogoča, ker gre le za simulacijo.",
  },
  {
    id: "3",
    question: "Ali lahko to igram kot pravo casino igro?",
    answer:
      "Ne. Vse igre so simulirane in namenjene samo za učenje in zabavo, brez možnosti dobitka pravega denarja.",
  },
  {
    id: "4",
    question: "So rezultati iger pošteni?",
    answer:
      "Rezultati se generirajo z uporabo psevdonasumične logike in so namenjeni samo za prikaz.",
  },
  {
    id: "5",
    question: "Kdo skrbi za vsebino in pravila iger v simulatorju?",
    answer:
      "Simulator je razvila skupina študentov, ki so poskrbeli, da so igre zabavne, razumljive in skladne s standardnimi pravili casino iger.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"casino" | "leaderboard">("casino");

  return (
    <div className="min-h-screen flex flex-col bg-[#1A2C38]">
      {/* HEADER */}
      <div className="bg-[url('/src/assets/header.png')] bg-cover bg-center text-white relative">
        <section className="flex items-center justify-between pb-24 pt-36 max-w-[70%] mx-auto">
          <div className="flex flex-col items-start text-left max-w-xl">
            <h1 className="text-4xl font-extrabold mb-4">
              Zapravite svoj denar pri nas!
            </h1>

            <p className="text-slate-300 mb-8">
              Igraj simulacijo iger na srečo. Samo za izobraževalne namene.
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-8 py-3 rounded-lg bg-green-500 text-black font-bold text-lg hover:bg-green-400"
              >
                Registracija
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 rounded-lg border border-slate-500 hover:bg-slate-800"
              >
                Prijava
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="/src/assets/header-cta.png"
              alt="Hero"
              className="max-w-72 w-full border border-slate-500 rounded-xl hover:-translate-y-2 duration-300 transition-all"
            />
          </div>
        </section>
      </div>

      {/* TABI + TABELE */}
      <div className="flex-1 max-w-[90%] mx-auto p-6 space-y-3 bg-[#1A2C38] text-white">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "casino" && <CasinoBetsTable />}
        {activeTab === "leaderboard" && <LeaderboardTable />}
      </div>

      {/* GAMELIST */}
      <GameList />

      {/* FAQ */}
      <div className="w-full py-12 border-b border-white/10 bg-[#1A2C38] mx-auto">
        <div className="flex ml-36 mb-7 gap-3 items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>

          <h2 className="text-xl">Imaš še vprašanj?</h2>
        </div>
        <FAQList items={sampleFaqs} allowMultipleOpen={false} />
      </div>
    </div>
  );
}
