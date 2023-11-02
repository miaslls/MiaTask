import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from '@src/lib/toast';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="outer_container">
      <Toaster position="top-center" reverseOrder={false} toastOptions={toastOptions} />

      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
