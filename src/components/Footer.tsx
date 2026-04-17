import React from 'react';

interface FooterProps {
  onLegalClick: (section: 'about' | 'privacy' | 'contact') => void;
}

export default function Footer({ onLegalClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-[1200px] mx-auto w-full px-8 py-16 mt-24 border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-serif font-bold tracking-tighter text-on-surface mb-2">InvenTree</span>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/50">
            © {currentYear} Institutional Household Assets • All Rights Reserved
          </p>
        </div>
        
        <div className="flex gap-8">
          <button 
            onClick={() => onLegalClick('about')}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => onLegalClick('privacy')}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacy
          </button>
          <button 
            onClick={() => onLegalClick('contact')}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
