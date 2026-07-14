import React from "react";
import { Monitor, Smartphone, Tablet, MapPin } from "lucide-react";

const devices = [
  { label: "Desktop", value: 58, icon: Monitor, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Mobile", value: 34, icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Tablet", value: 8, icon: Tablet, color: "text-amber-500", bg: "bg-amber-50" },
];

const countries = [
  { code: "US", name: "United States", value: 45, flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", value: 18, flag: "🇬🇧" },
  { code: "CA", name: "Canada", value: 12, flag: "🇨🇦" },
  { code: "DE", name: "Germany", value: 8, flag: "🇩🇪" },
  { code: "AU", name: "Australia", value: 6, flag: "🇦🇺" },
];

const GeoDeviceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
      {/* Devices Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Devices</h3>
        <div className="space-y-4">
          {devices.map((dev) => {
            const Icon = dev.icon;
            return (
              <div key={dev.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${dev.bg} flex items-center justify-center`}>
                  <Icon size={18} className={dev.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dev.label}</span>
                    <span className="text-sm font-bold text-gray-800">{dev.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        dev.color === "text-indigo-500" ? "bg-indigo-500" : dev.color === "text-emerald-500" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${dev.value}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Geography Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Top Locations</h3>
          <MapPin size={16} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          {countries.map((country, i) => (
            <div key={country.code} className="flex items-center gap-3">
              <span className="text-lg w-8 text-center">{country.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 truncate pr-2">{country.name}</span>
                  <span className="text-sm font-bold text-gray-800 flex-shrink-0">{country.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-400 rounded-full transition-all duration-700"
                    style={{ width: `${country.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeoDeviceCards;