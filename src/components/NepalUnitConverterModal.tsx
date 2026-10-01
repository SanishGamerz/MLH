import React, { useState } from 'react';
import { X, RefreshCw, Calculator, ArrowRight, Check } from 'lucide-react';

interface NepalUnitConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NepalUnitConverterModal: React.FC<NepalUnitConverterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mode: 'aanaToSqft' | 'sqftToAana' | 'bigha' | 'pricePerAana'
  const [activeTab, setActiveTab] = useState<'aana' | 'bigha' | 'price'>('aana');

  // Input states for Ropani-Aana-Paisa-Daam
  const [ropani, setRopani] = useState<number>(1);
  const [aana, setAana] = useState<number>(2);
  const [paisa, setPaisa] = useState<number>(0);
  const [daam, setDaam] = useState<number>(0);

  // Input states for Bigha-Katha-Dhur
  const [bigha, setBigha] = useState<number>(0);
  const [katha, setKatha] = useState<number>(10);
  const [dhur, setDhur] = useState<number>(0);

  // Price calculation
  const [pricePerAanaLakhs, setPricePerAanaLakhs] = useState<number>(65); // 65 Lakhs per aana

  // Conversions:
  // 1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5476 sq.ft
  // 1 Aana = 342.25 sq.ft
  // 1 Paisa = 85.56 sq.ft
  // 1 Daam = 21.39 sq.ft
  const totalAanaFromRopani = ropani * 16 + aana + paisa / 4 + daam / 16;
  const totalSqftFromRopani = totalAanaFromRopani * 342.25;
  const totalSqmFromRopani = totalSqftFromRopani * 0.092903;

  // Bigha: 1 Bigha = 20 Katha = 400 Dhur = 72900 sq.ft; 1 Katha = 3645 sq.ft; 1 Dhur = 182.25 sq.ft
  const totalDhur = bigha * 400 + katha * 20 + dhur;
  const totalSqftFromBigha = totalDhur * 182.25;

  // Total valuation
  const totalValuationNPR = totalAanaFromRopani * (pricePerAanaLakhs * 100000);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold font-display">
              Nepal Land Measurement & Price Calculator
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('aana')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'aana'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ropani - Aana (Hilly / Valley)
          </button>
          <button
            onClick={() => setActiveTab('bigha')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'bigha'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Bigha - Katha (Terai)
          </button>
          <button
            onClick={() => setActiveTab('price')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'price'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Price per Aana Valuation
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {activeTab === 'aana' && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Ropani</label>
                  <input
                    type="number"
                    min={0}
                    value={ropani}
                    onChange={(e) => setRopani(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Aana (0-15)</label>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={aana}
                    onChange={(e) => setAana(Math.max(0, Math.min(15, Number(e.target.value))))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Paisa (0-3)</label>
                  <input
                    type="number"
                    min={0}
                    max={3}
                    value={paisa}
                    onChange={(e) => setPaisa(Math.max(0, Math.min(3, Number(e.target.value))))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Daam (0-3)</label>
                  <input
                    type="number"
                    min={0}
                    max={3}
                    value={daam}
                    onChange={(e) => setDaam(Math.max(0, Math.min(3, Number(e.target.value))))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Conversion Result Output */}
              <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3">
                <div className="text-xs text-amber-400 font-semibold">Standard Unit Equivalent:</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Total Aana</span>
                    <span className="text-base font-bold text-white tabular-nums">
                      {totalAanaFromRopani.toFixed(2)} Aana
                    </span>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Square Feet</span>
                    <span className="text-base font-bold text-amber-300 tabular-nums">
                      {Math.round(totalSqftFromRopani).toLocaleString()} sq.ft
                    </span>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Square Meters</span>
                    <span className="text-base font-bold text-emerald-400 tabular-nums">
                      {totalSqmFromRopani.toFixed(1)} m²
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bigha' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Bigha</label>
                  <input
                    type="number"
                    min={0}
                    value={bigha}
                    onChange={(e) => setBigha(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Katha (0-19)</label>
                  <input
                    type="number"
                    min={0}
                    max={19}
                    value={katha}
                    onChange={(e) => setKatha(Math.max(0, Math.min(19, Number(e.target.value))))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Dhur (0-19)</label>
                  <input
                    type="number"
                    min={0}
                    max={19}
                    value={dhur}
                    onChange={(e) => setDhur(Math.max(0, Math.min(19, Number(e.target.value))))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3">
                <div className="text-xs text-amber-400 font-semibold">Standard Unit Equivalent:</div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Total Dhur</span>
                    <span className="text-base font-bold text-white tabular-nums">{totalDhur} Dhur</span>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Square Feet</span>
                    <span className="text-base font-bold text-amber-300 tabular-nums">
                      {Math.round(totalSqftFromBigha).toLocaleString()} sq.ft
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'price' && (
            <div className="space-y-4">
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Rate per Aana (in Lakhs NPR)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={20}
                      max={120}
                      step={5}
                      value={pricePerAanaLakhs}
                      onChange={(e) => setPricePerAanaLakhs(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="font-bold text-slate-900 text-sm w-20 text-right tabular-nums">
                      रू {pricePerAanaLakhs} Lakh
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-2">
                  <span className="text-xs text-slate-400 block">
                    Calculated Plot Value for {ropani}-{aana}-{paisa}-{daam} ({totalAanaFromRopani.toFixed(2)} Aana):
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-amber-400 tabular-nums">
                    रू {(totalValuationNPR / 10000000).toFixed(2)} Crore
                  </div>
                  <div className="text-xs text-slate-400 tabular-nums">
                    = NPR {totalValuationNPR.toLocaleString()} (approx ${(totalValuationNPR / 134).toLocaleString()} USD)
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-3">
            Reference: 1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 sq.ft. Nepal Land Revenue Act Standard.
          </div>

        </div>

      </div>
    </div>
  );
};
