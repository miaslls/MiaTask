import { DefaultToastOptions } from 'react-hot-toast';

export const toastOptions: DefaultToastOptions = {
  style: {
    background: 'var(--bg-color-translucent)',
    boxShadow: '0.175rem 0.175rem var(--gray-translucent)',
    color: 'var(--fg-color)',
    borderRadius: 0,
  },
  success: {
    iconTheme: {
      primary: 'var(--green)',
      secondary: 'var(--bg-color-translucent)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--red)',
      secondary: 'var(--bg-color-translucent)',
    },
  },
};
