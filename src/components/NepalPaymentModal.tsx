import React, { useState, useEffect } from 'react';
import { Property, NepalPaymentProvider, PaymentTransaction } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Smartphone,
  Building,
  Printer,
  Download,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  CreditCard
} from 'lucide-react';

interface NepalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  initialPurpose?: 'Tour Reservation Token' | 'Property Holding Advance' | 'Full Purchase Escrow Deposit' | 'Legal Due Diligence Check' | 'Agent Listing Fee';
  initialAmountNPR?: number;
  onPaymentSuccess?: (receipt: PaymentTransaction) => void;
}

export const NepalPaymentModal: React.FC<NepalPaymentModalProps> = ({
  isOpen,
  onClose,
  property,
  initialPurpose = 'Full Purchase Escrow Deposit',
  initialAmountNPR = 5000000,
  onPaymentSuccess
}) => {
  if (!isOpen) return null;

  const [selectedProvider, setSelectedProvider] = useState<NepalPaymentProvider>('connectips');
  const [purpose, setPurpose] = useState<string>(initialPurpose);
  const [amountNPR, setAmountNPR] = useState<number>(initialAmountNPR);
  const [clientName, setClientName] = useState<string>('Sanish Tiwari');
  const [clientPhone, setClientPhone] = useState<string>('9841234567');
  
  // Checkout flow state
  const [step, setStep] = useState<'init' | 'gateway' | 'success'>('init');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Gateway data from server
  const [transactionData, setTransactionData] = useState<PaymentTransaction | null>(null);
  const [gatewayPayload, setGatewayPayload] = useState<any>(null);

  // Simulation inputs
  const [simulationMobile, setSimulationMobile] = useState<string>('9841234567');
  const [simulationPin, setSimulationPin] = useState<string>('1234');
  const [bankAccount, setBankAccount] = useState<string>('Nabil Bank Ltd. - 01201017500123');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  useEffect(() => {
    if (initialAmountNPR) setAmountNPR(initialAmountNPR);
    if (initialPurpose) setPurpose(initialPurpose);
  }, [initialAmountNPR, initialPurpose]);

  const handleInitiate = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/payments/nepal/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: selectedProvider,
          purpose,
          amountNPR,
          propertyId: property?.id,
          propertyTitle: property?.title,
          clientName,
          clientPhone
        })
      });

      const data = await res.json();
      if (data.success) {
        setTransactionData(data.transaction);
        setGatewayPayload(data.gateway);
        setStep('gateway');
      } else {
        setErrorMessage(data.error || 'Failed to initiate payment');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerify = async () => {
    if (!transactionData) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/payments/nepal/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pidx: transactionData.pidx,
          verificationPin: simulationPin,
          clientMobile: simulationMobile,
          bankAccount: selectedProvider === 'connectips' ? bankAccount : undefined
        })
      });

      const data = await res.json();
      if (data.success) {
        setTransactionData(data.receipt);
        setStep('success');

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }

        if (onPaymentSuccess) {
          onPaymentSuccess(data.receipt);
        }
      } else {
        setErrorMessage(data.error || 'Verification failed');
      }
    } catch (err) {
      setErrorMessage('Verification failed due to network error.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyReceiptRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold font-display tracking-wide">
              Nepal Real Estate Escrow & Payment Gateway
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Initiation & Gateway Selection */}
          {step === 'init' && (
            <div className="space-y-5">
              
              {/* Context Summary */}
              {property && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="text-slate-400 block text-[11px]">Selected Property</span>
                    <strong className="text-slate-900 truncate block">{property.title}</strong>
                    <span className="text-slate-500">{property.location.area}, {property.location.city}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-slate-400 block text-[11px]">Property Value</span>
                    <span className="font-bold text-slate-900">रू {(property.priceNPR / 10000000).toFixed(2)} Cr</span>
                  </div>
                </div>
              )}

              {/* Purpose Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Purchase or Escrow Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  
                  {/* Option 1: Full Escrow Deposit */}
                  <button
                    type="button"
                    onClick={() => {
                      setPurpose('Full Purchase Escrow Deposit');
                      setAmountNPR(property?.escrowDepositNPR || Math.round((property?.priceNPR || 50000000) * 0.1));
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      purpose === 'Full Purchase Escrow Deposit'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-amber-950">Buy with 10% Escrow</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Formal purchase agreement lock</div>
                    <div className="text-amber-700 font-extrabold mt-1 tabular-nums">
                      रू {(property?.escrowDepositNPR || Math.round((property?.priceNPR || 50000000) * 0.1)).toLocaleString()}
                    </div>
                  </button>

                  {/* Option 2: Holding Token */}
                  <button
                    type="button"
                    onClick={() => {
                      setPurpose('Property Holding Advance');
                      setAmountNPR(property?.holdingTokenNPR || 50000);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      purpose === 'Property Holding Advance'
                        ? 'border-emerald-500 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-emerald-950">Holding Token</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">7-Day legal due diligence lock</div>
                    <div className="text-emerald-700 font-bold mt-1 tabular-nums">
                      रू {(property?.holdingTokenNPR || 50000).toLocaleString()}
                    </div>
                  </button>

                  {/* Option 3: VIP Tour Token */}
                  <button
                    type="button"
                    onClick={() => {
                      setPurpose('Tour Reservation Token');
                      setAmountNPR(property?.tourBookingFeeNPR || 1500);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      purpose === 'Tour Reservation Token'
                        ? 'border-emerald-500 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">VIP Tour Booking</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Dedicated specialist tour</div>
                    <div className="text-emerald-700 font-bold mt-1 tabular-nums">
                      रू {(property?.tourBookingFeeNPR || 1500).toLocaleString()}
                    </div>
                  </button>
                </div>
              </div>

              {/* Provider Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Nepal Payment Gateway
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  
                  {/* ConnectIPS */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('connectips')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedProvider === 'connectips'
                        ? 'border-blue-500 bg-blue-50 text-blue-950 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs mb-1.5 shadow-xs">
                      IPS
                    </div>
                    <span className="text-xs font-bold">ConnectIPS</span>
                    <span className="text-[10px] text-slate-500">NCHL Bank Direct (Up to 1 Cr)</span>
                  </button>

                  {/* eSewa */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('esewa')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedProvider === 'esewa'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-xs mb-1.5 shadow-xs">
                      e
                    </div>
                    <span className="text-xs font-bold">eSewa ePay</span>
                    <span className="text-[10px] text-slate-500">Nepal's No. 1 Wallet</span>
                  </button>

                  {/* Khalti */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('khalti')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedProvider === 'khalti'
                        ? 'border-purple-500 bg-purple-50 text-purple-950 ring-2 ring-purple-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-700 text-white font-black flex items-center justify-center text-xs mb-1.5 shadow-xs">
                      K
                    </div>
                    <span className="text-xs font-bold">Khalti</span>
                    <span className="text-[10px] text-slate-500">ePayment & E-Banking</span>
                  </button>

                  {/* IME Pay */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('imepay')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedProvider === 'imepay'
                        ? 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-black flex items-center justify-center text-xs mb-1.5 shadow-xs">
                      IME
                    </div>
                    <span className="text-xs font-bold">IME Pay</span>
                    <span className="text-[10px] text-slate-500">Digital Escrow</span>
                  </button>

                </div>
              </div>

              {/* Payer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name (as in Citizenship / Passport) *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (Nepal 98XXXXXXXX) *
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Order total */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Due</span>
                  <span className="text-xs text-slate-400">Zero service fee for verified buyers</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-display text-slate-950 tabular-nums">
                    रू {amountNPR.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">NPR (Nepali Rupees)</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleInitiate}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to {selectedProvider.toUpperCase()} Gateway</span>
              </button>

            </div>
          )}

          {/* STEP 2: Gateway Simulation */}
          {step === 'gateway' && transactionData && gatewayPayload && (
            <div className="space-y-5">
              
              <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Gateway:</span>{' '}
                  <strong className="text-slate-900 uppercase">{selectedProvider} Sandbox Environment</strong>
                </div>
                <div>
                  <span className="text-slate-500">Order Ref:</span>{' '}
                  <span className="font-mono text-slate-700">{transactionData.pidx.slice(0, 16)}...</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                
                {/* QR Code Column */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs mb-3">
                    <QrCode className="w-32 h-32 text-slate-900" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Scan via {selectedProvider.toUpperCase()} Mobile App</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Or authorize below using test sandbox wallet credentials</span>
                </div>

                {/* Form Simulation Column */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-700">
                    Direct Authorization
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      {selectedProvider === 'connectips' ? 'Bank Account / User ID' : `${selectedProvider.toUpperCase()} Registered Mobile`}
                    </label>
                    <input
                      type="text"
                      value={simulationMobile}
                      onChange={(e) => setSimulationMobile(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      {selectedProvider === 'esewa' ? 'eSewa MPIN / Password' : selectedProvider === 'khalti' ? 'Khalti MPIN / OTP' : 'Security PIN'}
                    </label>
                    <input
                      type="password"
                      value={simulationPin}
                      onChange={(e) => setSimulationPin(e.target.value)}
                      placeholder="e.g. 1234"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <div className="text-[10px] text-slate-400 mt-1">
                      Test Sandbox PIN: <code className="bg-slate-100 px-1 py-0.5 rounded">1234</code> (Pre-filled)
                    </div>
                  </div>

                  {selectedProvider === 'connectips' && (
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Select Member Bank
                      </label>
                      <select
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                      >
                        <option value="Nabil Bank Ltd. - 01201017500123">Nabil Bank Ltd.</option>
                        <option value="Global IME Bank - 001928374829">Global IME Bank</option>
                        <option value="NIC Asia Bank - 9918237461">NIC Asia Bank</option>
                        <option value="Everest Bank - 1102938475">Everest Bank</option>
                        <option value="Standard Chartered Bank Nepal">Standard Chartered Nepal</option>
                      </select>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleVerify}
                      disabled={isProcessing}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isProcessing ? 'Verifying with Nepal Gateway...' : `Authorize & Pay रू ${amountNPR.toLocaleString()}`}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('init')}
                      className="w-full mt-2 text-xs text-slate-500 hover:text-slate-700 py-1 cursor-pointer"
                    >
                      ← Back to Provider Selection
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* STEP 3: Payment Success & Official Receipt */}
          {step === 'success' && transactionData && (
            <div className="space-y-6">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Payment Verified Successfully!
                </h3>
                <p className="text-xs text-slate-500">
                  Transaction cleared via <strong className="uppercase">{transactionData.provider}</strong> Nepal National Switch.
                </p>
              </div>

              {/* Official Electronic Receipt Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-800 space-y-4">
                <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-base font-bold font-display text-slate-900 block">EstateEase Nepal</span>
                    <span className="text-[11px] text-slate-500">Official Electronic Escrow Receipt</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Receipt No.</span>
                    <span className="font-mono font-bold text-slate-900">{transactionData.receiptNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment For</span>
                    <strong className="text-slate-900">{transactionData.purpose}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Amount Paid</span>
                    <span className="text-base font-bold text-emerald-700 tabular-nums">
                      रू {transactionData.amountNPR.toLocaleString()} NPR
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Payer Name</span>
                    <span className="font-medium text-slate-900">{transactionData.clientName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment Gateway</span>
                    <span className="font-semibold uppercase text-slate-900">{transactionData.provider}</span>
                  </div>

                  {transactionData.propertyTitle && (
                    <div className="col-span-2 pt-1">
                      <span className="text-slate-400 block text-[11px]">Property Title</span>
                      <span className="font-medium text-slate-900">{transactionData.propertyTitle}</span>
                    </div>
                  )}

                  <div className="col-span-2 pt-1 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Verification Code (NRB Compliant)</span>
                        <span className="font-mono font-bold text-slate-800">{transactionData.verificationCode}</span>
                      </div>
                      <button
                        onClick={() => copyReceiptRef(transactionData.verificationCode)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-2 flex items-center justify-between">
                  <span>Timestamp: {new Date(transactionData.timestamp).toLocaleString()}</span>
                  <span className="text-emerald-700 font-semibold">Status: Cleared & Verified</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Done & Return to Properties
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
