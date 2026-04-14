import React, { useState } from 'react';
import { Home, MapPin, Building2, Save, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PropertyDetails } from '../types';
import { useToast } from './ToastContext';

export default function PropertyProfile({ data, onSave }: { data: PropertyDetails, onSave: (data: PropertyDetails) => void }) {
  const { showToast } = useToast();
  const [property, setProperty] = useState<PropertyDetails>(data);

  const propertyTypes = ['Bungalow', 'Row House', 'Room', 'Studio', 'Condo', 'Storage Unit', 'Commercial'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave(property);
      showToast('Property Profile Saved Successfully');
    } catch (error) {
      showToast('Failed to save property profile', 'error');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full px-8 py-12">
      <header className="mb-12">
        <nav className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-surface-container-lowest backdrop-blur-md shadow-sm border border-outline-variant/10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Registry</span>
          <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Property Identity</span>
        </nav>
        <h1 className="text-5xl font-serif font-bold tracking-tight text-on-surface mb-4">Property Identity</h1>
        <p className="text-on-surface-variant max-w-md leading-relaxed font-light italic-serif">Define the physical context of your asset registry for precise spatial categorization.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-[2.5rem] shadow-[0px_12px_32px_rgba(27,28,28,0.06)] p-10 md:p-16 border border-outline-variant/5"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Basic Info */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <Home size={20} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">General Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Property Nickname</label>
                    <input 
                      type="text"
                      placeholder="e.g., Main Residence"
                      className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                      value={property.name}
                      onChange={(e) => setProperty({ ...property, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Property Type</label>
                    <div className="relative">
                      <select 
                        className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface appearance-none cursor-pointer font-medium"
                        value={property.type}
                        onChange={(e) => setProperty({ ...property, type: e.target.value as any })}
                        required
                      >
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-on-surface-variant" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Address */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Physical Address</h3>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Street Address</label>
                    <input 
                      type="text"
                      placeholder="123 Luxury Lane"
                      className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                      value={property.address.street}
                      onChange={(e) => setProperty({ ...property, address: { ...property.address, street: e.target.value } })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">City</label>
                      <input 
                        type="text"
                        placeholder="Mumbai"
                        className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                        value={property.address.city}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, city: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">State / Province</label>
                      <input 
                        type="text"
                        placeholder="Maharashtra"
                        className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                        value={property.address.state}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, state: e.target.value } })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Zip / Postal Code</label>
                      <input 
                        type="text"
                        placeholder="400001"
                        className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                        value={property.address.zip}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, zip: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Country</label>
                      <input 
                        type="text"
                        placeholder="India"
                        className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                        value={property.address.country}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, country: e.target.value } })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full py-6 px-10 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  Save Property Details
                  <Save size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/5">
            <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-sm flex items-center justify-center mb-8 text-primary">
              <Building2 size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Spatial Context</h3>
            <p className="text-on-surface-variant leading-relaxed font-light italic-serif">
              Providing accurate property details helps in generating more precise insurance reports and spatial analytics for your inventory.
            </p>
          </div>

          <div className="bg-primary text-white rounded-[2rem] p-10 overflow-hidden relative">
            <h3 className="text-2xl font-bold mb-3 relative z-10">Institutional Grade</h3>
            <p className="text-white/70 leading-relaxed font-light relative z-10 italic-serif">
              Your property data is encrypted and stored according to institutional security standards.
            </p>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
