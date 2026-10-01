import { Currency, MortgageCalculation } from '../types';

export const USD_TO_NPR_RATE = 134; // standard reference rate

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'NPR') {
    // Check if in Crores / Lakhs for convenient reading
    if (amount >= 10000000) {
      const crore = amount / 10000000;
      return `रू ${crore.toFixed(crore % 1 === 0 ? 0 : 2)} Cr (NPR ${amount.toLocaleString('en-IN')})`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `रू ${lakh.toFixed(lakh % 1 === 0 ? 0 : 1)} Lakh (NPR ${amount.toLocaleString('en-IN')})`;
    }
    return `रू ${amount.toLocaleString('en-IN')}`;
  }

  // USD format
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCompactPrice(property: { priceUSD: number; priceNPR: number }, currency: Currency): string {
  if (currency === 'NPR') {
    if (property.priceNPR >= 10000000) {
      const crore = property.priceNPR / 10000000;
      return `रू ${crore.toFixed(crore % 1 === 0 ? 0 : 2)} Crore`;
    }
    if (property.priceNPR >= 100000) {
      const lakh = property.priceNPR / 100000;
      return `रू ${lakh.toFixed(lakh % 1 === 0 ? 0 : 1)} Lakh`;
    }
    return `रू ${property.priceNPR.toLocaleString('en-IN')}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.priceUSD);
}

export function calculateEMI(
  propertyPrice: number,
  downPaymentPercent: number,
  interestRateAnnual: number,
  loanTermYears: number
): MortgageCalculation {
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  const monthlyRate = interestRateAnnual / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyEMI = 0;
  if (monthlyRate === 0) {
    monthlyEMI = loanAmount / numberOfPayments;
  } else {
    monthlyEMI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  const totalPayment = monthlyEMI * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    propertyPrice,
    downPaymentPercent,
    downPaymentAmount: Math.round(downPaymentAmount),
    loanAmount: Math.round(loanAmount),
    interestRate: interestRateAnnual,
    loanTermYears,
    monthlyEMI: Math.round(monthlyEMI),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest)
  };
}
