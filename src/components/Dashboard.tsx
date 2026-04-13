import React, { useRef } from 'react';
import { TrendingUp, Laptop, Armchair, Coffee, Speaker, PenTool, ChevronRight, FileText, RefreshCw, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { InventoryItem, formatDate } from '../types';
// @ts-ignore
import html2pdf from 'html2pdf.js';

export default function Dashboard({ inventory, onEditItem }: { inventory: InventoryItem[], onEditItem: (item: InventoryItem) => void }) {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
  const highValueCount = inventory.filter(item => item.price > 50000).length;
  const totalItems = inventory.length;

  const roomDistribution = inventory.reduce((acc, item) => {
    acc[item.room] = (acc[item.room] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryInvestment = inventory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.price;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryInvestment).map(([label, value]) => ({
    label,
    value: totalValue > 0 ? Math.round((value / totalValue) * 100) : 0,
    color: label === 'Electronics' ? 'bg-primary' : label === 'Furniture' ? 'bg-primary-container' : 'bg-tertiary'
  }));

  const getIcon = (category: string) => {
    switch (category) {
      case 'Electronics': return <Laptop size={20} />;
      case 'Furniture': return <Armchair size={20} />;
      case 'Appliances': return <Coffee size={20} />;
      default: return <Package size={20} />;
    }
  };

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;
    
    try {
      const element = dashboardRef.current;
      const opt = {
        margin: 10,
        filename: `InvenTree_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: false,
          letterRendering: true,
          onclone: (doc: Document) => {
            const style = doc.createElement('style');
            style.innerHTML = `
              /* Fix for html2canvas not supporting modern CSS color functions like oklab/oklch */
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                transition: none !important;
                animation: none !important;
              }
              /* Override problematic Tailwind v4 utility classes with standard RGBA */
              .bg-primary\\/10 { background-color: rgba(122, 42, 214, 0.1) !important; }
              .bg-primary\\/5 { background-color: rgba(122, 42, 214, 0.05) !important; }
              .bg-tertiary\\/10 { background-color: rgba(0, 103, 103, 0.1) !important; }
              .shadow-primary\\/20 { box-shadow: 0 10px 15px -3px rgba(122, 42, 214, 0.2) !important; }
              /* Ensure gradients use standard colors */
              .bg-gradient-to-br.from-primary.to-primary-container {
                background: linear-gradient(to bottom right, #7a2ad6, #944af1) !important;
              }
              /* Global fallback for any oklab/oklch colors that might be present */
              [style*="okl"] {
                background-color: #7a2ad6 !important;
                color: #1b1c1c !important;
              }
            `;
            doc.head.appendChild(style);
          }
        },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'landscape' as const }
      };
      
      // Ensure the library is loaded
      if (typeof html2pdf === 'undefined') {
        console.error('html2pdf library not found');
        return;
      }

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Export failed:', error);
    }
  };

  return (
    <div ref={dashboardRef} className="max-w-[1200px] mx-auto w-full px-8 py-12">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Inventory Intelligence</h1>
          <p className="text-on-surface-variant max-w-md leading-relaxed">A high-fidelity view of your physical assets and spatial distribution.</p>
        </div>
        <div className="flex gap-3" data-html2canvas-ignore="true">
          <button 
            onClick={handleExportPDF}
            className="px-6 py-3 bg-surface-container-low text-on-surface font-semibold text-sm rounded-full active:scale-95 transition-all hover:bg-surface-container-highest flex items-center gap-2"
          >
            <FileText size={18} />
            Export PDF
          </button>
          <button className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm rounded-full active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Inventory Value */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(27,28,28,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Total Assets Valuation</span>
            <h2 className="text-6xl font-black text-on-surface tracking-tighter">
              <span className="text-3xl font-medium text-on-surface-variant mr-1">₹</span>{totalValue.toLocaleString('en-IN')}
            </h2>
        
          </div>
          
          {/* Abstract visual element */}
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-primary-container rounded-tl-full translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="mt-8 flex gap-8 relative z-10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">High Value Items</span>
              <span className="text-xl font-bold">{highValueCount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Total Items</span>
              <span className="text-xl font-bold">{totalItems}</span>
            </div>
          </div>
        </div>

        {/* Distribution by Room */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-6">Distribution by Room</span>
          
          {/* Donut Chart Visual */}
          <div className="relative w-48 h-48 rounded-full border-[16px] border-surface-container-highest flex items-center justify-center mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle 
                cx="96" cy="96" r="80" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="16" 
                className="text-primary"
                strokeDasharray="502"
                strokeDashoffset={502 - (502 * 0.4)}
              />
            </svg>
            <div className="text-center">
              <span className="block text-3xl font-bold">{totalItems}</span>
              <span className="text-[10px] text-on-surface-variant font-medium uppercase">Total Items</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full text-left">
            {Object.entries(roomDistribution).map(([room, count]) => (
              <div key={room} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-xs font-medium">{room} ({count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investment by Category */}
        <div className="md:col-span-7 bg-surface-container-low rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">Investment by Category</span>
            <span className="text-[10px] font-bold text-primary px-2 py-1 rounded" style={{ backgroundColor: 'rgba(122, 42, 214, 0.1)' }}>Year to Date</span>
          </div>
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.label} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{cat.label}</span>
                  <span>{cat.value}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${cat.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Acquisitions */}
        <div className="md:col-span-5 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(27,28,28,0.06)]">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-6 block">Recent Acquisitions</span>
          <div className="space-y-1">
            {inventory.slice(0, 5).map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onEditItem(item)}
                className="py-4 flex items-center gap-4 hover:bg-surface-container-low/50 transition-colors rounded-lg px-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {getIcon(item.category)}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold">{item.description}</h4>
                  <p className="text-[10px] text-on-surface-variant font-medium">Added {formatDate(item.purchaseDate)} • {item.room}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
