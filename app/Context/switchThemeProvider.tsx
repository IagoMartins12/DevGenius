// import { PropsWithChildren, createContext, useContext, useState } from 'react';

// type Themes = 'dark' | 'light';
// type ThemeState = {
//   theme: Themes;
//   setTheme(theme: Themes): void;
// };

// // 1. create a context with ThemeState and initialize it to null
// const ThemeContext = createContext<ThemeState>({
//   theme: 'dark',
//   setTheme(theme) {
//     if (theme === 'dark') theme = 'light';
//     if (theme === 'light') theme = 'dark';
//   },
// });

// const useTheme = (): ThemeState => {
//   const context = useContext(ThemeContext);

//   if (!context) {
//     throw new Error('Please use ThemeProvider in parent component');
//   }

//   return context;
// };

// export const ThemeProvider = (props: PropsWithChildren) => {
//   const [theme, setTheme] = useState<Themes>('dark');
//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {props.children}
//     </ThemeContext.Provider>
//   );
// };

// export default useTheme;
