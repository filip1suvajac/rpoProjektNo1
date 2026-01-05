import React from 'react';

interface BarrierProps {
  y: number;
  showCrashedCar?: boolean;
}

const ChickenBarrier: React.FC<BarrierProps> = ({ y, showCrashedCar = true }) => (
  <div 
    className="absolute left-1/2 -translate-x-1/2"
    style={{ top: `${y - 30}px` }}
  >
    <div className="flex flex-col items-center gap-1 animate-barrier-appear">
      <div className="flex items-center gap-1">
        <div className="w-3 h-20 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 border-4 border-white rounded-lg flex items-center justify-center shadow-xl animate-pulse">
            <span className="text-white text-3xl font-black">⚠️</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        </div>
        <div className="w-3 h-20 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t animate-bounce" style={{ animationDelay: '100ms' }} />
      </div>
      {showCrashedCar && (
        <div className="relative" style={{ marginTop: '-115px' }}>
          <div className="absolute left-1/2 -translate-x-1/2">
            <svg width="40" height="70" viewBox="0 0 40 70" className="animate-shake">
              <rect x="5" y="15" width="30" height="50" rx="8" fill="#ef4444" />
              <rect x="8" y="18" width="24" height="20" rx="4" fill="#1e293b" opacity="0.3" />
              <rect x="8" y="43" width="24" height="20" rx="4" fill="#1e293b" opacity="0.3" />
              <circle cx="12" cy="10" r="3" fill="#fbbf24" />
              <circle cx="28" cy="10" r="3" fill="#fbbf24" />
              <circle cx="10" cy="20" r="4" fill="#0f172a" />
              <circle cx="30" cy="20" r="4" fill="#0f172a" />
              <circle cx="10" cy="55" r="4" fill="#0f172a" />
              <circle cx="30" cy="55" r="4" fill="#0f172a" />
            </svg>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ChickenBarrier;