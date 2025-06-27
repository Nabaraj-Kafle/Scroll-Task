import { create } from 'zustand';

interface ScrollState {
  vertical1: number;
  horizontal: number;
  vertical2: number;
  setVertical1: (count: number) => void;
  setHorizontal: (count: number) => void;
  setVertical2: (count: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  vertical1: 0,
  horizontal: 0,
  vertical2: 0,
  setVertical1: (count: number) => set({ vertical1: count }),
  setHorizontal: (count: number) => set({ horizontal: count }),
  setVertical2: (count: number) => set({ vertical2: count }),
}));
