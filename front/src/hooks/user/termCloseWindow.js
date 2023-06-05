import create from 'zustand';

export const termCloseWindow = create((set) => ({
  goBack: () => window.close(),
}));