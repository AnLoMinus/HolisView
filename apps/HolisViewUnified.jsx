import React, { useMemo, useState } from 'react';
import {
  Activity,
  Bookmark,
  Brain,
  Calendar,
  Check,
  CheckSquare,
  ChevronDown,
  Copy,
  Filter,
  Grid,
  Layers,
  Layout,
  LayoutGrid,
  Loader2,
  Menu,
  Printer,
  Search,
  Sparkles,
  Square,
  Star,
  Zap,
} from 'lucide-react';

// In this environment, the API key is injected automatically at runtime.
const apiKey = '';

const VERSION = '9.0 UNIFIED MATRIX';

const METHODS_DATA = [
  {
    level: 1,
    title: 'רמה 1 - יסודות (מבנה)',
    description: 'מיפוי המציאות על בסיס תבניות יסוד של 4',
    baseColor: 'blue',
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
      { id: 'l1_newyears', name: 'ארבעה ראשי שנים (מלכים, בהמה, שנים, אילן)' },
    ],
  },
  {
    level: 2,
    title: 'רמה 2 - צמיחה (תהליך)',
    baseColor: 'green',
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים כהשתקפות הנפש)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה גבוהה' },
      { id: 'l2_repentance', name: 'שבעה שלבים של תהליך תשובה' },
      { id: 'l2_world_correction', name: 'שבעה עקרונות של תיקון עולם' },
    ],
  },
  {
    level: 3,
    title: 'רמה 3 - מערכות (חוקיות)',
    baseColor: 'purple',
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_sayings', name: 'עשרת המאמרות' },
      { id: 'l3_success', name: 'עשרת חוקי ההצלחה' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' },
    ],
  },
  {
    level: 4,
    title: 'רמה 4 - ייחוד (מהות)',
    baseColor: 'gold',
    methods: [
      { id: 'l4_faith_principles', name: 'י"ג יסודות האמונה' },
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' },
    ],
  },
];

