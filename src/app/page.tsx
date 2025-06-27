'use client';

import React, { useState } from 'react';
import VerticalSection from '../VerticalSection';
import HorizontalSection from '../HorizontalSection';

export default function Page() {
  const [step, setStep] = useState(0);

  return (
    <main className="max-w-3xl mx-auto">
      {/* First vertical scroll: 1-20 */}
      <VerticalSection
        start={1}
        end={20}
        active={step === 0}
        onComplete={() => setStep(1)}
      />

      {/* Horizontal scroll: 21-30 */}
      <HorizontalSection
        start={21}
        end={30}
        active={step === 1}
        onComplete={() => setStep(2)}
      />

      {/* Second vertical scroll: 31-50 */}
      <VerticalSection
        start={31}
        end={50}
        active={step === 2}
        onComplete={() => setStep(3)}
      />
    </main>
  );
}
