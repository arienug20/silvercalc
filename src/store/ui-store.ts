import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  currentRoute: string;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCurrentRoute: (route: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  currentRoute: '/dashboard',

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCurrentRoute: (route) => set({ currentRoute: route }),
}));