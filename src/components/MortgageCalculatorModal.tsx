import React, { useState } from 'react';
import { Currency } from '../types';
import { calculateEMI } from '../utils/formatters';
import { X, Calculator, ShieldAlert, CheckCircle2, DollarSign } from 'lucide-react';

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  isOpen,
  onClose,
  currency,
  onToggleCurrency
}) => {
  if (!isOpen) return null;

  // Defaults
  const [propertyPrice, setPropertyPrice] = useState<number>(
    currency === 'NPR' ? 65000000 : 485000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(10.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);

  const calc = calculateEMI(propertyPrice, downPaymentPercent, interestRate, loanTermYears);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold font-display">
              Real Estate Mortgage & EMI Calculator
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Calculate amortized payments compliant with Nepal Rastra Bank standard banking terms.
            </div>
            <button
              onClick={onToggleCurrency}
              className="text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 transition-colors"
            >
              Switch to {currency === 'NPR' ? 'USD ($)' : 'NPR (रू)'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Input 1: Property Value */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property Valuation ({currency})
              </label>
              <input
                type="number"
                step={currency === 'NPR' ? 1000000 : 10000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Math.max(10000, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {currency === 'NPR' ? `रू ${(propertyPrice / 10000000).toFixed(2)} Crore` : `$${propertyPrice.toLocaleString()}`}
              </span>
            </div>

            {/* Input 2: Down payment percent */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Down Payment Equity ({downPaymentPercent}%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={20}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <span className="font-bold text-xs text-slate-800 w-12 text-right">
                  {downPaymentPercent}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Amount: {currency === 'NPR' ? `रू ${(calc.downPaymentAmount / 10000000).toFixed(2)} Cr` : `$${calc.downPaymentAmount.toLocaleString()}`}
              </span>
            </div>

            {/* Input 3: Interest Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Interest Rate ({interestRate}% p.a.)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={8}
                  max={14}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <span className="font-bold text-xs text-slate-800 w-14 text-right">
                  {interestRate}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Commercial Bank Base Rate + Spread
              </span>
            </div>

            {/* Input 4: Loan Tenure */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loan Tenure ({loanTermYears} Years)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={5}
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <span className="font-bold text-xs text-slate-800 w-12 text-right">
                  {loanTermYears} Yrs
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {loanTermYears * 12} Total Monthly Payments
              </span>
            </div>

          </div>

          {/* Result Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-medium">Estimated Monthly Installment (EMI)</span>
                <div className="text-3xl font-extrabold font-display text-white mt-0.5 tabular-nums">
                  {currency === 'NPR' ? `रू ${calc.monthlyEMI.toLocaleString('en-IN')}` : `$${calc.monthlyEMI.toLocaleString()}`}
                  <span className="text-sm font-normal text-slate-400 ml-1">/month</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Total Borrowed Loan</span>
                <div className="text-lg font-bold text-amber-400 tabular-nums">
                  {currency === 'NPR' ? `रू ${(calc.loanAmount / 10000000).toFixed(2)} Cr` : `$${calc.loanAmount.toLocaleString()}`}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">Total Interest Over Term</span>
                <span className="font-bold text-white tabular-nums">
                  {currency === 'NPR' ? `रू ${(calc.totalInterest / 10000000).toFixed(2)} Cr` : `$${calc.totalInterest.toLocaleString()}`}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Total Repayment (P + I)</span>
                <span className="font-bold text-white tabular-nums">
                  {currency === 'NPR' ? `रू ${(calc.totalPayment / 10000000).toFixed(2)} Cr` : `$${calc.totalPayment.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Bank Comparisons */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-slate-900">Current Nepal Banking Home Loan Benchmarks</h4>
            <div className="grid grid-cols-3 gap-2 text-slate-600">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">Nabil Bank</span>
                <span>From 9.75% p.a.</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">Global IME</span>
                <span>From 10.25% p.a.</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">NIC Asia</span>
                <span>From 10.50% p.a.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
