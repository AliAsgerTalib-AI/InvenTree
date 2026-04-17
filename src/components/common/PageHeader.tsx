import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, badge, actions }: PageHeaderProps) {
  return (
    <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="flex-grow">
        {badge && (
          <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-surface-container-lowest backdrop-blur-md shadow-sm border border-outline-variant/10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{badge}</span>
          </div>
        )}
        <h1 className="text-5xl font-serif font-bold tracking-tight text-on-surface mb-4">{title}</h1>
        <p className="text-on-surface-variant max-w-md leading-relaxed font-light italic-serif">{subtitle}</p>
      </div>
      {actions && (
        <div className="flex flex-wrap gap-4" data-html2canvas-ignore="true">
          {actions}
        </div>
      )}
    </header>
  );
}
