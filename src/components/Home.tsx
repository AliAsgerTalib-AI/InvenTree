import React from 'react';
import { ShieldCheck, ArrowRight, Shield, CheckCircle2, ListChecks, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="max-w-[1200px] mx-auto px-8 pb-24">
      {/* Hero Section: Refined & Professional */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-24">
        <div className="flex flex-col items-start text-left">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-primary/10"
          >
            <Shield size={12} />
            Institutional Grade Asset Registry
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-light tracking-tight text-on-surface mb-8 leading-[1.1]"
          >
            Curate Your <br />
            <span className="font-serif italic text-primary">Legacy</span> with <br />
            Precision.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-lg text-on-surface-variant leading-relaxed mb-12 font-light"
          >
            Move beyond simple lists. InvenTree provides insurance-grade tracking of all items for the modern household, blending institutional security with effortless design.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <button 
              onClick={onGetStarted} 
              className="px-10 py-4 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center gap-2"
            >
              Begin Registry
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-outline-variant/10 aspect-[4/5]">
            <img 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
              alt="Luxury Interior"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={20} className="text-primary-container" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified Documentation</span>
              </div>
              <p className="text-sm font-light opacity-90">Your assets are cataloged to meet 98% of institutional insurance requirements.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Core Pillars Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {[
          {
            icon: <ListChecks className="text-primary" />,
            title: "Precise Cataloging",
            desc: "Detailed metadata for every asset, from provenance to current market valuation."
          },
          {
            icon: <ShieldCheck className="text-primary" />,
            title: "Insurance Ready",
            desc: "Generate high-fidelity reports designed for immediate insurance claim processing."
          },
          {
            icon: <BarChart3 className="text-primary" />,
            title: "Spatial Intelligence",
            desc: "Analyze asset distribution across your properties with intuitive spatial mapping."
          }
        ].map((pillar, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-surface-container-low rounded-[2rem] border border-outline-variant/5 hover:border-primary/20 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
              {pillar.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">{pillar.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed font-light">{pillar.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trust Banner */}
      <section className="py-16 border-y border-outline-variant/10 flex flex-col items-center text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-8">Trusted by Modern Homeowners</span>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
          <CheckCircle2 size={32} />
          <CheckCircle2 size={32} />
          <CheckCircle2 size={32} />
          <CheckCircle2 size={32} />
        </div>
      </section>
    </div>
  );
}
