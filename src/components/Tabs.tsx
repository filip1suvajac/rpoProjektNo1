import React from 'react';

type Tab = 'casino' | 'leaderboard';

type TabsProps = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange }) => (
  <div className="inline-flex bg-slate-900 rounded-full p-1">
    {}
    <button
      onClick={() => onChange('casino')}
      className={`px-4 py-2 rounded-full text-white text-base font-semibold transition ${
        activeTab === 'casino' ? 'bg-slate-600' : 'hover:bg-slate-600'
      }`}
    >
      Igralne stavke
    </button>
    <button
      onClick={() => onChange('leaderboard')}
      className={`px-4 py-2 rounded-full text-white text-base font-semibold transition ${
        activeTab === 'leaderboard' ? 'bg-slate-600' : 'hover:bg-slate-600'
      }`}
    >
      Lestvica najboljših
    </button>
  </div>
);

export default Tabs;