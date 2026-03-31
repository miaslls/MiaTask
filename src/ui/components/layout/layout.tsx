import { PropsWithChildren } from 'react';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="outer_container">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

