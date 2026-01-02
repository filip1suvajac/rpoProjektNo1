import React from 'react';
import type { Car as CarType } from './Chicken-types';

interface CarProps {
  car: CarType;
  stopped?: boolean;
}

const ChickenCar: React.FC<CarProps> = ({ car, stopped }) => (
  <div 
    className="absolute transition-all duration-100"
    style={{ 
      top: `${car.y}px`,
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
      <rect x="5" y="15" width="30" height="50" rx="8" fill={car.color} />
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
);

export default ChickenCar;