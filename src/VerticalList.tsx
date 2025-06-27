'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  start: number;
  end: number;
}

const VerticalSection: React.FC<Props> = ({ start, end }) => {
  const [items, setItems] = useState<number[]>([]);
  const indexRef = useRef(start);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const startRendering = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (indexRef.current <= end) {
        setItems((prev) => [...prev, indexRef.current]);
        indexRef.current++;
      } else {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 500);
  };

  const stopRendering = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setItems([]);
    indexRef.current = start;
  }, [start, end]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startRendering();
        } else {
          stopRendering();
        }
      },
      {
        rootMargin: '200px',
      }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
      stopRendering();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      {items.map((num) => (
        <div
          key={num}
          className="w-48 h-48 bg-blue-600 text-white text-4xl flex items-center justify-center rounded-lg shadow-lg"
        >
          {num}
        </div>
      ))}
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};

export default VerticalSection;
