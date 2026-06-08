// src/types/index.d.ts
export type Mode = 'Summarizer' | 'Simplifier' | 'Roadmap' | 'Explainer' | 'Refiner' |'Humanizer';
export interface appState {
  text: string;
  summary: string;
  mode: Mode;
  loading: boolean;
  setText: (text: string) => void;
  setMode: (mode: Mode) => void;
  processContent: () => Promise<void>;
}

export interface ModelOption {
  description: string;
  title: string;
  value: Mode;
}