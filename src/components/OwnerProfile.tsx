import React, { useState } from 'react';
import { User, Users, Mail, Phone, Plus, Trash2, Save, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OwnerDetails, FamilyMember } from '../types';

export default function OwnerProfile({ data, onSave }: { data: OwnerDetails, onSave: (data: OwnerDetails) => void }) {
  const [owner, setOwner] = useState<OwnerDetails>(data);

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      relation: ''
    };
    setOwner({
      ...owner,
      familyMembers: [...owner.familyMembers, newMember]
    });
  };

  const removeFamilyMember = (id: string) => {
    setOwner({
      ...owner,
      familyMembers: owner.familyMembers.filter(m => m.id !== id)
    });
  };

  const updateFamilyMember = (id: string, field: keyof FamilyMember, value: string | number) => {
    setOwner({
      ...owner,
      familyMembers: owner.familyMembers.map(m => m.id === id ? { ...m, [field]: value } : m)
    });
  };

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(owner);
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
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner & Family</span>
        </nav>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Household Profile</h1>
        <p className="text-on-surface-variant max-w-md leading-relaxed">Manage the primary stakeholders and residents of this property.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-2xl shadow-[0px_12px_32px_rgba(27,28,28,0.06)] p-8 md:p-12 border border-outline-variant/5"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Primary Owner */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">Primary Owner Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                    <input 
                      type="text"
                      placeholder="Johnathan Doe"
                      className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                      value={owner.primaryOwner.name}
                      onChange={(e) => setOwner({ ...owner, primaryOwner: { ...owner.primaryOwner, name: e.target.value } })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
                        <input 
                          type="email"
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                          value={owner.primaryOwner.email}
                          onChange={(e) => setOwner({ ...owner, primaryOwner: { ...owner.primaryOwner, email: e.target.value } })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
                        <input 
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full pl-12 pr-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/40"
                          value={owner.primaryOwner.phone}
                          onChange={(e) => setOwner({ ...owner, primaryOwner: { ...owner.primaryOwner, phone: e.target.value } })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Family Members */}
              <section className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Users size={18} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Family Members</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={addFamilyMember}
                    className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/5 px-4 py-2 rounded-full transition-colors"
                  >
                    <Plus size={16} />
                    Add Member
                  </button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {owner.familyMembers.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-12 text-center bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant/20"
                      >
                        <p className="text-on-surface-variant/60 text-sm italic">No family members documented yet.</p>
                      </motion.div>
                    ) : (
                      owner.familyMembers.map((member) => (
                        <motion.div 
                          key={member.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/5"
                        >
                          <div className="md:col-span-5 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Name</label>
                            <input 
                              type="text"
                              placeholder="Member Name"
                              className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface text-sm"
                              value={member.name}
                              onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-4 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Relation</label>
                            <input 
                              type="text"
                              placeholder="e.g., Spouse, Child"
                              className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface text-sm"
                              value={member.relation}
                              onChange={(e) => updateFamilyMember(member.id, 'relation', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Age</label>
                            <input 
                              type="number"
                              placeholder="Age"
                              className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface text-sm"
                              value={member.age || ''}
                              onChange={(e) => updateFamilyMember(member.id, 'age', parseInt(e.target.value))}
                            />
                          </div>
                          <div className="md:col-span-1 flex justify-end">
                            <button 
                              type="button"
                              onClick={() => removeFamilyMember(member.id)}
                              className="p-3 text-error hover:bg-error/10 rounded-xl transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full py-4 px-8 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Save Household Profile
                  <Save size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-primary">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Privacy First</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed font-light">
              Family details are used exclusively for emergency documentation and insurance verification. We never share your personal data.
            </p>
          </div>

          <div className="p-8 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-on-surface-variant">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Residents</span>
                <span className="text-sm font-bold">{1 + owner.familyMembers.length}</span>
              </div>
              <div className="h-px bg-outline-variant/20"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Profile Status</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
