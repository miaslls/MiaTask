import '../styles/globals.css';

import { Roboto_Mono } from 'next/font/google';
import ThemeProvider from '../components/context/theme-provider';
import Layout from '../components/layout/layout';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });
const FallbackComponent = () => null;

export type UiAppProps = {
  Component?: React.ComponentType<Record<string, unknown>>;
  pageProps?: Record<string, unknown>;
};

function UiApp({ Component = FallbackComponent, pageProps = {} }: UiAppProps) {
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

export default UiApp;

