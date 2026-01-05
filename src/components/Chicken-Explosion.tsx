import React from 'react';

interface ExplosionProps {
  x: number;
  y: number;
}

const ChickenExplosion: React.FC<ExplosionProps> = ({ x, y }) => (
  <div 
    className="absolute"
    style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
  >
    <div className="relative">
      <div className="text-6xl animate-ping">💥</div>
      <div className="absolute top-0 left-0 text-6xl animate-pulse">💥</div>
      <div className="absolute top-2 left-2 text-4xl animate-bounce">🔥</div>
      <div className="absolute top-2 right-2 text-4xl animate-bounce" style={{ animationDelay: '100ms' }}>🔥</div>
    </div>
  </div>
);

export default ChickenExplosion;