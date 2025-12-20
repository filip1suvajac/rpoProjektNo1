import React from 'react';

const leaderboardData = [
  { rank: 1, user: 'Alice', wagered: 1200, prize: 300 },
  { rank: 2, user: 'Charlie', wagered: 980, prize: 200 },
  { rank: 3, user: 'Bob', wagered: 870, prize: 150 },
  { rank: 4, user: 'Hidden', wagered: 650, prize: 100 },
  { rank: 5, user: 'Eve', wagered: 500, prize: 80 },
  { rank: 6, user: 'David', wagered: 450, prize: 60 },
  { rank: 7, user: 'Frank', wagered: 390, prize: 40 },
];

const getMedalColor = (rank: number) => {
  switch (rank) {
    case 1: return '#FFD700';
    case 2: return '#C0C0C0';
    case 3: return '#CD7F32';
    default: return 'transparent';
  }
};

const getMedalOutline = (rank: number) => {
  switch (rank) {
    case 1: return '#FFE873';
    case 2: return '#E0E0E0';
    case 3: return '#D89C6B';
    default: return 'transparent';
  }
};

const getRankText = (rank: number) => rank <= 3 ? rank.toString() : rank + 'th';

const LeaderboardTable: React.FC = () => (
  <div className="w-full bg-slate-800 rounded-xl p-4 text-base text-slate-200 font-medium">
    <div className="grid grid-cols-4 gap-4 text-slate-400 mb-2 text-sm tracking-wide">
      <span className="text-left">Rank</span>
      <span className="text-left">User</span>
      <span className="text-right">Wagered</span>
      <span className="text-right">Prize</span>
    </div>

    <div className="space-y-2">
      {leaderboardData.map((user, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 gap-4 p-3 rounded-lg text-base ${
            index % 2 === 0 ? 'bg-slate-700/60' : 'bg-slate-800'
          }`}
        >
          <span className="flex items-center space-x-2">
            {user.rank <= 3 ? (
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill={getMedalOutline(user.rank)} />
                <circle cx="12" cy="12" r="9" fill={getMedalColor(user.rank)} />
                <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">
                  {getRankText(user.rank)}
                </text>
              </svg>
            ) : (
              <span className="font-bold">{getRankText(user.rank)}</span>
            )}
          </span>

          <span className="text-left relative group cursor-pointer">
            {user.user}
            {user.user === 'Hidden' && (
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex items-center justify-center z-10">
                <div className="bg-white text-black text-sm px-4 py-2 shadow-lg flex items-center justify-center whitespace-nowrap rounded-xl transform transition duration-200 ease-out translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  This user has privacy enabled
                </div>
              </div>
            )}
          </span>

          <span className="text-right relative group cursor-pointer">
            ${user.wagered}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex items-center justify-center z-10">
              <div className="bg-white text-black text-sm px-4 py-2 shadow-lg flex items-center justify-center whitespace-nowrap rounded-xl transform transition duration-200 ease-out translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                {user.wagered.toFixed(8)}
              </div>
            </div>
          </span>

          <span className="text-right relative group cursor-pointer text-green-400 font-semibold">
            ${user.prize}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex items-center justify-center z-10">
              <div className="bg-white text-black text-sm px-4 py-2 shadow-lg flex items-center justify-center whitespace-nowrap rounded-xl transform transition duration-200 ease-out translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                {user.prize.toFixed(8)}
              </div>
            </div>
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default LeaderboardTable;
