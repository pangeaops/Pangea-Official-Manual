import React, { useState } from 'react';
import { QuizQuestion, LanguageMode } from '../types';
import { QUIZ_QUESTIONS, PANGEA_BRAND } from '../data/manualData';
import { Award, CheckCircle2, XCircle, RefreshCw, Trophy, Sparkles, ShieldCheck } from 'lucide-react';

interface StaffQuizProps {
  languageMode: LanguageMode;
}

export const StaffQuiz: React.FC<StaffQuizProps> = ({ languageMode }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const isPassed = percentage >= 80;

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'EVALUACIÓN DE PERSONAL' : 'STAFF ASSESSMENT'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Examen de Conocimiento Pangea Bocas' : 'Pangea Bocas Knowledge Quiz'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Pon a prueba tus conocimientos sobre fórmulas, áreas, protocolo post-tour y fauna.'
                : 'Test your mastery of customer service protocols, drink formulas & wildlife rules.'}
            </p>
          </div>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl border border-gray-300 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
            <span>{languageMode === 'ES' ? 'Reintentar Examen' : 'Retake Quiz'}</span>
          </button>
        )}
      </div>

      {/* Certificate / Results Modal Banner if submitted */}
      {submitted && (
        <div
          className={`my-6 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isPassed
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
              : 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-200 text-[#FFB519] shadow-sm">
              <Trophy className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest block text-amber-800">
                {languageMode === 'ES' ? 'Estado del Examen' : 'Quiz Completion Status'}
              </span>
              <h3 className="text-xl font-black text-[#1A1A1A]">
                {isPassed
                  ? (languageMode === 'ES' ? '¡Felicidades! Certificado Obtenido 🎉' : 'Congratulations! Certificate Earned 🎉')
                  : (languageMode === 'ES' ? 'Evaluación Completada' : 'Assessment Completed')}
              </h3>
              <p className="text-xs text-gray-700 font-medium mt-1">
                {languageMode === 'ES' ? 'Obtuviste' : 'You scored'}{' '}
                <strong className="text-amber-800 font-black text-sm">{score} / {QUIZ_QUESTIONS.length}</strong> ({percentage}%).
                {isPassed
                  ? (languageMode === 'ES' ? ' ¡Cumples con los estándares de excelencia de Pangea Bocas!' : ' You meet Pangea Bocas Service Excellence Standards!')
                  : (languageMode === 'ES' ? ' Revisa los errores abajo y reintenta para alcanzar 80%+.' : ' Review missed items below and retake the quiz to achieve 80%+.')}
              </p>
            </div>
          </div>

          {isPassed && (
            <div className="bg-[#1A1A1A] border border-amber-400 p-4 rounded-xl text-center shrink-0 shadow-md text-white">
              <ShieldCheck className="w-8 h-8 text-[#FFB519] mx-auto mb-1" />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB519] block">Pangea Bocas Certified</span>
              <span className="text-[9px] text-gray-400 font-mono">Issued {new Date().toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}

      {/* Question Cards */}
      <div className="my-6 space-y-6">
        {QUIZ_QUESTIONS.map((q, qIdx) => {
          const selectedOption = userAnswers[q.id];
          const isAnswered = selectedOption !== undefined;

          const questionText = languageMode === 'ES' ? q.questionEs : q.questionEn;
          const optionsList = languageMode === 'ES' ? q.optionsEs : q.optionsEn;
          const explanationText = languageMode === 'ES' ? q.explanationEs : q.explanationEn;

          return (
            <div key={q.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-black text-[#1A1A1A] bg-[#FFB519] px-2.5 py-0.5 rounded border border-amber-300">
                  Question {qIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider px-2 py-0.5 bg-white rounded border border-gray-200">
                  {q.relevantRole} Role
                </span>
              </div>

              <h3 className="text-sm font-black text-[#1A1A1A] mb-4">{questionText}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {optionsList.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let optStyle = 'bg-white border-gray-200 text-gray-800 hover:border-gray-300';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected && optIdx !== q.correctIndex) {
                      optStyle = 'bg-red-100 border-red-500 text-red-950';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-[#FFB519] border-[#FFB519] text-[#1A1A1A] font-black shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${optStyle}`}
                    >
                      <span className="font-mono text-[11px] shrink-0 font-black">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1 font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation on submitted */}
              {submitted && (
                <div className="mt-3 p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 font-medium">
                  <span className="font-black text-emerald-700 block mb-0.5">Explanation:</span>
                  <p>{explanationText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(userAnswers).length < QUIZ_QUESTIONS.length}
            className="px-6 py-3 bg-[#FFB519] hover:bg-amber-400 text-[#1A1A1A] font-black text-xs rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{languageMode === 'ES' ? 'Enviar Examen y Ver Resultado' : 'Submit Quiz & View Score'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
