import React, { useState, useRef } from 'react';
import { ChevronRight, Camera, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem } from '../types';
import { useToast } from './ToastContext';

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
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(editingItem?.imageUrl || null);
  const [formData, setFormData] = useState({
    room: editingItem?.room || '',
    category: editingItem?.category || '',
    description: editingItem?.description || '',
    purchaseDate: editingItem?.purchaseDate || '',
    price: editingItem?.price.toString() || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      if (file.size > 10 * 1024 * 1024) {
        showToast('Image size must be less than 10MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.room) newErrors.room = 'Room category is required';
    if (!formData.category) newErrors.category = 'Item category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
    if (!formData.price || isNaN(parseFloat(formData.price))) newErrors.price = 'Valid price is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill in all required fields correctly', 'error');
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

    try {
      if (editingItem) {
        onUpdateItem(itemData);
        showToast('Item Updated Successfully');
      } else {
        onAddItem(itemData);
        showToast('Item Registered Successfully');
      }

      setFormData({
        room: '',
        category: '',
        description: '',
        purchaseDate: '',
        price: ''
      });
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      showToast('Failed to save item', 'error');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6 sm:p-12 relative min-h-[calc(100vh-128px)]">
      {/* Abstract Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl">
        {/* Glassmorphic Breadcrumb */}
        <div className="mb-8 flex justify-center">
          <div className="bg-surface/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-outline-variant/10 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            <span>InvenTree</span>
            <ChevronRight size={12} className="text-on-surface-variant/30" />
            <span className="text-primary">Inventory Entry</span>
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest rounded-[2.5rem] shadow-[0px_12px_32px_rgba(27,28,28,0.06)] p-10 md:p-16 border border-outline-variant/5"
        >
          <header className="mb-12 text-center md:text-left flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-serif font-bold tracking-tight text-on-surface mb-4">
                {editingItem ? 'Edit Registry' : 'New Registry'}
              </h1>
              <p className="text-on-surface-variant leading-relaxed font-light italic-serif max-w-md">Document your assets with editorial precision. All fields are required for cataloging.</p>
            </div>
            {editingItem && (
              <button 
                onClick={onCancelEdit}
                className="p-4 hover:bg-surface-container-low rounded-full transition-all active:scale-90 text-on-surface-variant"
              >
                <X size={24} />
              </button>
            )}
          </header>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Dropdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Room Category</label>
                <select 
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className={`w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-all appearance-none cursor-pointer ${errors.room ? 'ring-2 ring-error/20' : ''}`}
                >
                  <option value="">Select Room</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Master Bedroom">Master Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Office">Office</option>
                  <option value="Guest Suite">Guest Suite</option>
                </select>
                {errors.room && <p className="text-[10px] text-error font-bold uppercase tracking-widest ml-1">{errors.room}</p>}
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Item Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-all appearance-none cursor-pointer ${errors.category ? 'ring-2 ring-error/20' : ''}`}
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Decor">Decor</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="text-[10px] text-error font-bold uppercase tracking-widest ml-1">{errors.category}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Item Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-all placeholder:text-on-surface-variant/40 ${errors.description ? 'ring-2 ring-error/20' : ''}`} 
                placeholder="Detailed description of the item including brand, model, and condition..." 
                rows={4}
              />
              {errors.description && <p className="text-[10px] text-error font-bold uppercase tracking-widest ml-1">{errors.description}</p>}
            </div>

            {/* Purchase Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Date Purchased</label>
                <input 
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  className={`w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-all ${errors.purchaseDate ? 'ring-2 ring-error/20' : ''}`} 
                  type="date" 
                />
                {errors.purchaseDate && <p className="text-[10px] text-error font-bold uppercase tracking-widest ml-1">{errors.purchaseDate}</p>}
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Price (INR)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/50 font-bold text-lg">₹</span>
                  <input 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full bg-surface-container-low border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-all placeholder:text-on-surface-variant/40 ${errors.price ? 'ring-2 ring-error/20' : ''}`} 
                    placeholder="0.00" 
                    type="number" 
                  />
                </div>
                {errors.price && <p className="text-[10px] text-error font-bold uppercase tracking-widest ml-1">{errors.price}</p>}
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Item Photo</label>
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
                    className="relative w-full aspect-video rounded-3xl overflow-hidden group border border-outline-variant/10 shadow-lg"
                  >
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button 
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="p-4 bg-error text-white rounded-full hover:scale-110 transition-all shadow-2xl active:scale-95"
                      >
                        <X size={28} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-16 border-2 border-dashed border-outline-variant/30 rounded-3xl bg-surface-container-low flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    <div className="w-20 h-20 rounded-[2rem] bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-md transition-all">
                      <Camera size={36} />
                    </div>
                    <div className="text-sm font-bold text-on-surface uppercase tracking-[0.2em]">Upload Item Photo</div>
                    <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">PNG, JPG up to 10MB</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-6 px-10 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                {editingItem ? 'Update Registry' : 'Save to Registry'}
                <CheckCircle size={20} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