const METHOD_LIBRARY = {
  l1_pardes: {
    coreIdea: 'שיטת פרד״ס מפרקת טקסט לרבדים: הפשט הגלוי, רמזים סמויים, דרש פרשני וסוד מיסטי.',
    axes: [
      { label: 'פשט', meaning: 'המשמעות המילולית והברורה של הטקסט.' },
      { label: 'רמז', meaning: 'קשרים נסתרים ומסרים מרומזים.' },
      { label: 'דרש', meaning: 'פרשנות והרחבה רעיונית.' },
      { label: 'סוד', meaning: 'המשמעות המיסטית והעמוקה.' },
    ],
    sources: ['4/פרד"ס – ארבע רמות הבנה 📖.md'],
  },
  l1_abya: {
    coreIdea: 'ארבעה עולמות משקפים מעבר מהאלוקי למהותי אל הביטוי המעשי.',
    axes: [
      { label: 'אצילות', meaning: 'עולם האלוקות והרצון הטהור.' },
      { label: 'בריאה', meaning: 'עולם הנשמות והמחשבה.' },
      { label: 'יצירה', meaning: 'עולם הרגש והדינמיקה.' },
      { label: 'עשייה', meaning: 'העולם הגשמי והיישום בפועל.' },
    ],
    sources: ['4/ארבעת עולמות הקבלה 🌍.md'],
  },
  l1_elements: {
    coreIdea: 'ארבעת היסודות מגדירים כוחות בסיסיים של מציאות ואופי.',
    axes: [
      { label: 'אש', meaning: 'אנרגיה, תנועה ושאיפה קדימה.' },
      { label: 'רוח', meaning: 'חכמה, תקשורת ותנועה מחשבתית.' },
      { label: 'מים', meaning: 'רגש, חיבור וזרימה.' },
      { label: 'אדמה', meaning: 'יציבות, מסגרת ויישום.' },
    ],
    sources: ['4/ארבעת היסודות בבריאה 🌿🔥💧🌍.md'],
  },
  l1_name: {
    coreIdea: 'ארבע אותיות שם הוי״ה משקפות את התפתחות הרעיון עד להגשמה.',
    axes: [
      { label: 'י', meaning: 'חכמה, נקודת המקור של הרעיון.' },
      { label: 'ה', meaning: 'בינה, פירוט והעמקה.' },
      { label: 'ו', meaning: 'תפארת, חיבור והשפעה בפועל.' },
      { label: 'ה', meaning: 'מלכות, הגשמה וסיום.' },
    ],
    sources: ['4/ארבע אותיות שם הוי"ה (י-ה-ו-ה) ✡.md'],
  },
  l1_creatures: {
    coreIdea: 'חיות הקודש מייצגות כוחות מניעים של המציאות הרוחנית.',
    axes: [
      { label: 'אריה', meaning: 'עוצמה ומלכות.' },
      { label: 'שור', meaning: 'עמל והתמדה.' },
      { label: 'נשר', meaning: 'רוממות והשראה.' },
      { label: 'אדם', meaning: 'בחירה וחכמה.' },
    ],
    sources: ['4/ארבע חיות הקודש ביחזקאל 🦁🐂🦅👤.md'],
  },
  l1_sons: {
    coreIdea: 'ארבעת הבנים מציגים טיפוסי למידה והתייחסות למסורת.',
    axes: [
      { label: 'חכם', meaning: 'שואל ומעמיק בחכמה.' },
      { label: 'רשע', meaning: 'מתנגד ומפריד את עצמו.' },
      { label: 'תם', meaning: 'פשוט ותמים.' },
      { label: 'שאינו יודע לשאול', meaning: 'בתחילת הדרך וזקוק להכוונה.' },
    ],
    sources: ['4/ארבעת הבנים בהגדה של פסח 🧒👦🧑👨.md'],
  },
  l1_service: {
    coreIdea: 'עבודת ה׳ מתוארת כארבעה שלבים פנימיים של קשר וטרנספורמציה.',
    axes: [
      { label: 'יראה', meaning: 'כבוד, פחד והקשבה.' },
      { label: 'אהבה', meaning: 'חיבור ודבקות.' },
      { label: 'תשובה', meaning: 'תיקון ושינוי עצמי.' },
      { label: 'תפילה', meaning: 'שיחה ודיבור עם ה׳.' },
    ],
    sources: ["4/ארבע מדרגות בעבודת ה' 🛤.md"],
  },
  l1_providence: {
    coreIdea: 'ארבעה אופני השגחה מתארים דרכי הנהגה אלוקית בעולם.',
    axes: [
      { label: 'כללית', meaning: 'הנהגת העולם בכללותו.' },
      { label: 'פרטית', meaning: 'השגחה על כל פרט ופרט.' },
      { label: 'נסית', meaning: 'התערבות על-טבעית.' },
      { label: 'טבעית', meaning: 'הנהגה דרך חוקי הטבע.' },
    ],
    sources: ['4/ארבעה אופנים של השגחה אלוקית 👀.md'],
  },
  l2_creation: {
    coreIdea: 'שבעת ימי הבריאה מהווים מודל לתהליך יצירה רוחני ושלבי צמיחה.',
    axes: [
      { label: 'יום ראשון', meaning: 'אור – התחלה ובהירות.' },
      { label: 'יום שני', meaning: 'רקיע – הבחנה וסידור.' },
      { label: 'יום שלישי', meaning: 'יבשה וים – יציבות וגבולות.' },
      { label: 'יום רביעי', meaning: 'מאורות – חכמה והכוונה.' },
      { label: 'יום חמישי', meaning: 'חיים – יצירה חיה ותנועה.' },
      { label: 'יום שישי', meaning: 'אדם – תכלית ושלמות.' },
      { label: 'שבת', meaning: 'מנוחה – התבוננות והשלמה.' },
    ],
    sources: ['7/מעשה בראשית – שבעת ימי בריאה 🌍.md'],
  },
  l2_principles: {
    coreIdea: 'שבעה עקרונות לתודעה גבוהה מדגישים איזון פנימי וחיבור רוחני.',
    axes: [
      { label: 'התבוננות פנימית', meaning: 'חשבון נפש ותהליך פנימי.' },
      { label: 'שליטה עצמית', meaning: 'ענווה וצניעות.' },
      { label: 'התחברות לאור', meaning: 'שאיפה רוחנית גבוהה.' },
      { label: 'אהבת הבריות', meaning: 'קשר חיובי עם אנשים.' },
      { label: 'סבלנות', meaning: 'אמונה בזמן הנכון.' },
      { label: 'תודעת האחדות', meaning: 'חיבור לכלל.' },
      { label: 'שמחת החיים', meaning: 'שמחה פנימית מתמשכת.' },
    ],
    sources: ['7/שבעה עקרונות לתודעה גבוהה 🧘‍♂️.md'],
  },
  l2_repentance: {
    coreIdea: 'תהליך תשובה מורכב משבעה שלבים של הכרה, תיקון ושמחה.',
    axes: [
      { label: 'הכרה', meaning: 'זיהוי הצורך בשינוי.' },
      { label: 'חרטה', meaning: 'כאב פנימי על המעשה.' },
      { label: 'עזיבת החטא', meaning: 'הפסקת הפעולה הפוגעת.' },
      { label: 'קבלה לעתיד', meaning: 'החלטה לשינוי יציב.' },
      { label: 'תפילה ותשובה', meaning: 'עבודה פנימית מול ה׳ והעצמי.' },
      { label: 'צדקה ותיקון', meaning: 'נתינה כמעשה תיקון.' },
      { label: 'שמחה', meaning: 'שמחת התחדשות לאחר התהליך.' },
    ],
    sources: ['7/שבעה שלבים של תהליך תשובה 🔄.md'],
  },
  l2_world_correction: {
    coreIdea: 'תיקון עולם נשען על שבעה עקרונות רוחניים וחברתיים.',
    axes: [
      { label: 'הכרה רוחנית', meaning: 'הבנה של המצב הרוחני הכללי.' },
      { label: 'תשובה כללית', meaning: 'חזרה לתיקון בכל תחומי החיים.' },
      { label: 'שמירת דינים', meaning: 'מחויבות לחוקי התורה.' },
      { label: 'חיבור לאור', meaning: 'הארה אלוקית בעולם.' },
      { label: 'התמודדות עם יצרים', meaning: 'עבודה נכונה עם היצר.' },
      { label: 'חיזוק אמונה', meaning: 'בנייה תודעתית עמוקה.' },
      { label: 'אהבת ישראל', meaning: 'חיבור לקהילה ולעם.' },
    ],
    sources: ['7/שבעה עקרונות של תיקון עולם 🌍.md'],
  },
  l3_sefirot: {
    coreIdea: 'עשר הספירות הן מערכת הכוחות הרוחניים המנהיגים את העולם והנפש.',
    axes: [
      { label: 'כתר', meaning: 'שורש הרצון והשליחות.' },
      { label: 'חכמה', meaning: 'הברק הראשוני של ההבנה.' },
      { label: 'בינה', meaning: 'העמקה ובניית תובנה.' },
      { label: 'דעת', meaning: 'חיבור בין שכל לרגש.' },
      { label: 'חסד', meaning: 'נתינה ואהבה.' },
      { label: 'גבורה', meaning: 'גבולות ומשמעת.' },
      { label: 'תפארת', meaning: 'איזון ויופי של אמת.' },
      { label: 'נצח', meaning: 'התמדה וכוח ניצחון.' },
      { label: 'הוד', meaning: 'ענווה וקבלת האמת.' },
      { label: 'יסוד', meaning: 'חיבור ויציבות.' },
      { label: 'מלכות', meaning: 'ביטוי והגשמה במציאות.' },
    ],
    sources: ['10/✨ סיכום מקיף של עשר הספירות – איך להוציא את זה לפועל בחיים ✨.md'],
  },
  l4_faith_principles: {
    coreIdea: 'י״ג יסודות האמונה של הרמב״ם מגדירים את עיקרי האמונה היהודית.',
    axes: [
      { label: 'מציאות ה׳', meaning: 'הכרה בקיום ה׳.' },
      { label: 'אחדות ה׳', meaning: 'אין לו שותף.' },
      { label: 'אין לו גוף', meaning: 'ה׳ אינו מוגבל פיזית.' },
      { label: 'קדמות ה׳', meaning: 'ה׳ תמיד היה ותמיד יהיה.' },
      { label: 'לעבוד רק לו', meaning: 'הפניית העבודה רק לה׳.' },
      { label: 'נבואה', meaning: 'תקשורת אלוקית עם נביאים.' },
      { label: 'נבואת משה', meaning: 'הנבואה הגבוהה ביותר.' },
      { label: 'התורה מן השמים', meaning: 'התורה ניתנה מה׳.' },
      { label: 'התורה נצחית', meaning: 'אינה משתנה.' },
      { label: 'השגחה פרטית', meaning: 'ה׳ משגיח על הבריות.' },
      { label: 'שכר ועונש', meaning: 'מוסר תוצאה למעשים.' },
      { label: 'ביאת המשיח', meaning: 'אמונה בגאולה.' },
      { label: 'תחיית המתים', meaning: 'חיים מחודשים בעולם הבא.' },
    ],
    sources: ["13/יג' יסודות האמונה – ניתוח פילוסופי 📖.md"],
  },
  l4_mercy: {
    coreIdea: 'י״ג מידות הרחמים מציגות את מנגנוני החסד והסליחה האלוקיים.',
    axes: [
      { label: 'ה׳', meaning: 'חסד ללא גבול.' },
      { label: 'ה׳ (שנית)', meaning: 'רחמים גם לאחר חטא.' },
      { label: 'א-ל', meaning: 'כוח החסד בפועל.' },
      { label: 'רחום', meaning: 'חמלה עמוקה.' },
      { label: 'חנון', meaning: 'נתינה לפנים משורת הדין.' },
      { label: 'ארך אפיים', meaning: 'סבלנות וסלחנות.' },
      { label: 'רב חסד', meaning: 'שפע חסד מרובה.' },
      { label: 'אמת', meaning: 'יושר בתוך הרחמים.' },
      { label: 'נוצר חסד לאלפים', meaning: 'המשכיות החסד.' },
      { label: 'נושא עוון', meaning: 'מחיקת החטא.' },
      { label: 'ופשע', meaning: 'תיקון מרידה מודעת.' },
      { label: 'וחטאה', meaning: 'סליחה על כשלונות קטנים.' },
      { label: 'ונקה', meaning: 'טהרה מוחלטת.' },
    ],
    sources: ["13/יג' מידות הרחמים – ניתוח מושגי של רחמים בתורה 💙.md"],
  },
  l4_soul_powers: {
    coreIdea: 'י״ג כוחות הנפש משלבים קבלה ופסיכולוגיה להבנת מבנה אישיותי.',
    axes: [
      { label: 'כתר', meaning: 'רצון פנימי ושאיפות.' },
      { label: 'חכמה', meaning: 'הבזק של תובנה.' },
      { label: 'בינה', meaning: 'עיבוד והעמקה.' },
      { label: 'דעת', meaning: 'חיבור בין שכל לרגש.' },
      { label: 'חסד', meaning: 'אהבה ונתינה.' },
      { label: 'גבורה', meaning: 'משמעת ושליטה עצמית.' },
      { label: 'תפארת', meaning: 'איזון והרמוניה.' },
      { label: 'נצח', meaning: 'התמדה ונחישות.' },
      { label: 'הוד', meaning: 'קבלה וענווה.' },
      { label: 'יסוד', meaning: 'תקשורת וחיבור.' },
      { label: 'מלכות', meaning: 'מימוש והשפעה.' },
      { label: 'תענוג', meaning: 'שמחה והשראה.' },
      { label: 'אמונה', meaning: 'כוח מחבר ומאחד.' },
    ],
    sources: ["13/יג' כוחות הנפש – ניתוח פסיכולוגי ורוחני 🧠💫.md"],
  },
};

