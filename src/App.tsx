import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import TopBar from "./components/TopBar";

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
import Footer from "./components/Footer";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
  );
}

export default App;
