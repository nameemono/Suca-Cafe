import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Instagram, ArrowRight, Menu, X, Star, Quote, MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// --- Components ---

const SafeImage = ({ src, alt, className, ...props }: any) => {
  const [error, setError] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200";

  return (
    <img 
      src={error ? fallback : src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      {...props}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-4 md:py-8 transition-all duration-700 ${isScrolled ? 'bg-warm-ivory/80 backdrop-blur-xl border-b border-concrete' : 'bg-transparent'}`}>
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between relative z-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl font-bold tracking-tighter text-accent-blue cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SUCA.
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-12">
          {['Story', 'Menu', 'Spaces', 'Journal'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.25em] font-bold text-soft-black/60 hover:text-accent-blue transition-colors">
              {item}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
           <button className="hidden sm:block bg-espresso text-warm-ivory px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-soft-black transition-all shadow-lg hover:shadow-xl active:scale-95">
             Visit Us
           </button>
           <button onClick={() => setIsOpen(true)} className="text-soft-black hover:text-accent-blue transition-colors p-2">
             <Menu size={24} className="md:w-7 md:h-7" />
           </button>
        </div>
      </div>
    </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-[9999] bg-[#1F1B18] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Texture & Grain */}
            <div className="absolute inset-0 paper-texture opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
            
            {/* Top Bar for Overlay */}
            <div className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
              <div 
                className="text-2xl font-bold tracking-tighter text-accent-blue cursor-pointer"
                onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                SUCA.
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-warm-ivory/60 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">Close</span>
                <X size={28} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-16 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
               <div className="hidden lg:block w-1/3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 relative"
                  >
                     <SafeImage 
                       src="/images/hero-night-cafe.webp" 
                       className="w-full h-full object-cover grayscale brightness-50" 
                       alt="Atmosphere"
                     />
                     <div className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
                        <p className="mt-auto text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Studio Atmosphere • Permaisuri</p>
                     </div>
                  </motion.div>
               </div>

               <div className="flex flex-col items-center md:items-start md:w-full lg:w-2/3">
                  <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 items-center md:items-start w-full transition-all">
                     {['Story', 'Menu', 'Spaces', 'Journal', 'Contact'].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden group w-full text-center md:text-left"
                      >
                        <a 
                          href={`#${item.toLowerCase()}`}
                          onClick={() => setIsOpen(false)}
                          className="block font-serif text-[34px] sm:text-[42px] md:text-[56px] lg:text-[min(8.5vw,100px)] leading-[1.1] md:leading-[1.0] italic text-warm-ivory/40 hover:text-accent-blue transition-all duration-500 cursor-pointer hover:translate-x-2 md:hover:translate-x-8"
                        >
                          {item}
                        </a>
                      </motion.div>
                     ))}
                  </div>

                  {/* Secondary info below menu items */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-12 md:mt-16 lg:mt-24 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center md:items-start lg:justify-between gap-8 md:gap-10 lg:gap-20 border-t border-white/5 pt-10"
                  >
                     <div className="space-y-2 text-center md:text-left">
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent-blue">Opening Hours</p>
                        <p className="text-sm md:text-lg font-serif italic text-warm-ivory/60">5:00 PM – 2:00 AM • Daily</p>
                     </div>
                     <div className="space-y-2 text-center md:text-left">
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent-blue">Location</p>
                        <p className="text-sm md:text-lg font-serif italic text-warm-ivory/60">Bandar Sri Permaisuri, KL</p>
                     </div>
                     <div className="space-y-2 text-center md:text-left">
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent-blue">Catalogue</p>
                        <p className="text-sm md:text-lg font-serif italic text-warm-ivory/60 hover:text-white cursor-pointer transition-colors underline underline-offset-8">Menu V.24 (PDF)</p>
                     </div>
                     <div className="flex gap-6 items-center justify-center md:justify-start">
                        <Instagram size={22} className="text-warm-ivory/40 hover:text-accent-blue cursor-pointer transition-all" />
                     </div>
                  </motion.div>
               </div>
            </div>

            {/* Decorative background numbers or text */}
            <div className="absolute bottom-20 right-20 text-[20vw] font-bold text-white/[0.02] tracking-tighter select-none pointer-events-none hidden lg:block">
              SUCA.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-soft-black pt-0 px-0">
      <div className="h-full w-full relative overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <SafeImage 
            src="/images/hero-night-cafe.webp" 
            alt="SUCA Night Mood" 
            className="h-full w-full object-cover grayscale-[0.05] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)' }} />
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)' }} />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute inset-0 flex flex-col justify-start md:justify-center pt-[120px] md:pt-[140px] lg:pt-0 p-10 md:p-16 lg:p-32 text-white z-10"
        >
          <div className="space-y-10 md:space-y-12 lg:space-y-12 max-w-4xl">
            <div className="space-y-6 md:space-y-8">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-accent-blue block">Kuala Lumpur • Permaisuri</span>
              <h1 className="text-[48px] md:text-[64px] lg:text-[9vw] leading-[0.9] md:leading-[1.0] lg:leading-[0.88] tracking-[-2px] md:tracking-[-3px] lg:tracking-[-0.04em] font-serif italic max-w-[70%] md:max-w-[80%] lg:max-w-none">
                Coffee,<br />
                Bingsu &<br />
                Your Story.
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16 pt-6 md:pt-8 lg:pt-10">
              <p className="max-w-[260px] md:max-w-[400px] lg:max-w-xs text-sm md:text-base lg:text-lg font-light leading-[170%] opacity-70 border-l border-white/20 pl-6">
                A little creative corner where good moments find a home. 
                Experience the cinematic shift of the city.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4 md:pt-0">
                <button className="bg-espresso hover:bg-white hover:text-soft-black text-warm-ivory px-10 md:px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl shadow-black/50 active:scale-95">
                  Explore Menu
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 md:px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95">
                  Visit Studio
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="paper-texture absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none" />
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent-blue"
          />
        </div>
      </motion.div>
    </section>
  );
};

