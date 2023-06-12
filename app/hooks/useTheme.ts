import { create } from 'zustand';

type Themes = 'dark' | 'light';

interface SetThemes {
  theme: Themes;
  setTheme(theme: Themes): void;
}

const useThemes = create<SetThemes>(set => ({
  theme: 'light',
  setTheme(theme) {
    set(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
  },
}));

export default useThemes;
