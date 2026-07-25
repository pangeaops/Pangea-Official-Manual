import React from 'react';
import { LanguageMode } from '../types';
import {
  HISTORY_EPOCHS,
  NGABE_COMMUNITIES,
  CONSERVATION_AREAS,
  CORAL_REEF_KNOWLEDGE,
} from '../data/manualData';
import { Compass, ShieldCheck, Waves, Users, CheckCircle2, HeartHandshake, Volume2 } from 'lucide-react';

interface HistoryBonusProps {
  languageMode: LanguageMode;
}

export const HistoryBonus: React.FC<HistoryBonusProps> = ({ languageMode }) => {
  return (
    <div className="space-y-8 text-[#1A1A1A]">
      {/* 1. History of Bocas Timeline by Epochs */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'CRONOLOGÍA HISTÓRICA' : 'HISTORICAL TIMELINE'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Historia de Bocas del Toro por Épocas' : 'History of Bocas del Toro by Epochs'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Desde los guardianes ancestrales Ngäbe hasta la era del auge bananero y el ecoturismo marino.'
                : 'From ancient Ngäbe guardians through Columbus, pirate careening, banana boom, and eco-tourism.'}
            </p>
          </div>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-amber-300">
          {HISTORY_EPOCHS.map((epoch) => (
            <div key={epoch.id} className="relative pl-8">
              <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#FFB519] text-[#1A1A1A] font-black flex items-center justify-center text-xs border-2 border-white shadow">
                ★
              </div>
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
                {/* Image Banner for Epoch */}
                {epoch.image && (
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                    <img
                      src={epoch.image}
                      alt={epoch.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A] text-[#FFB519] text-[10px] font-black uppercase rounded">
                      {epoch.period}
                    </div>
                  </div>
                )}

                {!epoch.image && (
                  <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-[#FFB519] text-[10px] font-black uppercase rounded">
                    {epoch.period}
                  </span>
                )}

                <h3 className="text-base font-black text-[#1A1A1A] mt-2 mb-1">
                  {languageMode === 'ES' ? epoch.titleEs : epoch.titleEn}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed font-medium mb-3">
                  {languageMode === 'ES' ? epoch.descriptionEs : epoch.descriptionEn}
                </p>

                {/* Highlights */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 mb-3">
                  <strong className="text-[10px] font-black text-amber-800 uppercase block mb-1">
                    {languageMode === 'ES' ? 'Hitos Clave:' : 'Key Highlights:'}
                  </strong>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {(languageMode === 'ES' ? epoch.highlightsEs : epoch.highlightsEn).map((h, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Speech Script */}
                {epoch.guideSpeechScriptEn && (
                  <div className="bg-[#1A1A1A] text-white p-3.5 rounded-xl border border-amber-500/30 text-xs">
                    <div className="flex items-center gap-1.5 mb-1.5 text-[#FFB519]">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {languageMode === 'ES' ? 'DISCURSO DEL GUÍA PARA ESTA ÉPOCA' : 'GUIDE SPEECH SCRIPT FOR THIS EPOCH'}
                      </span>
                    </div>
                    <p className="text-gray-200 leading-relaxed italic font-medium">
                      "{languageMode === 'ES' ? epoch.guideSpeechScriptEs : epoch.guideSpeechScriptEn}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Conservation Areas of Bocas */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'ÁREAS PROTEGIDAS' : 'PROTECTED RESERVES'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Áreas de Conservación de Bocas' : 'Conservation Areas of Bocas del Toro'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONSERVATION_AREAS.map((area) => (
            <div key={area.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                {languageMode === 'ES' ? area.typeEs : area.typeEn}
              </span>
              <h3 className="text-sm font-black text-[#1A1A1A] mb-2">
                {languageMode === 'ES' ? area.nameEs : area.nameEn}
              </h3>
              <ul className="space-y-1 text-xs text-gray-700">
                {(languageMode === 'ES' ? area.keyProtectionsEs : area.keyProtectionsEn).map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#FFB519] font-black">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ngäbe Communities & Culture */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'PUEBLOS ORIGINARIOS' : 'INDIGENOUS HERITAGE'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Comunidades Indígenas Ngäbe-Buglé' : 'Ngäbe Indigenous Communities'}
            </h2>
          </div>
        </div>

        {NGABE_COMMUNITIES.map((c) => (
          <div key={c.id} className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm space-y-3 text-xs">
            <p className="text-gray-800 font-medium leading-relaxed">
              {languageMode === 'ES' ? c.cultureEs : c.cultureEn}
            </p>
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 font-medium">
              <strong className="block font-bold text-amber-800 mb-1">
                {languageMode === 'ES' ? 'Ecoturismo Sostenible con Pangea:' : 'Sustainable Eco-Tourism with Pangea:'}
              </strong>
              {languageMode === 'ES' ? c.sustainableTourismEs : c.sustainableTourismEn}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Coral Reef Knowledge */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'ECOLOGÍA MARINA' : 'MARINE ECOLOGY'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? CORAL_REEF_KNOWLEDGE.titleEs : CORAL_REEF_KNOWLEDGE.titleEn}
            </h2>
          </div>
        </div>

        <ul className="space-y-2 text-xs text-gray-800 font-medium">
          {(languageMode === 'ES' ? CORAL_REEF_KNOWLEDGE.factsEs : CORAL_REEF_KNOWLEDGE.factsEn).map((f, idx) => (
            <li key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-start gap-2">
              <span className="text-[#FFB519] font-black text-sm">🪸</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Responsible Wildlife Viewing Guidelines */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-800 mb-4">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#FFB519]">
              {languageMode === 'ES' ? 'Observación Responsable de Fauna' : 'Responsible Wildlife Viewing Guidelines'}
            </h3>
            <p className="text-xs text-gray-300">
              {languageMode === 'ES'
                ? 'Principios fundamentales de interacción ética con la naturaleza en Pangea Bocas.'
                : 'Fundamental principles for ethical wildlife encounters across all Pangea tours.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
            <strong className="text-[#FFB519] font-black block mb-1">🦥 Perezosos / Sloths:</strong>
            <span>Keep 5 meters distance. Never touch, pull branches, or make loud noises.</span>
          </div>
          <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
            <strong className="text-[#FFB519] font-black block mb-1">🐬 Delfines / Dolphins:</strong>
            <span>Do not encircle pod. Shift engine to neutral if dolphins approach the boat.</span>
          </div>
          <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
            <strong className="text-[#FFB519] font-black block mb-1">🐢 Tortugas / Sea Turtles:</strong>
            <span>Strictly NO flash photography. Maintain 10m distance and use red night lights.</span>
          </div>
          <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
            <strong className="text-[#FFB519] font-black block mb-1">⭐ Estrellas / Starfish:</strong>
            <span>Never touch or lift starfish out of water. They absorb oxygen underwater!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
