
## HolisView PRO ~ V6.0 PRO CARDS
- https://gemini.google.com/share/79e2e9826310

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Loader2, ChevronDown, ChevronLeft, 
  Menu, X, CheckSquare, Square, FileText, Layers, AlignRight,
  Volume2, Copy, Check, RefreshCw, Hexagon, Printer, Download, Grid,
  Maximize2, Wind, Flame, Droplets, Mountain, Activity,
  Bookmark, ShieldCheck, Star, Brain, Eye, Heart, Feather, Globe, Command,
  Github, Layout, Sun, Moon, Calendar, Hash
} from 'lucide-react';

// In this environment, the API key is injected automatically at runtime.
const apiKey = ""; 

// --- CONSTANTS & DATA ---
const VERSION = "6.0 PRO CARDS";

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות (מבנה)",
    description: "מיפוי המציאות על בסיס תבניות יסוד של 4",
    baseColor: "blue",
    methods: [
      { id: 'l1_pardes', name: 'פרד״ס (פשט, רמז, דרש, סוד)' },
      { id: 'l1_abya', name: 'אביע עולמות (אצילות, בריאה, יצירה, עשייה)' },
      { id: 'l1_elements', name: 'ארבעת היסודות (רוח, אש, מים, אדמה)' },
      { id: 'l1_name', name: 'ארבע אותיות השם (י-ה-ו-ה)' },
      { id: 'l1_creatures', name: 'ארבע חיות הקודש (אריה, שור, נשר, אדם)' },
      { id: 'l1_sons', name: 'ארבעה בנים (חכם, רשע, תם, שאינו יודע)' },
      { id: 'l1_service', name: 'ארבע מדרגות בעבודת ה׳ (יראה, אהבה, תורה, דבקות)' },
      { id: 'l1_species', name: 'ארבעת המינים (אתרוג, לולב, הדס, ערבה)' },
      { id: 'l1_providence', name: 'ארבעה אופני השגחה (טבע, נס נסתר, נס גלוי, ישירה)' },
      { id: 'l1_exiles', name: 'ארבע גלויות (בבל, פרס, יוון, אדום)' },
      { id: 'l1_guardians', name: 'ארבעה שומרים (חינם, שואל, נושא שכר, שוכר)' },
      { id: 'l1_newyears', name: 'ארבעה ראשי שנים (מלכים, בהמה, שנים, אילן)' }
    ]
  },
  {
    level: 2,
    title: "רמה 2 - צמיחה (תהליך)",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים כהשתקפות הנפש)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה גבוהה' },
      { id: 'l2_repentance', name: 'שבעה שלבים של תהליך תשובה' },
      { id: 'l2_world_correction', name: 'שבעה עקרונות של תיקון עולם' },
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות (חוקיות)",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_sayings', name: 'עשרת המאמרות' },
      { id: 'l3_success', name: 'עשרת חוקי ההצלחה' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד (מהות)",
    baseColor: "gold",
    methods: [
      { id: 'l4_faith_principles', name: 'י"ג יסודות האמונה' },
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ]
  }
];

const getColorClasses = (colorName) => {
  const map = {
    blue: { 
      text: 'text-blue-300', 
      bg: 'bg-[#0f172a]', 
      border: 'border-blue-500/30', 
      gradient: 'from-blue-900/40 via-[#0f172a] to-blue-900/40',
      accent: 'bg-blue-500', 
      glow: 'shadow-blue-500/20'
    },
    green: { 
      text: 'text-emerald-300', 
      bg: 'bg-[#064e3b]', 
      border: 'border-emerald-500/30', 
      gradient: 'from-emerald-900/40 via-[#022c22] to-emerald-900/40',
      accent: 'bg-emerald-500', 
      glow: 'shadow-emerald-500/20'
    },
    purple: { 
      text: 'text-purple-300', 
      bg: 'bg-[#3b0764]', 
      border: 'border-purple-500/30', 
      gradient: 'from-purple-900/40 via-[#2e1065] to-purple-900/40',
      accent: 'bg-purple-500', 
      glow: 'shadow-purple-500/20'
    },
    gold: { 
      text: 'text-amber-300', 
      bg: 'bg-[#451a03]', 
      border: 'border-amber-500/30', 
      gradient: 'from-amber-900/40 via-[#451a03] to-amber-900/40',
      accent: 'bg-amber-500', 
      glow: 'shadow-amber-500/20'
    }
  };
  return map[colorName] || map.blue;
};

// --- PRO CARD COMPONENT ---

