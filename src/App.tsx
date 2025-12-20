// File: src/App.tsx
import React from 'react';
import FAQList, { type FAQ } from './components/FAQ';

const sampleFaqs: FAQ[] = [
  {
    id: '1',
    question: 'Kako deluje ta casino simulator?',
    answer:
      'Ta simulator igralnice je izdelan samo za izobraževalne namene. Vse igre so simulirane in dejansko denarja ni vpletenega.',
  },
  {
    id: '2',
    question: 'Ali lahko položim ali dvignem pravi denar?',
    answer:
      'Ne. Polaganje in dvig pravi denar nista mogoča, ker gre le za simulacijo.',
  },
  {
    id: '3',
    question: 'Ali lahko to igram kot pravo casino igro?',
    answer:
      'Ne. Vse igre so simulirane in namenjene samo za učenje in zabavo, brez možnosti dobitka pravega denarja.',
  },
  {
    id: '4',
    question: 'So rezultati iger pošteni?',
    answer:
      'Rezultati se generirajo z uporabo psevdonasumične logike in so namenjeni samo za prikaz.',
  },
  {
    id: '5',
    question: 'Kdo skrbi za vsebino in pravila iger v simulatorju?',
    answer:
      'Simulator je razvila skupina študentov, ki so poskrbeli, da so igre zabavne, razumljive in skladne s standardnimi pravili casino iger.',
  },
];

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-gray-200 rounded-2xl shadow-lg p-6 border-4 border-red-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-red-900 drop-shadow-lg">FAQ</h1>
        <FAQList items={sampleFaqs} allowMultipleOpen={false} />
      </div>
    </div>
  );
}
