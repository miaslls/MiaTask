export const typography = {
  fontFamilyVar: 'var(--default-font)',
  weights: {
    light: 300,
    regular: 400,
    bold: 500,
  },
  sizes: {
    basePx: '16px',
    rem1: '1rem',
    rem125: '1.25rem',
    rem135: '1.35rem',
    rem15: '1.5rem',
    rem2: '2rem',
    small: 'small',
    smaller: 'smaller',
    larger: 'larger',
  },
  lineHeights: {
    rem1: '1rem',
  },
} as const;

export type UiTypography = typeof typography;