const ProCard = ({ card, index }) => {
  const styles = getColorClasses(card.colorKey);
  const [copied, setCopied] = useState(false);

  // Layout Logic based on method structure
  const isQuadLayout = card.layout === 'quad'; // 2x2 grid
  const isListLayout = card.layout === 'list'; // Vertical list
  const isCentralLayout = card.layout === 'central'; // Big central insight

  return (
    <div className={`
      relative group break-inside-avoid mb-8 
      animate-in fade-in slide-in-from-bottom-8 duration-700
      ${index % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'} hover:rotate-0 transition-all
    `} style={{ animationDelay: `${index * 50}ms` }}>
      
      {/* 1. Outer Glow Layer */}
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${styles.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
      
      {/* 2. Main Container */}
      <div className={`
        relative overflow-hidden rounded-xl border ${styles.border} bg-[#0A0A12] 
        shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-500
        flex flex-col h-full
      `}>
        
        {/* 3. Noise Texture Overlay (CSS Pattern) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        {/* 4. Top Gradient Bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${styles.gradient} opacity-80`}></div>

        {/* 5. Header Section */}
        <div className="p-5 border-b border-white/5 relative bg-white/[0.01]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center 
                bg-gradient-to-br from-white/10 to-transparent border border-white/10
                shadow-inner
              `}>
                <span className={`font-bold font-mono text-lg ${styles.text}`}>{index + 1}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 leading-tight">{card.title}</h3>
                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${styles.text} opacity-80`}>
                  {card.methodName}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => { navigator.clipboard.writeText(JSON.stringify(card)); setCopied(true); setTimeout(()=>setCopied(false), 2000); }}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-600 hover:text-white transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* 6. Content Body - Adaptive Layouts */}
        <div className="p-5 flex-1 relative z-10">
          
          {/* Layout: QUAD (2x2) - For Level 1 methods usually */}
          {isQuadLayout && (
            <div className="grid grid-cols-2 gap-3 h-full">
              {card.contentItems.slice(0, 4).map((item, idx) => (
                <div key={idx} className={`
                  relative p-3 rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent
                  flex flex-col justify-between group/item hover:border-white/10 transition-colors
                `}>
                  <div className={`text-[10px] font-bold ${styles.text} uppercase mb-1 opacity-70`}>{item.label}</div>
                  <div className="text-xs text-slate-300 font-light leading-snug">{item.value}</div>
                  {/* Decor elements */}
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${styles.border} rounded-br-lg opacity-50`}></div>
                </div>
              ))}
            </div>
          )}

          {/* Layout: LIST - For process based methods */}
          {isListLayout && (
            <div className="space-y-3">
              {card.contentItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group/row">
                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${styles.accent} shadow-[0_0_8px_currentColor] opacity-60`}></div>
                  <div className="flex-1 pb-3 border-b border-white/[0.03] group-last/row:border-none">
                    <span className="text-xs font-bold text-slate-400 ml-1">{item.label}:</span>
                    <span className="text-sm text-slate-300 font-light">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

           {/* Layout: CENTRAL - For essence/focus */}
           {isCentralLayout && (
             <div className="flex flex-col items-center justify-center text-center h-full py-2">
                <Sparkles size={24} className={`${styles.text} opacity-50 mb-4`} />
                <p className="text-lg font-medium text-slate-200 leading-relaxed italic">
                  "{card.contentItems[0]?.value || card.contentItems[0]}"
                </p>
                <div className={`h-px w-16 ${styles.accent} opacity-30 mt-6`}></div>
             </div>
           )}
        </div>

        {/* 7. Footer - 24 Layers Metadata */}
        <div className="px-5 py-3 bg-[#050508]/50 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
           <div className="flex items-center gap-2">
              <Calendar size={10} />
              <span>{card.hebrewDate}</span>
           </div>
           <div className="flex items-center gap-2">
              <span>HolisView Pro</span>
              <div className={`w-1.5 h-1.5 rounded-sm ${styles.accent}`}></div>
           </div>
        </div>

        {/* 8. Corner Accents (The "Pro" touch) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 rounded-tl-xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 rounded-br-xl pointer-events-none"></div>

      </div>
    </div>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [proCards, setProCards] = useState(null); // New State for Pro Cards
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [expandedLevels, setExpandedLevels] = useState({1: true, 2: false, 3: false, 4: false});

  // Select defaults on mount
  useEffect(() => {
     if(selectedMethods.length === 0) {
        setSelectedMethods(['l1_pardes', 'l1_elements', 'l4_soul_powers']);
     }
  }, []);

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setProCards(null);
    
    const activeMethods = [];
    methodsData.forEach(l => l.methods.forEach(m => selectedMethods.includes(m.id) && activeMethods.push({ ...m, level: l.level })));

    // --- PRO PROMPT ENGINEERING ---
    const systemPrompt = `
      You are 'HolisView Pro', an elite systemic analyzer generating high-fidelity insight cards.
      
      TASK:
      Generate a JSON response containing an array of "proCards".
      Input Text: "${inputText}"
      Selected Methods: ${activeMethods.map(m => m.name).join(', ')}.

      REQUIREMENTS:
      1.  **Quantity:** Generate AT LEAST 24 distinct cards. You must interpret the input through the lens of the selected methods multiple times to reach this count. 
      2.  **Hebrew Date:** Calculate or Estimate the current Hebrew Date (e.g., "כ' בטבת תשפ'ד") and include it in every card.
      3.  **Language:** Hebrew.
      4.  **Layout Logic:**
          - If the method is based on 4 (e.g., Pardes, Elements), set "layout": "quad".
          - If the method is a process/list (e.g., Sefirot, 13 Attributes), set "layout": "list".
          - If the card is a core essence/summary, set "layout": "central".
      
      JSON STRUCTURE:
      {
        "proCards": [
          {
            "title": "Short catchy title",
            "methodName": "Name of the method used (e.g. Pardes)",
            "level": 1-4 (integer, based on method level),
            "layout": "quad" | "list" | "central",
            "hebrewDate": "Current Hebrew Date String",
            "contentItems": [
               { "label": "Key (e.g. Fire)", "value": "Insight text..." },
               { "label": "Key (e.g. Water)", "value": "Insight text..." }
               // For 'central' layout, just one item with label="" and value="Main quote"
            ]
          },
          ... (minimum 24 objects)
        ]
      }
    `;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      
      // Post-processing to add color keys based on levels
      const processedCards = parsed.proCards.map(card => ({
        ...card,
        colorKey: card.level === 1 ? 'blue' : card.level === 2 ? 'green' : card.level === 3 ? 'purple' : 'gold'
      }));

      setProCards(processedCards);

    } catch (e) {
      console.error(e);
      // Fallback for error
      setProCards([{ 
        title: "שגיאת מערכת", 
        methodName: "System", 
        level: 1, 
        layout: "central", 
        hebrewDate: "היום", 
        contentItems: [{value: "אירעה תקלה ביצירת הקלפים. אנא נסה שנית."}] 
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl selection:bg-purple-500/30" dir="rtl">
      {/* Fix for React warning: using standard style tag instead of invalid jsx/global attributes */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; border: 2px solid #020204; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
          
          .animate-spin-slow { animation: spin 3s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

          @media print {
            @page { size: A4 landscape; margin: 1cm; }
            body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
            .print-hidden { display: none !important; }
            .columns-1, .md-columns-2, .lg-columns-3, .xl-columns-4 { column-count: 3 !important; }
            .group { break-inside: avoid; page-break-inside: avoid; }
          }
        `}
      </style>
      
      {/* Header - Pro Version */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/[0.06] bg-[#020204]/90 backdrop-blur-xl flex items-center justify-between px-6 print-hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
             <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
               <div className="relative w-8 h-8 bg-black rounded-lg flex items-center justify-center border border-white/10">
                  <Layers size={18} className="text-white" />
               </div>
             </div>
             <h1 className="text-lg font-bold text-slate-200 tracking-tight">HolisView <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-black italic pr-1">PRO</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <span className="text-[10px] font-mono text-slate-500 hidden md:block border border-white/5 px-2 py-1 rounded">V{VERSION}</span>
           <button onClick={() => window.print()} disabled={!proCards} className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-30">
              <Printer size={18} />
            </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden print:block relative">
        
        {/* Sidebar - Methods */}
        <aside className={`
          absolute inset-y-0 right-0 z-40 w-72 bg-[#050508] border-l border-white/5 transform transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : 'translate-x-full pointer-events-none opacity-0'} 
          md:relative md:translate-x-0 md:pointer-events-auto md:opacity-100 md:shadow-none
          ${isSidebarOpen ? 'md:w-72' : 'md:w-0 md:border-none'} overflow-hidden
        `}>
          <div className="p-5 h-full flex flex-col">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-1">Matrix Selection</h2>
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar px-1">
              {methodsData.map(l => (
                <div key={l.level} className="space-y-1">
                  <button 
                    onClick={() => setExpandedLevels(prev => ({...prev, [l.level]: !prev[l.level]}))} 
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg transition-all text-sm group
                      ${expandedLevels[l.level] ? 'bg-white/[0.03] text-white' : 'text-slate-400 hover:text-slate-200'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${l.baseColor}-500 shadow-[0_0_10px_currentColor] group-hover:scale-150 transition-transform`}></div>
                      <span className="font-medium">{l.title.split('-')[1]}</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${expandedLevels[l.level] ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${expandedLevels[l.level] ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden space-y-1">
                      {l.methods.map(m => {
                        const isSelected = selectedMethods.includes(m.id);
                        return (
                          <div 
                            key={m.id} 
                            onClick={() => setSelectedMethods(prev => prev.includes(m.id) ? prev.filter(x=>x!==m.id) : [...prev, m.id])} 
                            className={`
                              ml-4 p-2.5 rounded-md text-xs cursor-pointer border transition-all flex items-center gap-3 relative overflow-hidden
                              ${isSelected 
                                ? `bg-${l.baseColor}-900/20 border-${l.baseColor}-500/30 text-${l.baseColor}-200` 
                                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'}
                            `}
                          >
                             {isSelected && <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${l.baseColor}-500`}></div>}
                            <div className={`
                              w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-all z-10
                              ${isSelected ? `bg-${l.baseColor}-500 border-${l.baseColor}-500` : 'border-slate-700'}
                            `}>
                              {isSelected && <Check size={8} className="text-black" />}
                            </div>
                            <span className="z-10">{m.name.split('(')[0]}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#020204] relative scroll-smooth">
          {/* Pro Background Mesh - Darker, deeper */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#020204]/50 to-[#020204]"></div>
          
          <div className="max-w-[1600px] mx-auto p-6 md:p-12 relative z-10 min-h-full flex flex-col">
            
            {/* Input Section */}
            <section className={`
              transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] print-hidden
              ${proCards ? 'mb-12' : 'flex-1 flex flex-col justify-center mb-0'}
            `}>
              <div className={`mx-auto w-full transition-all duration-700 ${proCards ? 'max-w-full' : 'max-w-3xl'}`}>
                
                {!proCards && (
                  <div className="text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-mono mb-4">
                      <Sparkles size={12} />
                      PRO GENERATION ENGINE
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                      Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Cards</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-light max-w-xl mx-auto leading-relaxed">
                      הזן נושא, בחר מטריצות ניתוח, וקבל הפקה אינסופית של קלפי תובנה ברזולוציה מקצועית של 24 שכבות עומק.
                    </p>
                  </div>
                )}

                <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0 focus-within:from-purple-500/50 focus-within:to-blue-500/50 transition-all duration-500">
                  <div className="relative bg-[#05050A] rounded-[23px] overflow-hidden shadow-2xl shadow-black/50">
                    <textarea 
                      value={inputText} onChange={(e) => setInputText(e.target.value)}
                      placeholder="הגדר את נושא הניתוח..."
                      className={`
                        w-full bg-transparent p-6 text-xl font-light text-slate-200 focus:outline-none placeholder:text-slate-800 resize-none custom-scrollbar
                        transition-all duration-500 ${proCards ? 'h-24' : 'h-40'}
                      `}
                    />
                    <div className="flex items-center justify-between px-4 py-3 bg-[#080810] border-t border-white/5">
                       <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            Online
                          </span>
                          <span>|</span>
                          <span>{selectedMethods.length} Matrices Selected</span>
                       </div>
                      <button 
                        onClick={handleAnalyze} disabled={loading || !inputText || selectedMethods.length === 0}
                        className={`
                          px-8 py-3 rounded-xl text-white font-bold tracking-wide text-sm transition-all flex items-center gap-2
                          ${loading 
                            ? 'bg-slate-800 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95'}
                        `}
                      >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <>GENERATE DECK <Zap size={16} /></>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pro Cards Grid */}
            {loading ? (
               <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="relative">
                    <div className="w-24 h-24 border border-purple-500/20 rounded-2xl animate-spin-slow"></div>
                    <div className="absolute inset-0 w-24 h-24 border-t-2 border-purple-500 rounded-2xl animate-spin"></div>
                    <div className="absolute inset-4 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Production</h3>
                    <p className="text-purple-400 text-sm font-mono mt-2">Rendering 24 layers per card...</p>
                  </div>
               </div>
            ) : proCards ? (
              <div className="pb-20 animate-in fade-in duration-1000">
                
                {/* Deck Stats Bar */}
                <div className="flex items-center justify-between mb-10 px-2 print-hidden">
                   <div className="flex items-center gap-4">
                      <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-slate-400">
                         {proCards.length} Cards Generated
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-slate-400">
                         {new Date().toLocaleDateString('he-IL')}
                      </div>
                   </div>
                   <div className="h-px flex-1 bg-white/5 mx-6"></div>
                   <div className="text-slate-600 text-xs font-mono uppercase">HolisView Pro Engine</div>
                </div>

                {/* THE GRID */}
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {proCards.map((card, i) => (
                    <ProCard key={i} card={card} index={i} />
                  ))}
                </div>

              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
```


---

# HolisView MATRIX - Build 8.6 JSON FIX
- https://gemini.google.com/share/4b7955663add


```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Loader2, Menu, Layers, Hexagon, Star, Hash, LayoutGrid, Square, CheckSquare, Layout
} from 'lucide-react';

const apiKey = ""; 

const VERSION = "8.6 JSON FIX";

// פונקציית עזר לניקוי וטיפול ב-JSON שמגיע מהמודל
const cleanJson = (text) => {
  if (!text) return "";
  
  // 1. הסרת בלוקים של קוד (Markdown)
  let cleaned = text.replace(/```json\n?|```/g, '').trim();
  
  // 2. איתור גבולות ה-JSON האמיתיים
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // 3. ניסיון לתיקון שגיאות נפוצות (אופציונלי, בזהירות)
  // הסרת פסיקים נגררים (Trailing Commas) ששוברים JSON.parse
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');

  return cleaned;
};

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות (מבנה)",
    baseColor: "blue",
    methods: [
      { id: 'l1_pardes', name: 'פרד״ס (פשט, רמז, דרש, סוד)' },
      { id: 'l1_elements', name: 'ארבעת היסודות (רוח, אש, מים, אדמה)' },
      { id: 'l1_name', name: 'ארבע אותיות השם (י-ה-ו-ה)' },
      { id: 'l1_creatures', name: 'ארבע חיות הקודש (אריה, שור, נשר, אדם)' },
      { id: 'l1_sons', name: 'ארבעה בנים (חכם, רשע, תם, שאינו יודע)' },
      { id: 'l1_service', name: 'ארבע מדרגות בעבודת ה׳ (יראה, אהבה, תורה, דבקות)' },
      { id: 'l1_species', name: 'ארבעת המינים (אתרוג, לולב, הדס, ערבה)' },
      { id: 'l1_providence', name: 'ארבעה אופני השגחה (טבע, נס נסתר, נס גלוי, ישירה)' }
    ]
  },
  {
    level: 2,
    title: "רמה 2 - צמיחה (תהליך)",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה' },
      { id: 'l2_world_correction', name: 'שבעה עקרונות של תיקון עולם' },
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות (חוקיות)",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד (מהות)",
    baseColor: "gold",
    methods: [
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ]
  }
];

const getColorClasses = (colorName) => {
  const map = {
    blue: { text: 'text-blue-300', bg: 'bg-blue-900/40', border: 'border-blue-400/50', accent: 'bg-blue-400', glow: 'shadow-blue-500/40', gradient: 'from-blue-600/30 via-blue-900/10 to-transparent' },
    green: { text: 'text-emerald-300', bg: 'bg-emerald-900/40', border: 'border-emerald-400/50', accent: 'bg-emerald-400', glow: 'shadow-emerald-500/40', gradient: 'from-emerald-600/30 via-emerald-900/10 to-transparent' },
    purple: { text: 'text-purple-300', bg: 'bg-purple-900/40', border: 'border-purple-400/50', accent: 'bg-purple-400', glow: 'shadow-purple-500/40', gradient: 'from-purple-600/30 via-purple-900/10 to-transparent' },
    gold: { text: 'text-amber-300', bg: 'bg-amber-900/40', border: 'border-amber-400/60', accent: 'bg-amber-400', glow: 'shadow-amber-500/50', gradient: 'from-amber-600/40 via-amber-900/10 to-transparent' }
  };
  return map[colorName] || map.blue;
};

const ProCard = ({ card, index, compact = false }) => {
  const styles = getColorClasses(card.colorKey);
  const isQuad = card.layout === 'quad';
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className={`${compact ? 'w-[280px] h-[400px]' : 'w-[320px] max-w-[400px] h-[500px]'} shrink-0 flex flex-col p-2 select-none group/card snap-start`}>
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative h-full rounded-2xl border-2 ${styles.border} bg-[#050508] overflow-hidden flex flex-col transition-all duration-200 ease-out cursor-pointer ${styles.glow}`}
      >
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
             style={{ background: styles.foil, mixBlendMode: 'color-dodge' }}></div>
        
        <div className={`relative z-10 p-4 border-b border-white/10 bg-gradient-to-l ${styles.gradient}`}>
          <div className="flex justify-between items-start mb-1">
            <div className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-black/60 ${styles.text} border border-white/10`}>
              {card.rarity || 'RARE'}
            </div>
            <div className={`flex items-center gap-1 text-[9px] font-mono ${styles.text}`}>
               <Hash size={8} /> {index + 101}
            </div>
          </div>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-white leading-tight drop-shadow-md truncate`}>{card.title}</h3>
          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${styles.text} opacity-80 truncate`}>{card.methodName}</p>
        </div>

        <div className="relative z-10 p-4 flex-1 flex flex-col justify-start overflow-y-auto custom-scrollbar">
          {isQuad ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              {card.contentItems?.map((item, idx) => (
                <div key={idx} className="relative p-2 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm min-h-[60px] flex flex-col justify-center">
                  <div className={`text-[7px] font-black ${styles.text} mb-0.5 opacity-80 uppercase`}>{item.label}</div>
                  <div className="text-[10px] text-slate-200 leading-tight font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 w-full pt-2">
              {card.contentItems?.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start group/line">
                   <div className={`w-1.5 h-1.5 rounded-full ${styles.accent} opacity-60 mt-1 shrink-0`}></div>
                   <div className="flex-1">
                     <span className={`text-[9px] font-bold ${styles.text} block mb-0.5`}>{item.label}</span>
                     <p className="text-[11px] text-slate-300 leading-relaxed italic">"{item.value}"</p>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 px-4 py-3 bg-black/80 border-t border-white/10 flex justify-between items-center">
           <div className="flex items-center gap-2">
              <Star size={12} className={styles.text} />
              <div className="flex flex-col">
                <span className="text-[9px] text-white font-bold leading-none">{card.hebrewDate || "היום"}</span>
                <span className="text-[7px] text-slate-500 uppercase tracking-tighter italic">HolisView Matrix</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null); 
  const [welcomeCards, setWelcomeCards] = useState([]);
  const [loadingWelcome, setLoadingWelcome] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMethods, setSelectedMethods] = useState(['l1_pardes', 'l1_elements', 'l4_soul_powers']);

  useEffect(() => {
    generateWelcomeMatrix();
  }, []);

  const generateWelcomeMatrix = async () => {
    setLoadingWelcome(true);
    // הנחיה מחוזקת ל-JSON תקין ללא שגיאות תחביר
    const welcomePrompt = `
      You are an API that outputs ONLY valid JSON.
      Task: Create 4 interpretation cards for "ברוכים הבאים" (Welcome).
      Level 1 to 4.
      
      IMPORTANT:
      - Output MUST be valid JSON.
      - Escape all double quotes inside strings (e.g., "text \\"quote\\" text").
      - Do NOT use trailing commas.
      - Hebrew text.

      Schema:
      {
        "cards": [
          {
            "title": "Short Title",
            "rarity": "RARE",
            "layout": "quad", 
            "hebrewDate": "Hebrew Date",
            "contentItems": [
              { "label": "Label", "value": "Value" }
            ]
          }
        ]
      }
    `;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: welcomePrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(cleanJson(rawText));
      
      if (parsed.cards) {
        setWelcomeCards(parsed.cards.map((c, i) => ({
          ...c, 
          level: i+1, 
          colorKey: i===0?'blue':i===1?'green':i===2?'purple':'gold', 
          methodName: `רמה ${i+1}` 
        })));
      }
    } catch (e) { 
      console.error("Welcome Matrix Error:", e);
      setWelcomeCards([{title: "תקלת תקשורת", contentItems: [{label: "שגיאה", value: "נסה לרענן את העמוד"}]}]);
    }
    setLoadingWelcome(false);
  };

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setSections(null);
    
    const activeMethods = [];
    methodsData.forEach(l => l.methods.forEach(m => selectedMethods.includes(m.id) && activeMethods.push({ ...m, level: l.level })));

    // הנחיה מחוזקת ל-JSON תקין
    const systemPrompt = `
      You are an API that outputs ONLY valid JSON.
      Analyze text: "${inputText}" using methods: ${activeMethods.map(m => m.name).join(', ')}.
      
      IMPORTANT:
      - Output MUST be valid JSON.
      - Escape all double quotes inside strings with backslash.
      - Do NOT use trailing commas.
      - Do NOT wrap in markdown blocks.
      - Respond in Hebrew.

      Schema:
      {
        "sections": [
          {
            "methodId": "id",
            "methodName": "name",
            "level": 1,
            "cards": [
              {
                "title": "Title",
                "layout": "quad", 
                "hebrewDate": "Date",
                "rarity": "RARE",
                "contentItems": [
                   { "label": "Label", "value": "Value" }
                ]
              }
            ]
          }
        ]
      }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      
      // שימוש ב-cleanJson המשופר
      const parsed = JSON.parse(cleanJson(rawText));

      if (parsed.sections) {
        setSections(parsed.sections.map(sec => ({
          ...sec,
          colorKey: sec.level === 1 ? 'blue' : sec.level === 2 ? 'green' : sec.level === 3 ? 'purple' : 'gold'
        })));
      }
    } catch (e) { 
      console.error("Analysis Error:", e);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl overflow-hidden" dir="rtl">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />

      <header className="h-16 border-b border-white/10 bg-[#050508] flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-black tracking-tight italic">HolisView <span className="text-amber-400 font-bold">MATRIX</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase">
          Build {VERSION}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={`bg-[#050508] border-l border-white/10 transition-all duration-300 overflow-hidden flex flex-col shrink-0 ${isSidebarOpen ? 'w-72' : 'w-0'}`}>
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">הגדרת מטריצה</h2>
            {methodsData.map(l => (
              <div key={l.level} className="mb-6">
                <div className={`text-[11px] font-bold mb-3 flex items-center gap-2 ${getColorClasses(l.baseColor).text}`}>
                   {l.title}
                </div>
                <div className="space-y-1">
                  {l.methods.map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedMethods(p => p.includes(m.id) ? p.filter(x=>x!==m.id) : [...p, m.id])}
                      className={`w-full text-right p-2.5 rounded-lg text-xs transition-all flex items-center justify-between group ${selectedMethods.includes(m.id) ? 'bg-white/10 text-white border border-white/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}`}
                    >
                      <span>{m.name.split('(')[0]}</span>
                      {selectedMethods.includes(m.id) ? <CheckSquare size={14} className={getColorClasses(l.baseColor).text} /> : <Square size={14} className="opacity-20" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          {!sections && (
            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-black to-transparent shrink-0">
               <h2 className="text-2xl font-black text-white italic mb-6">WELCOME MATRIX</h2>
               <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {loadingWelcome ? Array(4).fill(0).map((_,i)=><div key={i} className="w-[280px] h-[400px] bg-white/5 rounded-2xl animate-pulse"/>) : 
                 welcomeCards.map((card, idx) => <ProCard key={idx} card={card} index={idx} compact={true} />)}
               </div>
            </div>
          )}

          <div className="p-6 bg-[#08080C] border-b border-white/5 sticky top-0 z-30">
            <div className="max-w-4xl mx-auto flex gap-3">
              <input 
                value={inputText} onChange={e => setInputText(e.target.value)}
                placeholder="נושא הניתוח המערכתי..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-lg focus:outline-none focus:border-amber-500/50 transition-all"
              />
              <button 
                onClick={handleAnalyze} disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
                בצע מטריצה
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar p-10 space-y-16">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin text-amber-500" size={40} />
                <div className="text-xs font-mono tracking-widest text-slate-500 uppercase">Computing Matrix Elements...</div>
              </div>
            ) : sections ? (
              sections.map((section, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getColorClasses(section.colorKey).bg} ${getColorClasses(section.colorKey).text} border border-white/10`}>
                      LEVEL {section.level}
                    </div>
                    <h2 className="text-2xl font-black text-white">{section.methodName}</h2>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-8 px-2 custom-scrollbar snap-x">
                    {section.cards.map((card, cIdx) => (
                      <ProCard key={cIdx} card={{...card, colorKey: section.colorKey}} index={cIdx} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-20">
                <Layout size={60} />
                <p className="mt-4 text-sm font-bold">הזן טקסט ובחר שיטות להתחלה</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
```
---

# HolisView ULTIMATE - Matrix 8.3 WELCOME MATRIX (FIXED)
-https://gemini.google.com/share/6f0110f65768
- https://gemini.google.com/share/8508137eabf6


```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Loader2, Menu, Layers, Hexagon, Printer, Star, Hash, LayoutGrid, Square, CheckSquare
} from 'lucide-react';

const apiKey = ""; 

const VERSION = "8.3 WELCOME MATRIX (FIXED)";

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות (CORE)",
    baseColor: "blue",
    methods: [
      { id: 'l1_pardes', name: 'פרד״ס (פשט, רמז, דרש, סוד)' },
      { id: 'l1_elements', name: 'ארבעת היסודות (רוח, אש, מים, אדמה)' },
      { id: 'l1_name', name: 'ארבע אותיות השם (י-ה-ו-ה)' },
      { id: 'l1_creatures', name: 'ארבע חיות הקודש (אריה, שור, נשר, אדם)' },
      { id: 'l1_sons', name: 'ארבעה בנים (חכם, רשע, תם, שאינו יודע)' },
    ]
  },
  {
    level: 2,
    title: "רמה 2 - צמיחה (EVOLUTION)",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה' },
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות (ANCIENT)",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד (LEGENDARY)",
    baseColor: "gold",
    methods: [
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ]
  }
];

const getColorClasses = (colorName) => {
  const map = {
    blue: { 
      text: 'text-blue-300', 
      bg: 'bg-blue-900/40', 
      border: 'border-blue-400/50', 
      accent: 'bg-blue-400', 
      glow: 'shadow-blue-500/40',
      gradient: 'from-blue-600/30 via-blue-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)'
    },
    green: { 
      text: 'text-emerald-300', 
      bg: 'bg-emerald-900/40', 
      border: 'border-emerald-400/50', 
      accent: 'bg-emerald-400', 
      glow: 'shadow-emerald-500/40',
      gradient: 'from-emerald-600/30 via-emerald-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(16,185,129,0.1) 100%)'
    },
    purple: { 
      text: 'text-purple-300', 
      bg: 'bg-purple-900/40', 
      border: 'border-purple-400/50', 
      accent: 'bg-purple-400', 
      glow: 'shadow-purple-500/40',
      gradient: 'from-purple-600/30 via-purple-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(139,92,246,0.1) 100%)'
    },
    gold: { 
      text: 'text-amber-300', 
      bg: 'bg-amber-900/40', 
      border: 'border-amber-400/60', 
      accent: 'bg-amber-400', 
      glow: 'shadow-amber-500/50',
      gradient: 'from-amber-600/40 via-amber-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(245,158,11,0.2) 100%)'
    }
  };
  return map[colorName] || map.blue;
};

const ProCard = ({ card, index, compact = false }) => {
  const styles = getColorClasses(card.colorKey);
  const isQuad = card.layout === 'quad';
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className={`${compact ? 'w-[280px] h-[400px]' : 'w-[320px] max-w-[400px] h-[500px]'} shrink-0 flex flex-col p-2 select-none group/card`}>
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative h-full rounded-2xl border-2 ${styles.border} bg-[#050508] overflow-hidden flex flex-col 
          transition-all duration-200 ease-out cursor-pointer ${styles.glow}
        `}
      >
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
             style={{ background: styles.foil, mixBlendMode: 'color-dodge' }}></div>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover/card:opacity-[0.07] transition-all duration-700">
           <Hexagon size={compact ? 200 : 300} strokeWidth={0.5} className={styles.text} />
        </div>

        <div className={`relative z-10 p-4 border-b border-white/10 bg-gradient-to-l ${styles.gradient}`}>
          <div className="flex justify-between items-start mb-1">
            <div className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-black/60 ${styles.text} border border-white/10`}>
              {card.rarity || 'RARE'}
            </div>
            <div className={`flex items-center gap-1 text-[9px] font-mono ${styles.text}`}>
               <Hash size={8} /> {index + 101}
            </div>
          </div>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-white leading-tight drop-shadow-md`}>{card.title}</h3>
          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${styles.text} opacity-80`}>{card.methodName}</p>
        </div>

        <div className="relative z-10 p-4 flex-1 flex flex-col justify-center">
          {isQuad ? (
            <div className="grid grid-cols-2 gap-2">
              {card.contentItems?.slice(0, 4).map((item, idx) => (
                <div key={idx} className="relative p-2 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm group/item hover:border-white/20 transition-all overflow-hidden">
                  <div className={`text-[7px] font-black ${styles.text} mb-0.5 opacity-60 uppercase`}>{item.label}</div>
                  <div className="text-[10px] text-slate-200 leading-tight font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {card.contentItems?.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center group/line">
                   <div className={`w-6 h-px ${styles.accent} opacity-30 group-hover/line:w-10 transition-all`}></div>
                   <div className="flex-1">
                     <span className={`text-[9px] font-bold ${styles.text} block mb-0.5`}>{item.label}</span>
                     <p className="text-[11px] text-slate-300 leading-relaxed italic">"{item.value}"</p>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 px-4 py-3 bg-black/80 border-t border-white/10 flex justify-between items-center">
           <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 border border-white/10`}>
                 <Star size={12} className={styles.text} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white font-bold leading-none">{card.hebrewDate}</span>
                <span className="text-[7px] text-slate-500 uppercase tracking-tighter italic">Welcome Matrix</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null); 
  const [welcomeCards, setWelcomeCards] = useState([]);
  const [loadingWelcome, setLoadingWelcome] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMethods, setSelectedMethods] = useState(['l1_pardes', 'l1_elements', 'l4_soul_powers']);

  useEffect(() => {
    generateWelcomeMatrix();
  }, []);

  const generateWelcomeMatrix = async () => {
    setLoadingWelcome(true);
    const welcomePrompt = `
      You are 'HolisView Matrix ULTIMATE'. 
      TASK: Generate 4 unique interpretation cards for the phrase "ברוכים הבאים" (Welcome).
      One card for each level (1, 2, 3, 4).
      Level 1: Basic welcoming warmth (CORE)
      Level 2: Growth and new beginnings (EVOLUTION)
      Level 3: Universal connection (ANCIENT)
      Level 4: Divine presence/Ultimate hospitality (LEGENDARY)
      FORMAT: JSON with "cards" array. Each card has title, rarity, layout, hebrewDate, and contentItems.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: welcomePrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      
      const processed = parsed.cards.map((card, idx) => ({
        ...card,
        level: idx + 1,
        colorKey: (idx + 1) === 1 ? 'blue' : (idx + 1) === 2 ? 'green' : (idx + 1) === 3 ? 'purple' : 'gold',
        methodName: `Matrix Level ${idx + 1}`
      }));

      setWelcomeCards(processed);
    } catch (e) { console.error("Welcome Error", e); }
    setLoadingWelcome(false);
  };

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setSections(null);
    
    const activeMethods = [];
    methodsData.forEach(l => l.methods.forEach(m => selectedMethods.includes(m.id) && activeMethods.push({ ...m, level: l.level })));

    const systemPrompt = `
      Analyze: "${inputText}"
      Using: ${activeMethods.map(m => m.name).join(', ')}.
      Return JSON with "sections" array. 
      JSON SCHEMA: { "sections": [ { "methodId": "...", "methodName": "...", "level": 1-4, "cards": [...] } ] }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      const processed = parsed.sections.map(sec => ({
        ...sec,
        colorKey: sec.level === 1 ? 'blue' : sec.level === 2 ? 'green' : sec.level === 3 ? 'purple' : 'gold'
      }));
      setSections(processed);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl overflow-hidden" dir="rtl">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; border: 2px solid transparent; background-clip: padding-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />

      <header className="h-16 border-b border-white/10 bg-[#050508]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none italic">HolisView <span className="text-amber-400">ULTIMATE</span></h1>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Matrix {VERSION}</span>
            </div>
          </div>
        </div>
        <button onClick={() => window.print()} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
           <Printer size={18}/>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={`bg-[#050508]/90 backdrop-blur-xl border-l border-white/10 transition-all duration-500 overflow-hidden flex flex-col shrink-0 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Deck Configuration</h2>
            {methodsData.map(l => (
              <div key={l.level} className="mb-8">
                <div className={`text-[10px] font-bold mb-4 flex items-center gap-2 ${getColorClasses(l.baseColor).text}`}>
                   <div className={`w-1.5 h-1.5 rounded-full ${getColorClasses(l.baseColor).accent}`}></div>
                   {l.title}
                </div>
                <div className="space-y-2">
                  {l.methods.map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedMethods(p => p.includes(m.id) ? p.filter(x=>x!==m.id) : [...p, m.id])}
                      className={`w-full text-right p-3 rounded-xl text-xs transition-all flex items-center justify-between group ${selectedMethods.includes(m.id) ? 'bg-white/10 border border-white/10 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}`}
                    >
                      <span className="font-medium">{m.name}</span>
                      {selectedMethods.includes(m.id) ? <CheckSquare size={14} className={getColorClasses(l.baseColor).text} /> : <Square size={14} className="opacity-20" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          {!sections && (
            <div className="p-10 shrink-0 border-b border-white/5 bg-gradient-to-b from-black to-[#050508]">
              <div className="max-w-[1400px] mx-auto text-center mb-10">
                 <h2 className="text-3xl font-black text-white italic mb-2 tracking-tight">WELCOME MATRIX <span className="text-amber-500">INITIATED</span></h2>
                 <p className="text-slate-400 text-sm max-w-2xl mx-auto italic opacity-70">
                    מערכת HolisView ניתחה עבורך את הביטוי "ברוכים הבאים" ב-4 רמות עומק שונות. 
                    השראה חיה למבנה התודעה המערכתי שלך.
                 </p>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 justify-center items-center px-4 custom-scrollbar">
                {loadingWelcome ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="w-[280px] h-[400px] bg-white/5 rounded-2xl border border-white/5 animate-pulse flex items-center justify-center">
                       <Loader2 className="animate-spin text-slate-700" size={30} />
                    </div>
                  ))
                ) : (
                  welcomeCards.map((card, idx) => (
                    <ProCard key={idx} card={card} index={idx} compact={true} />
                  ))
                )}
              </div>
            </div>
          )}

          <div className="p-8 border-b border-white/5 bg-black/20 shrink-0 sticky top-0 z-30">
            <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative flex gap-3 bg-[#0A0A0F] p-2 rounded-2xl border border-white/10 shadow-2xl">
                <input 
                  value={inputText} onChange={e => setInputText(e.target.value)}
                  placeholder="הזן נושא לניתוח אסטרטגי עמוק..."
                  className="flex-1 bg-transparent px-6 py-3 text-lg font-light text-slate-100 focus:outline-none placeholder:text-slate-700"
                />
                <button 
                  onClick={handleAnalyze} disabled={loading}
                  className="bg-white text-black hover:bg-amber-400 disabled:opacity-50 px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
                  GENERATE MATRIX
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar p-10">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 border-2 border-amber-500/20 rounded-2xl animate-spin-slow"></div>
                  <div className="absolute inset-0 w-24 h-24 border-t-2 border-amber-500 rounded-2xl animate-spin"></div>
                  <Sparkles size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-500 animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black tracking-widest uppercase text-white">Forging Matrix Elements</h3>
                  <p className="text-xs font-mono text-slate-500 mt-2">Applying 8 layers of reality distortion...</p>
                </div>
              </div>
            ) : sections ? (
              <div className="max-w-[1800px] mx-auto space-y-16">
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getColorClasses(section.colorKey).gradient} border border-white/10 flex items-center justify-center`}>
                          <Layers size={20} className={getColorClasses(section.colorKey).text} />
                       </div>
                       <div>
                         <h2 className="text-2xl font-black text-white tracking-tight">{section.methodName}</h2>
                         <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 ${getColorClasses(section.colorKey).text}`}>Level {section.level} Matrix</span>
                       </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-10 px-2 custom-scrollbar snap-x">
                      {section.cards.map((card, cIdx) => (
                        <div key={cIdx} className="snap-start">
                          <ProCard card={{...card, colorKey: section.colorKey}} index={cIdx} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
```

---

# HolisView ULTIMATE Collector Edition Matrix
- https://gemini.google.com/share/4bd68a665393

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Loader2, ChevronDown, ChevronLeft, 
  Menu, X, CheckSquare, Square, FileText, Layers, AlignRight,
  Volume2, Copy, Check, RefreshCw, Hexagon, Printer, Download, Grid,
  Maximize2, Wind, Flame, Droplets, Mountain, Activity,
  Bookmark, ShieldCheck, Star, Brain, Eye, Heart, Feather, Globe, Command,
  Github, Layout, Sun, Moon, Calendar, Hash, ArrowLeftRight
} from 'lucide-react';

const apiKey = ""; 

const VERSION = "8.1 ULTIMATE COLLECTOR (FIXED)";

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות (CORE)",
    baseColor: "blue",
    methods: [
      { id: 'l1_pardes', name: 'פרד״ס (פשט, רמז, דרש, סוד)' },
      { id: 'l1_elements', name: 'ארבעת היסודות (רוח, אש, מים, אדמה)' },
      { id: 'l1_name', name: 'ארבע אותיות השם (י-ה-ו-ה)' },
      { id: 'l1_creatures', name: 'ארבע חיות הקודש (אריה, שור, נשר, אדם)' },
      { id: 'l1_sons', name: 'ארבעה בנים (חכם, רשע, תם, שאינו יודע)' },
    ]
  },
  {
    level: 2,
    title: "רמה 2 - צמיחה (EVOLUTION)",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה' },
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות (ANCIENT)",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד (LEGENDARY)",
    baseColor: "gold",
    methods: [
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ]
  }
];

const getColorClasses = (colorName) => {
  const map = {
    blue: { 
      text: 'text-blue-300', 
      bg: 'bg-blue-900/40', 
      border: 'border-blue-400/50', 
      accent: 'bg-blue-400', 
      glow: 'shadow-blue-500/40',
      gradient: 'from-blue-600/30 via-blue-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)'
    },
    green: { 
      text: 'text-emerald-300', 
      bg: 'bg-emerald-900/40', 
      border: 'border-emerald-400/50', 
      accent: 'bg-emerald-400', 
      glow: 'shadow-emerald-500/40',
      gradient: 'from-emerald-600/30 via-emerald-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(16,185,129,0.1) 100%)'
    },
    purple: { 
      text: 'text-purple-300', 
      bg: 'bg-purple-900/40', 
      border: 'border-purple-400/50', 
      accent: 'bg-purple-400', 
      glow: 'shadow-purple-500/40',
      gradient: 'from-purple-600/30 via-purple-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(139,92,246,0.1) 100%)'
    },
    gold: { 
      text: 'text-amber-300', 
      bg: 'bg-amber-900/40', 
      border: 'border-amber-400/60', 
      accent: 'bg-amber-400', 
      glow: 'shadow-amber-500/50',
      gradient: 'from-amber-600/40 via-amber-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(245,158,11,0.2) 100%)'
    }
  };
  return map[colorName] || map.blue;
};

// --- PRO CARD COMPONENT ---
const ProCard = ({ card, index }) => {
  const styles = getColorClasses(card.colorKey);
  const isQuad = card.layout === 'quad';
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="w-full min-w-[320px] max-w-[400px] shrink-0 h-[500px] flex flex-col p-2 select-none group/card">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative h-full rounded-2xl border-2 ${styles.border} bg-[#050508] overflow-hidden flex flex-col 
          transition-all duration-200 ease-out cursor-pointer ${styles.glow}
        `}
      >
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
             style={{ background: styles.foil, mixBlendMode: 'color-dodge' }}></div>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover/card:opacity-[0.07] transition-all duration-700">
           <Hexagon size={300} strokeWidth={0.5} className={styles.text} />
        </div>

        <div className={`relative z-10 p-5 border-b border-white/10 bg-gradient-to-l ${styles.gradient}`}>
          <div className="flex justify-between items-start mb-2">
            <div className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase bg-black/60 ${styles.text} border border-white/10`}>
              {card.rarity || 'RARE'}
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-mono ${styles.text}`}>
               <Hash size={10} /> {index + 101}
            </div>
          </div>
          <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">{card.title}</h3>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${styles.text} opacity-80`}>{card.methodName}</p>
        </div>

        <div className="relative z-10 p-5 flex-1 flex flex-col justify-center">
          {isQuad ? (
            <div className="grid grid-cols-2 gap-3">
              {card.contentItems.slice(0, 4).map((item, idx) => (
                <div key={idx} className="relative p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm group/item hover:border-white/20 transition-all overflow-hidden">
                  <div className={`text-[8px] font-black ${styles.text} mb-1 opacity-60 uppercase`}>{item.label}</div>
                  <div className="text-xs text-slate-200 leading-snug font-medium">{item.value}</div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${styles.bg} blur-md opacity-0 group-hover/item:opacity-100 transition-opacity`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {card.contentItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center group/line">
                   <div className={`w-8 h-px ${styles.accent} opacity-30 group-hover/line:w-12 transition-all`}></div>
                   <div className="flex-1">
                     <span className={`text-[10px] font-bold ${styles.text} block mb-0.5`}>{item.label}</span>
                     <p className="text-xs text-slate-300 leading-relaxed italic">"{item.value}"</p>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 px-5 py-4 bg-black/80 border-t border-white/10 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10`}>
                 <Star size={14} className={styles.text} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white font-bold leading-none">{card.hebrewDate}</span>
                <span className="text-[8px] text-slate-500 uppercase tracking-tighter">HolisView Archive</span>
              </div>
           </div>
           <div className="flex -space-x-1">
              {[1,2,3].map(s => <div key={s} className={`w-1.5 h-1.5 rounded-full ${styles.accent} border border-black`}></div>)}
           </div>
        </div>

        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000`}></div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMethods, setSelectedMethods] = useState(['l1_pardes', 'l1_elements', 'l4_soul_powers']);

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setSections(null);
    
    const activeMethods = [];
    methodsData.forEach(l => l.methods.forEach(m => selectedMethods.includes(m.id) && activeMethods.push({ ...m, level: l.level })));

    const systemPrompt = `
      You are 'HolisView Matrix ULTIMATE', a master of systemic kabbalistic analysis.
      
      TASK:
      Analyze: "${inputText}"
      Using: ${activeMethods.map(m => m.name).join(', ')}.

      FORMAT:
      Return JSON with a "sections" array. Each section corresponds to ONE method.
      Ensure the cards feel "Legendary" and "Epic" in their descriptions.
      
      JSON SCHEMA:
      {
        "sections": [
          {
            "methodId": "...",
            "methodName": "...",
            "level": 1-4,
            "cards": [
              {
                "title": "...",
                "rarity": "LEGENDARY" | "ULTRA RARE" | "HOLOGRAM",
                "layout": "quad" | "list",
                "hebrewDate": "...",
                "contentItems": [{"label": "...", "value": "..."}]
              }
            ]
          }
        ]
      }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      
      const processed = parsed.sections.map(sec => ({
        ...sec,
        colorKey: sec.level === 1 ? 'blue' : sec.level === 2 ? 'green' : sec.level === 3 ? 'purple' : 'gold'
      }));

      setSections(processed);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl overflow-hidden" dir="rtl">
      {/* Inject custom styles via a standard style tag */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; border: 2px solid transparent; background-clip: padding-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media print {
          body { background: white !important; }
          .snap-start { page-break-inside: avoid; break-inside: avoid; }
        }
      `}} />

      <header className="h-16 border-b border-white/10 bg-[#050508]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none italic">HolisView <span className="text-amber-400">ULTIMATE</span></h1>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Collector Edition Matrix</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => window.print()} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
             <Printer size={18}/>
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <aside className={`bg-[#050508]/90 backdrop-blur-xl border-l border-white/10 transition-all duration-500 overflow-hidden flex flex-col shrink-0 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Deck Configuration</h2>
              <div className="w-10 h-px bg-white/10"></div>
            </div>
            
            {methodsData.map(l => (
              <div key={l.level} className="mb-8">
                <div className={`text-[10px] font-bold mb-4 flex items-center gap-2 ${getColorClasses(l.baseColor).text}`}>
                   <div className={`w-1.5 h-1.5 rounded-full ${getColorClasses(l.baseColor).accent}`}></div>
                   {l.title}
                </div>
                <div className="space-y-2">
                  {l.methods.map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedMethods(p => p.includes(m.id) ? p.filter(x=>x!==m.id) : [...p, m.id])}
                      className={`
                        w-full text-right p-3 rounded-xl text-xs transition-all flex items-center justify-between group
                        ${selectedMethods.includes(m.id) 
                          ? 'bg-white/10 border border-white/10 text-white shadow-inner' 
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}
                      `}
                    >
                      <span className="font-medium">{m.name.split('(')[0]}</span>
                      {selectedMethods.includes(m.id) ? <CheckSquare size={14} className={getColorClasses(l.baseColor).text} /> : <Square size={14} className="opacity-20" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-black/20 shrink-0">
            <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative flex gap-3 bg-[#0A0A0F] p-2 rounded-2xl border border-white/10">
                <input 
                  value={inputText} onChange={e => setInputText(e.target.value)}
                  placeholder="הזן נושא לניתוח אסטרטגי עמוק..."
                  className="flex-1 bg-transparent px-6 py-3 text-lg font-light text-slate-100 focus:outline-none placeholder:text-slate-700"
                />
                <button 
                  onClick={handleAnalyze} disabled={loading}
                  className="bg-white text-black hover:bg-amber-400 disabled:opacity-50 px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 shadow-xl shadow-white/5"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
                  GENERATE MATRIX
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar p-10">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 border-2 border-amber-500/20 rounded-2xl animate-spin-slow"></div>
                  <div className="absolute inset-0 w-24 h-24 border-t-2 border-amber-500 rounded-2xl animate-spin"></div>
                  <Sparkles size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-500 animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black tracking-widest uppercase text-white">Forging Matrix Elements</h3>
                  <p className="text-xs font-mono text-slate-500 mt-2">Applying 8 layers of reality distortion...</p>
                </div>
              </div>
            ) : sections ? (
              <div className="max-w-[1800px] mx-auto space-y-16">
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-700">
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getColorClasses(section.colorKey).gradient} border border-white/10 flex items-center justify-center`}>
                          <Layers size={20} className={getColorClasses(section.colorKey).text} />
                       </div>
                       <div>
                         <h2 className="text-2xl font-black text-white tracking-tight">{section.methodName}</h2>
                         <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 ${getColorClasses(section.colorKey).text}`}>Level {section.level} Matrix</span>
                            <div className="h-px w-24 bg-white/10"></div>
                         </div>
                       </div>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-10 px-2 custom-scrollbar snap-x snap-mandatory">
                      {section.cards.map((card, cIdx) => (
                        <div key={cIdx} className="snap-start">
                          <ProCard card={{...card, colorKey: section.colorKey}} index={cIdx} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-800">
                <Hexagon size={120} strokeWidth={0.5} className="opacity-20 mb-6 animate-spin-slow" />
                <p className="text-lg font-light tracking-widest uppercase">Select Matrices to begin alignment</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
```

---

# HolisView ULTIMATE - Collector Edition Matrix
- https://gemini.google.com/share/4edfb9f660ea

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Loader2, ChevronDown, ChevronLeft, 
  Menu, X, CheckSquare, Square, FileText, Layers, AlignRight,
  Volume2, Copy, Check, RefreshCw, Hexagon, Printer, Download, Grid,
  Maximize2, Wind, Flame, Droplets, Mountain, Activity,
  Bookmark, ShieldCheck, Star, Brain, Eye, Heart, Feather, Globe, Command,
  Github, Layout, Sun, Moon, Calendar, Hash, ArrowLeftRight
} from 'lucide-react';

const apiKey = ""; 

const VERSION = "8.1 ULTIMATE COLLECTOR (FIXED)";

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות (CORE)",
    baseColor: "blue",
    methods: [
      { id: 'l1_pardes', name: 'פרד״ס (פשט, רמז, דרש, סוד)' },
      { id: 'l1_elements', name: 'ארבעת היסודות (רוח, אש, מים, אדמה)' },
      { id: 'l1_name', name: 'ארבע אותיות השם (י-ה-ו-ה)' },
      { id: 'l1_creatures', name: 'ארבע חיות הקודש (אריה, שור, נשר, אדם)' },
      { id: 'l1_sons', name: 'ארבעה בנים (חכם, רשע, תם, שאינו יודע)' },
    ]
  },
  {
    level: 2,
    title: "רמה 2 - צמיחה (EVOLUTION)",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה' },
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות (ANCIENT)",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד (LEGENDARY)",
    baseColor: "gold",
    methods: [
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ]
  }
];

const getColorClasses = (colorName) => {
  const map = {
    blue: { 
      text: 'text-blue-300', 
      bg: 'bg-blue-900/40', 
      border: 'border-blue-400/50', 
      accent: 'bg-blue-400', 
      glow: 'shadow-blue-500/40',
      gradient: 'from-blue-600/30 via-blue-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)'
    },
    green: { 
      text: 'text-emerald-300', 
      bg: 'bg-emerald-900/40', 
      border: 'border-emerald-400/50', 
      accent: 'bg-emerald-400', 
      glow: 'shadow-emerald-500/40',
      gradient: 'from-emerald-600/30 via-emerald-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(16,185,129,0.1) 100%)'
    },
    purple: { 
      text: 'text-purple-300', 
      bg: 'bg-purple-900/40', 
      border: 'border-purple-400/50', 
      accent: 'bg-purple-400', 
      glow: 'shadow-purple-500/40',
      gradient: 'from-purple-600/30 via-purple-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(139,92,246,0.1) 100%)'
    },
    gold: { 
      text: 'text-amber-300', 
      bg: 'bg-amber-900/40', 
      border: 'border-amber-400/60', 
      accent: 'bg-amber-400', 
      glow: 'shadow-amber-500/50',
      gradient: 'from-amber-600/40 via-amber-900/10 to-transparent',
      foil: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(245,158,11,0.2) 100%)'
    }
  };
  return map[colorName] || map.blue;
};

// --- PRO CARD COMPONENT ---
const ProCard = ({ card, index }) => {
  const styles = getColorClasses(card.colorKey);
  const isQuad = card.layout === 'quad';
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="w-full min-w-[320px] max-w-[400px] shrink-0 h-[500px] flex flex-col p-2 select-none group/card">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative h-full rounded-2xl border-2 ${styles.border} bg-[#050508] overflow-hidden flex flex-col 
          transition-all duration-200 ease-out cursor-pointer ${styles.glow}
        `}
      >
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
             style={{ background: styles.foil, mixBlendMode: 'color-dodge' }}></div>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover/card:opacity-[0.07] transition-all duration-700">
           <Hexagon size={300} strokeWidth={0.5} className={styles.text} />
        </div>

        <div className={`relative z-10 p-5 border-b border-white/10 bg-gradient-to-l ${styles.gradient}`}>
          <div className="flex justify-between items-start mb-2">
            <div className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase bg-black/60 ${styles.text} border border-white/10`}>
              {card.rarity || 'RARE'}
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-mono ${styles.text}`}>
               <Hash size={10} /> {index + 101}
            </div>
          </div>
          <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">{card.title}</h3>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${styles.text} opacity-80`}>{card.methodName}</p>
        </div>

        <div className="relative z-10 p-5 flex-1 flex flex-col justify-center">
          {isQuad ? (
            <div className="grid grid-cols-2 gap-3">
              {card.contentItems.slice(0, 4).map((item, idx) => (
                <div key={idx} className="relative p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm group/item hover:border-white/20 transition-all overflow-hidden">
                  <div className={`text-[8px] font-black ${styles.text} mb-1 opacity-60 uppercase`}>{item.label}</div>
                  <div className="text-xs text-slate-200 leading-snug font-medium">{item.value}</div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${styles.bg} blur-md opacity-0 group-hover/item:opacity-100 transition-opacity`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {card.contentItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center group/line">
                   <div className={`w-8 h-px ${styles.accent} opacity-30 group-hover/line:w-12 transition-all`}></div>
                   <div className="flex-1">
                     <span className={`text-[10px] font-bold ${styles.text} block mb-0.5`}>{item.label}</span>
                     <p className="text-xs text-slate-300 leading-relaxed italic">"{item.value}"</p>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 px-5 py-4 bg-black/80 border-t border-white/10 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10`}>
                 <Star size={14} className={styles.text} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white font-bold leading-none">{card.hebrewDate}</span>
                <span className="text-[8px] text-slate-500 uppercase tracking-tighter">HolisView Archive</span>
              </div>
           </div>
           <div className="flex -space-x-1">
              {[1,2,3].map(s => <div key={s} className={`w-1.5 h-1.5 rounded-full ${styles.accent} border border-black`}></div>)}
           </div>
        </div>

        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000`}></div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMethods, setSelectedMethods] = useState(['l1_pardes', 'l1_elements', 'l4_soul_powers']);

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setSections(null);
    
    const activeMethods = [];
    methodsData.forEach(l => l.methods.forEach(m => selectedMethods.includes(m.id) && activeMethods.push({ ...m, level: l.level })));

    const systemPrompt = `
      You are 'HolisView Matrix ULTIMATE', a master of systemic kabbalistic analysis.
      
      TASK:
      Analyze: "${inputText}"
      Using: ${activeMethods.map(m => m.name).join(', ')}.

      FORMAT:
      Return JSON with a "sections" array. Each section corresponds to ONE method.
      Ensure the cards feel "Legendary" and "Epic" in their descriptions.
      
      JSON SCHEMA:
      {
        "sections": [
          {
            "methodId": "...",
            "methodName": "...",
            "level": 1-4,
            "cards": [
              {
                "title": "...",
                "rarity": "LEGENDARY" | "ULTRA RARE" | "HOLOGRAM",
                "layout": "quad" | "list",
                "hebrewDate": "...",
                "contentItems": [{"label": "...", "value": "..."}]
              }
            ]
          }
        ]
      }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      
      const processed = parsed.sections.map(sec => ({
        ...sec,
        colorKey: sec.level === 1 ? 'blue' : sec.level === 2 ? 'green' : sec.level === 3 ? 'purple' : 'gold'
      }));

      setSections(processed);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl overflow-hidden" dir="rtl">
      {/* Inject custom styles via a standard style tag */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; border: 2px solid transparent; background-clip: padding-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media print {
          body { background: white !important; }
          .snap-start { page-break-inside: avoid; break-inside: avoid; }
        }
      `}} />

      <header className="h-16 border-b border-white/10 bg-[#050508]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none italic">HolisView <span className="text-amber-400">ULTIMATE</span></h1>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Collector Edition Matrix</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => window.print()} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
             <Printer size={18}/>
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <aside className={`bg-[#050508]/90 backdrop-blur-xl border-l border-white/10 transition-all duration-500 overflow-hidden flex flex-col shrink-0 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Deck Configuration</h2>
              <div className="w-10 h-px bg-white/10"></div>
            </div>
            
            {methodsData.map(l => (
              <div key={l.level} className="mb-8">
                <div className={`text-[10px] font-bold mb-4 flex items-center gap-2 ${getColorClasses(l.baseColor).text}`}>
                   <div className={`w-1.5 h-1.5 rounded-full ${getColorClasses(l.baseColor).accent}`}></div>
                   {l.title}
                </div>
                <div className="space-y-2">
                  {l.methods.map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedMethods(p => p.includes(m.id) ? p.filter(x=>x!==m.id) : [...p, m.id])}
                      className={`
                        w-full text-right p-3 rounded-xl text-xs transition-all flex items-center justify-between group
                        ${selectedMethods.includes(m.id) 
                          ? 'bg-white/10 border border-white/10 text-white shadow-inner' 
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}
                      `}
                    >
                      <span className="font-medium">{m.name.split('(')[0]}</span>
                      {selectedMethods.includes(m.id) ? <CheckSquare size={14} className={getColorClasses(l.baseColor).text} /> : <Square size={14} className="opacity-20" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-black/20 shrink-0">
            <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative flex gap-3 bg-[#0A0A0F] p-2 rounded-2xl border border-white/10">
                <input 
                  value={inputText} onChange={e => setInputText(e.target.value)}
                  placeholder="הזן נושא לניתוח אסטרטגי עמוק..."
                  className="flex-1 bg-transparent px-6 py-3 text-lg font-light text-slate-100 focus:outline-none placeholder:text-slate-700"
                />
                <button 
                  onClick={handleAnalyze} disabled={loading}
                  className="bg-white text-black hover:bg-amber-400 disabled:opacity-50 px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 shadow-xl shadow-white/5"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
                  GENERATE MATRIX
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar p-10">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 border-2 border-amber-500/20 rounded-2xl animate-spin-slow"></div>
                  <div className="absolute inset-0 w-24 h-24 border-t-2 border-amber-500 rounded-2xl animate-spin"></div>
                  <Sparkles size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-500 animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black tracking-widest uppercase text-white">Forging Matrix Elements</h3>
                  <p className="text-xs font-mono text-slate-500 mt-2">Applying 8 layers of reality distortion...</p>
                </div>
              </div>
            ) : sections ? (
              <div className="max-w-[1800px] mx-auto space-y-16">
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-700">
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getColorClasses(section.colorKey).gradient} border border-white/10 flex items-center justify-center`}>
                          <Layers size={20} className={getColorClasses(section.colorKey).text} />
                       </div>
                       <div>
                         <h2 className="text-2xl font-black text-white tracking-tight">{section.methodName}</h2>
                         <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 ${getColorClasses(section.colorKey).text}`}>Level {section.level} Matrix</span>
                            <div className="h-px w-24 bg-white/10"></div>
                         </div>
                       </div>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-10 px-2 custom-scrollbar snap-x snap-mandatory">
                      {section.cards.map((card, cIdx) => (
                        <div key={cIdx} className="snap-start">
                          <ProCard card={{...card, colorKey: section.colorKey}} index={cIdx} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-800">
                <Hexagon size={120} strokeWidth={0.5} className="opacity-20 mb-6 animate-spin-slow" />
                <p className="text-lg font-light tracking-widest uppercase">Select Matrices to begin alignment</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
```

---

# HolisView - 4.2.0 GOLD - System Integration Matrix
- https://gemini.google.com/share/90918d618301

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Loader2, ChevronDown, ChevronLeft, 
  Menu, X, CheckSquare, Square, FileText, Layers, AlignRight,
  Volume2, Copy, Check, RefreshCw, Hexagon, Printer, Download, Grid,
  Maximize2, Wind, Flame, Droplets, Mountain, Activity,
  Bookmark, ShieldCheck, Star
} from 'lucide-react';

// In this environment, the API key is injected automatically at runtime.
const apiKey = ""; 

// --- CONSTANTS & DATA ---
const VERSION = "4.2.0 GOLD";

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות",
    description: "הבנת היסודות והכוחות הפועלים בעולם ובאדם",
    baseColor: "blue",
    methods: [
      { id: 'l1_pardes', name: 'פרד״ס (פשט, רמז, דרש, סוד)' },
      { id: 'l1_abya', name: 'אביע עולמות (אצילות, בריאה, יצירה, עשייה)' },
      { id: 'l1_elements', name: 'ארבעת היסודות (רוח, אש, מים, אדמה)' },
      { id: 'l1_creatures', name: 'ארבע חיות הקודש (אריה, שור, נשר, אדם)' },
      { id: 'l1_service', name: 'ארבע מדרגות בעבודת ה׳ (יראה, אהבה, תורה, דבקות)' },
      { id: 'l1_providence', name: 'ארבעה אופני השגחה (טבע, נס נסתר, נס גלוי, ישירה)' },
    ]
  },
  {
    level: 2,
    title: "רמה 2 - צמיחה",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים כהשתקפות הנפש)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה גבוהה' },
      { id: 'l2_repentance', name: 'שבעה שלבים של תהליך תשובה' },
      { id: 'l2_world_correction', name: 'שבעה עקרונות של תיקון עולם' },
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_sayings', name: 'עשרת המאמרות' },
      { id: 'l3_success', name: 'עשרת חוקי ההצלחה' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד",
    baseColor: "cyan",
    methods: [
      { id: 'l4_faith_principles', name: 'י"ג יסודות האמונה' },
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ]
  }
];

const getColorClasses = (colorName) => {
  const map = {
    blue: { 
      text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', 
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]', gradient: 'from-blue-600 to-blue-400',
      accent: 'bg-blue-500' 
    },
    green: { 
      text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', 
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]', gradient: 'from-emerald-600 to-emerald-400',
      accent: 'bg-emerald-500'
    },
    purple: { 
      text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', 
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]', gradient: 'from-purple-600 to-purple-400',
      accent: 'bg-purple-500'
    },
    cyan: { 
      text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', 
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]', gradient: 'from-cyan-600 to-cyan-400',
      accent: 'bg-cyan-500'
    },
    gold: { 
      text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', 
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]', gradient: 'from-amber-600 to-amber-400',
      accent: 'bg-amber-500'
    }
  };
  return map[colorName] || map.blue;
};

// --- RENDERERS ---

const TextCompiler = ({ content, styles }) => {
  if (!content) return null;
  const lines = content.split('\n');
  const renderedElements = [];
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      renderedElements.push(<h4 key={index} className={`text-lg font-bold mt-6 mb-2 flex items-center gap-2 ${styles.text} print:text-black`}>
        <div className={`w-1.5 h-1.5 rounded-full ${styles.accent}`}></div>
        {trimmed.replace('### ', '')}
      </h4>);
    } else if (trimmed.startsWith('## ')) {
      renderedElements.push(<h3 key={index} className={`text-xl font-black mt-8 mb-4 border-b-2 ${styles.border} pb-2 tracking-tight ${styles.text} print:text-black print:border-black`}>{trimmed.replace('## ', '')}</h3>);
    } else if (trimmed.startsWith('- ')) {
      renderedElements.push(
        <li key={index} className="mr-4 list-none flex items-start gap-2 mb-2 text-slate-300 print:text-black">
          <span className={`${styles.text} mt-1`}>✦</span>
          <span>{trimmed.replace('- ', '').split(/(\*\*.*?\*\*)/).map((p, i) => p.startsWith('**') ? <strong key={i} className="text-white font-bold">{p.slice(2,-2)}</strong> : p)}</span>
        </li>
      );
    } else if (trimmed.length > 0) {
      renderedElements.push(
        <p key={index} className="mb-4 leading-relaxed text-slate-300/90 font-light print:text-black">
           {trimmed.split(/(\*\*.*?\*\*)/).map((part, i) => 
            part.startsWith('**') && part.endsWith('**') 
              ? <strong key={i} className={`${styles.text} font-bold bg-white/5 px-1 rounded`}>{part.slice(2, -2)}</strong> 
              : part
          )}
        </p>
      );
    }
  });

  return <div>{renderedElements}</div>;
};

// --- ENHANCED CARD COMPONENT ---

const EssenceCard = ({ card }) => {
  const isFire = card.element.includes('אש');
  const isWater = card.element.includes('מים');
  const isAir = card.element.includes('רוח') || card.element.includes('אוויר');
  const isEarth = card.element.includes('אדמה');

  const theme = isFire ? { border: 'border-orange-500/40', shadow: 'shadow-orange-500/20', text: 'text-orange-600', grad: 'from-orange-50 to-white', icon: <Flame className="text-orange-500" /> } :
                isWater ? { border: 'border-blue-500/40', shadow: 'shadow-blue-500/20', text: 'text-blue-600', grad: 'from-blue-50 to-white', icon: <Droplets className="text-blue-500" /> } :
                isAir ? { border: 'border-cyan-500/40', shadow: 'shadow-cyan-500/20', text: 'text-cyan-600', grad: 'from-cyan-50 to-white', icon: <Wind className="text-cyan-500" /> } :
                isEarth ? { border: 'border-amber-700/40', shadow: 'shadow-amber-700/20', text: 'text-amber-800', grad: 'from-amber-50 to-white', icon: <Mountain className="text-amber-700" /> } :
                { border: 'border-purple-500/40', shadow: 'shadow-purple-500/20', text: 'text-purple-600', grad: 'from-purple-50 to-white', icon: <Sparkles className="text-purple-500" /> };

  return (
    <div className={`
      relative h-full bg-gradient-to-br ${theme.grad} rounded-2xl border-2 ${theme.border} 
      p-5 flex flex-col justify-between overflow-hidden shadow-xl ${theme.shadow} 
      hover:scale-[1.02] transition-all duration-500 group print:shadow-none print:border-black
    `}>
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
        <Hexagon size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-black ${theme.text} leading-tight mb-0.5`}>{card.title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">{card.energy}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i < card.score ? theme.text.replace('text', 'bg') : 'bg-slate-200'}`}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
            {theme.icon}
          </div>
        </div>

        <div className="space-y-3">
          {card.sentences.map((s, idx) => (
            <div key={idx} className="relative pr-3 border-r-2 border-slate-200">
              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-0.5 tracking-tighter">
                {["הוראה", "מיקוד", "יישום", "זכירה"][idx]}
              </span>
              <p className="text-[13px] text-slate-800 font-serif leading-snug">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center border-t border-slate-200/50 pt-3">
        <span className="text-[9px] font-mono text-slate-400">#HV-{card.element}</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
          <span className="text-[8px] font-black text-slate-500">HOLISVIEW GOLD</span>
        </div>
      </div>
    </div>
  );
};

// --- ENHANCED RESULT CARD ---

const ResultCard = ({ segment }) => {
  const [copied, setCopied] = useState(false);
  let colorKey = segment.level === 1 ? 'blue' : segment.level === 2 ? 'green' : segment.level === 3 ? 'purple' : segment.level === 4 ? 'cyan' : 'gold';
  const styles = getColorClasses(colorKey);

  return (
    <div className={`
      relative group overflow-hidden rounded-2xl border ${styles.border} ${styles.bg} ${styles.glow}
      backdrop-blur-xl transition-all duration-700 mb-10 print:border-none print:bg-white
      animate-in fade-in slide-in-from-bottom-4
    `}>
      {/* Dynamic Animated Border Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`}>
        <div className={`absolute -inset-[2px] rounded-2xl border-2 ${styles.border} animate-pulse`}></div>
      </div>

      <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10 relative z-10">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center border ${styles.border} ${styles.text}`}>
            {segment.level === 99 ? <Star className="animate-spin-slow" /> : <Hexagon strokeWidth={1.5} />}
          </div>
          <div>
            <h3 className={`text-2xl font-black tracking-tight ${styles.text} print:text-black`}>{segment.title}</h3>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500">
                {segment.level === 99 ? 'INTEGRATION ARCHITECTURE' : `PHASE 0${segment.level}`}
              </span>
              <div className={`h-1 w-12 rounded-full ${styles.accent} opacity-30`}></div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => { navigator.clipboard.writeText(segment.content); setCopied(true); setTimeout(()=>setCopied(false), 2000); }}
          className="p-3 rounded-xl hover:bg-white/10 text-slate-400 transition-all border border-transparent hover:border-white/10"
        >
          {copied ? <Check className="text-green-400" /> : <Copy size={20} />}
        </button>
      </div>

      <div className="p-8 md:p-10 relative z-10">
        <TextCompiler content={segment.content} styles={styles} />
      </div>

      {/* Modern Background Texture */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [cardsData, setCardsData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [expandedLevels, setExpandedLevels] = useState({1: true, 2: false, 3: false, 4: false});

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setAnalysisData(null);
    setCardsData(null);
    
    const activeMethods = [];
    methodsData.forEach(l => l.methods.forEach(m => selectedMethods.includes(m.id) && activeMethods.push({ ...m, level: l.level })));

    const systemPrompt = `Analyze the user input using: ${activeMethods.map(m => m.name).join(', ')}. Return JSON with "analysis" (array of {title, level, content}) and "cards" (exactly 9 {title, element, energy, score, sentences:[4]}) keys. Use Nikud in cards sentences. Format content with markdown.`;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\nInput: " + inputText }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      setAnalysisData(parsed.analysis);
      setCardsData(parsed.cards);
    } catch (e) {
      setAnalysisData([{ title: "שגיאה", level: 1, content: "אירעה שגיאה בעיבוד הנתונים." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020208] text-slate-200 font-sans flex flex-col dir-rtl" dir="rtl">
      
      {/* Glass Header */}
      <header className="sticky top-0 z-50 h-20 border-b border-white/5 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-6 print:hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all">
            {isSidebarOpen ? <X /> : <Menu className="text-purple-400" />}
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              HolisView <span className="text-[10px] text-slate-500 font-mono tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">{VERSION}</span>
            </h1>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">System Integration Matrix</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {analysisData && (
            <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95 transition-all">
              <Download size={14} /> ייצוא דוח מהודר
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden print:block">
        
        {/* Sidebar - Methods */}
        <aside className={`fixed inset-y-0 right-0 z-40 w-80 bg-slate-950 border-l border-white/5 transform transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 ${isSidebarOpen ? 'md:w-80' : 'md:w-0 md:opacity-0 md:p-0'} overflow-hidden`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <Layers className="text-purple-500" />
              <h2 className="font-bold text-lg">ארכיטקטורת ניתוח</h2>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-1">
              {methodsData.map(l => (
                <div key={l.level} className="space-y-2">
                  <button onClick={() => setExpandedLevels(prev => ({...prev, [l.level]: !prev[l.level]}))} className={`w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all`}>
                    <span className="text-sm font-bold">{l.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedLevels[l.level] ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedLevels[l.level] && (
                    <div className="grid grid-cols-1 gap-2 p-1">
                      {l.methods.map(m => (
                        <div key={m.id} onClick={() => setSelectedMethods(prev => prev.includes(m.id) ? prev.filter(x=>x!==m.id) : [...prev, m.id])} className={`p-3 rounded-lg text-xs cursor-pointer border transition-all flex items-center gap-3 ${selectedMethods.includes(m.id) ? 'bg-purple-500/10 border-purple-500/40 text-purple-200' : 'bg-transparent border-white/5 text-slate-500 hover:text-slate-300'}`}>
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${selectedMethods.includes(m.id) ? 'bg-purple-500 border-purple-500' : 'border-slate-700'}`}>
                            {selectedMethods.includes(m.id) && <Check size={10} className="text-white" />}
                          </div>
                          {m.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_#101025_0%,_#020208_100%)] print:bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Elegant Input Area */}
            <section className="relative group print:hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-2">
                <textarea 
                  value={inputText} onChange={(e) => setInputText(e.target.value)}
                  placeholder="הזן את הטקסט או הנושא לניתוח עומק..."
                  className="w-full h-48 bg-transparent p-6 text-xl font-light text-slate-100 focus:outline-none placeholder:text-slate-700 resize-none"
                />
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border-t border-white/5">
                  <div className="flex items-center gap-3 text-slate-500 px-4">
                    <Activity size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">{selectedMethods.length} Methods active</span>
                  </div>
                  <button 
                    onClick={handleAnalyze} disabled={loading || !inputText || selectedMethods.length === 0}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-xl text-white font-black tracking-tighter hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] disabled:opacity-30 transition-all active:scale-95 flex items-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} className="fill-white" />}
                    נתח עכשיו
                  </button>
                </div>
              </div>
            </section>

            {/* Analysis Feed */}
            <div className="space-y-10">
              {loading ? (
                <div className="py-32 flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-purple-500/10 border-t-purple-500 animate-spin"></div>
                    <Hexagon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" size={32} />
                  </div>
                  <p className="text-slate-500 font-mono tracking-[0.3em] uppercase animate-pulse">Processing Holistic Matrix...</p>
                </div>
              ) : analysisData ? (
                <>
                  <div className="hidden print:block text-center border-b-2 border-black pb-8 mb-12">
                    <h1 className="text-4xl font-black text-black">HolisView Analysis Report</h1>
                    <p className="text-gray-500 mt-2">v{VERSION} • Holistic Intelligence Engine</p>
                  </div>

                  {analysisData.map((seg, i) => <ResultCard key={i} segment={seg} />)}

                  {/* Essence Cards Grid */}
                  {cardsData && (
                    <div className="mt-20 space-y-10 print:break-before-page">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                        <h2 className="text-3xl font-black text-center bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">רשת המהויות: הלכה למעשה</h2>
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                        {cardsData.map((c, i) => <div key={i} className="aspect-[3/4]"><EssenceCard card={c} /></div>)}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-40 flex flex-col items-center text-slate-700 opacity-20 select-none">
                  <Hexagon size={120} strokeWidth={0.5} className="mb-6" />
                  <p className="text-xl font-light">ממתין לפקודת ניתוח...</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        @media print {
          @page { size: A4; margin: 1cm; }
          body { background: white !important; }
          .print\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
```

---

# אפליקציות לפיתוח

- כאן אני אשמור את הקודים של האפליקצייה על מנת ליצור להם דוקומנטצייה מלאה על ידי סריקת הגירסאות השונות, ויצירת ליקוטים שונים של מקטעים מכל הגירסאות וליצור אחת מלאה המשלבת את הפונקציונאליות של כולם.
