/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'motion/react';
import { 
  Rocket, 
  ShieldCheck, 
  Users, 
  Globe, 
  TrendingUp, 
  Search, 
  Layers, 
  MessageCircle, 
  Zap,
  ArrowRight,
  ChevronRight,
  Menu,
  Sparkles,
  Share2,
  Briefcase,
  Code,
  Mail,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  Phone,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Bot
} from 'lucide-react';
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { getAIResponse } from './services/aiService';
import knowledgeBase from './data/knowledgeBase.json';

// Brand Image URL (placeholder based on description or provided image if hosted)
const BRAND_ICON_URL = "https://picsum.photos/seed/cirqle-brand/200/200"; // Placeholder icon

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <a 
    href={href} 
    className="text-xs font-medium text-slate-400 hover:text-brand-blue transition-colors duration-200 uppercase tracking-widest"
  >
    {children}
  </a>
);

interface CardProps {
  title: string;
  description: string;
  icon: any;
  items: string[];
  key?: any;
}

const SectionHeading = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => (
  <div className="mb-14">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-brand-blue text-[9px] font-black tracking-[0.5em] uppercase mb-5"
      >
        // {subtitle} //
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-[1.1]"
    >
      {children}
    </motion.h2>
  </div>
);

const CountingNumber = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });
  const displayValue = useTransform(springValue, (latest) => 
    `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const WhatsAppPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-24 right-6 md:right-8 z-[60] w-[calc(100vw-48px)] max-w-[320px] glass bg-slate-950/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Direct Contact</h4>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={16} /></button>
      </div>
      <div className="space-y-4">
        <a href={`mailto:${knowledgeBase.contacts.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-brand-blue/10 border border-white/5 group transition-all">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-blue shadow-sm"><Mail size={18} /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Email</p>
            <p className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">intelligence@cirqlelabs.com</p>
          </div>
        </a>
        <a href={`tel:${knowledgeBase.contacts.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-brand-blue/10 border border-white/5 group transition-all">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-blue shadow-sm"><Phone size={18} /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Contact</p>
            <p className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">+1 (555) 000-8888</p>
          </div>
        </a>
        <a href={`https://wa.me/${knowledgeBase.contacts.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 group transition-all">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#25D366] shadow-sm"><MessageCircle size={18} /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#25D366]/60 mb-0.5">WhatsApp</p>
            <p className="text-xs font-bold text-white">Start Conversation</p>
          </div>
        </a>
      </div>
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ title, description, icon: Icon, items }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass p-8 rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 text-brand-blue border border-brand-blue/20">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-black mb-3 text-white uppercase tracking-tight">{title}</h3>
    <p className="text-slate-400 mb-6 text-sm leading-relaxed font-inter">{description}</p>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-500">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue/40 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle glassmorphism background trigger
      setIsScrolled(currentScrollY > 20);

      // Handle show/hide on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-brand-blue/20 cursor-default relative overflow-hidden">
      {/* Aesthetic Grain Overlay */}
      <div className="fixed inset-0 grain pointer-events-none z-50 opacity-20" />
      
      {/* Figma-Style Background Dynamics - static for performance */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-brand-blue/10 blur-[140px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-purple/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)]" />
      </div>

      {/* Floating Action Center center */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] flex flex-col gap-4 items-end">
        <WhatsAppPopup isOpen={isWhatsappOpen} onClose={() => setIsWhatsappOpen(false)} />

        <motion.button
          onClick={() => {
            setIsWhatsappOpen(!isWhatsappOpen);
          }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl cursor-pointer transition-all overflow-hidden ${isWhatsappOpen ? 'bg-slate-800 text-white border border-white/20' : 'bg-white/10 backdrop-blur-md border border-white/10'}`}
          title="Contact us"
        >
          {isWhatsappOpen ? <X size={20} /> : <img src="/assets/images/cirqlelabs1.png" alt="CirqleLabs" className="w-full h-full object-contain p-1" />}
        </motion.button>
      </div>

      {/* Mobile Menu: Sophisticated Floating Drawer */}
      <motion.div 
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: 'auto' },
          closed: { opacity: 0, pointerEvents: 'none' }
        }}
        className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-sm md:hidden"
        onClick={() => setIsMenuOpen(false)}
      >
        <motion.div 
          onClick={(e) => e.stopPropagation()}
          variants={{
            open: { y: 0, opacity: 1, scale: 1 },
            closed: { y: -20, opacity: 0, scale: 0.95 }
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute top-6 left-6 right-6 bg-slate-900/90 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-extrabold text-[10px] uppercase tracking-[0.3em] text-brand-blue">Navigation</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/5"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { name: 'The Foundry', href: '#foundry' },
              { name: 'Venture Vault', href: '#vault' },
              { name: 'The Cirqle', href: '#cirqle' }
            ].map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={false}
                animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-[0.2em] text-white/80 hover:text-brand-blue transition-colors flex items-center justify-between group py-2"
              >
                {item.name}
                <ChevronRight size={14} className="text-slate-700 group-hover:text-brand-blue transition-colors" />
              </motion.a>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px]"
            >
              Connect
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Nav: Ultra-Minimal Apple-Style */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-12 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 mt-6 ${isScrolled ? 'bg-white/5 backdrop-blur-xl border border-white/10 py-3 px-6 md:px-8 rounded-full shadow-2xl' : 'bg-transparent py-4 border border-transparent'}`}>
          <div className="flex items-center gap-3">
            <img src="/assets/images/cirqlelabs1.png" alt="CirqleLabs Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
            <span className={`font-maharlika text-lg md:text-xl tracking-tighter uppercase shrink-0 transition-colors ${isScrolled ? 'text-white' : 'text-brand-blue'}`}>CirqleLabs</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#foundry">The Foundry</NavItem>
            <NavItem href="#vault">Venture Vault</NavItem>
            <NavItem href="#cirqle">The Cirqle</NavItem>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:block px-6 py-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${isScrolled ? 'bg-brand-blue text-white' : 'bg-white text-slate-900 hover:bg-brand-blue hover:text-white'}`}
            >
              Connect
            </motion.button>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero: Immersive Centerpiece */}
      <section className="relative min-h-[90vh] flex items-center pt-32 md:pt-48 pb-12 px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/80 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.08),transparent_60%)]" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <motion.div 
            style={{ opacity, scale }}
            className="max-w-5xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-[6.5rem] lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] mb-10 md:mb-12 text-white"
            >
              Connecting Visionaries, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-indigo pr-4">Igniting Ventures.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mb-14 leading-relaxed font-inter mx-auto"
            >
              We are architects of opportunity, cultivating a thriving ecosystem that emboldens startups,
              entrepreneurs, investors and mentors to shape the future of business evolution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Section: Refined side-by-side */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#020617] relative overflow-hidden" id="cirqle">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <SectionHeading>
                The ultimate fusion reactor of entrepreneurial brilliance
              </SectionHeading>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-inter">
                Our community thrives on a global stage. We have crafted a worldwide network of 
                innovation, uniting trailblazing entrepreneurs, sage advisors and strategic investors 
                under one virtual roof.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Members", value: 8642 },
                  { label: "Chapters", value: 18 },
                ].map((stat, i) => (
                  <div key={i} className="border-l-2 border-brand-blue pl-6">
                    <div className="text-4xl font-black text-white mb-1">
                      <CountingNumber value={stat.value} suffix="+" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-brand-blue/5 blur-[120px] -z-10" />
              {[
                { title: "Neural", icon: Rocket, gradient: "from-blue-900/40 to-transparent", border: "border-blue-500/20", desc: "Proprietary intelligence engines accelerating venture velocity.", status: "Active" },
                { title: "Hybrid", icon: Zap, gradient: "from-purple-900/40 to-transparent", border: "border-purple-500/20", desc: "Unified capital models bridging digital and physical assets.", status: "Live" },
                { title: "Secure", icon: ShieldCheck, gradient: "from-indigo-900/40 to-transparent", border: "border-indigo-500/20", desc: "Encrypted architecture protecting cross-border IP.", status: "Secured" },
                { title: "Global", icon: Users, gradient: "from-emerald-900/40 to-transparent", border: "border-emerald-500/20", desc: "Synchronous access to world-class sector masters.", status: "Connected" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`glass bg-gradient-to-br ${item.gradient} ${item.border} p-6 rounded-[1.8rem] transition-all duration-500 hover:shadow-2xl flex flex-col items-start`}
                >
                  <div className="flex justify-between items-center w-full mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white shadow-sm border border-white/10 font-bold">
                      <item.icon size={16} strokeWidth={2.5} />
                    </div>
                    <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-black text-[9px] uppercase tracking-[0.4em] mb-2 text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 font-inter leading-relaxed mb-6 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="mt-auto w-full flex items-center justify-between group cursor-pointer pt-4 border-t border-white/5">
                    <span className="text-[8px] font-black text-brand-blue uppercase tracking-widest">Detail View</span>
                    <ArrowRight size={10} className="text-brand-blue transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foundry: Modular Accelerated Journey */}
      <section className="py-16 md:py-28 px-6 md:px-12 bg-[#020617]/50 relative" id="foundry">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <SectionHeading>
              The Foundry<br/>
              <span className="text-base md:text-xl font-medium text-slate-400 normal-case tracking-normal">
                A structured pathway connecting startups with accelerators, execution partners, and programs aligned to their stage and growth trajectory.
              </span>
            </SectionHeading>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10 rounded-[2.5rem] overflow-hidden bg-[#020617]/40 backdrop-blur-sm shadow-2xl">
            {[
              {
                title: "Smart matching with accelerators and incubators aligned to your vision",
                bullets: [
                  "AI-driven discovery engine maps startups to relevant accelerator and incubator programs",
                  "Semantic matching based on sector signals, stage, and founder intent",
                  "Filters and ranks opportunities using contextual fit scoring"
                ]
              },
              {
                title: "Tailored recommendations based on stage, sector and growth trajectory",
                bullets: [
                  "Machine learning models assess startup maturity and sector positioning",
                  "Dynamic recommendation system adapts to traction and growth signals",
                  "Predictive matching to high-probability success pathways"
                ]
              },
              {
                title: "Structured guidance to navigate and scale your venture",
                bullets: [
                  "AI-assisted roadmap generation across key growth milestones",
                  "Embedded knowledge layer for funding, scaling, and market entry",
                  "Decision-support tooling for execution bottlenecks"
                ]
              },
              {
                title: "Centralised startup profile to manage applications and visibility",
                bullets: [
                  "Unified startup data layer for applications, tracking, and investor visibility",
                  "Real-time updates across ecosystem engagements",
                  "Integrated visibility engine for discovery by investors and partners"
                ]
              }
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                className={`p-10 md:p-12 transition-all duration-500 group flex flex-col h-full ${
                  idx !== 3 ? 'border-b sm:border-b-0 lg:border-r border-white/5' : ''
                } hover:bg-white/5`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-xs font-black tracking-[0.4em] text-brand-blue uppercase bg-brand-blue/10 px-3 py-1 rounded-full">
                    Phase 0{idx + 1}
                  </div>
                </div>
                <h4 className="text-white font-bold mb-6 text-xl leading-relaxed font-inter">{phase.title}</h4>
                <ul className="space-y-4 mb-8">
                  {phase.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-base text-slate-400 leading-relaxed">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-blue/60 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                    <div className="w-12 h-0.5 bg-white/10 group-hover:bg-brand-blue transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venture Vault Section */}
      <section className="py-16 md:py-28 px-6 md:px-12 bg-[#020617]" id="vault">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <SectionHeading>
              Venture Vault<br/>
              <span className="text-base md:text-xl font-medium text-slate-400 normal-case tracking-normal">
                Discover the next generation of high-potential startups
              </span>
            </SectionHeading>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-0 border border-white/10 rounded-[2.5rem] overflow-hidden bg-[#020617]/40 backdrop-blur-sm shadow-2xl">
            {[
              {
                title: "Curated directory of emerging and innovative startups",
                bullets: [
                  "Continuously updated database of early-stage startups across key sectors",
                  "Structured tagging by industry, stage, and innovation category",
                  "Ranked visibility based on traction and relevance signals"
                ]
              },
              {
                title: "Early visibility into upcoming ventures before public launch",
                bullets: [
                  "Access to startups pre-market through founder onboarding and early listings",
                  "Detection of emerging ventures from early signals and ecosystem activity",
                  "Deal flow pipeline before public fundraising exposure"
                ]
              },
              {
                title: "Insights into emerging industries and future market trends",
                bullets: [
                  "Aggregated startup and funding activity across sectors and regions",
                  "Identification of high-growth and emerging verticals through market patterns",
                  "Trend briefs derived from ecosystem movement and investment flows"
                ]
              },
              {
                title: "Expert perspectives to support informed investment decisions",
                bullets: [
                  "Curated insights from investors, operators, and domain specialists",
                  "Structured market commentary to support due diligence and evaluation",
                  "Comparative analysis of sectors, startups, and opportunity areas"
                ]
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`p-10 md:p-12 transition-all duration-500 group flex flex-col h-full bg-[#020617]/20 hover:bg-white/5 border-white/5 ${
                  idx < 2 ? 'lg:border-b' : ''
                } ${
                  idx % 2 === 0 ? 'lg:border-r' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center text-xs font-black group-hover:bg-brand-blue transition-colors">
                    {idx + 1}
                  </div>
                </div>
                <h4 className="text-white font-bold mb-4 normal-case text-xl tracking-tight">{item.title}</h4>
                <ul className="space-y-4 mb-8">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-base text-slate-400 leading-relaxed">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-blue/60 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue flex items-center gap-2">
                        Analyze Opportunity <ArrowRight size={12} />
                    </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Cirqle: Exclusive Governance & Network */}
      <section className="py-16 md:py-28 px-6 md:px-12 relative bg-[#020617] overflow-hidden" id="cirqle">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.08),transparent)] pointer-events-none" />
        {/* Static background aesthetics */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -left-20 w-[30rem] h-[30rem] bg-brand-indigo/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading>
            The Cirqle<br/>
            <span className="text-base md:text-xl font-medium text-slate-400 normal-case tracking-normal">
              A network for capital and venture execution
            </span>
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                title: "Engage founders, investors and advisors actively deploying capital across emerging ventures",
                bullets: [
                  "Direct access to active capital allocators and ecosystem builders",
                  "Real-time engagement with founders and investors in live deal environments",
                  "Exposure to ongoing investment and execution activity"
                ]
              },
              {
                title: "Access curated investor networks and high-quality venture deal flow",
                bullets: [
                  "Filtered investor network based on sector and stage focus",
                  "Curated pipeline of vetted, investment-ready opportunities",
                  "Reduced noise through pre-qualified deal flow"
                ]
              },
              {
                title: "Join a vetted network of founders, investors and industry practitioners",
                bullets: [
                  "Verified ecosystem membership across founders and investors",
                  "Structured community of active market participants",
                  "Trust-based network with relevance filtering"
                ]
              },
              {
                title: "Participate in high-signal discussions on execution, scaling and capital allocation",
                bullets: [
                  "Focused conversations on growth, operations and funding strategy",
                  "Practitioner-led insights from real-world experience",
                  "Signal-rich exchange over general discussion noise"
                ]
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 group-hover:bg-white/10" />
                <div className="relative p-10 md:p-12 h-full flex flex-col">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-blue transition-colors duration-500">
                    <span className="text-brand-blue font-black text-base group-hover:text-white transition-colors duration-500">
                      <CountingNumber value={idx + 1} prefix="0" />
                    </span>
                  </div>
                  <h4 className="text-white text-2xl font-bold font-inter leading-relaxed mb-6">
                    {item.title}
                  </h4>
                  <ul className="space-y-4 mb-8">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-base text-slate-400 leading-relaxed">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-blue/60 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-brand-blue transition-colors">
                    Join Network <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA: Final Movement */}
      <section className="py-16 md:py-28 px-6 md:px-12 bg-[#020617]" id="cta">
        <div className="relative max-w-4xl mx-auto text-center border border-white/10 p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_60%)]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent -z-10" />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-white leading-tight decoration-brand-blue decoration-4 underline-offset-8">
            Join the <br/>movement.
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-10 md:mb-14 max-w-xl mx-auto leading-relaxed font-inter">
            Reserve your place in the world’s most dynamic community and be part of the momentum shaping
            the future of entrepreneurship.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all"
          >
            Join
          </motion.button>
        </div>
      </section>

      {/* Expanded Footer */}
      <footer className="pt-24 pb-12 px-6 md:px-12 border-t border-white/5 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden rounded-2xl">
                  <img src="/assets/images/cirqlelabs1.png" alt="CirqleLabs" className="w-full h-full object-contain" />
                </div>
                <span className="font-maharlika text-2xl tracking-tighter text-brand-blue uppercase">CirqleLabs</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Architects of opportunity, cultivating a global ecosystem for startups and investors.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-all border border-white/5" title="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-all border border-white/5" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-all border border-white/5" title="Facebook">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8">Quicklinks</h4>
              <ul className="space-y-4">
                {['Foundry', 'Vault', 'The Cirqle'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-slate-400 text-sm hover:text-brand-blue transition-colors flex items-center gap-2 group">
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link === 'Vault' ? 'Venture Vault' : link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8">Contacts</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <Mail size={16} className="text-brand-blue mt-0.5" />
                  <span>intelligence@cirqlelabs.com</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <Globe size={16} className="text-brand-blue mt-0.5" />
                  <span>Global Operations Center</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <Phone size={16} className="text-brand-blue mt-0.5" />
                  <span>+1 (555) 000-8888</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8">Subscribe</h4>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">Join 8,000+ visionaries receiving our weekly intelligence report.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-brand-blue/30 transition-colors text-white placeholder:text-slate-500"
                />
                <button className="bg-brand-blue text-white p-3 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-12 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.2em]">
                © 2024 CIRQLELABS
              </p>
              <a 
                href="https://inkwell-sandy.vercel.app/#home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] font-black text-slate-500 hover:text-brand-blue transition-colors flex items-center gap-1.5 group"
              >
                DESIGNED BY <span className="text-slate-300 group-hover:text-brand-blue transition-colors">INKWELL&CODE</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
