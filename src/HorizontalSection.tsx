import React, { useEffect, useRef, useState } from 'react';
import NumberBox from './NumberBox';

interface HorizontalSectionProps {
  start: number;
  end: number;
  onComplete?: () => void;
  active?: boolean;
}

const HorizontalSection: React.FC<HorizontalSectionProps> = ({ start, end, onComplete, active }) => {
  const [maxVisible, setMaxVisible] = useState(start);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the first number on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, []);

  // Reveal numbers one by one with 500ms delay, regardless of scroll
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
    <section className="flex flex-col items-center min-h-[300px] py-16 bg-gradient-to-r from-purple-100/80 to-blue-100/60 rounded-3xl shadow-2xl mb-12 border border-white/30">
      <h2 className="text-3xl font-bold text-purple-800 mb-8 tracking-wide font-sans drop-shadow-md">Horizontal Scroll ({start}-{end})</h2>
      <div ref={containerRef} id="horizontal-scroll" className="flex flex-row items-center overflow-x-auto w-full pb-4">
        {Array.from({ length: end - start + 1 }, (_, i) => (
          <div key={i + start} className="horizontal-number-box" style={{ minWidth: '40vh', height: '40vh' }}>
            {i + start < maxVisible ? <NumberBox number={i + start} direction="horizontal" /> : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalSection;
