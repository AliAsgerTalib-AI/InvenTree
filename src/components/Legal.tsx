import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Shield, Info, ArrowLeft } from 'lucide-react';

interface LegalProps {
  onBack: () => void;
  initialSection?: 'about' | 'privacy' | 'contact';
}

export default function Legal({ onBack, initialSection = 'about' }: LegalProps) {
  const [section, setSection] = React.useState(initialSection);

  const sections = [
    { id: 'about', label: 'About', icon: <Info size={16} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="px-8 py-12 max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Return to App
        </button>
        <div className="flex gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id as any)}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${section === s.id ? 'text-primary border-primary' : 'text-on-surface-variant/50 border-transparent hover:text-on-surface-variant'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow max-w-[800px] mx-auto w-full px-8 pb-24">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {section === 'about' && (
            <div className="space-y-8">
              <h2 className="text-6xl font-serif font-bold tracking-tight text-on-surface">Our Genesis.</h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg font-light italic-serif">
                <p>
                  InvenTree was born from a simple observation: the objects we surround ourselves with are more than just physical assets—they are markers of our history, our tastes, and our legacy.
                </p>
                <p>
                  We built this platform to bring the precision of institutional asset management to the private household. Every pixel, every interaction, and every data point is designed to provide clarity and peace of mind.
                </p>
                <p>
                  Our mission is to help you document, organize, and protect your physical world with elegance and intelligence.
                </p>
              </div>
              <div className="pt-12 grid grid-cols-2 gap-8 border-t border-outline-variant/10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Philosophy</h4>
                  <p className="text-sm text-on-surface-variant">Precision over clutter. Intelligence over intuition.</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Vision</h4>
                  <p className="text-sm text-on-surface-variant">The definitive standard for private asset custody.</p>
                </div>
              </div>
            </div>
          )}

          {section === 'privacy' && (
            <div className="space-y-8">
              <h2 className="text-6xl font-serif font-bold tracking-tight text-on-surface">Data Sovereignty.</h2>
              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-on-surface flex items-center gap-3">
                    <Shield className="text-primary" size={24} />
                    Your Privacy is Absolute
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    We adhere to the principle of Zero-Knowledge whenever possible. Your inventory data is yours alone. We do not sell, share, or monetize your personal household records.
                  </p>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-on-surface">Data Collection</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    We collect only what is necessary to provide the service: authentication details via Google and the data you explicitly provide in your inventory.
                  </p>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-on-surface">Encryption & Security</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    All data is transmitted via secure channels and stored in enterprise-grade databases provided by Google Cloud Platform.
                  </p>
                </section>
              </div>
            </div>
          )}

          {section === 'contact' && (
            <div className="space-y-8">
              <h2 className="text-6xl font-serif font-bold tracking-tight text-on-surface">Connect with Us.</h2>
              <p className="text-lg text-on-surface-variant font-light italic-serif">
                Whether you have a question about our methodology or require assistance with your account, our team is at your disposal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
                  <Mail className="text-primary mb-6 transition-transform group-hover:scale-110" size={32} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">Email Liaison</h4>
                  <p className="text-xl font-serif font-bold text-on-surface">support@inventree.co</p>
                </div>
                <div className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
                  <Phone className="text-primary mb-6 transition-transform group-hover:scale-110" size={32} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">Direct Line</h4>
                  <p className="text-xl font-serif font-bold text-on-surface">+1 (888) INVENTREE</p>
                </div>
                <div className="md:col-span-2 p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm flex items-center gap-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">Global Headquarters</h4>
                    <p className="text-lg font-serif font-bold text-on-surface">One Silicon Valley, Palo Alto, CA 94301</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
