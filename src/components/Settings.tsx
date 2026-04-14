import React, { useState } from 'react';
import { ChevronRight, Plus, Edit2, Trash2, Smartphone, Book, Package, Armchair, Utensils, Bed, Briefcase, Layers, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Category {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'item' | 'room'>('item');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [itemCategories, setItemCategories] = useState<Category[]>([
    { id: '1', label: 'Electronics', description: 'Hardware, Gadgets & Computing devices', icon: <Smartphone size={20} />, color: 'bg-primary/10 text-primary' },
    { id: '2', label: 'Literature', description: 'Textbooks, References & Physical books', icon: <Book size={20} />, color: 'bg-secondary/10 text-secondary' },
    { id: '3', label: 'Office Supplies', description: 'Stationery, Consumables & Paperwork', icon: <Package size={20} />, color: 'bg-tertiary/10 text-tertiary' },
  ]);

  const [roomCategories, setRoomCategories] = useState<Category[]>([
    { id: 'r1', label: 'Living Room', description: 'Main gathering and entertainment area', icon: <Armchair size={20} />, color: 'bg-primary/10 text-primary' },
    { id: 'r2', label: 'Kitchen', description: 'Culinary workshop and food storage', icon: <Utensils size={20} />, color: 'bg-secondary/10 text-secondary' },
    { id: 'r3', label: 'Master Bedroom', description: 'Primary resting suite and personal space', icon: <Bed size={20} />, color: 'bg-tertiary/10 text-tertiary' },
    { id: 'r4', label: 'Home Office', description: 'Productivity zone and workspace', icon: <Briefcase size={20} />, color: 'bg-primary-container/10 text-primary-container' },
  ]);

  const [formData, setFormData] = useState({ label: '', description: '' });

  const currentData = activeTab === 'item' ? itemCategories : roomCategories;

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ label: category.label, description: category.description });
    } else {
      setEditingCategory(null);
      setFormData({ label: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.label) return;

    if (editingCategory) {
      const updateFn = activeTab === 'item' ? setItemCategories : setRoomCategories;
      updateFn(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
    } else {
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        label: formData.label,
        description: formData.description,
        icon: activeTab === 'item' ? <Package size={20} /> : <Layers size={20} />,
        color: 'bg-primary/10 text-primary'
      };
      const addFn = activeTab === 'item' ? setItemCategories : setRoomCategories;
      addFn(prev => [...prev, newCategory]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const deleteFn = activeTab === 'item' ? setItemCategories : setRoomCategories;
    deleteFn(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-8 py-12">
      {/* Floating Breadcrumb */}
      <div className="mb-8 inline-flex items-center px-4 py-1.5 bg-surface-container-low/60 backdrop-blur-md rounded-full shadow-sm border border-outline-variant/10">
        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em]">Settings</span>
        <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Organizational Architecture</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <h1 className="text-5xl font-serif font-bold tracking-tight text-on-surface mb-4">Organizational Architecture</h1>
          <p className="text-on-surface-variant leading-relaxed font-light italic-serif">
            Define and refine the semantic structure of your ecosystem. Manage classification hierarchies for both physical assets and spatial containers.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all flex items-center gap-3"
        >
          <Plus size={18} />
          Add New {activeTab === 'item' ? 'Category' : 'Room Type'}
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="bg-surface-container-low rounded-full p-1.5 mb-12 inline-flex shadow-sm border border-outline-variant/10">
        <button 
          onClick={() => setActiveTab('item')}
          className={`px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            activeTab === 'item' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Item Categories
        </button>
        <button 
          onClick={() => setActiveTab('room')}
          className={`px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            activeTab === 'room' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Room Categories
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-[0px_12px_32px_rgba(27,28,28,0.06)] overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <th className="px-10 py-6 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Label</th>
                <th className="px-10 py-6 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Description</th>
                <th className="px-10 py-6 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {currentData.map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-surface-container-low/30 transition-all duration-300"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-outline-variant/5 shadow-sm ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="text-sm font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">{item.label}</div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-sm text-on-surface-variant font-light italic-serif opacity-80">{item.description}</div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-3 rounded-xl hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                        title="Edit Category"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 rounded-xl hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-on-surface/30 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-container-lowest rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden border border-outline-variant/10"
            >
              <div className="p-12">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif font-bold tracking-tight">
                    {editingCategory ? 'Edit Category' : `New ${activeTab === 'item' ? 'Item Category' : 'Room Type'}`}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-surface-container-low rounded-full transition-all active:scale-90">
                    <X size={24} className="text-on-surface-variant" />
                  </button>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Label</label>
                    <input 
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-on-surface"
                      placeholder="e.g. Electronics"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[120px] font-medium text-on-surface leading-relaxed"
                      placeholder="Briefly describe this category..."
                    />
                  </div>
                </div>

                <div className="mt-12 flex gap-6">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:bg-surface-container-low transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-grow py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <Check size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Empty State Suggestion */}
      <div className="mt-24 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-[2.5rem] bg-surface-container-low flex items-center justify-center mb-8 border border-outline-variant/10 shadow-sm">
          <Layers size={40} className="text-primary/20" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-on-surface mb-2 tracking-tight">Missing a category?</h3>
        <p className="text-on-surface-variant text-sm font-light italic-serif opacity-80 mb-8 max-w-xs">Create precise buckets to keep your inventory impeccable and spatially organized.</p>
        <button className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] hover:underline active:scale-95 transition-all">
          Learn about hierarchies
        </button>
      </div>
    </div>
  );
}
