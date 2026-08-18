import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { SEASONAL_CALENDAR_DATA, WILDLIFE_GUIDE_EXTERNAL_URL } from '../data/manualData';
import {
  Calendar,
  ExternalLink,
  Sun,
  CloudRain,
  Compass,
  Fish,
  Bird,
  Sprout,
  TreePine,
  Sparkles,
  CheckCircle2,
  Anchor,
} from 'lucide-react';

interface SeasonalCalendarProps {
  languageMode: LanguageMode;
}

export const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({ languageMode }) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>('all');

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fish':
        return <Fish className="w-4 h-4 text-[#D49300] shrink-0" />;
      case 'Bird':
        return <Bird className="w-4 h-4 text-[#D49300] shrink-0" />;
      case 'Sprout':
        return <Sprout className="w-4 h-4 text-[#D49300] shrink-0" />;
      case 'TreePine':
        return <TreePine className="w-4 h-4 text-[#D49300] shrink-0" />;
      case 'Turtle':
        return <Sparkles className="w-4 h-4 text-[#D49300] shrink-0" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#D49300] shrink-0" />;
    }
  };

  const getSeasonBadge = (seasonId: string) => {
    switch (seasonId) {
      case 'primary-dry-season':
        return {
          icon: <Sun className="w-4 h-4 text-amber-600" />,
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
        };
      case 'rainy-season':
        return {
          icon: <CloudRain className="w-4 h-4 text-emerald-700" />,
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        };
      case 'secondary-dry-season':
        return {
          icon: <Compass className="w-4 h-4 text-sky-700" />,
          bg: 'bg-sky-100 text-sky-900 border-sky-300',
        };
      default:
        return {
          icon: <Calendar className="w-4 h-4 text-gray-700" />,
          bg: 'bg-gray-100 text-gray-800 border-gray-300',
        };
    }
  };

  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block">
                {languageMode === 'ES' ? 'CALENDARIO DE TEMPORADAS' : 'BOCAS SEASONS CALENDAR'}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-bold rounded-md border border-emerald-300">
                {languageMode === 'ES' ? `Mes Actual: ${currentMonthName}` : `Current Month: ${currentMonthName}`}
              </span>
            </div>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES'
                ? 'Temporadas Marítimas, Clima y Ciclos de Vida'
                : 'Archipelago Seasons, Climate & Wildlife Cycles'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Guía estacional para visibilidad marina, anidación de tortugas, migración de aves y cosechas agrícolas.'
                : 'Seasonal guide for marine visibility, turtle nesting, whale & raptor migrations, and agricultural harvests.'}
            </p>
          </div>
        </div>

        {/* Link to external wildlife guide */}
        <div className="flex items-center gap-2">
          <a
            href={WILDLIFE_GUIDE_EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-[#FFB519] rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all hover:scale-105"
            title="Open official Wildlife Guide"
          >
            <ExternalLink className="w-4 h-4 text-[#FFB519]" />
            <span>{languageMode === 'ES' ? 'Visitar Wildlife Guide' : 'Open Wildlife Guide'}</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 my-6">
        <button
          onClick={() => setSelectedSeasonId('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
            selectedSeasonId === 'all'
              ? 'bg-[#1A1A1A] text-[#FFB519] shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {languageMode === 'ES' ? 'Todas las Temporadas' : 'All 3 Seasons'}
        </button>
        {SEASONAL_CALENDAR_DATA.map((season) => (
          <button
            key={season.id}
            onClick={() => setSelectedSeasonId(season.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              selectedSeasonId === season.id
                ? 'bg-[#FFB519] text-[#1A1A1A] shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getSeasonBadge(season.id).icon}
            <span>{languageMode === 'ES' ? season.periodEs : season.periodEn}</span>
          </button>
        ))}
      </div>

      {/* Season Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SEASONAL_CALENDAR_DATA.filter(
          (s) => selectedSeasonId === 'all' || s.id === selectedSeasonId
        ).map((season) => {
          const badge = getSeasonBadge(season.id);

          return (
            <div
              key={season.id}
              className="bg-[#FAFAFA] border border-gray-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  season.id === 'primary-dry-season'
                    ? 'bg-amber-400'
                    : season.id === 'rainy-season'
                    ? 'bg-emerald-500'
                    : 'bg-sky-500'
                }`}
              />

              <div>
                {/* Season Eyebrow Header */}
                <span className="text-[11px] font-black uppercase tracking-widest text-[#B37800] block mb-1">
                  {languageMode === 'ES' ? season.seasonTypeEs : season.seasonTypeEn}
                </span>

                {/* Big Season Period Title */}
                <h3 className="text-2xl font-black text-[#132A22] tracking-tight font-sans mb-3">
                  {languageMode === 'ES' ? season.periodEs : season.periodEn}
                </h3>

                {/* Subtitle Description */}
                <p className="text-xs text-gray-600 leading-relaxed font-medium mb-6">
                  {languageMode === 'ES' ? season.descriptionEs : season.descriptionEn}
                </p>

                {/* What to Expect Box */}
                <div className="bg-white border border-gray-200/80 rounded-xl p-4 mb-5 shadow-xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#B37800] block mb-3">
                    {languageMode === 'ES' ? 'QUÉ ESPERAR' : 'WHAT TO EXPECT'}
                  </span>
                  <ul className="space-y-2.5">
                    {(languageMode === 'ES' ? season.whatToExpectEs : season.whatToExpectEn).map(
                      (item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-800 font-medium">
                          <div className="mt-0.5">{renderIcon(item.icon)}</div>
                          <span className="leading-snug">{item.text}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Agriculture Highlight Box */}
              <div className="bg-[#FAF6ED] border-t-2 border-[#D49300] border-x border-b border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sprout className="w-4 h-4 text-[#B37800]" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]">
                    {languageMode === 'ES' ? 'DESTACADO AGRÍCOLA' : 'AGRICULTURE HIGHLIGHT'}
                  </span>
                </div>
                <div className="text-xs text-gray-800 font-medium leading-relaxed">
                  <strong className="font-black text-[#1A1A1A]">
                    {languageMode === 'ES'
                      ? season.agricultureHighlightEs.title
                      : season.agricultureHighlightEn.title}
                    :{' '}
                  </strong>
                  <span>
                    {languageMode === 'ES'
                      ? season.agricultureHighlightEs.description
                      : season.agricultureHighlightEn.description}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct link footer callout */}
      <div className="mt-8 p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Anchor className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <h4 className="text-xs font-black text-[#1A1A1A]">
              {languageMode === 'ES'
                ? 'Guía Oficial Completa de Vida Silvestre y Biodiversidad'
                : 'Comprehensive Bocas Wildlife & Marine Guide'}
            </h4>
            <p className="text-[11px] text-gray-600">
              {languageMode === 'ES'
                ? 'Consulte la versión interactiva con mapas de arrecifes y fichas biológicas en vivo.'
                : 'Explore live reef maps, seasonal charts, and biological field identification.'}
            </p>
          </div>
        </div>
        <a
          href={WILDLIFE_GUIDE_EXTERNAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-[#FFB519] rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <span>https://wildlifeguide.netlify.app</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
