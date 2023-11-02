import '@src/styles/globals.css';

import type { AppProps } from 'next/app';
import { Roboto_Mono } from 'next/font/google';
import ThemeProvider from '@components/context/theme-provider';
import Layout from '@components/layout/layout';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
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
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
