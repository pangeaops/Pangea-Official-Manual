import React, { useState } from 'react';
import { AreaKnowledge, LanguageMode } from '../types';
import { AREA_KNOWLEDGE_LIST } from '../data/manualData';
import {
  MapPin,
  Clock,
  History,
  Compass,
  AlertTriangle,
  BookOpen,
  Leaf,
  CheckCircle2,
  Sparkles,
  Volume2,
} from 'lucide-react';

interface AreaGuideProps {
  languageMode: LanguageMode;
}

export const AreaGuide: React.FC<AreaGuideProps> = ({ languageMode }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(AREA_KNOWLEDGE_LIST[0].id);

  const activeArea = AREA_KNOWLEDGE_LIST.find((a) => a.id === selectedAreaId) || AREA_KNOWLEDGE_LIST[0];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'ARCHIPIÉLAGO DE BOCAS' : 'BOCAS ARCHIPELAGO'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">
              {languageMode === 'ES' ? 'Conocimiento por Área, Guión de Guía y Capitán' : 'Area & Location Knowledge + Guide Speech'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Información geográfica, distancia, historia, guiones de discurso para guías, secretos de navegación y bitácora.'
                : 'Geographical breakdown, distance, history, guide speech scripts, captain secrets, and ocean book logs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Location Selector Bar - Clean Wrap Pills & Mobile Quick Select */}
      <div className="my-6 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#FFB519]" />
            {languageMode === 'ES' ? 'Seleccionar Destino del Archipiélago (13 Ubicaciones):' : 'Select Archipelago Destination (13 Locations):'}
          </label>
          <span className="text-[10px] font-bold text-gray-400 hidden sm:inline">
            {languageMode === 'ES' ? 'Haz clic en cualquier ubicación' : 'Click any location to view full details'}
          </span>
        </div>

        {/* Mobile Fast Select Dropdown */}
        <div className="block sm:hidden">
          <select
            value={selectedAreaId}
            onChange={(e) => setSelectedAreaId(e.target.value)}
            className="w-full bg-amber-50 border-2 border-[#FFB519] rounded-xl px-3 py-2.5 text-xs font-black text-[#1A1A1A] focus:outline-none shadow-xs"
          >
            {AREA_KNOWLEDGE_LIST.map((area) => (
              <option key={area.id} value={area.id}>
                📍 {languageMode === 'ES' ? area.nameEs : area.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Responsive Wrap Grid of Location Pills (No Horizontal Scrollbar!) */}
        <div className="flex flex-wrap gap-2 pt-1">
          {AREA_KNOWLEDGE_LIST.map((area) => {
            const isSelected = selectedAreaId === area.id;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-[#FFB519] text-[#1A1A1A] border-amber-400 font-black shadow-md scale-105 ring-2 ring-amber-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 font-bold'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#1A1A1A]' : 'text-amber-500'}`} />
                <span>{languageMode === 'ES' ? area.nameEs : area.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Area Detail Content */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* Banner with Image */}
        <div className="relative rounded-xl overflow-hidden mb-6 h-48 sm:h-64 shadow-md border border-gray-300">
          <img
            src={activeArea.image}
            alt={activeArea.nameEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/40 to-transparent p-6 flex flex-col justify-end">
            <span className="px-3 py-1 bg-[#FFB519] text-[#1A1A1A] text-[10px] font-black uppercase rounded-lg w-fit mb-1 shadow-sm">
              {languageMode === 'ES' ? 'DESTINO DESTACADO' : 'FEATURED DESTINATION'}
            </span>
            <h3 className="text-2xl font-black text-white">{activeArea.nameEn}</h3>
            <p className="text-xs text-amber-300 font-medium flex items-center gap-1.5 mt-1">
              <Clock className="w-3.5 h-3.5 text-[#FFB519]" />
              {languageMode === 'ES' ? activeArea.distanceKmTimeEs : activeArea.distanceKmTimeEn}
            </p>
          </div>
        </div>

        {/* 🎙️ Tour Guide Speech Script Section */}
        {activeArea.guideSpeechScriptEn && (
          <div className="mb-6 bg-amber-50 border-2 border-[#FFB519] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#FFB519] text-[#1A1A1A] rounded-xl font-bold">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                    {languageMode === 'ES' ? '🎙️ GUIÓN DE DISCURSO PARA EL GUÍA / CAPITÁN' : '🎙️ OFFICIAL TOUR GUIDE & CAPTAIN SPEECH SCRIPT'}
                  </h4>
                  <span className="text-[10px] text-amber-800 font-semibold">
                    {languageMode === 'ES' ? 'Usar este discurso al llegar o navegar por esta área:' : 'Use this spoken narration when approaching or cruising through this location:'}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#1A1A1A] text-[#FFB519] text-[9px] font-black uppercase rounded-lg tracking-wider">
                SPEECH READY
              </span>
            </div>

            {(languageMode === 'EN' || languageMode === 'BOTH') && (
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs mb-3">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-1">ENGLISH SPEECH:</span>
                <p className="text-xs font-medium text-gray-900 leading-relaxed italic">
                  "{activeArea.guideSpeechScriptEn}"
                </p>
              </div>
            )}

            {(languageMode === 'ES' || languageMode === 'BOTH') && (
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-1">DISCURSO EN ESPAÑOL:</span>
                <p className="text-xs font-medium text-gray-900 leading-relaxed italic">
                  "{activeArea.guideSpeechScriptEs}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Formatted Area Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Distance & Geography */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs font-black uppercase text-[#1A1A1A] mb-2 flex items-center gap-1.5 border-b pb-2 border-gray-100">
              <Compass className="w-4 h-4 text-[#FFB519]" />
              {languageMode === 'ES' ? '1. Geografía y Bosque' : '1. Geography & Forest'}
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              {languageMode === 'ES' ? activeArea.geographyForestEs : activeArea.geographyForestEn}
            </p>
            {languageMode === 'BOTH' && (
              <p className="text-xs text-gray-500 leading-relaxed italic mt-2 pt-2 border-t border-gray-100">
                <strong className="text-amber-600 font-bold">ES:</strong> {activeArea.geographyForestEs}
              </p>
            )}
          </div>

          {/* 2. Best Time to Visit */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs font-black uppercase text-[#1A1A1A] mb-2 flex items-center gap-1.5 border-b pb-2 border-gray-100">
              <Clock className="w-4 h-4 text-[#FFB519]" />
              {languageMode === 'ES' ? '2. Mejor Época para Visitar' : '2. Best Time to Visit'}
            </h4>
            <p className="text-xs text-gray-800 font-bold">
              {languageMode === 'ES' ? activeArea.bestTimeToVisitEs : activeArea.bestTimeToVisitEn}
            </p>
          </div>

          {/* 3. Historical Facts */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm md:col-span-2">
            <h4 className="text-xs font-black uppercase text-[#1A1A1A] mb-2 flex items-center gap-1.5 border-b pb-2 border-gray-100">
              <History className="w-4 h-4 text-[#FFB519]" />
              {languageMode === 'ES' ? '3. Datos Históricos' : '3. Historical Facts'}
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              {languageMode === 'ES' ? activeArea.historicalFactsEs : activeArea.historicalFactsEn}
            </p>
            {languageMode === 'BOTH' && (
              <p className="text-xs text-gray-500 leading-relaxed italic mt-2 pt-2 border-t border-gray-100">
                <strong className="text-amber-600 font-bold">ES:</strong> {activeArea.historicalFactsEs}
              </p>
            )}
          </div>

          {/* 4. Activities You Can Do */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs font-black uppercase text-[#1A1A1A] mb-2 flex items-center gap-1.5 border-b pb-2 border-gray-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {languageMode === 'ES' ? '4. Actividades en el Área' : '4. Activities You Can Do'}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {(languageMode === 'ES' ? activeArea.activitiesEs : activeArea.activitiesEn).map((act, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <span className="w-1.5 h-1.5 bg-[#FFB519] rounded-full"></span>
                  <span className="font-semibold">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Key Main Species (Flora & Fauna) */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs font-black uppercase text-[#1A1A1A] mb-2 flex items-center gap-1.5 border-b pb-2 border-gray-100">
              <Leaf className="w-4 h-4 text-emerald-600" />
              {languageMode === 'ES' ? '5. Especies Clave: Flora y Fauna' : '5. Key Species: Flora & Fauna'}
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-gray-800 text-[11px] block uppercase text-amber-600">Flora:</span>
                <p className="text-gray-600 font-medium">
                  {(languageMode === 'ES' ? activeArea.mainSpeciesEs : activeArea.mainSpeciesEn).flora.join(', ')}
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <span className="font-bold text-gray-800 text-[11px] block uppercase text-emerald-600">Fauna:</span>
                <p className="text-gray-600 font-medium">
                  {(languageMode === 'ES' ? activeArea.mainSpeciesEs : activeArea.mainSpeciesEn).fauna.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* 6. Regulations and Protocols */}
          <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl shadow-sm md:col-span-2">
            <h4 className="text-xs font-black uppercase text-amber-900 mb-2 flex items-center gap-1.5 border-b pb-2 border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              {languageMode === 'ES' ? '6. Regulaciones y Protocolos' : '6. Regulations & Protocols'}
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-900 font-medium">
              {(languageMode === 'ES' ? activeArea.regulationsEs : activeArea.regulationsEn).map((reg, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-amber-200">
                  <span className="text-amber-600 font-bold">⚠️</span>
                  <span>{reg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Captain's Insider Secrets */}
          {activeArea.insiderSecretsEn && (
            <div className="bg-[#1A1A1A] text-white p-4 rounded-xl shadow-md md:col-span-2 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2 text-[#FFB519]">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  {languageMode === 'ES' ? 'SECRETO DEL CAPITÁN' : "CAPTAIN'S INSIDER SECRET"}
                </h4>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-medium">
                {languageMode === 'ES' ? activeArea.insiderSecretsEs : activeArea.insiderSecretsEn}
              </p>
            </div>
          )}

          {/* 7. Ocean Book - Knowledge and Trip by Captain Davis Marshall */}
          <div className="bg-white border-2 border-dashed border-amber-400 p-5 rounded-xl shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FFB519]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                  Ocean Book — Captain Davis Marshall Log
                </h4>
              </div>
              <span className="px-2 py-0.5 bg-[#FFB519] text-[#1A1A1A] text-[9px] font-black rounded uppercase">
                {activeArea.oceanBookNotesEn || activeArea.oceanBookNotesEs ? 'Captain Field Notes Example' : 'Captain Log Space'}
              </span>
            </div>
            {activeArea.oceanBookNotesEn || activeArea.oceanBookNotesEs ? (
              <p className="text-xs text-gray-800 font-mono bg-amber-50/50 p-3 rounded-lg border border-amber-200 leading-relaxed font-semibold">
                {languageMode === 'ES' ? activeArea.oceanBookNotesEs : activeArea.oceanBookNotesEn}
              </p>
            ) : (
              <div className="bg-amber-50/30 p-4 rounded-lg border border-dashed border-amber-300 text-xs font-mono text-gray-500 italic flex items-center justify-between gap-2">
                <span>
                  {languageMode === 'ES'
                    ? '✏️ [ Entrada en blanco — Espacio reservado para las notas de campo y navegación del Capitán Davis Marshall ]'
                    : '✏️ [ Blank Log — Reserved for Captain Davis Marshall field notes & navigation entries ]'}
                </span>
                <span className="text-[10px] text-amber-800 font-sans font-bold bg-amber-100/90 px-2 py-1 rounded border border-amber-200 shrink-0">
                  {languageMode === 'ES' ? 'Espacio de Capitán' : 'Captain Note Log'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

