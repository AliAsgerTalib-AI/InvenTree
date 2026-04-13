import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Layout({ children, currentPath, onNavigate }: LayoutProps) {
  const navItems = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'Inventory Entry', path: 'entry' },
    { name: 'All Records', path: 'records' },
    { name: 'Property Profile', path: 'property' },
    { name: 'Household Profile', path: 'owner' },
    { name: 'Settings', path: 'settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-nav">
        <nav className="flex justify-between items-center h-16 px-8 max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-8">
            <span 
              className="text-xl font-bold tracking-tighter text-on-surface cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              InvenTree
            </span>
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`text-sm font-medium tracking-tight transition-all duration-300 active:scale-95 pb-1 border-b-2 ${
                    currentPath === item.path
                      ? 'text-primary border-primary font-semibold'
                      : 'text-on-surface-variant border-transparent hover:text-on-surface'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95">
              <Bell size={20} />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95">
              <User size={20} />
            </button>
            <button className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95">
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="w-full py-8 bg-surface-container-low text-on-surface-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1200px] mx-auto gap-4">
          <p className="text-xs uppercase tracking-widest font-semibold opacity-80">
            © 2026 InvenTree. Built with Editorial Precision.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-widest font-semibold opacity-80 hover:opacity-100 hover:text-primary transition-colors">
              Contact Us
            </a>
            <a href="#" className="text-xs uppercase tracking-widest font-semibold opacity-80 hover:opacity-100 hover:text-primary transition-colors">
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
