import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Edit2, Trash2, Package, MapPin, Calendar, IndianRupee, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem, formatDate } from '../types';

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
      <header className="mb-12">
        <nav className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-surface-container-lowest backdrop-blur-md shadow-sm border border-outline-variant/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Inventory</span>
          <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">All Records</span>
        </nav>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Asset Registry</h1>
        <p className="text-on-surface-variant max-w-md leading-relaxed">A comprehensive catalog of all documented physical assets.</p>
      </header>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/5 mb-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
            <input 
              type="text"
              placeholder="Search assets, rooms, or categories..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="px-4 py-3 rounded-xl bg-surface-container-low border-none text-sm focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
            >
              {rooms.map(room => <option key={room} value={room}>{room}</option>)}
            </select>
            <select 
              className="px-4 py-3 rounded-xl bg-surface-container-low border-none text-sm focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Photo</th>
                <th 
                  className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('description')}
                >
                  <div className="flex items-center gap-2">
                    Description
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('room')}
                >
                  <div className="flex items-center gap-2">
                    Room
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('purchaseDate')}
                >
                  <div className="flex items-center gap-2">
                    Purchased
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary transition-colors text-right"
                  onClick={() => toggleSort('price')}
                >
                  <div className="flex items-center gap-2 justify-end">
                    Value
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
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
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-low overflow-hidden border border-outline-variant/10">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/20">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-on-surface">{item.description}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <MapPin size={14} />
                        {item.room}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/5 text-primary rounded">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <Calendar size={14} />
                        {formatDate(item.purchaseDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-bold text-on-surface">
                        <IndianRupee size={14} />
                        {item.price.toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onEditItem(item)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
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
          <div className="py-20 text-center">
            <Package size={48} className="mx-auto text-on-surface-variant/20 mb-4" />
            <h3 className="text-lg font-bold text-on-surface">No assets found</h3>
            <p className="text-sm text-on-surface-variant">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
