# אפליקציות לפיתוח

- כאן אני אשמור את הקודים של האפליקצייה על מנת ליצור להם דוקומנטצייה מלאה על ידי סריקת הגירסאות השונות, ויצירת ליקוטים שונים של מקטעים מכל הגירסאות וליצור אחת מלאה המשלבת את הפונקציונאליות של כולם.

## HolisView PRO ~ V6.0 PRO CARDS

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
