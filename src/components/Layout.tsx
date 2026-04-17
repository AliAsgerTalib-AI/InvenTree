import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  onLegalClick: (section: 'about' | 'privacy' | 'contact') => void;
}

export default function Layout({ children, currentPath, onNavigate, onLegalClick }: LayoutProps) {
  const navItems = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'Registry', path: 'entry' },
    { name: 'Catalog', path: 'records' },
    { name: 'Property', path: 'property' },
    { name: 'Household', path: 'owner' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="glass-nav sticky top-0 z-[100] border-b border-outline-variant/5">
        <nav className="flex justify-between items-center h-20 px-8 max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-12">
            <span 
              className="text-2xl font-serif font-bold tracking-tighter text-on-surface cursor-pointer hover:text-primary transition-colors"
              onClick={() => onNavigate('home')}
            >
              InvenTree
            </span>
            {currentPath !== 'legal' && (
              <div className="hidden md:flex gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 relative py-2 ${
                      currentPath === item.path
                        ? 'text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {item.name}
                    {currentPath === item.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95 border border-transparent hover:border-outline-variant/10">
              <Bell size={18} />
            </button>
            <button className="p-3 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95 border border-transparent hover:border-outline-variant/10">
              <User size={18} />
            </button>
            <button className="md:hidden p-3 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95">
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {currentPath !== 'legal' && <Footer onLegalClick={onLegalClick} />}
    </div>
  );
}
