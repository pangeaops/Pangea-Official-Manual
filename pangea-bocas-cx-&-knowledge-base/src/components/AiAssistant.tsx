import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { MessageSquare, Send, Sparkles, User, Bot, Loader2, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

interface AiAssistantProps {
  languageMode: LanguageMode;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ languageMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text:
        languageMode === 'ES'
          ? '¡Hola! Soy el Asistente de IA Operativo y de Servicio al Cliente de Pangea Bocas. ¡Hazme cualquier pregunta sobre fórmulas de bebidas, normas de fauna, protocolo post-tour o emergencias!'
          : '¡Hola! I am the Pangea Bocas Operational & Customer Service AI Assistant. Ask me anything about drink formulas, post-tour boat cleanup, wildlife rules, emergency stings, or guest protocols!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const suggestedPromptsEn = [
    'How many beers and waters for 14 PAX?',
    'What is the post-tour boat washing protocol?',
    'A guest wants to pick up a starfish. What should I say?',
    'What is the history and distance to Escudo de Veraguas?',
    'What are the boat pre-check steps for bilge pumps?',
  ];

  const suggestedPromptsEs = [
    '¿Cuántas cervezas y aguas para 14 PAX?',
    '¿Cuál es el protocolo post-tour de lavado de embarcación?',
    'Un huésped quiere tocar una estrella de mar. ¿Qué digo?',
    '¿Cuál es la historia y distancia a Escudo de Veraguas?',
    '¿Cuáles son las revisiones pre-salida para las bombas de sentina?',
  ];

  const prompts = languageMode === 'ES' ? suggestedPromptsEs : suggestedPromptsEn;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'AI Assistant failed to respond');
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.text || 'I apologize, I could not generate a response.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `⚠️ Error: ${err.message || 'Server connection issue'}. Please try again.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A] flex flex-col h-[650px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">Pangea Bocas AI Assistant</h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Respuestas instantáneas para Recepción, Capitanes y Marineros impulsado por Gemini AI'
                : 'Instant answers for Reception, Captains & Mates powered by Gemini AI'}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: '1',
                sender: 'assistant',
                text:
                  languageMode === 'ES'
                    ? '¡Historial limpiado! ¿En qué puedo ayudarte sobre las operaciones de Pangea Bocas?'
                    : 'Chat history cleared. How can I help you with Pangea Bocas operations today?',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-xl text-xs flex items-center gap-1 font-bold border border-gray-200"
          title="Reset Chat"
        >
          <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
          <span className="hidden sm:inline">{languageMode === 'ES' ? 'Limpiar Chat' : 'Reset Chat'}</span>
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="py-3 shrink-0 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-gray-100">
        <span className="text-[10px] uppercase font-black text-gray-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FFB519]" /> Quick Ask:
        </span>
        {prompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 bg-gray-100 hover:bg-[#FFB519] text-[#1A1A1A] text-xs font-bold rounded-full border border-gray-200 whitespace-nowrap transition-all shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto my-4 pr-2 space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black shadow-sm ${
                  isUser
                    ? 'bg-[#FFB519] text-[#1A1A1A]'
                    : 'bg-[#1A1A1A] text-[#FFB519]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed font-medium shadow-sm ${
                  isUser
                    ? 'bg-amber-50 border border-amber-200 text-[#1A1A1A]'
                    : 'bg-gray-100 border border-gray-200 text-gray-900'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <span className="block text-[10px] text-gray-400 mt-2 text-right font-mono">{m.time}</span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-gray-600 text-xs py-2 bg-gray-50 p-3 rounded-xl w-fit border border-gray-200 font-bold">
            <Loader2 className="w-4 h-4 animate-spin text-[#FFB519]" />
            <span>Consulting Pangea Bocas Knowledge Base...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="pt-3 border-t border-gray-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={
              languageMode === 'ES'
                ? 'Haz una pregunta (ej. fórmula de hielera, protocolo post-tour, reglas de fauna)...'
                : 'Ask anything (e.g. cooler formula, post-tour cleanup, wildlife rules)...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB519] disabled:opacity-50 font-medium"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-[#FFB519] hover:bg-amber-400 text-[#1A1A1A] font-black text-xs rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{languageMode === 'ES' ? 'Enviar' : 'Send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
