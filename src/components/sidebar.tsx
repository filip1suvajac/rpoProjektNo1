// Sidebar.tsx
import { Link } from "react-router-dom";
import { type ReactNode, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export type SidebarItem = {
  icon: ReactNode;
  label?: string;
  to?: string;
  onClick?: () => void;
  children?: SidebarItem[];
};

type SidebarProps = {
  items: SidebarItem[];
  isOpen: boolean;
  toggleSidebar: () => void;
  selectedLanguage: string;
  colorScheme?: { bg: string; hover: string };
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isOpen,
  toggleSidebar,
  selectedLanguage,
  colorScheme,
}) => {
  const bg = colorScheme?.bg || "bg-[#0F212E]";
  const hover = colorScheme?.hover || "hover:bg-gray-800";

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-64 z-50" : "w-16"} ${bg}
      `}
    >
      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className={`flex items-center justify-center w-12 h-12 mx-auto my-4 rounded-md ${bg} ${hover} transition transform hover:scale-110`}
      >
        ☰
      </button>

      {/* Items */}
      <div className="flex-1 flex flex-col items-center">
        {items.map((item, idx) => (
          <SidebarItemComponent
            key={idx}
            item={item}
            isOpen={isOpen}
            hoverClass={hover}
            toggleSidebar={toggleSidebar}
            selectedLanguage={selectedLanguage}
          />
        ))}
      </div>
    </aside>
  );
};

const SidebarItemComponent: React.FC<{
  item: SidebarItem;
  isOpen: boolean;
  hoverClass: string;
  toggleSidebar: () => void;
  selectedLanguage: string;
}> = ({ item, isOpen, hoverClass, toggleSidebar, selectedLanguage }) => {
  const [open, setOpen] = useState(false);

  const isLanguage = item.label === "Jezik" || item.label === "Language";

  // Tooltip text (collapsed)
  const tooltipText =
    !isOpen && item.label
      ? isLanguage
        ? `Jezik: ${selectedLanguage}`
        : item.label
      : null;

  // Dropdown (expanded)
  if (item.children && isOpen) {
    return (
      <div className="w-auto mb-2 flex flex-col items-center">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between w-auto px-4 py-3 rounded-md ${hoverClass} transition transform hover:scale-110`}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="mt-1 flex flex-col gap-1">
            {item.children.map((child, idx) => (
              <button
                key={idx}
                onClick={child.onClick}
                className={`flex items-center gap-2 px-2 py-1 rounded-md ${hoverClass} transition transform hover:scale-110 w-auto h-auto`}
              >
                {child.icon}
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Single item
  return (
    <div className="relative group w-full flex items-center justify-center">
      <Link
        to={item.to || "#"}
        onClick={(e) => {
          // Special behavior for Language in collapsed mode
          if (!isOpen && item.children) {
            e.preventDefault();
            toggleSidebar();
            setTimeout(() => setOpen(true), 300);
          }
        }}
        className={`
          flex items-center my-2 rounded-md transition transform hover:scale-110
          ${
            isOpen
              ? `w-auto justify-start px-4 py-3 ${hoverClass}`
              : `w-12 h-12 justify-center ${hoverClass}`
          }
        `}
      >
        {item.icon}
        {isOpen && item.label && <span className="ml-4">{item.label}</span>}
      </Link>

      {/* Tooltip (collapsed) */}
      {tooltipText && (
        <span
          className="
            absolute left-full top-1/2 -translate-y-1/2 ml-2
            whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded
            opacity-0 group-hover:opacity-100 transition-opacity z-10
            after:content-[''] after:absolute after:top-1/2 after:left-[-4px]
            after:-translate-y-1/2 after:border-[4px] after:border-solid
            after:border-transparent after:border-r-gray-700
          "
        >
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default Sidebar;
