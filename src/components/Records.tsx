import React, { useState } from 'react';
import { Search, ArrowUpDown, Edit2, Trash2, Package, MapPin, Calendar, IndianRupee, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem, formatDate } from '../types';
import PageHeader from './common/PageHeader';

interface RecordsProps {
  inventory: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
  onDeleteItem: (id: string) => void;
}

export default function Records({ inventory, onEditItem, onDeleteItem }: RecordsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roomFilter, setRoomFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState<keyof InventoryItem>('purchaseDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const rooms = ['All', ...new Set(inventory.map(item => item.room))];
  const categories = ['All', ...new Set(inventory.map(item => item.category))];

  const filteredInventory = inventory
    .filter(item => {
      const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoom = roomFilter === 'All' || item.room === roomFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesRoom && matchesCategory;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });

  const toggleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full px-8 py-12">
      <PageHeader 
        title="Asset Registry"
        subtitle="A comprehensive, high-fidelity catalog of all documented physical assets."
        badge="Registry"
      />

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/5 mb-12 space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30" size={20} />
            <input 
              type="text"
              placeholder="Search assets, rooms, or categories..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="px-6 py-4 rounded-2xl bg-surface-container-low border-none text-sm font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none min-w-[160px]"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
            >
              {rooms.map(room => <option key={room} value={room}>{room}</option>)}
            </select>
            <select 
              className="px-6 py-4 rounded-2xl bg-surface-container-low border-none text-sm font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none min-w-[160px]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-[0px_12px_32px_rgba(27,28,28,0.06)] border border-outline-variant/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Asset</th>
                <th 
                  className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('description')}
                >
                  <div className="flex items-center gap-2">
                    Description
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('room')}
                >
                  <div className="flex items-center gap-2">
                    Room
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('purchaseDate')}
                >
                  <div className="flex items-center gap-2">
                    Acquisition
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant cursor-pointer hover:text-primary transition-colors text-right"
                  onClick={() => toggleSort('price')}
                >
                  <div className="flex items-center gap-2 justify-end">
                    Valuation
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <AnimatePresence mode="popLayout">
                {filteredInventory.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-surface-container-low/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="w-16 h-16 rounded-2xl bg-surface-container-low overflow-hidden border border-outline-variant/5 shadow-sm group-hover:shadow-md transition-all">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/20">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">{item.description}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        <MapPin size={12} className="text-primary/40" />
                        {item.room}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 bg-primary/5 text-primary rounded-full border border-primary/10">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        <Calendar size={12} className="text-primary/40" />
                        {formatDate(item.purchaseDate)}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-serif font-bold text-on-surface">
                        <IndianRupee size={14} className="text-on-surface-variant/50" />
                        {item.price.toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button 
                          onClick={() => onEditItem(item)}
                          className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-colors"
                          title="Edit Record"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => onDeleteItem(item.id)}
                          className="p-3 text-error hover:bg-error/10 rounded-xl transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredInventory.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-surface-container-low flex items-center justify-center mx-auto mb-8 text-on-surface-variant/20">
              <Package size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-on-surface mb-2">No assets found</h3>
            <p className="text-on-surface-variant font-light italic-serif">Try adjusting your search or filters to locate your documented assets.</p>
          </div>
        )}
      </div>
    </div>
  );
}
