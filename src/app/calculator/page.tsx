import React from 'react';
import type { Metadata } from 'next';
import VptCalculator from '@/components/calculator/VptCalculator';

export const metadata: Metadata = {
  title: 'Victorian Points Test (VPT) Calculator | VicPoints',
  description:
    'Calculate your estimated Victorian Points Test (VPT) score across all 7 published factors for Subclass 190 and 491 state nomination.',
};

export default function CalculatorPage() {
  return (
    <div className="py-4 sm:py-6">
      <VptCalculator />
    </div>
  );
}
