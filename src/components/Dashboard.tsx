import React, { useRef, useState } from 'react';
import { TrendingUp, Laptop, Armchair, Coffee, ChevronRight, FileText, RefreshCw, Package, Download, Filter, Calendar, MapPin, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem, formatDate } from '../types';
import { useToast } from './ToastContext';
// @ts-ignore
import html2pdf from 'html2pdf.js';

export default function Dashboard({ inventory, onEditItem }: { inventory: InventoryItem[], onEditItem: (item: InventoryItem) => void }) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  
  // Filter States
  const [roomFilter, setRoomFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const rooms = ['All', ...new Set(inventory.map(item => item.room))];
  const categoriesList = ['All', ...new Set(inventory.map(item => item.category))];

  const filteredInventory = inventory.filter(item => {
    const matchesRoom = roomFilter === 'All' || item.room === roomFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const itemDate = new Date(item.purchaseDate);
    const matchesStart = !startDate || itemDate >= new Date(startDate);
    const matchesEnd = !endDate || itemDate <= new Date(endDate);
    return matchesRoom && matchesCategory && matchesStart && matchesEnd;
  });

  const totalValue = filteredInventory.reduce((sum, item) => sum + item.price, 0);
  const highValueCount = filteredInventory.filter(item => item.price > 50000).length;
  const totalItems = filteredInventory.length;

  const roomDistribution = filteredInventory.reduce((acc, item) => {
    acc[item.room] = (acc[item.room] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryInvestment = filteredInventory.reduce((acc, item) => {
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
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                transition: none !important;
                animation: none !important;
              }
              .bg-primary\\/10 { background-color: rgba(122, 42, 214, 0.1) !important; }
              .bg-primary\\/5 { background-color: rgba(122, 42, 214, 0.05) !important; }
              .bg-tertiary\\/10 { background-color: rgba(0, 103, 103, 0.1) !important; }
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
      
      if (typeof html2pdf === 'undefined') {
        console.error('html2pdf library not found');
        return;
      }

      await html2pdf().set(opt).from(element).save();
      showToast('PDF Report Generated Successfully');
    } catch (error) {
      console.error('PDF Export failed:', error);
      showToast('Failed to generate PDF report', 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Description', 'Room', 'Category', 'Purchase Date', 'Price (INR)'];
    const rows = filteredInventory.map(item => [
      item.description,
      item.room,
      item.category,
      formatDate(item.purchaseDate),
      item.price
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `InvenTree_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Exported Successfully');
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(filteredInventory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `InvenTree_Export_${new Date().toISOString().split('T')[0]}.json`);
    link.click();
    showToast('JSON Exported Successfully');
  };

  // Recent Acquisitions sorted by Added Date (createdAt) Ascending as requested
  const recentAcquisitions = [...filteredInventory]
    .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-[1200px] mx-auto w-full px-8 py-12">
      {/* Header Section */}
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <nav className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-surface-container-lowest backdrop-blur-md shadow-sm border border-outline-variant/10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Intelligence</span>
            <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Analytics Dashboard</span>
          </nav>
          <h1 className="text-5xl font-serif font-bold tracking-tight text-on-surface mb-4">Inventory Intelligence</h1>
          <p className="text-on-surface-variant max-w-md leading-relaxed font-light italic-serif">A high-fidelity view of your physical assets and spatial distribution.</p>
        </div>
        <div className="flex flex-wrap gap-4" data-html2canvas-ignore="true">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-8 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-full active:scale-95 transition-all flex items-center gap-3 border ${showFilters ? 'bg-primary text-white border-primary' : 'bg-surface-container-low text-on-surface border-outline-variant/10 hover:bg-surface-container-highest'}`}
          >
            <Filter size={16} />
            Filters
          </button>
          
          <div className="relative group">
            <button className="px-8 py-4 bg-surface-container-low text-on-surface font-bold text-[10px] uppercase tracking-[0.2em] rounded-full active:scale-95 transition-all hover:bg-surface-container-highest flex items-center gap-3 border border-outline-variant/10">
              <Download size={16} />
              Export
            </button>
            <div className="absolute right-0 mt-3 w-56 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button onClick={handleExportPDF} className="w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-surface-container-low flex items-center gap-3 transition-colors">
                <FileText size={16} className="text-primary" /> PDF Report
              </button>
              <button onClick={handleExportCSV} className="w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-surface-container-low flex items-center gap-3 transition-colors">
                <FileText size={16} className="text-tertiary" /> CSV Spreadsheet
              </button>
              <button onClick={handleExportJSON} className="w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-surface-container-low flex items-center gap-3 transition-colors">
                <FileText size={16} className="text-on-surface-variant" /> JSON Data
              </button>
            </div>
          </div>

          <button className="px-8 py-4 bg-primary text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-full active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3 hover:bg-primary-container">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </header>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-surface-container-low rounded-[2rem] p-10 grid grid-cols-1 md:grid-cols-4 gap-8 border border-outline-variant/10 shadow-sm">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2 ml-1">
                  <MapPin size={12} /> Room Type
                </label>
                <select 
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  {rooms.map(room => <option key={room} value={room}>{room}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2 ml-1">
                  <Tag size={12} /> Category
                </label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2 ml-1">
                  <Calendar size={12} /> Start Date
                </label>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2 ml-1">
                  <Calendar size={12} /> End Date
                </label>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={dashboardRef}>
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Total Inventory Value */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-[0px_12px_32px_rgba(27,28,28,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[380px] border border-outline-variant/5">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Total Assets Valuation</span>
              <h2 className="text-8xl font-serif font-bold text-on-surface tracking-tighter leading-none">
                <span className="text-4xl font-medium text-on-surface-variant mr-2">₹</span>{totalValue.toLocaleString('en-IN')}
              </h2>
            </div>
            
            <div className="absolute right-0 top-0 w-2/3 h-full opacity-5 pointer-events-none">
              <div className="w-full h-full bg-primary rounded-bl-full translate-x-1/4 -translate-y-1/4"></div>
            </div>

            <div className="mt-12 flex gap-12 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em] mb-1">High Value Items</span>
                <span className="text-3xl font-serif font-bold">{highValueCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em] mb-1">Total Registry Count</span>
                <span className="text-3xl font-serif font-bold">{totalItems}</span>
              </div>
            </div>
          </div>

          {/* Distribution by Room */}
          <div className="md:col-span-4 bg-surface-container-low rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center border border-outline-variant/5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-10">Spatial Distribution</span>
            
            <div className="relative w-56 h-56 rounded-full border-[20px] border-surface-container-highest flex items-center justify-center mb-10">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="112" cy="112" r="92" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="20" 
                  className="text-primary"
                  strokeDasharray="578"
                  strokeDashoffset={578 - (578 * 0.65)}
                />
              </svg>
              <div className="text-center">
                <span className="block text-4xl font-serif font-bold">{totalItems}</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Assets</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-3 w-full text-left">
              {Object.entries(roomDistribution).slice(0, 4).map(([room, count]) => (
                <div key={room} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{room}</span>
                  </div>
                  <span className="text-xs font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment by Category */}
          <div className="md:col-span-7 bg-surface-container-low rounded-[2.5rem] p-12 border border-outline-variant/5">
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Investment by Category</span>
              <span className="text-[10px] font-bold text-primary px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">Year to Date</span>
            </div>
            <div className="space-y-10">
              {categories.map((cat) => (
                <div key={cat.label} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className="text-on-surface">{cat.label}</span>
                    <span className="text-primary">{cat.value}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value}%` }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Acquisitions */}
          <div className="md:col-span-5 bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-[0px_12px_32px_rgba(27,28,28,0.06)] border border-outline-variant/5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-10 block">Chronological Registry (Asc)</span>
            <div className="space-y-2">
              {recentAcquisitions.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onEditItem(item)}
                  className="py-5 flex items-center gap-5 hover:bg-surface-container-low/50 transition-all rounded-2xl px-4 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border border-outline-variant/5">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      getIcon(item.category)
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{item.description}</h4>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Added {formatDate(item.createdAt)} • {item.room}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-serif font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                </motion.div>
              ))}
              {recentAcquisitions.length === 0 && (
                <div className="py-16 text-center text-on-surface-variant text-sm italic-serif">No items found for current filters.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
