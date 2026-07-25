import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { calculateCoolerProvisioning } from '../utils/coolerCalculator';
import { ShoppingBag, Users, Copy, Check, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface CoolerCalculatorProps {
  languageMode: LanguageMode;
}

export const CoolerCalculator: React.FC<CoolerCalculatorProps> = ({ languageMode }) => {
  const [pax, setPax] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const prov = calculateCoolerProvisioning(pax);

  const handleCopySummary = () => {
    const text = `
🛒 PANGEA BOCAS PROVISIONING SUMMARY (${pax} PAX)
-----------------------------------------------
• Coca Cola Cans: ${prov.cocaColaCans}
• Fresca Cans: ${prov.frescaCans}
• Ginger Ale Cans: ${prov.gingerAleCans}
• Water Bottles: ${prov.waterBottles}
• Sparkling Water: ${prov.sparklingWaterCans}
• Beer (Panama/Balboa): ${prov.beerCans}
-----------------------------------------------
🍉 Fresh Tropical Fruit Platter:
• Pineapple: ${prov.fruitPortions.pineappleEn}
• Papaya: ${prov.fruitPortions.papayaEn}
• Watermelon: ${prov.fruitPortions.watermelonEn}
-----------------------------------------------
🥪 Warm Packed Snacks:
• Units: ${prov.warmSnackUnits} warm empanadas/patacones
• Foil Packaging: Cover with ${prov.foilSheets} thin sheets of foil ON TOP ONLY
• Ice Needed: ${prov.iceBagsKg} kg
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFB519] text-[#1A1A1A] rounded-2xl font-black shadow-sm">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB519] block">
              {languageMode === 'ES' ? 'PROVISIONAMIENTO Y LOGÍSTICA' : 'PROVISIONING LOGISTICS'}
            </span>
            <h2 className="text-xl font-black text-[#1A1A1A]">
              {languageMode === 'ES' ? 'Calculadora de Hielera Pangea' : 'Pangea Cooler & Snack Calculator'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {languageMode === 'ES'
                ? 'Fórmula exacta por cada 2 pasajeros: sodas, aguas, cervezas, frutas y papel aluminio.'
                : 'Exact formula per 2 PAX: sodas, water, beers, tropical fruit, and warm snack foil packing.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopySummary}
          className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-[#FFB519] font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#FFB519]" />}
          <span>{copied ? (languageMode === 'ES' ? '¡Copiado!' : 'Copied!') : (languageMode === 'ES' ? 'Copiar Resumen' : 'Copy Packing List')}</span>
        </button>
      </div>

      {/* Input Passenger Counter */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-xl border border-gray-200 text-[#FFB519] shadow-sm">
            <Users className="w-6 h-6 text-[#1A1A1A]" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] block">
              {languageMode === 'ES' ? 'Número de Pasajeros (PAX):' : 'Number of Passengers (PAX):'}
            </label>
            <span className="text-xs text-gray-500">
              {languageMode === 'ES' ? 'Ajusta la cantidad para calcular la hielera' : 'Adjust slider or type PAX to instantly calculate'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <input
            type="range"
            min={2}
            max={30}
            step={2}
            value={pax}
            onChange={(e) => setPax(parseInt(e.target.value) || 2)}
            className="w-48 accent-[#FFB519] cursor-pointer"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={50}
              value={pax}
              onChange={(e) => setPax(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 bg-white border border-gray-300 rounded-xl px-3 py-2 text-center text-lg font-black text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FFB519]"
            />
            <span className="text-xs font-black text-gray-500">PAX</span>
          </div>
        </div>
      </div>

      {/* Calculated Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cold Drinks Breakdown */}
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-black uppercase text-[#1A1A1A] mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
            <span>🥤 {languageMode === 'ES' ? 'Bebidas Frías' : 'Cold Beverages'}</span>
            <span className="text-[10px] text-gray-400 font-mono">Formula / 2 PAX</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-gray-800">
            <li className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-200 font-bold">
              <span>Coca Cola Cans</span>
              <span className="px-2.5 py-1 bg-[#FFB519] text-[#1A1A1A] rounded-lg text-sm">{prov.cocaColaCans}</span>
            </li>
            <li className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-200 font-bold">
              <span>Fresca Cans</span>
              <span className="px-2.5 py-1 bg-[#FFB519] text-[#1A1A1A] rounded-lg text-sm">{prov.frescaCans}</span>
            </li>
            <li className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-200 font-bold">
              <span>Ginger Ale Cans</span>
              <span className="px-2.5 py-1 bg-[#FFB519] text-[#1A1A1A] rounded-lg text-sm">{prov.gingerAleCans}</span>
            </li>
            <li className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-200 font-bold">
              <span>Water Bottles (500ml)</span>
              <span className="px-2.5 py-1 bg-[#FFB519] text-[#1A1A1A] rounded-lg text-sm">{prov.waterBottles}</span>
            </li>
            <li className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-200 font-bold">
              <span>Sparkling Water Cans</span>
              <span className="px-2.5 py-1 bg-[#FFB519] text-[#1A1A1A] rounded-lg text-sm">{prov.sparklingWaterCans}</span>
            </li>
            <li className="flex justify-between items-center bg-[#1A1A1A] text-white p-2.5 rounded-xl font-black">
              <span className="text-[#FFB519]">🍺 Beer Cans (Panama/Balboa)</span>
              <span className="px-2.5 py-1 bg-[#FFB519] text-[#1A1A1A] rounded-lg text-sm">{prov.beerCans}</span>
            </li>
          </ul>
        </div>

        {/* Fresh Tropical Fruit Platter */}
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-black uppercase text-[#1A1A1A] mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
            <span>🍍 {languageMode === 'ES' ? 'Fruta Fresca' : 'Fresh Fruit Platter'}</span>
            <span className="text-[10px] text-gray-400 font-mono">Chilled & Cut</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-gray-200 font-bold">
              <span className="text-gray-400 text-[10px] uppercase block">Pineapple / Piña:</span>
              <span className="text-amber-800 text-sm">
                {languageMode === 'ES' ? prov.fruitPortions.pineappleEs : prov.fruitPortions.pineappleEn}
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 font-bold">
              <span className="text-gray-400 text-[10px] uppercase block">Papaya:</span>
              <span className="text-amber-800 text-sm">
                {languageMode === 'ES' ? prov.fruitPortions.papayaEs : prov.fruitPortions.papayaEn}
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 font-bold">
              <span className="text-gray-400 text-[10px] uppercase block">Watermelon / Sandía:</span>
              <span className="text-amber-800 text-sm">
                {languageMode === 'ES' ? prov.fruitPortions.watermelonEs : prov.fruitPortions.watermelonEn}
              </span>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-semibold">
              ⚠️ Prep essentials: Sanitized cutting board, sharp knife, food prep gloves, serving tray, napkins.
            </div>
          </div>
        </div>

        {/* Warm Packed Snacks & Foil Protocol */}
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-[#1A1A1A] mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
              <span>🥪 {languageMode === 'ES' ? 'Bocadillos Calientes' : 'Warm Packed Snacks'}</span>
              <span className="text-[10px] text-gray-400 font-mono">Foil Protocol</span>
            </h3>

            <div className="space-y-3 text-xs mb-4">
              <div className="bg-white p-3 rounded-xl border border-gray-200 font-bold">
                <span className="text-gray-400 text-[10px] uppercase block">Empanadas / Patacones:</span>
                <span className="text-emerald-700 text-base font-black">{prov.warmSnackUnits} Units</span>
              </div>

              <div className="bg-amber-100 border border-amber-300 p-3 rounded-xl text-amber-950">
                <strong className="text-xs font-black block mb-1 uppercase flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  {languageMode === 'ES' ? 'REGLA ESTRICTA DE EMPAQUE EN ALUMINIO:' : 'STRICT FOIL PACKAGING RULE:'}
                </strong>
                <p className="text-xs leading-relaxed font-semibold">
                  {languageMode === 'ES'
                    ? 'Cubrir los bocadillos calientes ÚNICAMENTE por ARRIBA con papel aluminio DELGADO para mantenerlos calientes y crujientes sin sofocarlos.'
                    : 'Cover warm snacks with THIN FOIL ON TOP ONLY to retain warmth without trapping moisture.'}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 font-bold">
                <span className="text-gray-400 text-[10px] uppercase block">Thin Foil Sheets:</span>
                <span className="text-gray-800 text-sm">{prov.foilSheets} Sheets (top cover)</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 font-bold">
                <span className="text-gray-400 text-[10px] uppercase block">Ice Bags Needed:</span>
                <span className="text-gray-800 text-sm">{prov.iceBagsKg} kg Ice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
