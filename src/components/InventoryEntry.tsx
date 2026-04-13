import React, { useState, useRef } from 'react';
import { ChevronRight, Camera, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem } from '../types';

export default function InventoryEntry({ 
  onAddItem, 
  onUpdateItem,
  editingItem,
  onCancelEdit
}: { 
  onAddItem: (item: InventoryItem) => void;
  onUpdateItem: (item: InventoryItem) => void;
  editingItem: InventoryItem | null;
  onCancelEdit: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(editingItem?.imageUrl || null);
  const [formData, setFormData] = useState({
    room: editingItem?.room || '',
    category: editingItem?.category || '',
    description: editingItem?.description || '',
    purchaseDate: editingItem?.purchaseDate || '',
    price: editingItem?.price.toString() || ''
  });

  // Update imagePreview if editingItem changes
  React.useEffect(() => {
    if (editingItem) {
      setImagePreview(editingItem.imageUrl || null);
      setFormData({
        room: editingItem.room,
        category: editingItem.category,
        description: editingItem.description,
        purchaseDate: editingItem.purchaseDate,
        price: editingItem.price.toString()
      });
    }
  }, [editingItem]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.room || !formData.category || !formData.description || !formData.purchaseDate || !formData.price) {
      return;
    }

    const itemData: InventoryItem = {
      id: editingItem?.id || Math.random().toString(36).substr(2, 9),
      room: formData.room,
      category: formData.category,
      description: formData.description,
      purchaseDate: formData.purchaseDate,
      price: parseFloat(formData.price),
      imageUrl: imagePreview || undefined,
      createdAt: editingItem?.createdAt || new Date().toISOString()
    };

    if (editingItem) {
      onUpdateItem(itemData);
    } else {
      onAddItem(itemData);
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setFormData({
        room: '',
        category: '',
        description: '',
        purchaseDate: '',
        price: ''
      });
      setImagePreview(null);
    }, 1500);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6 sm:p-12 relative min-h-[calc(100vh-128px)]">
      <AnimatePresence>
        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
          >
            <CheckCircle size={20} />
            Item Registered Successfully
          </motion.div>
        )}
      </AnimatePresence>
      {/* Abstract Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl">
        {/* Glassmorphic Breadcrumb */}
        <div className="mb-8 flex justify-center">
          <div className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-outline-variant/10 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
            <span>InvenTree</span>
            <ChevronRight size={14} />
            <span className="text-primary">Inventory Entry</span>
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(27,28,28,0.06)] p-8 md:p-12"
        >
          <header className="mb-10 text-center md:text-left flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
                {editingItem ? 'Edit Item Registry' : 'New Item Registry'}
              </h1>
              <p className="text-on-surface-variant leading-relaxed">Document your assets with editorial precision. All fields are required for cataloging.</p>
            </div>
            {editingItem && (
              <button 
                onClick={onCancelEdit}
                className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
              >
                <X size={24} />
              </button>
            )}
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Dropdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Room Category</label>
                <select 
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary text-on-surface font-medium transition-all appearance-none"
                >
                  <option value="">Select Room</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Master Bedroom">Master Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Office">Office</option>
                  <option value="Guest Suite">Guest Suite</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Item Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary text-on-surface font-medium transition-all appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Decor">Decor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Item Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary text-on-surface font-medium transition-all placeholder:text-on-surface-variant/40" 
                placeholder="Detailed description of the item including brand, model, and condition..." 
                rows={4}
              />
            </div>

            {/* Purchase Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Date Purchased</label>
                <input 
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary text-on-surface font-medium transition-all" 
                  type="date" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Price (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface font-bold text-lg">₹</span>
                  <input 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-10 pr-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary text-on-surface font-medium transition-all placeholder:text-on-surface-variant/40" 
                    placeholder="0.00" 
                    type="number" 
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Item Photo</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              <AnimatePresence mode="wait">
                {imagePreview ? (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full aspect-video rounded-xl overflow-hidden group"
                  >
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="p-2 bg-error text-white rounded-full hover:scale-110 transition-transform"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 border-2 border-dashed border-outline-variant/30 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center gap-2 group cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    <Camera size={32} className="text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-semibold text-on-surface">Upload Item Photo</div>
                    <div className="text-xs text-on-surface-variant">PNG, JPG up to 10MB</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {editingItem ? 'Update Item' : 'Save Item'}
                <CheckCircle size={20} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Decorative Image for Context */}
      <motion.div 
        initial={{ opacity: 0, rotate: 10, x: 50 }}
        animate={{ opacity: 1, rotate: 3, x: 0 }}
        className="fixed bottom-12 right-12 hidden lg:block w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest"
      >
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF9oICuh81RXME09FUoluHOLb1ZEWIVrcZVEQoGozZbbY8zn-T8c7WFLFD3FhfTO9eFYV84GauYVsYvKU3VQR0cdbwPu8yuCbya8HLsIRzS8bIUkyazI9gZIDRbxDkLL6Z-ww8Dri_qsctHXNX17W_DbUt3wAYtM6ZlkxeIWmkR8a86J_s6F6BBGlr9uas0HNQXrqy71wsVXzmJ9GHL8gd-OvmbCFXUtaK8e9nAFphQ8BbqxxrAGdjUYDaGfdqOPepAdXnUT5gIA4" 
          alt="Interior Design" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
}
