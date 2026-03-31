export const colors = {
  light: {
    bgColor: '#ececec',
    fgColor: '#0c0c0c',
    red: '#a81c24',
    green: '#4fb34b',
    gray01: '#e1e1e1',
    gray02: '#c9c9c9',
    gray03: '#9f9f9f',
    gray04: '#4d4d4d',
    gray05: '#383838',
    bgColorTranslucent: '#ecececec',
    fgColorTranslucent: '#0c0c0c50',
    grayTranslucent: '#9f9f9f9f',
    white: '#ffffff',
  },
  dark: {
    bgColor: '#080808',
    fgColor: '#f3f3f3',
    red: '#a81c24',
    green: '#4fb34b',
    gray01: '#1e1e1e',
    gray02: '#363636',
    gray03: '#606060',
    gray04: '#b2b2b2',
    gray05: '#c7c7c7',
    bgColorTranslucent: '#080808ee',
    fgColorTranslucent: '#f3f3f320',
    grayTranslucent: '#65656599',
  },
} as const;

export type UiColors = typeof colors;