const getColorClasses = (colorName) => {
  const map = {
    blue: {
      text: 'text-blue-300',
      bg: 'bg-[#0f172a]',
      border: 'border-blue-500/30',
      gradient: 'from-blue-900/40 via-[#0f172a] to-blue-900/40',
      accent: 'bg-blue-500',
      glow: 'shadow-blue-500/20',
    },
    green: {
      text: 'text-emerald-300',
      bg: 'bg-[#064e3b]',
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-900/40 via-[#022c22] to-emerald-900/40',
      accent: 'bg-emerald-500',
      glow: 'shadow-emerald-500/20',
    },
    purple: {
      text: 'text-purple-300',
      bg: 'bg-[#3b0764]',
      border: 'border-purple-500/30',
      gradient: 'from-purple-900/40 via-[#2e1065] to-purple-900/40',
      accent: 'bg-purple-500',
      glow: 'shadow-purple-500/20',
    },
    gold: {
      text: 'text-amber-300',
      bg: 'bg-[#451a03]',
      border: 'border-amber-500/30',
      gradient: 'from-amber-900/40 via-[#451a03] to-amber-900/40',
      accent: 'bg-amber-500',
      glow: 'shadow-amber-500/20',
    },
  };
  return map[colorName] || map.blue;
};

const cleanJson = (text) => {
  if (!text) return '';
  let cleaned = text.replace(/```json\n?|```/g, '').trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleaned.replace(/,(\s*[}\]])/g, '$1');
};

