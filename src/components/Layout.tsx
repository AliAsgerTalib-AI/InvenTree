import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Layout({ children, currentPath, onNavigate }: LayoutProps) {
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

      <footer className="w-full py-16 bg-surface-container-low text-on-surface-variant mt-auto border-t border-outline-variant/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1200px] mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xl font-serif font-bold tracking-tighter text-on-surface">InvenTree</span>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
              © 2026 InvenTree. Built with Editorial Precision.
            </p>
          </div>
          <div className="flex gap-12">
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
              Contact
            </a>
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
              About
            </a>
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
