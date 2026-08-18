import React from 'react';
import { PartnerOrganization, LanguageMode } from '../types';
import { PARTNER_ORGANIZATIONS } from '../data/manualData';
import { Building2, MapPin, History, CheckCircle2, Volume2, Users, Sparkles } from 'lucide-react';

interface PartnerGuideProps {
  languageMode: LanguageMode;
}

export const PartnerGuide: React.FC<PartnerGuideProps> = ({ languageMode }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'ECOTURISMO Y COMUNIDAD' : 'ECOTOURISM & COMMUNITY'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">
              {languageMode === 'ES' ? 'Conocimiento por Socios y Aliados' : 'Knowledge by Partner Organizations'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Fincas de cacao, reservas biológicas, cooperativas indígenas, tirolesas, historia de fundadores e impacto colaborativo.'
                : 'Organic cacao farms, nature reserves, indigenous cooperatives, zipline canopy tours, founder stories & impact.'}
            </p>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PARTNER_ORGANIZATIONS.map((partner) => (
          <div
            key={partner.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Banner */}
              {partner.image && (
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A] text-[#FFB519] text-[10px] font-black uppercase rounded-lg shadow-sm">
                    Pangea Partner
                  </div>
                </div>
              )}

              {!partner.image && (
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#1A1A1A] text-[#FFB519] text-[10px] font-black uppercase rounded-lg shadow-sm">
                    Pangea Partner
                  </span>
                </div>
              )}

              <h3 className="text-lg font-black text-[#1A1A1A] mb-1">{partner.name}</h3>

              <p className="text-xs font-bold text-amber-700 flex items-center gap-1 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#FFB519]" />
                {languageMode === 'ES' ? partner.locationEs : partner.locationEn}
              </p>

              {/* General Info */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 mb-3 text-xs text-gray-700 leading-relaxed font-medium">
                <strong className="text-[#1A1A1A] font-bold block mb-1">
                  {languageMode === 'ES' ? 'Información General:' : 'General Info:'}
                </strong>
                {languageMode === 'ES' ? partner.generalInfoEs : partner.generalInfoEn}
              </div>

              {/* Founder Story */}
              {partner.founderStoryEn && (
                <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 mb-3 text-xs text-gray-800 leading-relaxed font-medium">
                  <strong className="text-amber-900 font-black block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFB519]" />
                    {languageMode === 'ES' ? 'Historia del Fundador / Origen:' : 'Founder Story & Heritage:'}
                  </strong>
                  {languageMode === 'ES' ? partner.founderStoryEs : partner.founderStoryEn}
                </div>
              )}

              {/* Collaborative Impact */}
              {partner.collaborativeImpactEn && (
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 mb-3 text-xs text-emerald-900 leading-relaxed font-medium">
                  <strong className="text-emerald-950 font-black block mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    {languageMode === 'ES' ? 'Impacto Colaborativo con Pangea:' : 'Pangea Collaborative Impact:'}
                  </strong>
                  {languageMode === 'ES' ? partner.collaborativeImpactEs : partner.collaborativeImpactEn}
                </div>
              )}

              {/* Guide Speech Script */}
              {partner.guideSpeechScriptEn && (
                <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-amber-500/30 mb-4 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-2 text-[#FFB519]">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {languageMode === 'ES' ? 'DISCURSO DEL GUÍA EN EL LUGAR' : 'ON-SITE GUIDE SPEECH SCRIPT'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed italic font-medium">
                    "{languageMode === 'ES' ? partner.guideSpeechScriptEs : partner.guideSpeechScriptEn}"
                  </p>
                </div>
              )}

              {/* Activities */}
              <div>
                <strong className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider block mb-2">
                  {languageMode === 'ES' ? 'Actividades con Huéspedes:' : 'Guest Activities:'}
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {(languageMode === 'ES' ? partner.activitiesEs : partner.activitiesEn).map((act, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#FFB519]/20 text-[#1A1A1A] border border-amber-300 rounded-lg text-[11px] font-bold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-700" />
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
