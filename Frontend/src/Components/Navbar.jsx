import React, { useState } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  Settings,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ onToggleSidebar, sidebarOpen }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200/80 px-4 lg:px-6 flex items-center justify-between backdrop-blur-sm bg-white/95">
      {/* Left Section: Hamburger + Search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={24} />}
        </button>

        {/* Search Bar */}
        <div
          className={`
            relative flex items-center w-full max-w-md
            transition-all duration-200
            ${searchFocused ? "ring-2 ring-indigo-500/30" : ""}
          `}
        >
          <Search
            size={18}
            className={`absolute left-3 transition-colors duration-150 ${
              searchFocused ? "text-indigo-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`
              w-full pl-10 pr-4 py-2 rounded-xl text-sm
              bg-gray-50 border border-gray-200
              placeholder:text-gray-400 text-gray-700
              focus:outline-none focus:bg-white focus:border-indigo-400
              transition-all duration-200
            `}
          />
          <kbd className="hidden sm:flex absolute right-3 items-center gap-0.5 text-[10px] text-gray-400 font-medium bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Section: Actions + Profile */}
      <div className="flex items-center gap-1 ml-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {/* Notification Badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full">
            <span className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
          </span>
        </button>

        {/* Messages */}
        <button
          className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150"
          aria-label="Messages"
        >
          <MessageSquare size={18} />
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-indigo-500 rounded-full px-1">
            3
          </span>
        </button>

        {/* Settings */}
        <button
          className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 pl-2 pr-1.5 py-1.5 rounded-xl hover:bg-gray-100 transition-all duration-150"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-700 leading-tight">
                Admin User
              </p>
              <p className="text-[11px] text-gray-400 leading-tight">
                admin@stocky.com
              </p>
            </div>
            <div className="relative">
              <img
                src="https://picsum.photos/seed/admin-avatar/80/80.jpg"
                alt="Admin"
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-100"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 hidden sm:block transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />

              {/* Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-200/50 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Profile Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    admin@stocky.com
                  </p>
                </div>

                <div className="py-1">
                  {[
                    { label: "My Profile", icon: "👤" },
                    { label: "Account Settings", icon: "⚙️" },
                    { label: "Billing", icon: "💳" },
                    { label: "Help & Support", icon: "❓" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    <span className="text-base">🚪</span>
                    Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;