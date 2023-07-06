'use client';

import { ThemeProvider } from 'next-themes';

export const ThemeProviders = () => {
  return <ThemeProvider enableSystem={true} attribute='class'></ThemeProvider>;
};