const parseMethodAxes = (methodName) => {
  const match = methodName.match(/\(([^)]+)\)/);
  if (!match) return [];
  return match[1].split(',').map((item) => item.trim());
};

const buildMethodBriefs = (selected) =>
  selected.map((method) => {
    const libraryEntry = METHOD_LIBRARY[method.id];
    const fallbackAxes = parseMethodAxes(method.name);
    const axes = libraryEntry?.axes?.length
      ? libraryEntry.axes
      : fallbackAxes.map((axis) => ({ label: axis, meaning: 'הגדרה כללית לפי שם השיטה.' }));
    return {
      id: method.id,
      name: method.name,
      level: method.level,
      coreIdea: libraryEntry?.coreIdea || 'שיטה שיטתית לפירוק הטקסט למרכיבים מרכזיים.',
      axes,
      sources: libraryEntry?.sources || [],
    };
  });

const buildSystemPrompt = ({ inputText, methodBriefs, preferences }) => {
  const methodLines = methodBriefs
    .map((method) => {
      const axes = method.axes
        .map((axis, index) => `${index + 1}. ${axis.label} – ${axis.meaning}`)
        .join('\n');
      const sources = method.sources.length ? `מקור: ${method.sources.join(' | ')}` : 'מקור: ללא ציון';
      return `שיטה: ${method.name} (רמה ${method.level})\nרעיון ליבה: ${method.coreIdea}\nצירי ניתוח:\n${axes}\n${sources}`;
    })
    .join('\n\n');

  return `
You are "HolisView Unified", a high-fidelity systemic analyzer.

Input Text:
"${inputText}"

Selected Methods (with base interpretations from the repository):
${methodLines}

OUTPUT FORMAT (valid JSON only):
{
  "meta": {
    "hebrewDate": "Hebrew date string",
    "summary": "One paragraph Hebrew summary of the analysis focus"
  },
  "proCards": [
    {
      "title": "Short Hebrew title",
      "methodId": "method id",
      "methodName": "method name",
      "level": 1-4,
      "layout": "quad" | "list" | "central",
      "hebrewDate": "Hebrew date string",
      "contentItems": [
        { "label": "Axis label", "value": "Insight in Hebrew" }
      ]
    }
  ],
  "matrixSections": [
    {
      "methodId": "method id",
      "methodName": "method name",
      "level": 1-4,
      "cards": [
        {
          "title": "Card title",
          "layout": "quad" | "list" | "central",
          "hebrewDate": "Hebrew date string",
          "contentItems": [
            { "label": "Axis label", "value": "Insight in Hebrew" }
          ]
        }
      ]
    }
  ],
  "essenceCards": [
    {
      "title": "Short title",
      "element": "Fire | Water | Air | Earth",
      "energy": "single Hebrew word",
      "score": 1-5,
      "sentences": ["...", "...", "...", "..."]
    }
  ],
  "analysisNarrative": "Short narrative in Hebrew"
}

RULES:
1. Generate at least 24 items in "proCards". The cards must reuse the selected methods multiple times.
2. For each method, "matrixSections" should include 2-3 cards.
3. Use the provided method axes as labels. If a method has 4 axes, prefer layout "quad".
4. For 7/10/13 axes, use layout "list" and select the most relevant axes per card.
5. Use Hebrew language. Use accurate interpretations based on the method base definitions.
6. Ensure JSON is valid and without markdown fences.
7. If ${preferences.includeEssenceCards ? 'true' : 'false'} is false, return an empty "essenceCards" array.
8. If ${preferences.includeNarrative ? 'true' : 'false'} is false, return "analysisNarrative" as an empty string.
`;
};

