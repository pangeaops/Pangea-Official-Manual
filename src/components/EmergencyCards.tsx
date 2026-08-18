import React, { useState } from 'react';
import { EmergencyProtocol, LanguageMode } from '../types';
import {
  EMERGENCY_PROTOCOLS,
  FIRST_AID_KIT_SPECIFICATIONS,
  BOCAS_RAY_SPECIES,
  PANGEA_BRAND,
} from '../data/manualData';
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
  Search,
  Fish,
  Waves,
  PackageCheck,
  AlertOctagon,
  Stethoscope,
  CheckCircle2,
  ThermometerSun,
  Flame,
  Info,
} from 'lucide-react';

interface EmergencyCardsProps {
  languageMode: LanguageMode;
}

type EmergencyTab = 'protocols' | 'first-aid-kit' | 'ray-guide';

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
    case 'HeartPulse':
      return <HeartPulse className="w-5 h-5" />;
    case 'Flame':
      return <Flame className="w-5 h-5" />;
    default:
      return <ShieldAlert className="w-5 h-5" />;
  }
};

export const EmergencyCards: React.FC<EmergencyCardsProps> = ({ languageMode }) => {
  const [activeSubTab, setActiveSubTab] = useState<EmergencyTab>('protocols');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredProtocols = EMERGENCY_PROTOCOLS.filter((proto) => {
    const matchesSeverity = selectedSeverity === 'ALL' || proto.severity === selectedSeverity;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      proto.titleEn.toLowerCase().includes(query) ||
      proto.titleEs.toLowerCase().includes(query) ||
      proto.triggersEn.some((t) => t.toLowerCase().includes(query)) ||
      proto.triggersEs.some((t) => t.toLowerCase().includes(query)) ||
      proto.firstAidStepsEn.some((s) => s.toLowerCase().includes(query)) ||
      proto.firstAidStepsEs.some((s) => s.toLowerCase().includes(query));

    return matchesSeverity && matchesSearch;
  });

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
              {languageMode === 'ES' ? 'RESPUESTA RÁPIDA DE EMERGENCIA Y BOTIQUÍN' : 'EMERGENCY RAPID RESPONSE & FIRST AID'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Tarjetas de Primeros Auxilios y Seguridad Marítima' : 'Emergency & First Aid Action System'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Protocolos marinos para Fragata Portuguesa, Mantarrayas, Fracturas, Anafilaxia (EpiPen), RCP, Cortes de Coral y Botiquín Oficial.'
                : 'Maritime action cards for Portuguese Man O’ War, Stingrays, Bone Fractures, Anaphylaxis (EpiPen), CPR, Coral Cuts & Kit Inventory.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-4 py-2 bg-[#1A1A1A] text-[#FFB519] rounded-xl text-xs font-black flex items-center gap-2 shadow-sm">
            <Radio className="w-4 h-4 text-[#FFB519] animate-pulse" />
            <span>VHF CH 16 (Emergency) / CH 68 (Base)</span>
          </div>
        </div>
      </div>

      {/* Quick Emergency Contacts Bar */}
      <div className="mb-6 p-4 bg-red-50/90 border border-red-200 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-100 rounded-lg text-red-700 shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Hospital Isla Colón' : 'Hospital Isla Colón'}
            </span>
            <span className="font-mono font-black text-red-900">+507 757-9201 / 911</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-100 rounded-lg text-red-700 shrink-0">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Guardacostas / SENAN' : 'Coast Guard / SENAN'}
            </span>
            <span className="font-mono font-black text-red-900">VHF Ch 16 / 108</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-100 rounded-lg text-red-700 shrink-0">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Base Pangea Bocas' : 'Pangea Operations Base'}
            </span>
            <span className="font-mono font-black text-red-900">VHF Ch 68 / Phone</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-100 rounded-lg text-red-700 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-500 text-[10px] uppercase block">
              {languageMode === 'ES' ? 'Policía Nacional Bocas' : 'National Police Bocas'}
            </span>
            <span className="font-mono font-black text-red-900">104 / +507 757-9210</span>
          </div>
        </div>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('protocols')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeSubTab === 'protocols'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              {languageMode === 'ES'
                ? `Protocolos de Acción (${EMERGENCY_PROTOCOLS.length})`
                : `Action Protocols (${EMERGENCY_PROTOCOLS.length})`}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('first-aid-kit')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeSubTab === 'first-aid-kit'
                ? 'bg-[#1A1A1A] text-[#FFB519] shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>
              {languageMode === 'ES'
                ? 'Inventario del Botiquín de Primeros Auxilios'
                : 'First Aid Kit Inventory & Specs'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('ray-guide')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeSubTab === 'ray-guide'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Fish className="w-4 h-4" />
            <span>
              {languageMode === 'ES'
                ? 'Guía de Rayas y Mantarrayas de Bocas'
                : 'Bocas Ray & Manta Species Guide'}
            </span>
          </button>
        </div>

        {/* Search for protocols */}
        {activeSubTab === 'protocols' && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  languageMode === 'ES'
                    ? 'Buscar protocolo (ej. fractura, fragata, raya)...'
                    : 'Search emergency (e.g. fracture, man o war, ray)...'
                }
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-hidden"
            >
              <option value="ALL">{languageMode === 'ES' ? 'Todas' : 'All Severities'}</option>
              <option value="CRITICAL">{languageMode === 'ES' ? 'Crítico (CRITICAL)' : 'Critical'}</option>
              <option value="HIGH">{languageMode === 'ES' ? 'Alto (HIGH)' : 'High'}</option>
              <option value="MODERATE">{languageMode === 'ES' ? 'Moderado' : 'Moderate'}</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: EMERGENCY ACTION PROTOCOLS */}
      {activeSubTab === 'protocols' && (
        <div>
          {/* Quick Notice for Heat-Labile Venom / Thermotherapy */}
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl flex items-start gap-3 text-xs text-amber-950">
            <ThermometerSun className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-black text-amber-900 block mb-0.5">
                {languageMode === 'ES'
                  ? 'Principio Médico Clave: Termoterapia para Picaduras de Fragata Portuguesa y Púa de Raya'
                  : 'Crucial Medical Rule: Hot Water Thermotherapy for Portuguese Man O’ War & Stingrays'}
              </strong>
              <p className="leading-relaxed">
                {languageMode === 'ES'
                  ? 'El veneno de la Fragata Portuguesa y de las Rayas está compuesto de proteínas termosensibles. La inmersión inmediata en agua caliente (42°C – 45°C / 107°F – 113°F) desnaturaliza las toxinas al instante y alivia el dolor agudo. NUNCA aplique agua dulce fría sobre tentáculos sin enjuagar primero con agua salada.'
                  : 'Stingray venom and Portuguese Man O’ War toxins are heat-labile proteins. Immediate hot water immersion (42°C – 45°C / 107°F – 113°F) deactivates the venom proteins rapidly and stops agonizing pain. NEVER apply cold fresh water to tentacles before seawater flush.'}
              </p>
            </div>
          </div>

          {/* Protocols Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProtocols.map((proto) => {
              const isCritical = proto.severity === 'CRITICAL';
              const isHigh = proto.severity === 'HIGH';

              return (
                <div
                  key={proto.id}
                  className={`bg-gray-50 border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                    isCritical
                      ? 'border-red-300 ring-1 ring-red-100'
                      : isHigh
                      ? 'border-amber-300'
                      : 'border-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-lg ${
                            isCritical
                              ? 'bg-red-100 text-red-700'
                              : isHigh
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-sky-100 text-sky-700'
                          }`}
                        >
                          {renderProtocolIcon(proto.icon)}
                        </div>
                        <h3 className="text-base font-black text-[#1A1A1A] leading-tight">
                          {languageMode === 'ES' ? proto.titleEs : proto.titleEn}
                        </h3>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-white font-black text-[10px] uppercase rounded-lg shadow-sm shrink-0 ${
                          isCritical ? 'bg-red-600' : isHigh ? 'bg-amber-600' : 'bg-sky-600'
                        }`}
                      >
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
                          <li
                            key={idx}
                            className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-gray-200 leading-snug"
                          >
                            <span className="text-red-500 font-bold mt-0.5">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Immediate Actions */}
                    <div className="mb-4">
                      <span className="text-[10px] font-black uppercase text-amber-800 block mb-1">
                        {languageMode === 'ES'
                          ? 'Acciones Inmediatas (Capitán y Marinero):'
                          : 'Immediate Actions (Captain & Mate):'}
                      </span>
                      <ul className="space-y-1 text-xs text-amber-950 font-medium">
                        {(languageMode === 'ES' ? proto.immediateActionEs : proto.immediateActionEn).map(
                          (a, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-1.5 bg-amber-50/90 p-2 rounded-lg border border-amber-200 leading-snug"
                            >
                              <span className="text-amber-700 font-black">{idx + 1}.</span>
                              <span>{a}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* First Aid Steps */}
                    <div className="mb-4">
                      <span className="text-[10px] font-black uppercase text-emerald-800 block mb-1">
                        {languageMode === 'ES' ? 'Pasos de Primeros Auxilios:' : 'First Aid Steps:'}
                      </span>
                      <ul className="space-y-1 text-xs text-emerald-950 font-medium">
                        {(languageMode === 'ES' ? proto.firstAidStepsEs : proto.firstAidStepsEn).map(
                          (s, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-1.5 bg-emerald-50/90 p-2 rounded-lg border border-emerald-200 leading-snug"
                            >
                              <span className="text-emerald-600 font-bold mt-0.5">•</span>
                              <span>{s}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Radio Protocol */}
                  {proto.radioProtocolEn && (
                    <div className="pt-3 border-t border-gray-200 text-xs text-red-800 bg-red-50/90 p-3 rounded-xl border border-red-200 font-bold flex items-start gap-2 leading-relaxed">
                      <Radio className="w-4 h-4 text-red-600 shrink-0 mt-0.5 animate-pulse" />
                      <span>{languageMode === 'ES' ? proto.radioProtocolEs : proto.radioProtocolEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: FIRST AID KIT INVENTORY & SPECIFICATIONS */}
      {activeSubTab === 'first-aid-kit' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-black">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-emerald-950">
                  {languageMode === 'ES'
                    ? 'Estándar Oficial del Botiquín de Primeros Auxilios Pangea Bocas'
                    : 'Pangea Bocas Official First Aid Kit Standard'}
                </h3>
                <p className="text-xs text-emerald-800">
                  {languageMode === 'ES'
                    ? 'Cada embarcación Pangea debe llevar este botiquín sellado en compartimento seco estanco con revisiones semanales.'
                    : 'Every Pangea vessel must carry this sealed waterproof kit in the dry cockpit compartment with weekly inspections.'}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-700 text-white text-[11px] font-black rounded-lg shrink-0">
              {languageMode === 'ES' ? '5 Módulos Médicos' : '5 Medical Modules'}
            </span>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FIRST_AID_KIT_SPECIFICATIONS.map((category) => (
              <div
                key={category.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-[#1A1A1A]">
                      {category.id === 'trauma-fractures' && <Activity className="w-4 h-4 text-red-600" />}
                      {category.id === 'marine-envenomation' && <Zap className="w-4 h-4 text-amber-600" />}
                      {category.id === 'wounds-bleeding' && <Bandage className="w-4 h-4 text-emerald-600" />}
                      {category.id === 'resuscitation-airway' && <LifeBuoy className="w-4 h-4 text-sky-600" />}
                      {category.id === 'medications-hydration' && <HeartPulse className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1A1A1A]">
                        {languageMode === 'ES' ? category.titleEs : category.titleEn}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-500">
                        {category.items.length} {languageMode === 'ES' ? 'artículos requeridos' : 'required items'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-xs hover:border-gray-300 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-xs font-black text-[#1A1A1A] leading-tight">
                            {languageMode === 'ES' ? item.nameEs : item.nameEn}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-mono font-bold text-[10px] shrink-0 border border-gray-200">
                            {item.recommendedQty}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-snug">
                          {languageMode === 'ES' ? item.purposeEs : item.purposeEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOCAS DEL TORO RAY & MANTA GUIDE */}
      {activeSubTab === 'ray-guide' && (
        <div className="space-y-6">
          {/* Stingray Shuffle Banner */}
          <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-black shrink-0 shadow-xs">
                <Waves className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-amber-950">
                  {languageMode === 'ES'
                    ? '¡La Regla de Oro: "El Paso de la Raya de Bocas" (The Stingray Shuffle)!'
                    : 'Golden Rule: "The Bocas Stingray Shuffle"!'}
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {languageMode === 'ES'
                    ? 'Al caminar en aguas someras con arena o pastos marinos (como Playa Estrella o Cayo Zapatilla), NUNCA levante los pies. Arrastre los pies por la arena. Las vibraciones hacen que las rayas naden lejos pacíficamente antes de que pueda pisarlas.'
                    : 'When wading in shallow sand or seagrass beds (such as Starfish Beach or Zapatilla), NEVER take high steps. Drag your feet along the sand bed. Vibrations cause camouflaged stingrays to glide away peacefully before you can step on them.'}
                </p>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-amber-200 text-amber-900 rounded-xl font-black text-xs shrink-0 border border-amber-300">
              {languageMode === 'ES' ? 'Prevención 100% Efectiva' : '100% Effective Prevention'}
            </div>
          </div>

          {/* Ray Species Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BOCAS_RAY_SPECIES.map((ray) => {
              const isHarmless = !ray.hasVenomousBarb;

              return (
                <div
                  key={ray.id}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-gray-200 pb-3 mb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                          {ray.type.replace('_', ' ')}
                        </span>
                        <h4 className="text-lg font-black text-[#1A1A1A]">
                          {languageMode === 'ES' ? ray.commonNameEs : ray.commonNameEn}
                        </h4>
                        <span className="text-[11px] italic text-gray-500 font-serif">
                          {ray.scientificName}
                        </span>
                      </div>

                      <span
                        className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg shrink-0 ${
                          isHarmless
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-red-100 text-red-900 border border-red-300'
                        }`}
                      >
                        {isHarmless
                          ? languageMode === 'ES'
                            ? 'Inofensiva (Sin Veneno)'
                            : 'Harmless (No Barb)'
                          : languageMode === 'ES'
                          ? 'Púa Venenosa'
                          : 'Venomous Barb'}
                      </span>
                    </div>

                    {/* Habitat */}
                    <div className="mb-3">
                      <span className="text-[10px] font-black uppercase text-gray-400 block mb-0.5">
                        {languageMode === 'ES' ? 'Hábitat en Bocas del Toro:' : 'Bocas Habitat:'}
                      </span>
                      <p className="text-xs text-gray-800 font-medium">
                        {languageMode === 'ES' ? ray.habitatEs : ray.habitatEn}
                      </p>
                    </div>

                    {/* Barb Details */}
                    <div className="mb-3 bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-[10px] font-black uppercase text-red-700 block mb-0.5">
                        {languageMode === 'ES' ? 'Anatomía de la Espina / Púa:' : 'Barb / Stinger Anatomy:'}
                      </span>
                      <p className="text-xs text-gray-700">
                        {languageMode === 'ES' ? ray.barbLocationEs : ray.barbLocationEn}
                      </p>
                    </div>

                    {/* Behavior */}
                    <div className="mb-3">
                      <span className="text-[10px] font-black uppercase text-gray-400 block mb-0.5">
                        {languageMode === 'ES' ? 'Comportamiento en el Agua:' : 'Behavior in Water:'}
                      </span>
                      <p className="text-xs text-gray-800">
                        {languageMode === 'ES' ? ray.behaviorEs : ray.behaviorEn}
                      </p>
                    </div>
                  </div>

                  {/* First Aid Note */}
                  <div className="mt-3 p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium leading-snug flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-black text-amber-900">
                        {languageMode === 'ES' ? 'Protocolo de Seguridad: ' : 'Safety Protocol: '}
                      </strong>
                      <span>{languageMode === 'ES' ? ray.firstAidNoteEs : ray.firstAidNoteEn}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

