import React from 'react';
import { CrewRole, LanguageMode } from '../types';
import { UserCheck, Shield, Anchor, Compass } from 'lucide-react';

interface RoleFilterProps {
  activeRole: CrewRole;
  languageMode: LanguageMode;
}

export const RoleFilter: React.FC<RoleFilterProps> = ({ activeRole, languageMode }) => {
  const getRoleInfo = () => {
    switch (activeRole) {
      case 'RECEPTION':
        return {
          titleEn: 'RECEPTION FOCUS',
          titleEs: 'ENFOQUE RECEPCIÓN',
          descEn: 'Guest onboarding, initial safety briefing, dietary check, review request timing, and booking partner communication.',
          descEs: 'Embarque de huéspedes, charla inicial de seguridad, verificación de dietas, solicitud de reseñas y comunicación con socios.',
          icon: UserCheck,
        };
      case 'CAPTAIN':
        return {
          titleEn: 'CAPTAIN FOCUS',
          titleEs: 'ENFOQUE CAPITÁN',
          descEn: 'Boat pre-checks, weather monitoring, open-ocean navigation, fuel management, marine park compliance, and guest safety.',
          descEs: 'Inspección de barco, monitoreo de clima, navegación en mar abierto, gestión de combustible y cumplimiento de normas marinas.',
          icon: Shield,
        };
      case 'MATE':
        return {
          titleEn: 'MATE FOCUS',
          titleEs: 'ENFOQUE MARINERO',
          descEn: 'Cooler & fruit preparation, warm snack foil setup, snorkeling assistance, post-tour gear washing, and guest hospitality.',
          descEs: 'Preparación de hielera y fruta, bocadillos calientes en aluminio, asistencia de snorkel, lavado post-tour y hospitalidad.',
          icon: Anchor,
        };
      default:
        return {
          titleEn: 'ALL CREW ROLES',
          titleEs: 'TODOS LOS ROLES DE LA TRIPULACIÓN',
          descEn: 'Showing complete operational manual, area guides, wildlife hall of fame, and first aid protocols for all team members.',
          descEs: 'Mostrando manual operativo completo, guías de área, galería de fauna y protocolos de primeros auxilios para el equipo.',
          icon: Compass,
        };
    }
  };

  const info = getRoleInfo();
  const Icon = info.icon;

  return (
    <div className="bg-[#1A1A1A] border-l-4 border-[#FFB519] rounded-xl p-3.5 shadow-sm text-white mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#FFB519] text-[#1A1A1A] rounded-lg font-black">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519]">
              {languageMode === 'ES' ? info.titleEs : info.titleEn}
            </span>
            <span className="text-[9px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded font-mono">
              Role: {activeRole}
            </span>
          </div>
          <p className="text-xs text-gray-300 font-medium mt-0.5">
            {languageMode === 'ES' ? info.descEs : info.descEn}
          </p>
        </div>
      </div>
    </div>
  );
};
