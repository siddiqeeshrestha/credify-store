import React from 'react';
import { HeaderSection } from '@/pages/sections/HeaderSection';
import { FooterSection } from '@/pages/sections/FooterSection';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}) => {
  return (
    <main className="flex flex-col items-center relative bg-[#ffffff] overflow-hidden">
      {showHeader && <HeaderSection />}
      {children}
      {showFooter && <FooterSection />}
    </main>
  );
};
