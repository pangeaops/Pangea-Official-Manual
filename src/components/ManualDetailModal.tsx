import React from 'react';
import { ManualSection, LanguageMode } from '../types';
import { X, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface ManualDetailModalProps {
  section: ManualSection | null;
  onClose: () => void;
  languageMode: LanguageMode;
}

export const ManualDetailModal: React.FC<ManualDetailModalProps> = ({
  section,
  onClose,
  languageMode,
}) => {
  if (!section) return null;

  const title = languageMode === 'ES' ? section.titleEs : section.titleEn;
  const summary = languageMode === 'ES' ? section.summaryEs : section.summaryEn;
  const content = languageMode === 'ES' ? section.contentEs : section.contentEn;
  const keyTakeaways = languageMode === 'ES' ? section.keyTakeawaysEs : section.keyTakeawaysEn;
  const warningNote = languageMode === 'ES' ? section.warningNoteEs : section.warningNoteEn;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto text-[#1A1A1A] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-[#FFB519] text-[#1A1A1A]">
            {section.category}
          </span>
          <span className="text-xs text-gray-400 font-bold">Roles: {section.targetRoles.join(', ')}</span>
        </div>

        <h2 className="text-xl font-black text-[#1A1A1A] mb-2">{title}</h2>
        <p className="text-xs text-gray-600 italic mb-6 pb-4 border-b border-gray-200 font-medium">{summary}</p>

        {/* Content Paragraphs */}
        <div className="space-y-3 text-xs text-gray-800 leading-relaxed font-medium mb-6">
          {content.map((p, idx) => (
            <div key={idx} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              {p}
            </div>
          ))}
        </div>

        {/* Key takeaways */}
        {keyTakeaways && keyTakeaways.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl mb-4 text-xs">
            <h4 className="font-black text-emerald-900 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {languageMode === 'ES' ? 'Conclusiones Operativas Clave' : 'Key Operational Takeaways'}
            </h4>
            <ul className="space-y-1 text-emerald-950 font-semibold">
              {keyTakeaways.map((t, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warning Note */}
        {warningNote && (
          <div className="bg-red-50 border border-red-300 p-4 rounded-xl text-xs text-red-950 flex items-start gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-black block text-red-800 uppercase text-[10px]">
                {languageMode === 'ES' ? 'Violación Operativa Estricta:' : 'Strict Operational Violation:'}
              </strong>
              {warningNote}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
