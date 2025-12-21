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
  );
}

export default App;
