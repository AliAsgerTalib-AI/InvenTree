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

  const [lastModified] = useState('13/04/2026');

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
      <div className="mb-8 inline-flex items-center px-4 py-2 bg-surface-container-low/60 backdrop-blur-md rounded-full shadow-sm border border-outline-variant/10">
        <span className="text-on-surface-variant text-xs font-medium tracking-wide">Settings</span>
        <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
        <span className="text-primary text-xs font-semibold tracking-wide">Categories</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4">Organizational Architecture</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed font-light">
            Define and refine the semantic structure of your ecosystem. Manage classification hierarchies for both physical assets and spatial containers.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          Add New {activeTab === 'item' ? 'Category' : 'Room Type'}
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="bg-surface-container-low rounded-3xl p-1.5 mb-10 inline-flex shadow-sm border border-outline-variant/10">
        <button 
          onClick={() => setActiveTab('item')}
          className={`px-8 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
            activeTab === 'item' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Item Categories
        </button>
        <button 
          onClick={() => setActiveTab('room')}
          className={`px-8 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
            activeTab === 'room' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Room Categories
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-surface-container-lowest rounded-[2rem] p-1 shadow-[0px_4px_24px_rgba(27,28,28,0.04)] overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-surface-container-low/40">
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant first:rounded-tl-[1.75rem]">Label</th>
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">Description</th>
                <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-widest text-on-surface-variant last:rounded-tr-[1.75rem]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {currentData.map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-surface-container-low/30 transition-colors duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="text-sm font-bold text-on-surface">{item.label}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm text-on-surface-variant font-light">{item.description}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-on-surface/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {editingCategory ? 'Edit Category' : `New ${activeTab === 'item' ? 'Item Category' : 'Room Type'}`}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Label</label>
                    <input 
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none ring-1 ring-outline-variant/30 focus:ring-primary focus:ring-2 transition-all outline-none"
                      placeholder="e.g. Electronics"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none ring-1 ring-outline-variant/30 focus:ring-primary focus:ring-2 transition-all outline-none min-h-[100px]"
                      placeholder="Briefly describe this category..."
                    />
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-3.5 rounded-full font-bold text-sm uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-grow py-3.5 rounded-full font-bold text-sm uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
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
      <div className="mt-16 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-outline-variant/10">
          <Layers size={40} className="text-outline-variant" />
        </div>
        <h3 className="text-on-surface font-semibold">Missing a category?</h3>
        <p className="text-on-surface-variant text-sm mt-1 mb-6">Create precise buckets to keep your inventory impeccable.</p>
        <button className="text-primary text-sm font-bold uppercase tracking-widest hover:underline active:scale-95 transition-all">
          Learn about hierarchies
        </button>
      </div>
    </div>
  );
}
