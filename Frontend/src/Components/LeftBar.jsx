import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Tag,
  Truck,
  RotateCcw,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronLeft,
  Sparkles,
  Store,
} from "lucide-react";

const navSections = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        active: true,
        href: "/",
      },
      {
        label: "Orders",
        icon: ShoppingBag,
        badge: { text: "24", type: "count" },
        href: "/orders",
      },
      {
        label: "Products",
        icon: Package,
        badge: { text: "New", type: "new" },
        href: "/products",
      },
      {
        label: "Customers",
        icon: Users,
        href: "/customers",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        href: "/analytics",
      },
    ],
  },
  {
    title: "Catalog",
    items: [
      {
        label: "Categories",
        icon: Tag,
        href: "/categories",
      },
      {
        label: "Brands",
        icon: Store,
        href: "/brands",
      },
      {
        label: "Inventory",
        icon: Package,
        href: "/inventory",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Shipping",
        icon: Truck,
        href: "/shipping",
      },
      {
        label: "Returns",
        icon: RotateCcw,
        badge: { text: "5", type: "warning" },
        href: "/returns",
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
      {
        label: "Help & Support",
        icon: HelpCircle,
        href: "/help",
      },
    ],
  },
];

const badgeStyles = {
  count: "bg-indigo-500 text-white",
  new: "bg-emerald-500 text-white",
  warning: "bg-amber-500 text-white",
};

const Sidebar = ({
  isOpen,
  onToggle,
  collapsed,
  onCollapse,
  onNavigate,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    Main: true,
    Catalog: true,
    Management: false,
    Other: false,
  });

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("/");

 const handleNav = (href) => {

      navigate("/admin/"+href);
      setActivePath(href)
      
    
    if (window.innerWidth < 1024 && onToggle) {
      onToggle();
    }
  };


  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full
          bg-white border-r border-gray-200/80
          flex flex-col
          transition-all duration-300 ease-in-out
          lg:z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "w-[72px]" : "w-64"}
        `}
      >
        {/* ===== Logo Section ===== */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200/80 flex-shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-white" />
            </div>
            <span
              className={`
                text-lg font-bold text-gray-800 tracking-tight whitespace-nowrap
                transition-all duration-300
                ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
              `}
            >
              Stocky
            </span>
          </div>

          {/* Collapse Button (Desktop Only) */}
          <button
            onClick={onCollapse}
            className={`
              hidden lg:flex items-center justify-center
              w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100
              transition-all duration-150 flex-shrink-0
              ${collapsed ? "rotate-180" : ""}
            `}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={onToggle}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* ===== Navigation ===== */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 scrollbar-thin">
          {navSections.map((section,index) => (
            <div key={section.index} className="mb-4">
              {/* Section Title */}
              <button
                onClick={() => !collapsed && toggleSection(section.title)}
                className={`
                  w-full flex items-center justify-between mb-1.5 px-2
                  transition-all duration-200
                  ${collapsed ? "justify-center" : ""}
                  ${collapsed ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <span
                  className={`
                    text-[11px] font-semibold uppercase tracking-wider text-gray-400
                    transition-all duration-300
                    ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
                  `}
                >
                  {section.title}
                </span>
                {!collapsed && (
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${
                      expandedSections[section.title] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Nav Items */}
              <div
                className={`
                  space-y-0.5 transition-all duration-300 overflow-hidden
                  ${collapsed ? "max-h-[500px] opacity-100" : ""}
                  ${
                    !collapsed && !expandedSections[section.title]
                      ? "max-h-0 opacity-0"
                      : !collapsed && expandedSections[section.title]
                      ? "max-h-[500px] opacity-100"
                      : ""
                  }
                `}
              >
                {section.items.map((item) => {
                  const isActive = activePath === item.href;

                
                  const Icon = item.icon;

                  return (
                     <button 
          key={item.name}

          onClick={() => handleNav(item.href)} 
        
                      title={collapsed ? item.label : undefined}
                      className={`
                        group relative w-full flex items-center gap-3 rounded-xl
                        transition-all duration-150
                        ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
                        ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      {/* Active Indicator Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full" />
                      )}

                      {/* Icon */}
                      <Icon
                        size={20}
                        className={`flex-shrink-0 transition-colors duration-150 ${
                          isActive
                            ? "text-indigo-500"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />

                      {/* Label */}
                      <span
                        className={`
                          text-sm whitespace-nowrap transition-all duration-300
                          ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
                        `}
                      >
                        {item.label}
                      </span>

                      {/* Badge */}
                      {item.badge && (
                        <span
                          className={`
                            ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full
                            transition-all duration-300
                            ${badgeStyles[item.badge.type]}
                            ${collapsed ? "absolute -top-1 -right-1 text-[9px] px-1.5 py-0" : ""}
                          `}
                        >
                          {item.badge.text}
                        </span>
                      )}

                      {/* Collapsed Tooltip */}
                      {collapsed && (
                        <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap pointer-events-none z-50 shadow-lg">
                          {item.label}
                          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 rounded-sm" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ===== Bottom Section ===== */}
        <div className="flex-shrink-0 border-t border-gray-200/80 p-3">
          {/* Logout Button */}
          <button
            onClick={() => handleNav("/logout")}
            title={collapsed ? "Log Out" : undefined}
            className={`
              group w-full flex items-center gap-3 rounded-xl
              text-gray-500 hover:bg-red-50 hover:text-red-500
              transition-all duration-150
              ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
            `}
          >
            <LogOut
              size={20}
              className="flex-shrink-0 text-gray-400 group-hover:text-red-500 transition-colors"
            />
            <span
              className={`
                text-sm whitespace-nowrap transition-all duration-300
                ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
              `}
            >
              Log Out
            </span>
            {collapsed && (
              <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap pointer-events-none z-50 shadow-lg">
                Log Out
                <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 rounded-sm" />
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;