import React from 'react';
import { EmergencyProtocol, LanguageMode } from '../types';
import { EMERGENCY_PROTOCOLS, PANGEA_BRAND } from '../data/manualData';
import {
  ShieldAlert,
  Zap,
  LifeBuoy,
  Bandage,
  Sun,
  Activity,
  Anchor,
  Radio,
  PhoneCall,
  HeartPulse,
} from 'lucide-react';

interface EmergencyCardsProps {
  languageMode: LanguageMode;
}

const renderProtocolIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap':
      return <Zap className="w-5 h-5" />;
    case 'LifeBuoy':
      return <LifeBuoy className="w-5 h-5" />;
    case 'Bandage':
      return <Bandage className="w-5 h-5" />;
    case 'Sun':
      return <Sun className="w-5 h-5" />;
    case 'Activity':
      return <Activity className="w-5 h-5" />;
    case 'Anchor':
      return <Anchor className="w-5 h-5" />;
    default:
      return <ShieldAlert className="w-5 h-5" />;
  }
};

export const EmergencyCards: React.FC<EmergencyCardsProps> = ({ languageMode }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-2xl font-black shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
              {languageMode === 'ES' ? 'RESPUESTA RÁPIDA DE EMERGENCIA' : 'EMERGENCY RAPID RESPONSE'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Tarjetas de Primeros Auxilios y Emergencias' : 'Emergency & First Aid Action Cards'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Protocolos marinos detallados para picaduras, persona al agua, cortes de coral, deshidratación y fallas de motor'
                : 'Detailed maritime protocols for stings, person overboard, coral cuts, heat stroke, seasickness & motor failures.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-4 py-2 bg-[#1A1A1A] text-[#FFB519] rounded-xl text-xs font-black flex items-center gap-2 shadow-sm">
            <Radio className="w-4 h-4 text-[#FFB519] animate-pulse" />
            <span>VHF CH 16 / CH 68</span>
          </div>
        </div>
      </div>

      {/* Quick Emergency Contacts Bar */}
      <div className="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Hospital Isla Colón' : 'Hospital Isla Colón'}
            </span>
            <span className="font-mono font-black text-red-900">+507 757-9201 / 911</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-600 shrink-0" />
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Aeronaval / Guardacostas' : 'Coast Guard / SENAN'}
            </span>
            <span className="font-mono font-black text-red-900">VHF Ch 16 / 108</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-red-600 shrink-0" />
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Base Pangea Bocas' : 'Pangea Operations Base'}
            </span>
            <span className="font-mono font-black text-red-900">VHF Ch 68 / Phone</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Policía Nacional Bocas' : 'National Police Bocas'}
            </span>
            <span className="font-mono font-black text-red-900">104 / +507 757-9210</span>
          </div>
        </div>
      </div>

      {/* Emergency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EMERGENCY_PROTOCOLS.map((proto) => (
          <div
            key={proto.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                    {renderProtocolIcon(proto.icon)}
                  </div>
                  <h3 className="text-base font-black text-[#1A1A1A]">
                    {languageMode === 'ES' ? proto.titleEs : proto.titleEn}
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-red-600 text-white font-black text-[10px] uppercase rounded-lg shadow-sm">
                  {proto.severity}
                </span>
              </div>

              {/* Triggers */}
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">
                  {languageMode === 'ES' ? 'Desencadenantes / Síntomas:' : 'Triggers / Symptoms:'}
                </span>
                <ul className="space-y-1 text-xs text-gray-700 font-medium">
                  {(languageMode === 'ES' ? proto.triggersEs : proto.triggersEn).map((t, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-gray-200">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Actions */}
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-amber-800 block mb-1">
                  {languageMode === 'ES' ? 'Acciones Inmediatas (Capitán y Marinero):' : 'Immediate Actions (Captain & Mate):'}
                </span>
                <ul className="space-y-1 text-xs text-amber-900 font-medium">
                  {(languageMode === 'ES' ? proto.immediateActionEs : proto.immediateActionEn).map((a, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <span className="text-amber-600 font-black">{idx + 1}.</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* First Aid Steps */}
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-emerald-800 block mb-1">
                  {languageMode === 'ES' ? 'Pasos de Primeros Auxilios:' : 'First Aid Steps:'}
                </span>
                <ul className="space-y-1 text-xs text-emerald-950 font-medium">
                  {(languageMode === 'ES' ? proto.firstAidStepsEs : proto.firstAidStepsEn).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Radio Protocol */}
            {proto.radioProtocolEn && (
              <div className="pt-3 border-t border-gray-200 text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200 font-bold flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-600 shrink-0" />
                <span>{languageMode === 'ES' ? proto.radioProtocolEs : proto.radioProtocolEn}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