const ProCard = ({ card, index }) => {
  const styles = getColorClasses(card.colorKey);
  const [copied, setCopied] = useState(false);

  const isQuadLayout = card.layout === 'quad';
  const isListLayout = card.layout === 'list';
  const isCentralLayout = card.layout === 'central';

  return (
    <div
      className={`
        relative group break-inside-avoid mb-8
        animate-in fade-in slide-in-from-bottom-8 duration-700
        ${index % 2 === 0 ? 'rotate-[0.3deg]' : '-rotate-[0.3deg]'} hover:rotate-0 transition-all
      `}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${styles.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
      ></div>
      <div
        className={`
          relative overflow-hidden rounded-xl border ${styles.border} bg-[#0A0A12]
          shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-500
          flex flex-col h-full
        `}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        <div className={`h-1 w-full bg-gradient-to-r ${styles.gradient} opacity-80`}></div>

        <div className="p-5 border-b border-white/5 relative bg-white/[0.01]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  bg-gradient-to-br from-white/10 to-transparent border border-white/10
                  shadow-inner
                `}
              >
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
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(card, null, 2));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-600 hover:text-white transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="p-5 flex-1 relative z-10">
          {isQuadLayout && (
            <div className="grid grid-cols-2 gap-3 h-full">
              {card.contentItems.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className={`
                    relative p-3 rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent
                    flex flex-col justify-between group/item hover:border-white/10 transition-colors
                  `}
                >
                  <div className={`text-[10px] font-bold ${styles.text} uppercase mb-1 opacity-70`}>{item.label}</div>
                  <div className="text-xs text-slate-300 font-light leading-snug">{item.value}</div>
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${styles.border} rounded-br-lg opacity-50`}></div>
                </div>
              ))}
            </div>
          )}

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

        <div className="px-5 py-3 bg-[#050508]/50 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Calendar size={10} />
            <span>{card.hebrewDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>HolisView Unified</span>
            <div className={`w-1.5 h-1.5 rounded-sm ${styles.accent}`}></div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 rounded-tl-xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 rounded-br-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

const MethodChip = ({ method, isSelected, onToggle, color }) => (
  <button
    onClick={onToggle}
    className={`
      w-full text-right p-3 rounded-xl text-xs transition-all flex items-center justify-between group
      ${isSelected
        ? 'bg-white/10 border border-white/10 text-white shadow-inner'
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}
    `}
  >
    <span className="font-medium">{method.name.split('(')[0]}</span>
    {isSelected ? <CheckSquare size={14} className={color.text} /> : <Square size={14} className="opacity-20" />}
  </button>
);

const MethodDetails = ({ methodBrief }) => {
  if (!methodBrief) {
    return (
      <div className="text-xs text-slate-500 leading-relaxed">
        בחר שיטה כדי לראות פרשנות בסיסית מתוך המאגר.
      </div>
    );
  }
  return (
    <div className="space-y-3 text-xs text-slate-300">
      <div className="space-y-1">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest">רעיון ליבה</p>
        <p>{methodBrief.coreIdea}</p>
      </div>
      <div className="space-y-2">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest">צירי ניתוח</p>
        <ul className="space-y-1">
          {methodBrief.axes.map((axis) => (
            <li key={axis.label} className="flex gap-2">
              <span className="text-slate-400">•</span>
              <span>
                <strong className="text-slate-200">{axis.label}:</strong> {axis.meaning}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-1">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest">מקורות</p>
        <div className="text-slate-400">
          {methodBrief.sources.length ? methodBrief.sources.join(', ') : 'אין קובץ מקור מוגדר לשיטה זו.'}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [expandedLevels, setExpandedLevels] = useState({ 1: true, 2: false, 3: false, 4: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMethodId, setActiveMethodId] = useState(null);
  const [viewMode, setViewMode] = useState('cards');
  const [includeEssenceCards, setIncludeEssenceCards] = useState(true);
  const [includeNarrative, setIncludeNarrative] = useState(true);

  const methodIndex = useMemo(() => {
    const index = {};
    METHODS_DATA.forEach((level) => {
      level.methods.forEach((method) => {
        index[method.id] = { ...method, level: level.level };
      });
    });
    return index;
  }, []);

  const activeMethodBrief = useMemo(() => {
    if (!activeMethodId) return null;
    const method = methodIndex[activeMethodId];
    if (!method) return null;
    return buildMethodBriefs([{ ...method }])[0];
  }, [activeMethodId, methodIndex]);

  const filteredMethods = useMemo(() => {
    if (!searchTerm) return METHODS_DATA;
    const term = searchTerm.trim();
    return METHODS_DATA.map((level) => ({
      ...level,
      methods: level.methods.filter((method) => method.name.includes(term)),
    }));
  }, [searchTerm]);

  const handleAnalyze = async () => {
    if (!inputText || selectedMethods.length === 0) return;
    setLoading(true);
    setResult(null);
    const selected = selectedMethods.map((id) => methodIndex[id]);
    const prompt = buildSystemPrompt({
      inputText,
      methodBriefs: buildMethodBriefs(selected),
      preferences: { includeEssenceCards, includeNarrative },
    });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleaned = cleanJson(rawText);
      const parsed = JSON.parse(cleaned);

      const proCards = (parsed.proCards || []).map((card) => ({
        ...card,
        colorKey: card.level === 1 ? 'blue' : card.level === 2 ? 'green' : card.level === 3 ? 'purple' : 'gold',
      }));
      const matrixSections = (parsed.matrixSections || []).map((section) => ({
        ...section,
        colorKey: section.level === 1 ? 'blue' : section.level === 2 ? 'green' : section.level === 3 ? 'purple' : 'gold',
        cards: (section.cards || []).map((card) => ({
          ...card,
          colorKey: section.level === 1 ? 'blue' : section.level === 2 ? 'green' : section.level === 3 ? 'purple' : 'gold',
        })),
      }));

      setResult({
        meta: parsed.meta || {},
        proCards,
        matrixSections,
        essenceCards: parsed.essenceCards || [],
        analysisNarrative: parsed.analysisNarrative || '',
      });
    } catch (error) {
      console.error(error);
      setResult({
        meta: { summary: 'שגיאת מערכת – אנא נסה שנית.' },
        proCards: [
          {
            title: 'שגיאת מערכת',
            methodName: 'System',
            level: 1,
            layout: 'central',
            hebrewDate: 'היום',
            contentItems: [{ value: 'אירעה תקלה ביצירת הקלפים. נסה שוב.' }],
            colorKey: 'blue',
          },
        ],
        matrixSections: [],
        essenceCards: [],
        analysisNarrative: '',
      });
    }
    setLoading(false);
  };

  const handleSelectAll = (level) => {
    const methods = METHODS_DATA.find((item) => item.level === level)?.methods || [];
    const ids = methods.map((method) => method.id);
    setSelectedMethods((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const handleClearLevel = (level) => {
    const ids = new Set(
      METHODS_DATA.find((item) => item.level === level)?.methods.map((method) => method.id) || []
    );
    setSelectedMethods((prev) => prev.filter((id) => !ids.has(id)));
  };

  return (
    <div className="min-h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl selection:bg-purple-500/30" dir="rtl">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; border: 2px solid #020204; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
          .animate-spin-slow { animation: spin 3s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media print {
            @page { size: A4 landscape; margin: 1cm; }
            body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
            .print-hidden { display: none !important; }
            .columns-1, .md\\:columns-2, .lg\\:columns-3, .xl\\:columns-4 { column-count: 3 !important; }
            .group { break-inside: avoid; page-break-inside: avoid; }
          }
        `}
      </style>

      <header className="sticky top-0 z-50 h-16 border-b border-white/[0.06] bg-[#020204]/90 backdrop-blur-xl flex items-center justify-between px-6 print-hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative w-8 h-8 bg-black rounded-lg flex items-center justify-center border border-white/10">
                <Layers size={18} className="text-white" />
              </div>
            </div>
            <h1 className="text-lg font-bold text-slate-200 tracking-tight">
              HolisView <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-black italic pr-1">Unified</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500 hidden md:block border border-white/5 px-2 py-1 rounded">
            V{VERSION}
          </span>
          <button
            onClick={() => window.print()}
            disabled={!result}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-30"
          >
            <Printer size={18} />
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result || {}, null, 2))}
            disabled={!result}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-30"
          >
            <Copy size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden print:block relative">
        <aside
          className={`
            absolute inset-y-0 right-0 z-40 w-80 bg-[#050508] border-l border-white/5 transform transition-transform duration-500
            ${sidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : 'translate-x-full pointer-events-none opacity-0'}
            md:relative md:translate-x-0 md:pointer-events-auto md:opacity-100 md:shadow-none md:w-80
          `}
        >
          <div className="p-5 h-full flex flex-col gap-6">
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Matrix Selection</h2>
              <div className="relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="סינון שיטות"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-8 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar px-1">
              {filteredMethods.map((level) => {
                const styles = getColorClasses(level.baseColor);
                return (
                  <div key={level.level} className="space-y-2">
                    <button
                      onClick={() => setExpandedLevels((prev) => ({ ...prev, [level.level]: !prev[level.level] }))}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg transition-all text-sm group
                        ${expandedLevels[level.level] ? 'bg-white/[0.03] text-white' : 'text-slate-400 hover:text-slate-200'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${styles.accent} shadow-[0_0_10px_currentColor]`}></div>
                        <span className="font-medium">{level.title.split('-')[1]}</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${expandedLevels[level.level] ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedLevels[level.level] && (
                      <div className="space-y-2 pb-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest px-2">
                          <span>פעולות מהירות</span>
                          <div className="flex gap-2">
                            <button onClick={() => handleSelectAll(level.level)} className="hover:text-slate-300">הכל</button>
                            <button onClick={() => handleClearLevel(level.level)} className="hover:text-slate-300">נקה</button>
                          </div>
                        </div>
                        {level.methods.map((method) => (
                          <div key={method.id} onMouseEnter={() => setActiveMethodId(method.id)}>
                            <MethodChip
                              method={method}
                              isSelected={selectedMethods.includes(method.id)}
                              onToggle={() =>
                                setSelectedMethods((prev) =>
                                  prev.includes(method.id) ? prev.filter((id) => id !== method.id) : [...prev, method.id]
                                )
                              }
                              color={styles}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Bookmark size={12} />
                פרשנות בסיסית
              </div>
              <MethodDetails methodBrief={activeMethodBrief} />
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#05050A] relative scroll-smooth">
          <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="max-w-6xl mx-auto p-6 md:p-12 relative z-10 min-h-full flex flex-col gap-10">
            <section className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {selectedMethods.length} שיטות פעילות
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">
                    <Filter size={12} />
                    Unified Matrix
                  </span>
                </div>
                <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0 focus-within:from-purple-500/50 focus-within:to-blue-500/50 transition-all duration-500">
                  <div className="relative bg-[#0A0A14] rounded-[23px] overflow-hidden shadow-2xl shadow-black/50">
                    <textarea
                      value={inputText}
                      onChange={(event) => setInputText(event.target.value)}
                      placeholder="הזן טקסט, שאלה או דילמה..."
                      className="w-full bg-transparent p-6 text-lg font-light text-slate-200 focus:outline-none placeholder:text-slate-700 resize-none custom-scrollbar h-44"
                    />
                    <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0E0E1A] border-t border-white/5 gap-4">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <button
                          onClick={() => setIncludeEssenceCards((prev) => !prev)}
                          className={`px-3 py-1 rounded-full border ${includeEssenceCards ? 'border-purple-500/40 text-purple-300' : 'border-white/10 text-slate-500'}`}
                        >
                          Essence Cards
                        </button>
                        <button
                          onClick={() => setIncludeNarrative((prev) => !prev)}
                          className={`px-3 py-1 rounded-full border ${includeNarrative ? 'border-blue-500/40 text-blue-300' : 'border-white/10 text-slate-500'}`}
                        >
                          Narrative
                        </button>
                      </div>
                      <button
                        onClick={handleAnalyze}
                        disabled={loading || !inputText || selectedMethods.length === 0}
                        className={`
                          px-6 py-2.5 rounded-xl text-white font-medium text-sm transition-all flex items-center gap-2
                          ${loading
                            ? 'bg-slate-800 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95'}
                        `}
                      >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <><Zap size={16} /> הפק ניתוח</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
                  <LayoutGrid size={14} />
                  תוצאות
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { id: 'cards', label: 'Pro Cards', icon: Grid },
                    { id: 'sections', label: 'Matrix Sections', icon: Layout },
                    { id: 'essence', label: 'Essence Map', icon: Sparkles },
                    { id: 'narrative', label: 'Narrative', icon: Brain },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setViewMode(item.id)}
                        className={`
                          px-3 py-1.5 rounded-full border flex items-center gap-2
                          ${viewMode === item.id ? 'border-purple-500/50 text-purple-300 bg-purple-500/10' : 'border-white/10 text-slate-500'}
                        `}
                      >
                        <Icon size={12} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center min-h-[240px]">
                  <div className="relative">
                    <div className="w-24 h-24 border border-purple-500/20 rounded-2xl animate-spin-slow"></div>
                    <div className="absolute inset-0 w-24 h-24 border-t-2 border-purple-500 rounded-2xl animate-spin"></div>
                    <div className="absolute inset-4 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white tracking-widest uppercase">Rendering Matrix</h3>
                    <p className="text-purple-400 text-sm font-mono mt-2">מייצר קלפי עומק...</p>
                  </div>
                </div>
              )}

              {!loading && !result && (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-900/20 rounded-3xl border border-dashed border-white/10">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Activity className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">מוכן לניתוח</h3>
                  <p className="text-slate-500 max-w-md">
                    בחר שיטות מהתפריט, הזן טקסט ולחץ על הפקה כדי לקבל ניתוח הוליסטי עשיר.
                  </p>
                </div>
              )}

              {!loading && result && (
                <div className="space-y-10">
                  {viewMode === 'cards' && (
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                      {result.proCards.map((card, index) => (
                        <ProCard key={`${card.title}-${index}`} card={card} index={index} />
                      ))}
                    </div>
                  )}

                  {viewMode === 'sections' && (
                    <div className="space-y-10">
                      {result.matrixSections.map((section) => {
                        const styles = getColorClasses(section.colorKey);
                        return (
                          <div key={section.methodId} className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${styles.border} bg-white/5`}>
                                <Layers size={16} className={styles.text} />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-slate-100">{section.methodName}</h3>
                                <span className={`text-[10px] font-mono uppercase ${styles.text}`}>Level {section.level}</span>
                              </div>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                              {section.cards.map((card, index) => (
                                <div key={`${card.title}-${index}`} className="min-w-[260px] max-w-[300px] snap-start">
                                  <ProCard card={{ ...card, colorKey: section.colorKey, methodName: section.methodName }} index={index} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {viewMode === 'essence' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {result.essenceCards.map((card, index) => (
                        <div key={`${card.title}-${index}`} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-slate-100">{card.title}</h3>
                              <span className="text-xs text-slate-500">{card.energy}</span>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, score) => (
                                <div key={score} className={`w-2 h-2 rounded-full ${score < card.score ? 'bg-purple-400' : 'bg-slate-800'}`}></div>
                              ))}
                            </div>
                          </div>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {card.sentences.map((sentence, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-purple-400">•</span>
                                <span>{sentence}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {viewMode === 'narrative' && (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
                        <Star size={14} />
                        Narrative Summary
                      </div>
                      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {result.analysisNarrative || 'לא נוצר נרטיב עבור הניתוח הנוכחי.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
