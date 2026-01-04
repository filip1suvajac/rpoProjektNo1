import { useState } from "react";
import Tabs from "./components/Tabs";
import CasinoBetsTable from "./components/CasinoBetsTable";
import LeaderboardTable from "./components/LeaderboardTable";
import DiceGame from "./components/DiceGame";

function App() {
  const [activeTab, setActiveTab] = useState<"casino" | "leaderboard">("casino");

  return (
    <div className="flex min-h-screen bg-slate-800 text-white">
      <aside className="w-64 bg-slate-900" />
      <main className="flex-1 p-6 space-y-4">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "casino" && (
          <>
            <DiceGame />
            <CasinoBetsTable />
          </>
        )}
        {activeTab === "leaderboard" && <LeaderboardTable />}
      </main>
    </div>
  );
}

export default App;
