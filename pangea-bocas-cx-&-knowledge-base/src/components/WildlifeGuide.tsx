import React from 'react';
import { WildlifeHallOfFameItem, LanguageMode } from '../types';
import { WILDLIFE_HALL_OF_FAME } from '../data/manualData';
import { Sparkles, MapPin, ShieldAlert, Heart, Leaf, AlertTriangle } from 'lucide-react';

interface WildlifeGuideProps {
  languageMode: LanguageMode;
}

export const WildlifeGuide: React.FC<WildlifeGuideProps> = ({ languageMode }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'BIODIVERSIDAD Y CONSERVACIÓN' : 'BIODIVERSITY & CONSERVATION'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">
              {languageMode === 'ES' ? 'Salón de la Fama de Fauna y Flora de Bocas' : 'Bocas Wildlife Hall of Fame'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Especies icónicas: Perezosos Pigmeos, Delfines, Ranas Rojas, Tortugas, Aves y Árboles Ancestrales.'
                : 'Pygmy Sloths, Bottlenose Dolphins, Red Frogs, Leatherback Turtles, Toucans & Ancient Rainforest Trees.'}
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-black flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            {languageMode === 'ES'
              ? 'Regla de Oro: ¡NUNCA tocar ni alimentar la fauna silvestre!'
              : 'Golden Rule: NEVER touch or feed wildlife!'}
          </span>
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WILDLIFE_HALL_OF_FAME.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo Thumbnail or Header Badges */}
              {item.image && item.image.trim() !== '' ? (
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.commonNameEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A] text-[#FFB519] text-[10px] font-black uppercase rounded-lg shadow">
                    {item.family}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-amber-500 text-black font-black text-[10px] uppercase rounded-lg shadow">
                    {languageMode === 'ES' ? item.conservationStatusEs : item.conservationStatusEn}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-200">
                  <span className="px-2.5 py-1 bg-[#1A1A1A] text-[#FFB519] text-[10px] font-black uppercase rounded-lg shadow-sm">
                    {item.family}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-black text-[10px] uppercase rounded-lg shadow-sm">
                    {languageMode === 'ES' ? item.conservationStatusEs : item.conservationStatusEn}
                  </span>
                </div>
              )}

              {/* Title & Scientific Name */}
              <h3 className="text-lg font-black text-[#1A1A1A]">
                {languageMode === 'ES' ? item.commonNameEs : item.commonNameEn}
              </h3>
              <p className="text-xs font-mono text-gray-500 italic mb-3">({item.scientificName})</p>

              {/* Location Tag */}
              <p className="text-xs font-bold text-amber-800 flex items-center gap-1 mb-3 bg-amber-50 p-2 rounded-lg border border-amber-200">
                <MapPin className="w-3.5 h-3.5 text-[#FFB519]" />
                <span>
                  {languageMode === 'ES' ? item.locationInBocasEs : item.locationInBocasEn}
                </span>
              </p>

              {/* Basic Quick Specs */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">
                    {languageMode === 'ES' ? 'Dieta:' : 'Diet:'}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {languageMode === 'ES' ? item.dietEs : item.dietEn}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">
                    {languageMode === 'ES' ? 'Esperanza de Vida:' : 'Lifespan:'}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {languageMode === 'ES' ? item.lifespanEs : item.lifespanEn}
                  </span>
                </div>
              </div>

              {/* Basic Facts Bullet List */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                <span className="text-[10px] font-black uppercase text-[#1A1A1A] tracking-wider block mb-2 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  {languageMode === 'ES' ? 'Datos Básicos para Tripulación y Huéspedes:' : 'Key Facts to Share:'}
                </span>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {(languageMode === 'ES' ? item.basicFactsEs : item.basicFactsEn).map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#FFB519] font-black">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
