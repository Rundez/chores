import create from "zustand"
import { persist } from "zustand/middleware"
import createContext from "zustand/context"

interface ThemeState {
  isDark: boolean,
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(persist(set => ({
  isDark: false,
  toggleTheme: () => set(state => ({ isDark: !state.isDark }))
})))
