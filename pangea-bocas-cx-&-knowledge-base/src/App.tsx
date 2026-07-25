import React, { useState } from 'react';
import { CrewRole, ManualSection, LanguageMode } from './types';
import { MISSION_VISION, MANUAL_SECTIONS, POST_TOUR_PROTOCOLS, PANGEA_BRAND } from './data/manualData';
import { Header } from './components/Header';
import { RoleFilter } from './components/RoleFilter';
import { CoolerCalculator } from './components/CoolerCalculator';
import { PreFlightChecklist } from './components/PreFlightChecklist';
import { AreaGuide } from './components/AreaGuide';
import { PartnerGuide } from './components/PartnerGuide';
import { WildlifeGuide } from './components/WildlifeGuide';
import { HistoryBonus } from './components/HistoryBonus';
import { EmergencyCards } from './components/EmergencyCards';
import { ManualDetailModal } from './components/ManualDetailModal';
import {
  BookOpen,
  Compass,
  Anchor,
  ChevronRight,
  CheckCircle2,
  Heart,
  Sparkles,
  MapPin,
  Building2,
  ShieldAlert,
} from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState<CrewRole>('ALL');
  const [activeTab, setActiveTab] = useState<string>('manual');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('BOTH');
  const [selectedSection, setSelectedSection] = useState<ManualSection | null>(null);

  // Filter sections by role and search term
  const filteredSections = MANUAL_SECTIONS.filter((sec) => {
    const matchesRole =
      activeRole === 'ALL' || sec.targetRoles.includes('ALL') || sec.targetRoles.includes(activeRole);
    if (!matchesRole) return false;

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      sec.titleEn.toLowerCase().includes(term) ||
      sec.titleEs.toLowerCase().includes(term) ||
      sec.summaryEn.toLowerCase().includes(term) ||
      sec.summaryEs.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 text-[#1A1A1A] font-sans selection:bg-[#FFB519] selection:text-[#1A1A1A] flex flex-col">
      {/* Header Navigation with Pangea Colors */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        languageMode={languageMode}
        setLanguageMode={setLanguageMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active Role Filter Bar */}
        <RoleFilter activeRole={activeRole} languageMode={languageMode} />

        {/* Tab 1: Service Manual & Foundations */}
        {activeTab === 'manual' && (
          <div className="space-y-8">
            {/* Mission & Vision Showcase */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
                      {languageMode === 'ES' ? 'FILOSOFÍA PANGEA' : 'PANGEA PHILOSOPHY'}
                    </span>
                    <h2 className="text-xl font-black text-[#1A1A1A]">
                      {languageMode === 'ES' ? 'Principios Fundamentales Pangea Bocas' : 'Pangea Bocas Core Principles'}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      {languageMode === 'ES'
                        ? 'Misión, Visión y Expectativas para Recepción, Capitanes y Marineros'
                        : 'Mission, Vision, and Expectations for Reception, Captains & Mates'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#1A1A1A] text-[#FFB519] text-xs font-black rounded-xl shadow-sm">
                    Bocas del Toro Ecotourism Leader
                  </span>
                </div>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {/* Mission */}
                <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-1">
                    {languageMode === 'ES' ? 'Nuestra Misión' : 'Our Mission'}
                  </span>
                  <p className="text-xs text-gray-800 leading-relaxed font-semibold">
                    {languageMode === 'ES' ? MISSION_VISION.missionEs : MISSION_VISION.missionEn}
                  </p>
                  {languageMode === 'BOTH' && (
                    <p className="text-xs text-gray-500 leading-relaxed italic mt-2 pt-2 border-t border-gray-200 font-medium">
                      <strong className="text-amber-700 font-bold">ES:</strong> {MISSION_VISION.missionEs}
                    </p>
                  )}
                </div>

                {/* Vision */}
                <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-1">
                    {languageMode === 'ES' ? 'Nuestra Visión' : 'Our Vision'}
                  </span>
                  <p className="text-xs text-gray-800 leading-relaxed font-semibold">
                    {languageMode === 'ES' ? MISSION_VISION.visionEs : MISSION_VISION.visionEn}
                  </p>
                  {languageMode === 'BOTH' && (
                    <p className="text-xs text-gray-500 leading-relaxed italic mt-2 pt-2 border-t border-gray-200 font-medium">
                      <strong className="text-amber-700 font-bold">ES:</strong> {MISSION_VISION.visionEs}
                    </p>
                  )}
                </div>
              </div>

              {/* Company & Customer Expectations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Expectations */}
                <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
                  <h3 className="text-xs font-black uppercase text-[#1A1A1A] mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    {languageMode === 'ES' ? 'Lo que Esperamos de Ti (Empresa)' : 'What We Expect From You (Company)'}
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-700 font-medium">
                    {(languageMode === 'ES' ? MISSION_VISION.companyExpectationsEs : MISSION_VISION.companyExpectationsEn).map(
                      (item, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-xl border border-gray-200">
                          <span className="text-[#FFB519] font-black">•</span>
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Customer Expectations */}
                <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
                  <h3 className="text-xs font-black uppercase text-[#1A1A1A] mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    {languageMode === 'ES' ? 'Lo que los Huéspedes Esperan de Nosotros' : 'What Guests Expect From Us'}
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-700 font-medium">
                    {(languageMode === 'ES' ? MISSION_VISION.customerExpectationsEs : MISSION_VISION.customerExpectationsEn).map(
                      (item, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-xl border border-gray-200">
                          <span className="text-emerald-600 font-black">•</span>
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* High-Priority Customer Service, Pre-Tour & Post-Tour Speech Banner */}
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-[#FFB519] text-[#1A1A1A] p-5 rounded-2xl shadow-md border-2 border-amber-300 flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1A1A1A] text-[#FFB519] rounded-2xl flex items-center justify-center font-black shrink-0 shadow-inner">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-[#1A1A1A] text-[#FFB519] inline-block mb-1">
                      {languageMode === 'ES' ? 'PROTOCOLOS MANDATORIOS DE ATENCIÓN Y SEGURIDAD AL CLIENTE' : 'MANDATORY CUSTOMER SERVICE & SAFETY PROTOCOLS'}
                    </span>
                    <h3 className="text-sm md:text-base font-black">
                      {languageMode === 'ES'
                        ? '🎙️ Guiones Oficiales de Bienvenida, Cierre y Seguridad del Cliente en el Agua'
                        : '🎙️ Official Welcome, Post-Tour Closing & Customer In-Water Safety Scripts'}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/85 font-semibold">
                      {languageMode === 'ES'
                        ? 'Acceso rápido a los discursos textuales del Capitán/Marinero (Pre-Tour y Post-Tour), seguridad de nadadores en el agua y estándares de hospitalidad.'
                        : 'Quick access to Captain & Mate verbatim speeches (Pre-Tour & Post-Tour), customer in-water safety, and 5-star hospitality standards.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0 w-full lg:w-auto">
                  <button
                    onClick={() => {
                      const sec = MANUAL_SECTIONS.find((s) => s.id === 'pre-tour-safety-speech');
                      if (sec) setSelectedSection(sec);
                    }}
                    className="flex-1 lg:flex-initial px-3.5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#FFB519] font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>{languageMode === 'ES' ? '🎙️ Discurso Pre-Tour' : '🎙️ Pre-Tour Speech'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#FFB519]" />
                  </button>
                  <button
                    onClick={() => {
                      const sec = MANUAL_SECTIONS.find((s) => s.id === 'post-tour-closing-speech');
                      if (sec) setSelectedSection(sec);
                    }}
                    className="flex-1 lg:flex-initial px-3.5 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-200 font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>{languageMode === 'ES' ? '👏 Discurso Cierre' : '👏 Closing Speech'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                  <button
                    onClick={() => {
                      const sec = MANUAL_SECTIONS.find((s) => s.id === 'customer-safety-in-water');
                      if (sec) setSelectedSection(sec);
                    }}
                    className="flex-1 lg:flex-initial px-3.5 py-2.5 bg-white hover:bg-gray-100 text-[#1A1A1A] font-black text-xs rounded-xl transition-all shadow-md border border-amber-300 flex items-center justify-center gap-1.5"
                  >
                    <span>{languageMode === 'ES' ? '🛟 Seguridad Cliente' : '🛟 Customer Safety'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Chapters Grid */}
            <div>
              <h3 className="text-lg font-black text-[#1A1A1A] mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FFB519]" />
                <span>{languageMode === 'ES' ? 'Capítulos del Manual Operativo' : 'Operational Manual Chapters'}</span>
                {searchTerm && <span className="text-xs text-gray-500 font-normal">(Filtered by: "{searchTerm}")</span>}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSections.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSection(sec)}
                    className="bg-white border border-gray-200 hover:border-amber-400 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-[#FFB519] text-[#1A1A1A]">
                          {sec.category}
                        </span>
                        <div className="flex gap-1">
                          {sec.targetRoles.map((r) => (
                            <span key={r} className="text-[9px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h4 className="text-base font-black text-[#1A1A1A] group-hover:text-amber-600 transition-colors mb-2">
                        {languageMode === 'ES' ? sec.titleEs : sec.titleEn}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">
                        {languageMode === 'ES' ? sec.summaryEs : sec.summaryEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#1A1A1A] font-black group-hover:translate-x-1 transition-transform">
                      <span>{languageMode === 'ES' ? 'Leer Capítulo Completo' : 'Read Chapter Protocol'}</span>
                      <ChevronRight className="w-4 h-4 text-[#FFB519]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Teaser to Area Guide */}
            <div className="bg-[#1A1A1A] text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#FFB519]" />
                <div>
                  <h3 className="text-base font-black text-[#FFB519]">
                    {languageMode === 'ES' ? 'Explora el Conocimiento de Áreas de Bocas' : 'Explore Bocas Area & Route Knowledge'}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {languageMode === 'ES'
                      ? 'Distancias, geografía, especies, regulaciones y libro del capitán de Escudo, Estrella, Bastimentos y más.'
                      : 'Distances, geography, flora/fauna, rules, and captain notes for Escudo, Estrella, Bastimentos, etc.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('areas')}
                className="px-5 py-2.5 bg-[#FFB519] hover:bg-amber-400 text-[#1A1A1A] font-black text-xs rounded-xl transition-all shrink-0 shadow-md"
              >
                {languageMode === 'ES' ? 'Ver Guía de Áreas' : 'View Area Knowledge'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Cooler Calculator */}
        {activeTab === 'cooler' && <CoolerCalculator languageMode={languageMode} />}

        {/* Tab 3: Pre-Boat & Post-Tour Safety Checklist */}
        {activeTab === 'checklist' && <PreFlightChecklist languageMode={languageMode} />}

        {/* Tab 4: Knowledge by Area */}
        {activeTab === 'areas' && <AreaGuide languageMode={languageMode} />}

        {/* Tab 5: Partner Organizations */}
        {activeTab === 'partners' && <PartnerGuide languageMode={languageMode} />}

        {/* Tab 6: Wildlife Hall of Fame */}
        {activeTab === 'wildlife' && <WildlifeGuide languageMode={languageMode} />}

        {/* Tab 7: History & Bonus Knowledge */}
        {activeTab === 'bonus' && <HistoryBonus languageMode={languageMode} />}

        {/* Tab 8: Emergency First Aid Cards */}
        {activeTab === 'emergency' && <EmergencyCards languageMode={languageMode} />}
      </main>

      {/* Manual Detail Modal */}
      <ManualDetailModal
        section={selectedSection}
        onClose={() => setSelectedSection(null)}
        languageMode={languageMode}
      />

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-gray-400 border-t border-gray-800 py-6 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-[#FFB519]" />
            <span className="font-black text-white">PANGEA BOCAS</span>
            <span>— Customer Service & Knowledge Database (Reception, Captains & Mates)</span>
          </div>
          <div>Bocas del Toro Archipelago, Panama • Ecotourism Excellence</div>
        </div>
      </footer>
    </div>
  );
}
