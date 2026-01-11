import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import DiceGame from "./components/DiceGame";
import TopBar from "./components/TopBar";
import { AuthProvider } from "./AuthContext"
import {
  ShieldExclamationIcon,
  UsersIcon,
  TrophyIcon,
  GiftIcon,
  HomeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import Footer from "./components/Footer";
import Team from "./pages/Team";
import ResponsiblePlaying from "./pages/ResponsiblePlaying";
import NotFound from "./pages/NotFound";
import ChickenRoadGame from "./pages/GameChicken";
import Blackjack from "./pages/Blackjack";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("Slovenščina");

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
      label: "Člani ekipe",
      to: "/ekipa",
    },
    {
      icon: <TrophyIcon className="w-5 h-5" />,
      label: "VIP Klub",
      to: "/vipklub",
    },
    {
      icon: <ShieldExclamationIcon className="w-5 h-5" />,
      label: "Odgovorno Igranje",
      to: "/pametno-stavi",
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
        <AuthProvider>

      <div className="flex">
        <Sidebar
          items={menuItems}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selectedLanguage={language}
        />
        {sidebarOpen && (
         <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
        <div className={`flex-1 transition-all duration-300 max-w-full pl-16`}>
          <TopBar sidebarOpen={sidebarOpen} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prijava" element={<Login />} />
            <Route path="/registracija" element={<Register />} />
            <Route path="/ekipa" element={<Team />} />
            <Route path="/pametno-stavi" element={<ResponsiblePlaying />} />
            <Route path="/chicken" element={<ChickenRoadGame />} />
            <Route path="/dice" element={<DiceGame />} />
            <Route path="/blackjack" element={<Blackjack />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          
          <Footer />
        </div>
      </div>
      </AuthProvider>
  );
}

export default App;
