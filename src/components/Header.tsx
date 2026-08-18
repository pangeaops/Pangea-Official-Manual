import React from 'react';
import { CrewRole, LanguageMode } from '../types';
import { PANGEA_BRAND } from '../data/manualData';
import {
  Anchor,
  Compass,
  ShoppingBag,
  CheckSquare,
  ShieldAlert,
  MapPin,
  Building2,
  Sparkles,
  MessageSquare,
  Award,
  BookOpen,
  Search,
  Globe,
  Calendar,
} from 'lucide-react';

interface HeaderProps {
  activeRole: CrewRole;
  setActiveRole: (role: CrewRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  languageMode: LanguageMode;
  setLanguageMode: (lang: LanguageMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  languageMode,
  setLanguageMode,
}) => {
  const tabs = [
    { id: 'manual', labelEn: 'Manual & Foundation', labelEs: 'Manual y Fundamentos', icon: BookOpen },
    { id: 'cooler', labelEn: 'Cooler Calculator', labelEs: 'Calculadora Hielera', icon: ShoppingBag },
    { id: 'checklist', labelEn: 'Pre & Post-Tour Checklist', labelEs: 'Listas Pre y Post Tour', icon: CheckSquare },
    { id: 'areas', labelEn: 'Knowledge by Area', labelEs: 'Conocimiento por Área', icon: MapPin },
    { id: 'partners', labelEn: 'Partner Organizations', labelEs: 'Socios y Aliados', icon: Building2 },
    { id: 'wildlife', labelEn: 'Wildlife Hall of Fame', labelEs: 'Salón de Fauna y Flora', icon: Sparkles },
    { id: 'seasons', labelEn: 'Seasons Calendar', labelEs: 'Calendario de Temporadas', icon: Calendar },
    { id: 'bonus', labelEn: 'History & Bonus Knowledge', labelEs: 'Historia y Conocimiento Extra', icon: Compass },
    { id: 'emergency', labelEn: 'Emergency First Aid', labelEs: 'Primeros Auxilios', icon: ShieldAlert },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      {/* Top Brand Stripe in Pangea Gold */}
      <div className="h-1.5 w-full bg-[#FFB519]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Navbar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-[#FFB519] flex items-center justify-center font-black shadow-md border border-gray-200">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-[#1A1A1A] tracking-tight font-sans">PANGEA BOCAS</h1>
                <span className="px-2 py-0.5 bg-[#FFB519] text-[#1A1A1A] text-[10px] font-extrabold uppercase rounded shadow-sm">
                  Official Manual
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Customer Service, Area Knowledge & Operations Database
              </p>
            </div>
          </div>

          {/* Controls: Search, Language Switcher, Role Selector */}
          <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 sm:flex-initial sm:w-56">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search manual, areas, wildlife..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB519]"
              />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <Globe className="w-3.5 h-3.5 text-gray-500 ml-1.5 mr-1" />
              <button
                onClick={() => setLanguageMode('BOTH')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageMode === 'BOTH'
                    ? 'bg-[#FFB519] text-[#1A1A1A] shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                EN + ES
              </button>
              <button
                onClick={() => setLanguageMode('EN')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageMode === 'EN'
                    ? 'bg-[#FFB519] text-[#1A1A1A] shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguageMode('ES')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageMode === 'ES'
                    ? 'bg-[#FFB519] text-[#1A1A1A] shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                ES
              </button>
            </div>

            {/* Role Filter Selector */}
            <div className="flex items-center bg-[#1A1A1A] p-1 rounded-xl">
              {(['ALL', 'RECEPTION', 'CAPTAIN', 'MATE'] as CrewRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all ${
                    activeRole === role
                      ? 'bg-[#FFB519] text-[#1A1A1A] shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Desktop Clean Pills & Mobile Category Dropdown */}
        <div className="mt-3 border-t border-gray-100 pt-3">
          {/* Mobile Dropdown Selector for Navigation */}
          <div className="block md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-gray-50 border-2 border-[#FFB519] rounded-xl px-3 py-2 text-xs font-extrabold text-[#1A1A1A] focus:outline-none shadow-xs"
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {languageMode === 'ES' ? t.labelEs : t.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop & Tablet Navigation - Clean Wrapped Grid or Scroll-free Layout */}
          <nav className="hidden md:flex flex-wrap items-center justify-center gap-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#FFB519] text-[#1A1A1A] shadow-sm border border-amber-400 font-black scale-[1.02]'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1A1A1A]' : 'text-gray-500'}`} />
                  <span>{languageMode === 'ES' ? t.labelEs : t.labelEn}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
