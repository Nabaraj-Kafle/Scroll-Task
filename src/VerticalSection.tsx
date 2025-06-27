import React, { useEffect, useRef, useState } from 'react';
import NumberBox from './NumberBox';

interface VerticalSectionProps {
  start: number;
  end: number;
  onComplete?: () => void;
  active?: boolean;
}

const VerticalSection: React.FC<VerticalSectionProps> = ({ start, end, onComplete, active }) => {
  const [maxVisible, setMaxVisible] = useState(start);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    if (start === 1) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [start]);

  // Reveal numbers when active prop is true and call onComplete when finished
  useEffect(() => {
    if (!active) return;
    if (maxVisible > end) {
      if (onComplete) onComplete();
      return;
    }
    timeoutRef.current = setTimeout(() => {
      setMaxVisible((prev) => prev + 1);
    }, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [maxVisible, end, active, onComplete]);

  return (
    <section id={`vertical-section-${start}-${end}`} className="flex flex-col items-center min-h-screen py-16 bg-gradient-to-b from-white/80 to-blue-100/60 rounded-3xl shadow-2xl mb-32 border border-white/30">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 tracking-wide font-sans drop-shadow-md">Vertical Scroll ({start}-{end})</h2>
      {Array.from({ length: end - start + 1 }, (_, i) => (
        <div key={i + start} className="vertical-number-box" style={{ minHeight: '30vh', width: '100%' }}>
          {i + start < maxVisible ? <NumberBox number={i + start} direction="vertical" /> : null}
        </div>
      ))}
    </section>
  );
};

export default VerticalSection;
