import React, { useState } from 'react';
import { Home, MapPin, Building2, Save, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PropertyDetails } from '../types';

export default function PropertyProfile({ data, onSave }: { data: PropertyDetails, onSave: (data: PropertyDetails) => void }) {
  const [property, setProperty] = useState<PropertyDetails>(data);

  const propertyTypes = ['Bungalow', 'Row House', 'Room', 'Studio', 'Condo', 'Storage Unit', 'Commercial'];

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(property);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full px-8 py-12">
      <AnimatePresence>
        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
          >
            <ShieldCheck size={20} />
            Profile Saved Successfully
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12">
        <nav className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-surface-container-lowest backdrop-blur-md shadow-sm border border-outline-variant/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Profile</span>
          <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Property Details</span>
        </nav>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Property Profile</h1>
        <p className="text-on-surface-variant max-w-md leading-relaxed">Define the physical context of your asset registry.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-2xl shadow-[0px_12px_32px_rgba(27,28,28,0.06)] p-8 md:p-12 border border-outline-variant/5"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Info */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Home size={18} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">General Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Property Nickname</label>
                    <input 
                      type="text"
                      placeholder="e.g., Main Residence"
                      className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                      value={property.name}
                      onChange={(e) => setProperty({ ...property, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Property Type</label>
                    <select 
                      className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface appearance-none cursor-pointer"
                      value={property.type}
                      onChange={(e) => setProperty({ ...property, type: e.target.value as any })}
                      required
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Address */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={18} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">Physical Address</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Street Address</label>
                    <input 
                      type="text"
                      placeholder="123 Luxury Lane"
                      className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                      value={property.address.street}
                      onChange={(e) => setProperty({ ...property, address: { ...property.address, street: e.target.value } })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">City</label>
                      <input 
                        type="text"
                        placeholder="Mumbai"
                        className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                        value={property.address.city}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, city: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">State / Province</label>
                      <input 
                        type="text"
                        placeholder="Maharashtra"
                        className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                        value={property.address.state}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, state: e.target.value } })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Zip / Postal Code</label>
                      <input 
                        type="text"
                        placeholder="400001"
                        className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                        value={property.address.zip}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, zip: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Country</label>
                      <input 
                        type="text"
                        placeholder="India"
                        className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                        value={property.address.country}
                        onChange={(e) => setProperty({ ...property, address: { ...property.address, country: e.target.value } })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full py-4 px-8 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Save Property Details
                  <Save size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-primary">
              <Building2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Spatial Context</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed font-light">
              Providing accurate property details helps in generating more precise insurance reports and spatial analytics for your inventory.
            </p>
          </div>

          <div className="bg-primary text-white rounded-2xl p-8 overflow-hidden relative">
            <h3 className="text-xl font-bold mb-2 relative z-10">Institutional Grade</h3>
            <p className="text-white/70 text-sm font-light relative z-10">
              Your property data is encrypted and stored according to institutional security standards.
            </p>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