const StorySection = () => {
  return (
    <section id="story" className="py-24 md:py-32 px-6 md:px-20 bg-paper-beige relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="md:w-1/2 relative"
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 aspect-[4/5]">
            <SafeImage 
              src="/images/story-lifestyle.webp" 
              alt="Lifestyle" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-paper-beige rounded-full -z-0" />
          <motion.div 
            whileInView={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -left-10 w-40 h-40 border border-concrete rounded-full flex items-center justify-center p-4 text-center text-[8px] uppercase tracking-widest leading-tight opacity-40 font-bold"
          >
            Suca Lifestyle Experience • 2024 • Established in Permaisuri •
          </motion.div>
        </motion.div>

        <div className="md:w-1/2 space-y-10 md:space-y-12">
           <div className="space-y-4 md:space-y-6">
              <span className="text-accent-blue text-[10px] font-bold uppercase tracking-[0.4em] block">Journal Entry #01</span>
              <h2 className="text-[40px] md:text-[5vw] leading-[1.1] md:leading-tight font-serif italic text-espresso">Where time finds <br /> its own rhythm.</h2>
           </div>
           
           <div className="w-16 md:w-20 h-[1px] bg-espresso opacity-20" />
           
           <div className="space-y-8 md:space-y-10 max-w-lg">
              <p className="text-lg md:text-xl font-light leading-[170%] text-soft-black/80 font-quote">
                "We created SUCA as a sanctuary for the dreamers. In a city that never stops, we've built a corner that slows down for you."
              </p>
              <p className="text-base leading-[170%] text-soft-black/70 font-light">
                SUCA Urban Sip is more than a café. It's a dialogue between minimalist design and human connection. 
                From the meticulously balanced notes of our signature espresso to the delicate melt of our premium Injeolmi Bingsu, 
                every detail is composed to heighten your senses.
              </p>
           </div>
           
           <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-espresso group">
             Our Full Story <div className="p-2 border border-espresso rounded-full group-hover:bg-espresso group-hover:text-warm-ivory transition-all"><ArrowRight size={14} /></div>
           </button>
        </div>
      </div>
    </section>
  );
};

const SignatureMenu = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const menuItems = [
    { name: "Dirty Latte", category: "Coffee", price: "14", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800" },
    { name: "Injeolmi Bingsu", category: "Signature", price: "22", image: "/images/menu-bingsu.webp" },
    { name: "Uji Matcha Latte", category: "Matcha", price: "16", image: "/images/menu-matcha.webp" },
    { name: "Suca Signature", category: "Lifestyle", price: "18", image: "/images/instagram-feed-1.webp" },
    { name: "Hojicha Cloud", category: "Signature", price: "16", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800" },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-warm-ivory overflow-hidden border-t border-concrete">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
           <span className="text-accent-blue text-[10px] font-bold uppercase tracking-[0.5em] block">The Collections</span>
           <h2 className="text-[40px] md:text-[5vw] font-serif italic text-espresso leading-none">Signature Edits.</h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6">
          <p className="max-w-[280px] md:max-w-xs text-sm font-light leading-[170%] text-soft-black/60 text-left md:text-right">
             Curated selections reflecting our commitment to artisanal preparation and premium sourcing.
          </p>
          <div className="hidden md:flex gap-4">
             <button onClick={() => scroll('left')} className="p-4 border border-espresso/20 rounded-full hover:bg-espresso hover:text-white transition-all">
                <ChevronRight className="rotate-180" size={20} />
             </button>
             <button onClick={() => scroll('right')} className="p-4 border border-espresso/20 rounded-full hover:bg-espresso hover:text-white transition-all">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="px-6 md:px-20 mb-6 flex justify-between items-center md:hidden">
           <div className="flex items-center gap-3 text-accent-blue">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Swipe to discover</span>
              <ArrowRight size={14} className="animate-pulse" />
           </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar px-6 md:px-20 pb-16 md:pb-20 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {menuItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="flex-shrink-0 w-[72vw] md:w-[30vw] group/card snap-start"
            >
              <div className="aspect-[4/5] rounded-[28px] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 relative shadow-xl md:shadow-2xl transition-transform duration-700 group-hover/card:scale-[1.02]">
                <SafeImage 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-8 bottom-8">
                   <div className="glass-effect p-6 rounded-2xl border border-white/20">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/60 mb-2 block">{item.category}</span>
                      <div className="flex justify-between items-end">
                         <h3 className="text-2xl text-white font-serif italic">{item.name}</h3>
                         <span className="text-accent-blue font-mono text-sm font-bold">RM {item.price}</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="px-4 flex justify-between items-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-soft-black/30">Studio Release • v.24</p>
                 <ArrowRight size={16} className="text-accent-blue" />
              </div>
            </motion.div>
          ))}
          {/* Visual End Padding */}
          <div className="flex-shrink-0 w-20 md:w-40" />
        </div>
        
        {/* Mobile Swipe Cue */}
        <div className="md:hidden flex flex-col items-center gap-4 opacity-40">
           <span className="text-[9px] font-bold uppercase tracking-widest">Swipe to discover</span>
           <motion.div 
             animate={{ x: [0, 10, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
           >
             <ArrowRight size={14} />
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const InstagramSection = () => {
  const images = [
    { src: "/images/instagram-feed-1.webp", span: "col-span-1 row-span-1" },
    { src: "/images/instagram-feed-2.webp", span: "col-span-1 row-span-2" },
    { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800", span: "col-span-2 row-span-1" },
    { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800", span: "col-span-1 row-span-1" },
  ];

  return (
    <section className="py-24 md:py-40 bg-concrete border-y border-espresso/5 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-10 mb-20 md:mb-24">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] block opacity-30">Aesthetic Dialogue</span>
            <h2 className="text-[40px] md:text-[6vw] font-serif italic text-espresso leading-[0.9]">The Studio Feed.</h2>
          </div>
          <a href="#" className="bg-espresso text-warm-ivory px-10 md:px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-soft-black transition-all flex items-center gap-4">
             @suca_urbansip <Instagram size={18} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-[800px]">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className={`rounded-[2rem] overflow-hidden ${img.span} border border-concrete group`}
            >
              <SafeImage 
                src={img.src} 
                alt="Instagram" 
                className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const reviews = [
    "A true creative sanctuary. The bingsu is unmatched in KL, but the soul of the space is what keeps me coming back every evening.",
    "Editorial aesthetic meets genuine warmth. Suca is the only place in Permaisuri that feels like a quiet dream recorded on film.",
    "Exceptional coffee. Even better atmosphere. It's the kind of hidden gem you almost didn't want to tell anyone about."
  ];

  return (
    <section className="py-24 md:py-40 bg-paper-beige text-espresso relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-20 md:space-y-24 relative z-10">
        {reviews.map((review, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
            className="space-y-8 md:space-y-10"
          >
             <Quote className="mx-auto text-accent-blue opacity-30" size={40} />
             <h3 className="text-3xl md:text-6xl font-serif italic font-quote leading-[140%] tracking-tight">"{review}"</h3>
             <div className="w-12 md:w-16 h-[1px] bg-espresso mx-auto opacity-10" />
          </motion.div>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-espresso/5 blur-[150px] rounded-full" />
    </section>
  );
};

const LocationSection = () => {
  return (
    <section id="location" className="bg-espresso text-warm-ivory py-24 md:py-40 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center relative z-10">
        <div className="space-y-12 md:space-y-20">
           <div className="space-y-6 md:space-y-8">
              <span className="text-accent-blue text-[10px] font-bold uppercase tracking-[0.6em] block">Visit the Studio</span>
              <h2 className="text-[40px] md:text-[8vw] font-serif italic leading-[0.9] md:leading-[0.85] tracking-tighter">Your story <br /> starts here.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-4 md:space-y-6">
                 <h4 className="text-[10px] uppercase tracking-widest font-black text-accent-blue">Location</h4>
                 <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic opacity-80">
                    R-G-Unit 37, Kompleks Permaisuri Q<br />
                    6 Jalan Sri Permaisuri, Bandar Sri Permaisuri<br />
                    56000 Kuala Lumpur
                 </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                 <h4 className="text-[10px] uppercase tracking-widest font-black text-accent-blue">Hours</h4>
                 <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic opacity-80">
                    Open Daily<br />
                    5:00 PM – 2:00 AM
                 </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                 <h4 className="text-[10px] uppercase tracking-widest font-black text-accent-blue">Phone</h4>
                 <p className="text-xl md:text-2xl font-mono tracking-tighter opacity-80">03-7886 8050</p>
              </div>
              <div className="space-y-4 md:space-y-6">
                 <h4 className="text-[10px] uppercase tracking-widest font-black text-accent-blue">Social</h4>
                 <p className="text-lg md:text-xl font-light flex items-center gap-4 font-serif italic border-b border-white/10 pb-2 hover:border-accent-blue transition-all group cursor-pointer w-fit">
                    <Instagram size={20} className="group-hover:text-accent-blue transition-colors" /> @suca_urbansip
                 </p>
              </div>
           </div>

           <button className="w-full md:w-auto bg-warm-ivory text-espresso px-12 md:px-20 py-5 md:py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-blue hover:text-white transition-all shadow-2xl shadow-black/50">
             Find the Studio
           </button>
        </div>

        <div className="relative">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5 }}
             className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative z-10 border border-white/5"
           >
             <SafeImage 
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200" 
               alt="Map" 
               className="w-full aspect-[4/5] object-cover grayscale brightness-50 opacity-40 group-hover:opacity-60 transition-all duration-1000"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-accent-blue/10" />
             <div className="absolute inset-x-10 bottom-10 p-12 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-accent-blue">Navigation Hint</span>
                <p className="text-xl text-warm-ivory font-serif italic leading-relaxed">"Look for the warm wooden facade right next to the park entrance. Follow the golden glow at dusk."</p>
             </div>
           </motion.div>
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue blur-[80px] rounded-full opacity-20" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-soft-black text-warm-ivory pt-40 pb-16 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto space-y-40 relative z-10">
         <div className="flex flex-col lg:flex-row justify-between gap-20">
            <div className="lg:w-1/3 space-y-8">
               <h2 className="text-7xl font-bold tracking-tighter text-accent-blue">SUCA.</h2>
               <p className="max-w-xs text-white/40 leading-relaxed font-light text-lg">
                  A hidden creative corner where good moments find a home. 
                  Establishing an urban lifestyle dialogue in Permaisuri since 2023.
               </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24 text-[10px] tracking-[0.3em] font-bold uppercase">
               <div className="space-y-8 text-left">
                  <p className="border-b border-white/10 pb-4 text-accent-blue">Menu</p>
                  <div className="space-y-4 font-semibold text-white/30">
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Coffee Collection</p>
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Korean Bingsu</p>
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Matcha Series</p>
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Signatures</p>
                  </div>
               </div>
               <div className="space-y-8 text-left">
                  <p className="border-b border-white/10 pb-4 text-accent-blue">Studio</p>
                  <div className="space-y-4 font-semibold text-white/30">
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Journal</p>
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Our Story</p>
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Spaces</p>
                     <p className="hover:text-accent-blue cursor-pointer transition-colors">Careers</p>
                  </div>
               </div>
               <div className="space-y-8 text-left col-span-2 md:col-span-1">
                  <p className="border-b border-white/10 pb-4 text-accent-blue">Connect</p>
                  <div className="space-y-4 font-normal text-white/30 lowercase italic font-serif text-lg first-letter:uppercase">
                     <p className="leading-relaxed">Bandar Sri Permaisuri, <br /> Kuala Lumpur</p>
                     <p>@suca_urbansip</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="border-t border-concrete pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[8px] tracking-[0.4em] uppercase font-bold opacity-30">
               © 2024 SUCA LIFESTYLE EXPERIENCE • ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-4 items-center">
               <div className="w-1.5 h-1.5 rounded-full bg-accent-blue"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-espresso"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-concrete"></div>
               <span className="text-[8px] font-bold tracking-widest pl-4">Terms • Cookies</span>
            </div>
         </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold tracking-tighter opacity-[0.02] text-soft-black select-none pointer-events-none">
        SUCA
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="font-sans bg-warm-ivory selection:bg-accent-blue selection:text-warm-ivory pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <StorySection />
      <SignatureMenu />
      <InstagramSection />
      <ReviewsSection />
      <LocationSection />
      <Footer />
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="paper-texture absolute inset-0 mix-blend-overlay opacity-30" />
      </div>

      {/* Mobile Sticky Nav */}
      <div className="fixed bottom-6 left-6 right-6 h-[70px] bg-espresso/80 backdrop-blur-2xl rounded-full z-[70] md:hidden flex items-center justify-around px-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
         <a href="#menu" className="flex flex-col items-center gap-1 group">
            <Menu size={18} className="text-white/60 group-hover:text-accent-blue transition-colors" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 group-hover:text-accent-blue transition-colors">Menu</span>
         </a>
         <div className="w-[1px] h-4 bg-white/5" />
         <a href="#location" className="flex flex-col items-center gap-1 group">
            <MapPin size={18} className="text-white/60 group-hover:text-accent-blue transition-colors" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 group-hover:text-accent-blue transition-colors">Visit</span>
         </a>
         <div className="w-[1px] h-4 bg-white/5" />
         <a href="#" className="p-3 bg-accent-blue/90 hover:bg-accent-blue rounded-full text-white shadow-xl shadow-accent-blue/20 transition-all active:scale-95">
            <Instagram size={18} />
         </a>
      </div>
    </main>
  );
}
