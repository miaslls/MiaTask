import '@/styles/_reset.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto_Mono } from 'next/font/google';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --default-font: ${roboto_mono.style.fontFamily};
          --default-light: 300;
          --default-regular: 400;
          --default-bold: 500;
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
