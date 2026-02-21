import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Sun, 
  Cross, 
  Heart, 
  Shield, 
  Star, 
  Zap, 
  Droplets, 
  Flame, 
  Eye, 
  Anchor, 
  Compass, 
  Info, 
  Mail, 
  User,
  ChevronRight,
  LogOut,
  Send,
  Sparkles,
  Menu,
  X,
  MapPin,
  Volume2,
  VolumeX,
  ArrowRight,
  CheckCircle2,
  Edit3,
  Save,
  Gift
} from 'lucide-react';
import { getSpiritualExplanation, analyzeUserPerception } from './services/geminiService';

// --- Types ---
interface Column {
  id: number;
  name: string;
}

interface Row {
  id: number;
  items: string[];
}

interface NunData {
  columns: Column[];
  rows: Row[];
}

// --- Components ---

const Navbar = ({ activePage, setActivePage, user, onLogout }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Thèmes' },
    { id: 'creation', label: 'Parcours' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('landing')}>
        <span className="text-2xl font-serif font-bold tracking-widest text-gold glowing-text">NUN</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
        {navLinks.map(link => (
          <button 
            key={link.id}
            onClick={() => handleNavClick(link.id)} 
            className={`hover:text-gold transition-colors ${activePage === link.id ? 'text-gold' : 'text-[var(--text)]/60'}`}
          >
            {link.label}
          </button>
        ))}
        
        {user ? (
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <button 
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-2 hover:text-gold transition-colors ${activePage === 'profile' ? 'text-gold' : 'text-[var(--text)]/60'}`}
            >
              <User size={18} />
              <span>Profil</span>
            </button>
            <button onClick={onLogout} className="text-[var(--text)]/60 hover:text-red-400 transition-colors"><LogOut size={18} /></button>
          </div>
        ) : (
          <button onClick={() => handleNavClick('auth')} className="btn-gold py-2 px-6 text-xs">Identification</button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gold p-2"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[var(--bg)] border-b border-[var(--card-border)] p-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)} 
                className={`text-left text-lg font-serif tracking-widest ${activePage === link.id ? 'text-gold' : 'text-[var(--text)]/60'}`}
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                <button 
                  onClick={() => handleNavClick('profile')}
                  className={`text-left text-lg font-serif tracking-widest flex items-center gap-3 ${activePage === 'profile' ? 'text-gold' : 'text-[var(--text)]/60'}`}
                >
                  <User size={20} /> Profil ({user.fullName})
                </button>
                <button onClick={onLogout} className="text-left text-lg font-serif tracking-widest text-red-400 flex items-center gap-3">
                  <LogOut size={20} /> Déconnexion
                </button>
              </>
            ) : (
              <button onClick={() => handleNavClick('auth')} className="btn-gold w-full py-4">Identification</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Wings = ({ size = 24, color = "text-gold" }: { size?: number, color?: string }) => (
  <div className="relative w-48 h-24 mx-auto mb-8">
    <motion.div 
      animate={{ 
        rotate: [-15, -35, -15],
        scale: [1, 1.15, 1],
        y: [0, -5, 0]
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 top-0 w-24 h-24 origin-right"
    >
      <svg viewBox="0 0 100 100" className={`${color} opacity-40 fill-current`}>
        <path d="M100,50 C70,10 10,10 0,50 C10,90 70,90 100,50" />
        <path d="M90,50 C70,25 30,25 10,50" className="opacity-50" />
      </svg>
    </motion.div>
    <motion.div 
      animate={{ 
        rotate: [15, 35, 15],
        scale: [1, 1.15, 1],
        y: [0, -5, 0]
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-0 top-0 w-24 h-24 origin-left"
    >
      <svg viewBox="0 0 100 100" className={`${color} opacity-40 fill-current scale-x-[-1]`}>
        <path d="M100,50 C70,10 10,10 0,50 C10,90 70,90 100,50" />
        <path d="M90,50 C70,25 30,25 10,50" className="opacity-50" />
      </svg>
    </motion.div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Sparkles className={`${color} animate-pulse`} size={size} />
    </div>
  </div>
);

const SupportPopup = ({ onClose }: { onClose: () => void }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center px-6 bg-black/95 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="luxury-card p-10 max-w-md w-full text-center border-gold/40 relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
        
        <Wings />
        
        <h3 className="text-3xl font-serif text-gold mb-4">Soutenez cette mission</h3>
        
        {!showDetails ? (
          <>
            <div className="space-y-4 text-white/70 mb-8 leading-relaxed">
              <p>Cet outil est mis à votre disposition pour nourrir votre vie spirituelle.</p>
              <p>Si cette œuvre vous bénit, vous pouvez soutenir son développement par un don libre.</p>
              <p>Votre contribution nous permet d’améliorer l'expérience et de continuer ce service.</p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => setShowDetails(true)}
                className="btn-gold w-full py-4 uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2"
              >
                🙏 Faire un don
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 text-white/40 hover:text-white/60 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
              >
                Peut-être plus tard
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 mb-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold/60 mb-2">Don via Airtel Money</div>
              <div className="text-2xl font-mono text-gold tracking-wider">0979393468</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mt-2">République Démocratique du Congo</div>
            </div>
            
            <button 
              onClick={onClose}
              className="btn-gold w-full py-4 uppercase tracking-[0.2em] text-xs font-bold"
            >
              Continuer ma méditation
            </button>
          </>
        )}
        
        <p className="text-[9px] text-white/30 uppercase tracking-widest mt-6">
          "Que chacun donne comme il l'a résolu en son cœur" — 2 Cor 9:7
        </p>
      </motion.div>
    </motion.div>
  );
};

const Landing = ({ onEnter }: { onEnter: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_70%)]" />
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="text-center z-10"
    >
      <h1 className="text-8xl md:text-9xl font-serif font-bold tracking-[0.2em] text-gold glowing-text mb-4">NUN</h1>
      <p className="text-xl md:text-2xl font-light tracking-[0.5em] text-white/60 uppercase mb-12">Méditation Chrétienne</p>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className="btn-gold text-lg tracking-widest px-12 py-4"
      >
        ENTRER
      </motion.button>
    </motion.div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/40 text-xs tracking-widest uppercase animate-pulse z-10">
      Lumière Divine • Paix • Révélation
    </div>
  </div>
);

const Auth = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    isChristian: '',
    phone: '',
    country: '',
    province: '',
    coords: null as { lat: number, lng: number } | null
  });
  const [submitting, setSubmitting] = useState(false);

  const countries = [
    "Congo (RDC)", "Gabon", "Guinée", "Ghana", "Côte d'Ivoire", "Autre"
  ];

  const provincesRDC = [
    "Kinshasa", "Lubumbashi", "Goma", "Bukavu", "Kisangani", 
    "Matadi", "Kananga", "Mbuji-Mayi", "Bandundu", "Mbandaka"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.country || (formData.country === "Congo (RDC)" && !formData.province)) {
      alert("Veuillez compléter votre localisation manuelle.");
      return;
    }

    setSubmitting(true);

    // Automatic Geolocation Trigger
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          try {
            const res = await fetch('/api/identify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...formData, coords }),
            });
            if (res.ok) {
              onLogin({ ...formData, coords, id: Date.now() });
            } else {
              alert("Erreur lors de l'identification. Veuillez réessayer.");
              setSubmitting(false);
            }
          } catch (error) {
            alert("Erreur réseau. Veuillez réessayer.");
            setSubmitting(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("La géolocalisation est requise pour accéder à l'application. Veuillez l'activer dans les paramètres de votre téléphone.");
          setSubmitting(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="luxury-card p-10 w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-gold mb-2">Bienvenue</h2>
          <p className="text-white/60 italic">Identifiez-vous en tant que membre de la communauté NUN</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Nom Complet</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold/50 outline-none transition-all"
              placeholder="Votre nom complet"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Chrétien ?</label>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, isChristian: 'Oui' })}
                  className={`flex-1 py-3 rounded-lg border transition-all ${formData.isChristian === 'Oui' ? 'bg-gold/20 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/40'}`}
                >
                  Oui
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, isChristian: 'Non' })}
                  className={`flex-1 py-3 rounded-lg border transition-all ${formData.isChristian === 'Non' ? 'bg-gold/20 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/40'}`}
                >
                  Non
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Téléphone</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold/50 outline-none transition-all"
                placeholder="Votre numéro"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Pays</label>
              <select 
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value, province: '' })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold/50 outline-none transition-all appearance-none"
                required
              >
                <option value="" disabled>Sélectionnez votre pays</option>
                {countries.map(c => <option key={c} value={c} className="bg-luxury-black">{c}</option>)}
              </select>
            </div>
            {formData.country === "Congo (RDC)" && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Province / Ville</label>
                <select 
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold/50 outline-none transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Sélectionnez votre ville</option>
                  {provincesRDC.map(p => <option key={p} value={p} className="bg-luxury-black">{p}</option>)}
                </select>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={submitting || !formData.isChristian}
            className="btn-gold w-full py-4 uppercase tracking-widest mt-4 disabled:opacity-50"
          >
            {submitting ? 'Localisation en cours...' : 'Commencer la méditation'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ data, onSelectItem }: { data: NunData, onSelectItem: (rowIndex: number, colIndex: number) => void }) => {
  const icons = [
    <Zap size={20} />, <Sun size={20} />, <Book size={20} />, <Book size={20} />, 
    <Sparkles size={20} />, <Shield size={20} />, <Heart size={20} />, <Cross size={20} />, 
    <Star size={20} />, <Compass size={20} />, <Flame size={20} />, <Droplets size={20} />, 
    <Eye size={20} />, <Zap size={20} />
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <h2 className="text-4xl font-serif text-gold mb-4">Tableau de Méditation</h2>
        <p className="text-[var(--muted)] italic">Explorez les 14 colonnes de la révélation prophétique</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.columns.map((col, colIndex) => (
          <motion.div 
            key={col.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.05 }}
            className="luxury-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="text-gold">{icons[colIndex]}</div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">{col.name}</h3>
            </div>
            <div className="space-y-3">
              {data.rows.map((row, rowIndex) => (
                <button
                  key={row.id}
                  onClick={() => onSelectItem(rowIndex, colIndex)}
                  className="w-full text-left p-3 rounded-lg text-xs text-white/60 hover:bg-gold/10 hover:text-gold border border-transparent hover:border-gold/20 transition-all group flex justify-between items-center"
                >
                  <span>{row.items[colIndex]}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ThemeDetail = ({ data, selection, onBack }: { data: NunData, selection: { row: number, col: number }, onBack: () => void }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [perception, setPerception] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const selectedItem = data.rows[selection.row].items[selection.col];
  const selectedTheme = data.columns[selection.col].name;
  const verticalContext = data.rows[selection.row].items;

  useEffect(() => {
    const fetchExplanation = async () => {
      setLoading(true);
      const text = await getSpiritualExplanation(selectedTheme, selectedItem, verticalContext);
      setExplanation(text || '');
      setLoading(false);
    };
    fetchExplanation();
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selection]);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.lang = 'fr-FR';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnalyze = async () => {
    if (!perception.trim()) return;
    setAnalyzing(true);
    const feedback = await analyzeUserPerception(selectedTheme, selectedItem, perception);
    setAiFeedback(feedback || '');
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <button onClick={onBack} className="text-gold flex items-center gap-2 mb-8 hover:underline">
        <ChevronRight size={18} className="rotate-180" /> Retour au tableau
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-5xl font-serif text-gold mb-2">{selectedItem}</h2>
                <p className="text-white/40 uppercase tracking-[0.2em] text-sm">{selectedTheme}</p>
              </div>
              {!loading && explanation && (
                <button 
                  onClick={toggleSpeech}
                  className={`p-4 rounded-full border transition-all ${isSpeaking ? 'bg-gold/20 border-gold text-gold animate-pulse' : 'bg-white/5 border-white/10 text-white/40 hover:text-gold hover:border-gold/50'}`}
                  title={isSpeaking ? "Arrêter la lecture" : "Lire la méditation"}
                >
                  {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              )}
            </div>
            
            <div className="prose prose-invert max-w-none">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              ) : (
                <div className="text-lg leading-relaxed text-white/80 whitespace-pre-wrap font-light">
                  {explanation}
                </div>
              )}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="luxury-card p-8"
          >
            <h3 className="text-xl font-serif text-gold mb-4 flex items-center gap-2">
              <Sparkles size={20} /> Votre Perception
            </h3>
            <p className="text-white/60 text-sm mb-6 italic">Partagez votre réflexion sur ce thème, l'IA vous guidera.</p>
            <textarea 
              value={perception}
              onChange={(e) => setPerception(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 min-h-[150px] focus:border-gold/50 outline-none transition-all mb-4"
              placeholder="Écrivez ici votre compréhension spirituelle..."
            />
            <button 
              onClick={handleAnalyze}
              disabled={analyzing || !perception.trim()}
              className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {analyzing ? 'Analyse en cours...' : <><Send size={18} /> Envoyer à l'IA</>}
            </button>

            <AnimatePresence>
              {aiFeedback && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-xl"
                >
                  <h4 className="text-gold font-semibold mb-2 flex items-center gap-2">
                    <Sparkles size={16} /> Réponse de NUN
                  </h4>
                  <p className="text-white/80 italic leading-relaxed">{aiFeedback}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">Ligne Prophétique (Niveau {selection.row + 1})</h3>
          <div className="space-y-3">
            {verticalContext.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border text-sm transition-all ${idx === selection.col ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/40'}`}
              >
                <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-1">{data.columns[idx].name}</div>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h2 className="text-6xl font-serif text-gold mb-6">À Propos de l’Auteur</h2>
      <div className="w-24 h-1 bg-gold mx-auto mb-12"></div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
      <div className="luxury-card overflow-hidden aspect-[3/4] relative border-gold/30">
        <img 
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=600&auto=format&fit=crop" 
          alt="Bible Ouverte" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <h3 className="text-3xl font-serif text-gold">Sion International Church</h3>
          <p className="text-white/60 text-sm uppercase tracking-widest mt-1">Église de l'Auteur</p>
        </div>
      </div>
      <div className="space-y-6 text-lg text-white/80 font-light leading-relaxed">
        <p>
          <span className="text-gold font-serif text-2xl">Josaphat BALOME</span> est un ministre consacré de la Parole de Dieu, serviteur engagé au sein de <span className="text-gold/80 italic">Sion International Church</span>.
        </p>
        <p>
          Établi sous l’onction prophétique de son père spirituel, <span className="font-medium text-white">Berger Moïse Lushiku</span> — l’une des voix marquantes de ce temps — il marche dans un appel clair : dévoiler les mystères divins et préparer le peuple de Dieu aux réalités de la fin des temps.
        </p>
        <p>
          Porté par une consécration authentique, il s’inscrit dans une vision centrée sur la restauration, la sanctification et la préparation de l’Épouse pour la rencontre glorieuse avec le Seigneur.
        </p>
        <p>
          À travers cette plateforme, il partage un message inspiré, une lumière pour cette génération, et un appel vibrant à l’intimité avec le Père, à la maturité et à la vigilance en ces jours décisifs.
        </p>
      </div>
    </div>

    <section className="space-y-12">
      <h3 className="text-3xl font-serif text-center text-gold">Vision & Mission</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: "Révélation", text: "Dévoiler les profondeurs de la Parole pour éclairer la marche quotidienne des croyants." },
          { title: "Préparation", text: "Équiper l'Église pour les défis spirituels de notre époque et la rencontre avec le Seigneur." }
        ].map((t, i) => (
          <div key={i} className="luxury-card p-8 border-gold/10">
            <h4 className="text-gold font-serif text-xl mb-4">{t.title}</h4>
            <p className="text-white/70 italic leading-relaxed">"{t.text}"</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const Contact = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ fullName: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-5xl font-serif text-gold">Contact & Soutien</h2>
          <p className="text-white/60 text-lg">
            Soutenez le projet NUN ou envoyez-nous vos suggestions et questions.
          </p>
          <div className="space-y-4">
            <div className="luxury-card p-6 border-gold/30 bg-gold/5">
              <h4 className="text-gold font-serif text-xl mb-2 flex items-center gap-2">
                <Zap size={20} /> Airtel Money
              </h4>
              <p className="text-[var(--text)] text-lg font-mono tracking-wider">0979393468</p>
              <p className="text-[var(--muted)] text-xs mt-2 uppercase tracking-widest">Soutien direct</p>
            </div>
          </div>
        </div>

        <div className="luxury-card p-8">
          <h3 className="text-2xl font-serif text-gold mb-6">Envoyez un message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Nom Complet" 
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold/50 outline-none" 
            />
            <input 
              type="tel" 
              placeholder="Numéro de Téléphone / WhatsApp" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold/50 outline-none" 
            />
            <textarea 
              placeholder="Votre message ou suggestion" 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 min-h-[150px] focus:border-gold/50 outline-none" 
            />
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="btn-gold w-full py-4 uppercase tracking-widest disabled:opacity-50"
            >
              {status === 'sending' ? 'Envoi...' : 'Envoyer'}
            </button>
            {status === 'success' && <p className="text-emerald-400 text-sm text-center">Message envoyé avec succès !</p>}
            {status === 'error' && <p className="text-red-400 text-sm text-center">Erreur lors de l'envoi.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ user, onUpdate, onLogout }: { user: any, onUpdate: (data: any) => void, onLogout: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    origin: user?.origin || '',
    denomination: user?.denomination || '',
    spiritualIdentity: user?.spiritualIdentity || '',
    otherInfo: user?.otherInfo || ''
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: user.fullName,
          ...formData
        }),
      });
      if (res.ok) {
        onUpdate({ ...user, ...formData });
        setIsEditing(false);
      } else {
        alert("Erreur lors de la mise à jour du profil.");
      }
    } catch (error) {
      alert("Erreur réseau lors de la mise à jour.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="luxury-card p-12"
      >
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30">
            <User size={48} className="text-gold" />
          </div>
          <h2 className="text-4xl font-serif text-gold mb-2">{user?.fullName}</h2>
          <p className="text-[var(--muted)] uppercase tracking-widest text-sm">
            {user?.isChristian === 'Oui' ? 'Chrétien' : 'Non-Chrétien'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-gold font-serif text-xl border-b border-gold/20 pb-2">Informations de Base</h3>
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] uppercase text-gold/60 mb-1">Téléphone</div>
                <div className="text-sm">{user?.phone}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] uppercase text-gold/60 mb-1">Localisation</div>
                <div className="text-sm">
                  {user?.country}{user?.province ? `, ${user.province}` : ''}
                  {user?.coords && ` (${user.coords.lat.toFixed(2)}, ${user.coords.lng.toFixed(2)})`}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gold/20 pb-2">
              <h3 className="text-gold font-serif text-xl">Identité Spirituelle</h3>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={saving}
                className="text-gold hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
              >
                {saving ? 'Enregistrement...' : isEditing ? <><Save size={14} /> Enregistrer</> : <><Edit3 size={14} /> Modifier</>}
              </button>
            </div>
            
            <div className="space-y-4 text-left">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-[10px] uppercase text-gold/60 mb-1">Lieu d'origine</label>
                    <input 
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gold/50 outline-none"
                      placeholder="Votre ville ou pays d'origine"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-gold/60 mb-1">Dénomination / Église</label>
                    <input 
                      type="text"
                      value={formData.denomination}
                      onChange={(e) => setFormData({...formData, denomination: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gold/50 outline-none"
                      placeholder="Votre église ou communauté"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-gold/60 mb-1">Identité Spirituelle</label>
                    <input 
                      type="text"
                      value={formData.spiritualIdentity}
                      onChange={(e) => setFormData({...formData, spiritualIdentity: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gold/50 outline-none"
                      placeholder="Ex: Intercesseur, Évangéliste..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-gold/60 mb-1">Autres Informations</label>
                    <textarea 
                      value={formData.otherInfo}
                      onChange={(e) => setFormData({...formData, otherInfo: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gold/50 outline-none min-h-[80px]"
                      placeholder="Toute autre information pertinente"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-[10px] uppercase text-gold/60 mb-1">Lieu d'origine</div>
                    <div className="text-sm">{user?.origin || "Non renseigné"}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-[10px] uppercase text-gold/60 mb-1">Dénomination</div>
                    <div className="text-sm">{user?.denomination || "Non renseignée"}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-[10px] uppercase text-gold/60 mb-1">Identité Spirituelle</div>
                    <div className="text-sm">{user?.spiritualIdentity || "Non renseignée"}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 mx-auto uppercase tracking-widest text-xs font-bold pt-8 border-t border-white/5 w-full justify-center"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </motion.div>
    </div>
  );
};

const CreationJourney = ({ creationData }: { creationData: any[] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showEvaluation, setShowEvaluation] = useState(false);

  const day = creationData[currentStep];

  const handleNext = () => {
    if (currentStep < creationData.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowEvaluation(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowEvaluation(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-2">
          {creationData.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 w-8 rounded-full transition-all ${idx <= currentStep ? 'bg-gold' : 'bg-white/10'}`}
            />
          ))}
        </div>
        <span className="text-gold font-serif italic">{day.day}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-12"
        >
          <header>
            <h2 className="text-5xl font-serif text-gold mb-4">{day.title}</h2>
            <p className="text-white/40 uppercase tracking-[0.2em] text-sm italic">"{day.baseText}"</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="luxury-card p-8 space-y-4">
              <h3 className="text-gold font-serif text-xl flex items-center gap-2">
                <Sparkles size={20} /> Symbolique
              </h3>
              <ul className="space-y-2 text-white/70">
                {day.symbolism.map((s: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span> {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className="luxury-card p-8 space-y-4">
              <h3 className="text-gold font-serif text-xl flex items-center gap-2">
                <Flame size={20} /> Dimension Prophétique
              </h3>
              <ul className="space-y-2 text-white/70">
                {day.prophetic.map((p: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span> {p}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="luxury-card p-8 space-y-4 border-gold/20 bg-gold/5">
            <h3 className="text-gold font-serif text-xl flex items-center gap-2">
              <Book size={20} /> Enseignement & Application
            </h3>
            <p className="text-white/80 leading-relaxed italic">
              {day.teaching}
            </p>
            <div className="pt-4 border-t border-gold/10">
              <p className="text-gold text-sm font-bold uppercase tracking-widest">Application Pratique :</p>
              <p className="text-white/60">{day.application}</p>
            </div>
          </section>

          {!showEvaluation ? (
            <button 
              onClick={() => setShowEvaluation(true)}
              className="btn-gold w-full py-4 flex items-center justify-center gap-2"
            >
              Passer à l'Évaluation <ArrowRight size={18} />
            </button>
          ) : (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card p-8 border-emerald-500/20 bg-emerald-500/5"
            >
              <h3 className="text-emerald-400 font-serif text-xl mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} /> Évaluation Spirituelle
              </h3>
              <p className="text-white/80 mb-6">{day.evaluation.question}</p>
              
              {day.evaluation.type === 'choice' ? (
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {day.evaluation.options.map((opt: string) => (
                    <button 
                      key={opt}
                      onClick={() => setAnswers({ ...answers, [currentStep]: opt })}
                      className={`p-4 rounded-xl border text-left transition-all ${answers[currentStep] === opt ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-white/60 hover:border-emerald-500/30'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea 
                  value={answers[currentStep] || ''}
                  onChange={(e) => setAnswers({ ...answers, [currentStep]: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 min-h-[120px] focus:border-emerald-500/50 outline-none transition-all mb-8"
                  placeholder="Votre réflexion..."
                />
              )}

              <div className="flex gap-4">
                <button 
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="btn-outline flex-1 disabled:opacity-30"
                >
                  Précédent
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentStep === creationData.length - 1 || !answers[currentStep]}
                  className="btn-gold flex-1 disabled:opacity-50"
                >
                  {currentStep === creationData.length - 1 ? 'Terminer le Parcours' : 'Jour Suivant'}
                </button>
              </div>
            </motion.section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<'landing' | 'auth' | 'dashboard' | 'theme' | 'about' | 'contact' | 'profile' | 'creation'>('landing');
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<NunData | null>(null);
  const [creationData, setCreationData] = useState<any[] | null>(null);
  const [selection, setSelection] = useState<{ row: number, col: number } | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('nun_disclaimer_seen');
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }

    if (activePage === 'dashboard' || activePage === 'creation') {
      const lastSupportShow = sessionStorage.getItem('nun_support_shown');
      if (!lastSupportShow) {
        setTimeout(() => setShowSupport(true), 1500);
        sessionStorage.setItem('nun_support_shown', 'true');
      }
    }

    fetch('/api/data')
      .then(res => res.json())
      .then(setData);

    fetch('/api/creation')
      .then(res => res.json())
      .then(setCreationData);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('landing');
  };

  const handleSelectItem = (row: number, col: number) => {
    setSelection({ row, col });
    setActivePage('theme');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center px-6 bg-black/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="luxury-card p-0 max-w-lg w-full text-center border-gold/50 overflow-hidden relative"
            >
              {/* Image de fond avec overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop" 
                  alt="Heavenly Background" 
                  className="w-full h-full object-cover opacity-20"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-luxury-black/40 to-luxury-black/90" />
              </div>

              <div className="relative z-10 p-10">
                <Wings size={40} />
                
                <div className="space-y-6 text-white/90 leading-relaxed mb-10 text-xl font-light">
                  <p>Cette application est un outil pour approfondir votre connaissance et enrichir votre méditation.</p>
                  <p className="font-serif italic text-gold/80 text-2xl">Elle ne remplace pas la révélation personnelle.</p>
                  <p>Pendant votre temps de méditation, restez attentif à la voix du Saint-Esprit : c’est Lui qui vous conduit dans toute la vérité.</p>
                </div>

                <button 
                  onClick={() => {
                    localStorage.setItem('nun_disclaimer_seen', 'true');
                    setShowDisclaimer(false);
                  }}
                  className="btn-gold w-full py-5 uppercase tracking-[0.3em] text-sm font-bold shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                >
                  ✨ J’ai compris
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showSupport && (
          <SupportPopup onClose={() => setShowSupport(false)} />
        )}
      </AnimatePresence>

      {activePage !== 'landing' && (
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          user={user} 
          onLogout={handleLogout} 
        />
      )}

      <AnimatePresence mode="wait">
        {activePage === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Landing onEnter={() => setActivePage(user ? 'dashboard' : 'auth')} />
          </motion.div>
        )}

        {activePage === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Auth onLogin={handleLogin} />
          </motion.div>
        )}

        {activePage === 'dashboard' && data && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard data={data} onSelectItem={handleSelectItem} />
          </motion.div>
        )}

        {activePage === 'theme' && data && selection && (
          <motion.div key="theme" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ThemeDetail 
              data={data} 
              selection={selection} 
              onBack={() => setActivePage('dashboard')} 
            />
          </motion.div>
        )}

        {activePage === 'about' && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <About />
          </motion.div>
        )}

        {activePage === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Contact setActivePage={setActivePage} />
          </motion.div>
        )}

        {activePage === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Profile user={user} onUpdate={setUser} onLogout={handleLogout} />
          </motion.div>
        )}

        {activePage === 'creation' && creationData && (
          <motion.div key="creation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CreationJourney creationData={creationData} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-10 text-center text-white/20 text-xs uppercase tracking-[0.3em] border-t border-white/5">
        &copy; {new Date().getFullYear()} NUN • Méditation Chrétienne • Josephat Balomé
      </footer>
    </div>
  );
}
