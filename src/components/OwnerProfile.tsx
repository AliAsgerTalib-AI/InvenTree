import React, { useState } from 'react';
import { User, Users, Mail, Phone, Plus, Trash2, Save, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OwnerDetails, FamilyMember } from '../types';
import { useToast } from './ToastContext';

export default function OwnerProfile({ data, onSave }: { data: OwnerDetails, onSave: (data: OwnerDetails) => void }) {
  const { showToast } = useToast();
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
    showToast('Family member added to list', 'info');
  };

  const removeFamilyMember = (id: string) => {
    setOwner({
      ...owner,
      familyMembers: owner.familyMembers.filter(m => m.id !== id)
    });
    showToast('Family member removed', 'info');
  };

  const updateFamilyMember = (id: string, field: keyof FamilyMember, value: string | number) => {
    setOwner({
      ...owner,
      familyMembers: owner.familyMembers.map(m => m.id === id ? { ...m, [field]: value } : m)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave(owner);
      showToast('Household Profile Saved Successfully');
    } catch (error) {
      showToast('Failed to save household profile', 'error');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full px-8 py-12">
      <header className="mb-12">
        <nav className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-surface-container-lowest backdrop-blur-md shadow-sm border border-outline-variant/10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Registry</span>
          <ChevronRight size={12} className="mx-2 text-on-surface-variant/50" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Household Identity</span>
        </nav>
        <h1 className="text-5xl font-serif font-bold tracking-tight text-on-surface mb-4">Household Profile</h1>
        <p className="text-on-surface-variant max-w-md leading-relaxed font-light italic-serif">Manage the primary stakeholders and residents of this property for comprehensive registry ownership.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-[2.5rem] shadow-[0px_12px_32px_rgba(27,28,28,0.06)] p-10 md:p-16 border border-outline-variant/5"
          >
            <form onSubmit={handleSubmit} className="space-y-16">
              {/* Primary Owner */}
              <section className="space-y-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Primary Owner Details</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Full Name</label>
                    <input 
                      type="text"
                      placeholder="Johnathan Doe"
                      className="w-full px-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                      value={owner.primaryOwner.name}
                      onChange={(e) => setOwner({ ...owner, primaryOwner: { ...owner.primaryOwner, name: e.target.value } })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30" size={20} />
                        <input 
                          type="email"
                          placeholder="john@example.com"
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
                          value={owner.primaryOwner.email}
                          onChange={(e) => setOwner({ ...owner, primaryOwner: { ...owner.primaryOwner, email: e.target.value } })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30" size={20} />
                        <input 
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30 font-medium"
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
              <section className="space-y-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <Users size={20} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Family Members</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={addFamilyMember}
                    className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 px-6 py-3 rounded-full transition-colors border border-primary/10"
                  >
                    <Plus size={16} />
                    Add Member
                  </button>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {owner.familyMembers.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-16 text-center bg-surface-container-low/30 rounded-[2rem] border border-dashed border-outline-variant/20"
                      >
                        <p className="text-on-surface-variant/60 text-sm italic-serif">No family members documented yet.</p>
                      </motion.div>
                    ) : (
                      owner.familyMembers.map((member) => (
                        <motion.div 
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end bg-surface-container-low/50 p-8 rounded-[2rem] border border-outline-variant/5 group"
                        >
                          <div className="md:col-span-5 space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Name</label>
                            <input 
                              type="text"
                              placeholder="Member Name"
                              className="w-full px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium"
                              value={member.name}
                              onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-4 space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Relation</label>
                            <input 
                              type="text"
                              placeholder="e.g., Spouse, Child"
                              className="w-full px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium"
                              value={member.relation}
                              onChange={(e) => updateFamilyMember(member.id, 'relation', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant ml-1">Age</label>
                            <input 
                              type="number"
                              placeholder="Age"
                              className="w-full px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium"
                              value={member.age || ''}
                              onChange={(e) => updateFamilyMember(member.id, 'age', parseInt(e.target.value))}
                            />
                          </div>
                          <div className="md:col-span-1 flex justify-end">
                            <button 
                              type="button"
                              onClick={() => removeFamilyMember(member.id)}
                              className="p-4 text-error hover:bg-error/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full py-6 px-10 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  Save Household Profile
                  <Save size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/5">
            <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-sm flex items-center justify-center mb-8 text-primary">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Privacy First</h3>
            <p className="text-on-surface-variant leading-relaxed font-light italic-serif">
              Family details are used exclusively for emergency documentation and insurance verification. We never share your personal data.
            </p>
          </div>

          <div className="p-10 bg-surface-container-highest rounded-[2rem] border border-outline-variant/10">
            <h4 className="text-[10px] font-bold mb-8 uppercase tracking-[0.3em] text-on-surface-variant">Household Statistics</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant font-light italic-serif">Total Residents</span>
                <span className="text-xl font-serif font-bold">{1 + owner.familyMembers.length}</span>
              </div>
              <div className="h-px bg-outline-variant/20"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant font-light italic-serif">Registry Status</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
