// File: src/App.tsx
import React from 'react';
import FAQList, { type FAQ } from './components/FAQ';

const sampleFaqs: FAQ[] = [
  {
    id: 'q1',
    question: 'Q1?',
    answer:
      'A1',
  },
  {
    id: 'q2',
    question: 'Q2?',
    answer: 'A2',
  },
  {
    id: 'q3',
    question: 'Q3?',
    answer: 'A3',
  },
 
];

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">FAQ</h1>

        {/*
          SPODNJEMU UKAZU LAHKO DAŠ FALSE, IN BO NAENKRAT LAHKO ODPRTIH VEČ VPR!
          
        */}
        <FAQList items={sampleFaqs} allowMultipleOpen={false} />
      </div>
    </div>
  );
}
