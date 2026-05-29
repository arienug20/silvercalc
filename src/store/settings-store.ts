import { create } from 'zustand';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'id';
  units: 'si' | 'imperial';
  numberFormat: 'dot' | 'comma';
  companyName?: string;
}

interface SettingsState extends Settings {
  setSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'light',
  language: 'en',
  units: 'si',
  numberFormat: 'dot',

  setSettings: (newSettings) =>
    set((state) => ({
      ...state,
      ...newSettings,
    })),
}));