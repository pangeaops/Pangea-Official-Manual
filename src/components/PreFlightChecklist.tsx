import React, { useState } from 'react';
import { BoatCheckCategory, LanguageMode } from '../types';
import { BOAT_CHECK_CATEGORIES, POST_TOUR_PROTOCOLS, PANGEA_BRAND } from '../data/manualData';
import { CheckSquare, CheckCircle2, RotateCcw, AlertOctagon, Anchor, Sparkles } from 'lucide-react';

interface PreFlightChecklistProps {
  languageMode: LanguageMode;
}

export const PreFlightChecklist: React.FC<PreFlightChecklistProps> = ({ languageMode }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    setCheckedItems({});
  };

  // Total items calculation
  let totalItemsCount = 0;
  BOAT_CHECK_CATEGORIES.forEach((cat) => {
    totalItemsCount += cat.items.length;
  });

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllChecked = checkedCount === totalItemsCount && totalItemsCount > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'INSPECCIÓN DE EMBARCACIÓN' : 'VESSEL INSPECTION'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Listas de Control Pre-Salida y Post-Tour' : 'Pre-Departure & Post-Tour Checklists'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Revisiones obligatorias del Capitán y Marinero antes de navegar y protocolo de limpieza final.'
                : 'Mandatory vessel pre-flight inspection and post-tour boat cleanup protocols.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase font-black block">
              {languageMode === 'ES' ? 'PROGRESO' : 'PROGRESS'}
            </span>
            <span className="text-base font-black text-[#1A1A1A]">
              {checkedCount} / {totalItemsCount}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Reset All"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">{languageMode === 'ES' ? 'Reiniciar' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {isAllChecked && (
        <div className="mb-6 p-4 bg-emerald-500 text-slate-950 rounded-2xl font-black flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-slate-950" />
            <div>
              <h3 className="text-base uppercase tracking-tight">
                {languageMode === 'ES' ? '¡EMBARCACIÓN 100% LISTA Y VERIFICADA!' : 'VESSEL 100% READY FOR DEPARTURE!'}
              </h3>
              <p className="text-xs text-slate-900 font-semibold">
                {languageMode === 'ES'
                  ? 'Todos los puntos de seguridad, hielera y equipos post-tour han sido revisados.'
                  : 'All safety points, coolers, and gear have been verified.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Categories Grid */}
      <div className="space-y-6">
        {BOAT_CHECK_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wide mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
              <Anchor className="w-4 h-4 text-[#FFB519]" />
              <span>{languageMode === 'ES' ? cat.titleEs : cat.titleEn}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-4 h-4" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-black">
                          {languageMode === 'ES' ? item.labelEs : item.labelEn}
                        </span>
                        {item.critical && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-red-100 text-red-700 rounded border border-red-200">
                            CRITICAL
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                        {languageMode === 'ES' ? item.descriptionEs : item.descriptionEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Post-Tour Highlight Summary Box */}
      <div className="mt-8 bg-[#1A1A1A] text-white p-6 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
          <Sparkles className="w-5 h-5 text-[#FFB519]" />
          <h3 className="text-sm font-black uppercase text-[#FFB519] tracking-wider">
            {languageMode === 'ES' ? POST_TOUR_PROTOCOLS.titleEs : POST_TOUR_PROTOCOLS.titleEn}
          </h3>
        </div>

        <ul className="space-y-2 text-xs text-gray-300">
          {(languageMode === 'ES' ? POST_TOUR_PROTOCOLS.stepsEs : POST_TOUR_PROTOCOLS.stepsEn).map((step, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-gray-900 p-2.5 rounded-xl border border-gray-800">
              <span className="text-[#FFB519] font-black">{idx + 1}.</span>
              <span className="font-medium">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
