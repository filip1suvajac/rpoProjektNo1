import { useState } from "react";
import {
  ShieldExclamationIcon,
  UsersIcon,
  TrophyIcon,
  DocumentIcon,
  GiftIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import Sidebar from "./components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Register";
import { useState } from "react";
import Tabs from "./components/Tabs";
import CasinoBetsTable from "./components/CasinoBetsTable";
import LeaderboardTable from "./components/LeaderboardTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [language, setLanguage] = useState(" Slovenščina");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Domov",
      to: "/",
    },
    {
      icon: <GiftIcon className="w-5 h-5" />,
      label: "Promocije",
      to: "/promocije",
    },
    {
      icon: <UsersIcon className="w-5 h-5" />,
      label: "Povezava za partnerja",
      to: "/povzapar",
    },
    {
      icon: <TrophyIcon className="w-5 h-5" />,
      label: "VIP Klub",
      to: "/vipklub",
    },
    {
      icon: <DocumentIcon className="w-5 h-5" />,
      label: "Blog",
      to: "/blog",
    },
    {
      icon: <ChatBubbleLeftIcon className="w-5 h-5" />,
      label: "Forum",
      to: "/forum",
    },
    {
      icon: <ShieldExclamationIcon className="w-5 h-5" />,
      label: "Odgovorno Igranje",
      to: "/odgovornoigranje",
    },
    {
      icon: <GlobeAltIcon className="w-5 h-5" />,
      label: "Jezik",
      to: "/",
      children: [
        {
          icon: "🇸🇮",
          label: " Slovenščina",
          onClick: () => setLanguage(" Slovenščina"),
        },
        {
          icon: "🇬🇧",
          label: " English",
          onClick: () => setLanguage(" English"),
        },
      ],
    },
  ];

  return (
    <div className="flex">
      <Sidebar
        items={menuItems}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        selectedLanguage={language}
      />
      <div className="flex-1 ml-16 p-4">
        <h1 className="text-blue-500 font-bold text-xl">
          Najboljsi RPO projekt v zgodovini
        </h1>
      </div>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
import { GameList } from "./components/GameList/GameList";

function App() {
  const [activeTab, setActiveTab] = useState<"casino" | "leaderboard">("casino");

  return (
    <div className="flex min-h-screen bg-slate-800 text-white">
      <aside className="w-64 bg-slate-900" />
      <main className="flex-1 p-6 space-y-3">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "casino" && <CasinoBetsTable />}
        {activeTab === "leaderboard" && <LeaderboardTable />}
      </main>
      <GameList />
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
