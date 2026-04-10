import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  noPadding?: boolean;
}

export const Layout = ({ children, noPadding = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${noPadding ? '' : 'pt-[120px]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
