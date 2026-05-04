import React from 'react';
import { ShieldCheck, ArrowRight, Shield, CheckCircle2, ListChecks, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="max-w-[1200px] mx-auto px-8 pb-24">
      {/* Hero Section: Refined & Professional */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center py-24">
        <div className="flex flex-col items-start text-left">
          
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-serif font-bold tracking-tight text-on-surface mb-10 leading-[0.85]"
          >
            Curate Your <br />
            <span className="italic text-primary">Legacy</span> <br />
           
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-xl text-on-surface-variant leading-relaxed mb-14 font-light italic-serif"
          >
            Move beyond simple lists. InvenTree provides tracking of items for the modern household.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <button 
              onClick={onGetStarted} 
              className="px-12 py-5 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-4 group"
            >
              Begin Registry
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-20 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
          <div className="relative rounded-[4rem] overflow-hidden shadow-[0px_32px_64px_rgba(27,28,28,0.12)] border border-outline-variant/10 aspect-[4/5]">
            <img 
              className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
              alt="Luxury Interior"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 text-white shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary-container border border-white/10">
                  <ShieldCheck size={24} />
                </div>
            
              </div>
            
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Core Pillars Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
        {[
          {
            icon: <ListChecks className="text-primary" size={28} />,
            title: "Cataloging",
            desc: "Detailed metadata for every asset, from provenance to current market valuation."
          },
          
          {
            icon: <BarChart3 className="text-primary" size={28} />,
            title: "Intelligence",
            desc: "Analyze asset distribution across your properties."
          }
        ].map((pillar, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-12 bg-surface-container-low rounded-[3rem] border border-outline-variant/5 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 group"
          >
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              {pillar.icon}
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 tracking-tight">{pillar.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed font-light italic-serif opacity-80">{pillar.desc}</p>
          </motion.div>
        ))}
      </section>

     
    </div>
  );
}
