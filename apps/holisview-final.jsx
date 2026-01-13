import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Anchor,
  BookOpen,
  Bookmark,
  Brain,
  Calendar,
  Check,
  CheckSquare,
  ChevronDown,
  Copy,
  Download,
  Feather,
  FileText,
  Flame,
  Globe,
  Hash,
  Hexagon,
  LayoutGrid,
  Loader2,
  Menu,
  Moon,
  Mountain,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Wind,
  X,
  Zap
} from 'lucide-react';

const apiKey = "";
const VERSION = "9.0 UNITY MATRIX";

const methodsData = [
  {
    level: 1,
    title: "רמה 1 - יסודות (מבנה)",
    description: "מיפוי המציאות דרך מבני יסוד של ארבע",
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
    description: "מחזורי התהוות ושבעה שלבים של התפתחות",
    baseColor: "green",
    methods: [
      { id: 'l2_creation', name: 'מעשה בראשית (7 ימים כהשתקפות הנפש)' },
      { id: 'l2_principles', name: 'שבעה עקרונות לתודעה גבוהה' },
      { id: 'l2_repentance', name: 'שבעה שלבים של תהליך תשובה' },
      { id: 'l2_world_correction', name: 'שבעה עקרונות של תיקון עולם' }
    ]
  },
  {
    level: 3,
    title: "רמה 3 - מערכות (חוקיות)",
    description: "מערכות של עשר - חוקי עומק והנהגה",
    baseColor: "purple",
    methods: [
      { id: 'l3_sefirot', name: 'עשר הספירות' },
      { id: 'l3_sayings', name: 'עשרת המאמרות' },
      { id: 'l3_success', name: 'עשרת חוקי ההצלחה' },
      { id: 'l3_commandments', name: 'עשרת הדיברות' }
    ]
  },
  {
    level: 4,
    title: "רמה 4 - ייחוד (מהות)",
    description: "איחוד, רחמים ודיוק בכוחות הנפש",
    baseColor: "gold",
    methods: [
      { id: 'l4_faith_principles', name: 'י"ג יסודות האמונה' },
      { id: 'l4_mercy', name: 'י"ג מידות הרחמים' },
      { id: 'l4_soul_powers', name: 'י"ג כוחות הנפש' }
    ]
  }
];

const methodProfiles = {
  l1_pardes: {
    title: 'פרד״ס',
    layout: 'quad',
    parts: ['פשט', 'רמז', 'דרש', 'סוד'],
    focus: 'רמות פירוש מרובדות למעבר מעובדה להשראה.',
    questions: [
      'מהו הפשט הברור והגלוי?',
      'איזה רמזים סמויים מתגלים?',
      'איזו דרשה/משמעות רגשית נוצרת?',
      'מהו הסוד או הייעוד העמוק?'
    ]
  },
  l1_abya: {
    title: 'אבי"ע',
    layout: 'quad',
    parts: ['אצילות', 'בריאה', 'יצירה', 'עשייה'],
    focus: 'ארבע שכבות מציאות: מהות, רעיון, עיצוב, מימוש.',
    questions: [
      'מהו המקור האצילי של הרעיון?',
      'איך הוא נולד במישור המחשבתי?',
      'איזו צורה רגשית/יצירתית הוא מקבל?',
      'כיצד הוא מתממש בעולם המעשי?'
    ]
  },
  l1_elements: {
    title: 'ארבעת היסודות',
    layout: 'quad',
    parts: ['רוח', 'אש', 'מים', 'אדמה'],
    focus: 'איזון בין תנועה, תשוקה, רגש ויציבות.',
    questions: [
      'מה מרחיב את המרחב המנטלי/האווירי?',
      'מה מצית אנרגיה לפעולה?',
      'איפה הזרימה הרגשית והחיבור?',
      'מה העוגן והיישום המוחשי?'
    ]
  },
  l1_name: {
    title: 'שם הויה',
    layout: 'quad',
    parts: ['י', 'ה', 'ו', 'ה'],
    focus: 'מעבר מניצוץ כוונה אל התגשמות.',
    questions: [
      'מהו הניצוץ הראשוני?',
      'איזו התרחבות אפשרית נוצרת?',
      'כיצד מחברים את המערכות?',
      'איך מביאים זאת לחיים?'
    ]
  },
  l1_creatures: {
    title: 'ארבע חיות הקודש',
    layout: 'quad',
    parts: ['אריה', 'שור', 'נשר', 'אדם'],
    focus: 'ארבע תנועות נשמה: אומץ, התמדה, פרספקטיבה, אנושיות.',
    questions: [
      'איפה נדרש אומץ/מנהיגות?',
      'איזה כוח התמדה נחוץ?',
      'מה הפרספקטיבה הגבוהה?',
      'איזו אנושיות/לב יש להביא?'
    ]
  },
  l1_sons: {
    title: 'ארבעה בנים',
    layout: 'quad',
    parts: ['חכם', 'רשע', 'תם', 'שאינו יודע'],
    focus: 'ארבע דרכי הקשבה ושאלת אמת.',
    questions: [
      'מה החכמה המתבקשת?',
      'איזה ספק או התנגדות קיימים?',
      'מה התמימות שמבקשת פשטות?',
      'איפה אין מילים ונדרש להניע?'
    ]
  },
  l1_service: {
    title: 'מדרגות בעבודת ה׳',
    layout: 'quad',
    parts: ['יראה', 'אהבה', 'תורה', 'דבקות'],
    focus: 'קשר הוליסטי: גבול, רגש, ידע, חיבור.',
    questions: [
      'מהו הגבול/יראת הכבוד?',
      'איך מחזקים אהבה?',
      'איזה ידע/תורה נדרש?',
      'כיצד מגיעים לדבקות?'
    ]
  },
  l1_species: {
    title: 'ארבעת המינים',
    layout: 'quad',
    parts: ['אתרוג', 'לולב', 'הדס', 'ערבה'],
    focus: 'מיפוי איכות, זקיפות, ריח ותמימות.',
    questions: [
      'מה הלב והטעם המרכזי?',
      'מה הכיוון המנהיג?',
      'איזה ריח/השראה מלווה?',
      'איפה פשטות ללא טעם?'
    ]
  },
  l1_providence: {
    title: 'אופני השגחה',
    layout: 'quad',
    parts: ['טבע', 'נס נסתר', 'נס גלוי', 'ישירה'],
    focus: 'קריאת מציאות דרך שכבות השגחה.',
    questions: [
      'מהו המהלך הטבעי?',
      'איפה פועל נס נסתר?',
      'איפה ניכר נס גלוי?',
      'מהו המגע הישיר/אישי?'
    ]
  },
  l1_exiles: {
    title: 'ארבע גלויות',
    layout: 'quad',
    parts: ['בבל', 'פרס', 'יוון', 'אדום'],
    focus: 'מיפוי אתגרי זהות וכוחות גלותיים.',
    questions: [
      'איזו בלבול/שפה זרה מופיעה?',
      'איפה הפחד מהשפעה חיצונית?',
      'איזו פילוסופיה מערערת?',
      'מה האתגר הפיזי/מעשי?'
    ]
  },
  l1_guardians: {
    title: 'ארבעה שומרים',
    layout: 'quad',
    parts: ['חינם', 'שואל', 'נושא שכר', 'שוכר'],
    focus: 'אחריות, אמון וחוזה חברתי.',
    questions: [
      'מהי אחריות חינמית טהורה?',
      'איפה יש בקשה וסיכון?',
      'איפה יש אחריות עם תגמול?',
      'איזה איזון עסקי נדרש?'
    ]
  },
  l1_newyears: {
    title: 'ארבעה ראשי שנים',
    layout: 'quad',
    parts: ['מלכים', 'בהמה', 'שנים', 'אילן'],
    focus: 'מחזורי התחלה: הנהגה, שפע, זמן, צמיחה.',
    questions: [
      'מה מתחיל במנהיגות?',
      'איפה נדרש שפע/כלכלה?',
      'מהו מחזור הזמן החדש?',
      'איזו צמיחה בשורשים נדרשת?'
    ]
  },
  l2_creation: {
    title: 'מעשה בראשית',
    layout: 'list',
    parts: ['יום 1', 'יום 2', 'יום 3', 'יום 4', 'יום 5', 'יום 6', 'יום 7'],
    focus: 'תהליך התהוות הדרגתי מהתפעלות ליציבות.',
    questions: [
      'מהו אור ראשוני?',
      'איזו הפרדה נדרשת?',
      'מה מתייצב?',
      'איזה סדר זמנים?',
      'מה מתמלא חיים?',
      'מהו שיא הפעולה?',
      'איפה נדרש מנוחה?'
    ]
  },
  l2_principles: {
    title: 'עקרונות תודעה גבוהה',
    layout: 'list',
    parts: ['נוכחות', 'כוונה', 'בהירות', 'תנועה', 'איזון', 'אחריות', 'חיבור'],
    focus: 'שבעה עוגני תודעה כדי לחדד דיוק.',
    questions: [
      'מה נדרש עכשיו להיות נוכח?',
      'איזו כוונה מניעה?',
      'איפה חסרה בהירות?',
      'איזו תנועה חייבת לקרות?',
      'מה מאזן?',
      'איזו אחריות אישית?',
      'איפה החיבור לאחרים?'
    ]
  },
  l2_repentance: {
    title: 'שלבי תשובה',
    layout: 'list',
    parts: ['הכרה', 'חרטה', 'וידוי', 'תיקון', 'מחילה', 'כוונה חדשה', 'התמדה'],
    focus: 'תהליך שינוי עמוק דרך תיקון והמשכיות.',
    questions: [
      'מה הכאב שהוכר?',
      'איפה החרטה?',
      'מה נאמר בקול?',
      'איזה תיקון מעשי?',
      'איפה בקשת מחילה?',
      'מהי הכוונה החדשה?',
      'איך שומרים רצף?'
    ]
  },
  l2_world_correction: {
    title: 'תיקון עולם',
    layout: 'list',
    parts: ['כוונה', 'מודעות', 'שיתוף', 'השפעה', 'אומץ', 'חמלה', 'עשייה'],
    focus: 'תוכנית פעולה חברתית דרך שבעה שלבים.',
    questions: [
      'מהי כוונת התיקון?',
      'איזו מודעות מתבקשת?',
      'מי השותפים?',
      'מה ההשפעה הרצויה?',
      'איזה אומץ נדרש?',
      'איפה חמלה?',
      'איזו עשייה בפועל?'
    ]
  },
  l3_sefirot: {
    title: 'עשר הספירות',
    layout: 'list',
    parts: ['כתר', 'חכמה', 'בינה', 'חסד', 'גבורה', 'תפארת', 'נצח', 'הוד', 'יסוד', 'מלכות'],
    focus: 'מפת זרימה של עשר דרגות הנהגה וערך.',
    questions: [
      'מה חזון הכתר?',
      'איפה הברק של חכמה?',
      'מה נדרש להבין לעומק?',
      'איך פועלים בחסד?',
      'איפה הגבולות?',
      'איזון ואמת?',
      'איזה ניצחון נדרש?',
      'איפה הוד והודאה?',
      'מהו חיבור היסוד?',
      'איך זה מתגלה במלכות?'
    ]
  },
  l3_sayings: {
    title: 'עשרת המאמרות',
    layout: 'list',
    parts: ['בראשית', 'יהי אור', 'יהי רקיע', 'יקוו המים', 'תדשא הארץ', 'יהי מאורות', 'ישרצו המים', 'תוצא הארץ', 'נעשה אדם', 'הנה נתתי'],
    focus: 'עשרה מהלכי יצירה ומילים בונות מציאות.',
    questions: [
      'איזו אמירה פותחת את הסיפור?',
      'מהו האור המבוקש?',
      'איפה נדרש מרחב?',
      'איפה מתכנסים משאבים?',
      'מה צומח?',
      'איזה תיאום זמן?',
      'מה מתרבה?',
      'מה מיוצר?',
      'איזו אנושיות?',
      'מה נתון כמתנה?'
    ]
  },
  l3_success: {
    title: 'חוקי ההצלחה',
    layout: 'list',
    parts: ['חזון', 'מיקוד', 'תוכנית', 'משמעת', 'למידה', 'קשרים', 'תרומה', 'עקביות', 'השפעה', 'חגיגה'],
    focus: 'עשרה עוגנים ליישום מתמשך.',
    questions: [
      'מהו החזון?',
      'מה המיקוד העיקרי?',
      'איזו תוכנית פעולה?',
      'איפה משמעת?',
      'מה לומדים?',
      'איזה קשרים מניעים?',
      'כיצד תורמים?',
      'איך שומרים עקביות?',
      'מה ההשפעה?',
      'איך חוגגים הישג?'
    ]
  },
  l3_commandments: {
    title: 'עשרת הדיברות',
    layout: 'list',
    parts: ['אמונה', 'ייחוד', 'שם', 'שבת', 'כיבוד', 'חיים', 'נאמנות', 'יושר', 'אמת', 'תשוקה'],
    focus: 'ערכים מכווני מצפון והתנהגות.',
    questions: [
      'מהו יסוד האמונה?',
      'איפה הייחוד?',
      'איזו מילה מקודשת?',
      'מהי שבת תודעתית?',
      'כיצד מכבדים מקור?',
      'איך שומרים חיים?',
      'איפה נאמנות?',
      'מהו יושר מעשי?',
      'איך שומרים אמת?',
      'איזו תשוקה דורשת תיקון?'
    ]
  },
  l4_faith_principles: {
    title: 'י"ג יסודות האמונה',
    layout: 'list',
    parts: ['מציאות ה׳', 'אחדות', 'אין גוף', 'קדמות', 'עבודה', 'נבואה', 'משה', 'תורה', 'נצחיות', 'השגחה', 'שכר', 'משיח', 'תחייה'],
    focus: 'מסד אמוני לדיוק מחשבתי.',
    questions: [
      'מהו יסוד המציאות?',
      'איפה האחדות?',
      'מה מעבר לחומר?',
      'מה נצחי?',
      'איך עובדים?',
      'מהי נבואה פנימית?',
      'מהו מודל משה?',
      'איזה חוק מוביל?',
      'מה נצחי באמת?',
      'כיצד ניכרת השגחה?',
      'מהו שכר מעשי?',
      'איפה הגאולה?',
      'מהי תחייה?'
    ]
  },
  l4_mercy: {
    title: 'י"ג מידות הרחמים',
    layout: 'list',
    parts: ['אל', 'רחום', 'חנון', 'ארך אפיים', 'רב חסד', 'אמת', 'נוצר חסד', 'נושא עוון', 'פשע', 'חטאה', 'נקה', 'לא ינקה', 'פקד'],
    focus: 'מערכת רחמים ואיזון של חסד ודין.',
    questions: [
      'מהו כוח הרחמים?',
      'איפה חנינה?',
      'איפה סבלנות?',
      'מהו חסד מרובה?',
      'איפה אמת?',
      'איך שומרים חסד לאורך זמן?',
      'מה צריך לשאת?',
      'איפה פשע שדורש תיקון?',
      'מה החטאה?',
      'מה מתנקה?',
      'איפה גבול?',
      'מה האחריות ההדדית?',
      'איזו פקידה/התעוררות?'
    ]
  },
  l4_soul_powers: {
    title: 'י"ג כוחות הנפש',
    layout: 'list',
    parts: ['אמונה', 'תענוג', 'רצון', 'חכמה', 'בינה', 'דעת', 'חסד', 'גבורה', 'תפארת', 'נצח', 'הוד', 'יסוד', 'מלכות'],
    focus: 'מפת כוחות פנימיים המניעים התנהגות.',
    questions: [
      'איזו אמונה מניעה?',
      'מה גורם לעונג?',
      'מה הרצון העמוק?',
      'איפה הברקה?',
      'מה ההבנה?',
      'איזו החלטה מודעת?',
      'איפה חסד?',
      'איפה גבורה?',
      'איזו הרמוניה?',
      'איזו התקדמות?',
      'איפה הוד?',
      'מהו החיבור?',
      'איך זה מתבטא במלכות?'
    ]
  }
};

const modeOptions = [
  { id: 'pro', label: 'Pro Cards', icon: <LayoutGrid size={14} /> },
  { id: 'matrix', label: 'Matrix Sections', icon: <Hexagon size={14} /> },
  { id: 'report', label: 'Architect Report', icon: <FileText size={14} /> },
  { id: 'story', label: 'Bard Story', icon: <Feather size={14} /> }
];

const repoGlossary = [
  'AI-Flow',
  'ReMatrix',
  'HolisView',
  'Matrix',
  'Sefirot',
  'Pardes',
  'Aby"a',
  'Elements'
];

const cleanJson = (text) => {
  if (!text) return "";
  let cleaned = text.replace(/```json\n?|```/g, '').trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
  return cleaned;
};

const getColorClasses = (colorName) => {
  const map = {
    blue: {
      text: 'text-blue-300',
      bg: 'bg-[#0b1a2d]',
      border: 'border-blue-500/30',
      gradient: 'from-blue-900/40 via-[#0b1a2d] to-blue-900/40',
      accent: 'bg-blue-500',
      glow: 'shadow-blue-500/20'
    },
    green: {
      text: 'text-emerald-300',
      bg: 'bg-[#052e2a]',
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-900/40 via-[#022c22] to-emerald-900/40',
      accent: 'bg-emerald-500',
      glow: 'shadow-emerald-500/20'
    },
    purple: {
      text: 'text-purple-300',
      bg: 'bg-[#2a0d4a]',
      border: 'border-purple-500/30',
      gradient: 'from-purple-900/40 via-[#2e1065] to-purple-900/40',
      accent: 'bg-purple-500',
      glow: 'shadow-purple-500/20'
    },
    gold: {
      text: 'text-amber-300',
      bg: 'bg-[#3a1f07]',
      border: 'border-amber-500/30',
      gradient: 'from-amber-900/40 via-[#451a03] to-amber-900/40',
      accent: 'bg-amber-500',
      glow: 'shadow-amber-500/20'
    }
  };
  return map[colorName] || map.blue;
};

const buildMethodSpec = (methodId) => {
  const profile = methodProfiles[methodId];
  if (!profile) return null;
  return {
    id: methodId,
    title: profile.title,
    layout: profile.layout,
    focus: profile.focus,
    parts: profile.parts,
    questions: profile.questions
  };
};

const buildSystemPrompt = ({ inputText, activeMethods, mode }) => {
  const methodSpecs = activeMethods
    .map((method) => buildMethodSpec(method.id))
    .filter(Boolean);

  const baseInstructions = `
אתה HolisView UNITY, מנוע ניתוח הוליסטי מדויק.
הטקסט לניתוח: "${inputText}".
השתמש במונחים מהמאגר: ${repoGlossary.join(', ')}.
הדיוק חייב להישען על איפיון השיטות הקיים בתיקיות (פירושים, יסודות, מסלולים), לכן התאם את הפירושים לפי המסגרות.

שיטות פעילות (בפורמט JSON):
${JSON.stringify(methodSpecs, null, 2)}

כללים:
- כתוב בעברית.
- שלב תובנות פרקטיות ומטא-מערכתיות.
- אל תוסיף טקסט מחוץ ל-JSON.
- עבור כל שיטה, התאם את כותרות החלקים בדיוק ל-"parts".
- אם layout="quad" הוצא 4 פריטים בלבד.
- אם layout="list" הוצא את כל החלקים לפי הרשימה.
- אם layout="central" צור משפט אחד מדויק.
`;

  if (mode === 'pro') {
    return `${baseInstructions}
מבנה JSON:
{
  "proCards": [
    {
      "title": "כותרת",
      "methodName": "שם השיטה",
      "level": 1,
      "layout": "quad"|"list"|"central",
      "hebrewDate": "תאריך עברי",
      "contentItems": [
        { "label": "כותרת חלק", "value": "תובנה" }
      ]
    }
  ]
}
דרישות:
- הפק לפחות 24 קלפים.
- עבור כל שיטה הפק יותר מקלף אחד אם צריך להגיע ל-24.
- הוסף קלפי סיכום עם layout "central".
`;
  }

  if (mode === 'matrix') {
    return `${baseInstructions}
מבנה JSON:
{
  "sections": [
    {
      "methodId": "id",
      "methodName": "שם",
      "level": 1,
      "cards": [
        {
          "title": "כותרת",
          "layout": "quad"|"list"|"central",
          "hebrewDate": "תאריך",
          "rarity": "RARE",
          "contentItems": [
            { "label": "חלק", "value": "תובנה" }
          ]
        }
      ]
    }
  ]
}
דרישות:
- לכל שיטה הוצא 2 קלפים לפחות.
- הדגש דיוק בין השיטה לבין התובנות.
`;
  }

  if (mode === 'story') {
    return `${baseInstructions}
מבנה JSON:
{
  "story": {
    "title": "כותרת אגדית",
    "origin": "סיפור מקור מיתי",
    "lesson": "מוסר השכל",
    "ritual": "טקס/פרקטיקה קצרה",
    "sigil": "חתימת מסע במשפט אחד"
  }
}
דרישות:
- כתוב בסגנון פואטי, אך מדויק לתוכן.
- שלב ביטויים מהשיטות כדי לשמר עקביות.
`;
  }

  return `${baseInstructions}
מבנה JSON:
{
  "analysis": [
    { "title": "שם שיטה", "level": 1, "content": "טקסט בפורמט Markdown" }
  ],
  "cards": [
    { "title": "כותרת", "element": "אש/מים/רוח/אדמה", "energy": "מילה אחת", "score": 1, "sentences": ["...", "...", "...", "..."] }
  ],
  "summary": {
    "coreInsight": "משפט מפתח",
    "actions": ["פעולה", "פעולה", "פעולה"],
    "risks": ["סיכון", "סיכון"],
    "opportunities": ["הזדמנות", "הזדמנות"]
  }
}
דרישות:
- cards חייב להיות בדיוק 9 קלפים.
- sentences חייבות להכיל ניקוד.
- summary חייב להיות תמציתי ומעשי.
`;
};

const ProCard = ({ card, index }) => {
  const styles = getColorClasses(card.colorKey);
  const isQuadLayout = card.layout === 'quad';
  const isListLayout = card.layout === 'list';
  const isCentralLayout = card.layout === 'central';

  return (
    <div
      className={`relative group break-inside-avoid mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ${
        index % 2 === 0 ? 'rotate-[0.4deg]' : '-rotate-[0.4deg]'
      } hover:rotate-0 transition-all`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${styles.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>

      <div
        className={`relative overflow-hidden rounded-xl border ${styles.border} bg-[#0A0A12] shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-500 flex flex-col h-full`}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        ></div>

        <div className={`h-1 w-full bg-gradient-to-r ${styles.gradient} opacity-80`}></div>

        <div className="p-5 border-b border-white/5 relative bg-white/[0.01]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner">
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
              onClick={() => navigator.clipboard.writeText(JSON.stringify(card))}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-600 hover:text-white transition-colors"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        <div className="p-5 flex-1 relative z-10">
          {isQuadLayout && (
            <div className="grid grid-cols-2 gap-3 h-full">
              {card.contentItems?.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-3 rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent flex flex-col justify-between group/item hover:border-white/10 transition-colors"
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
              {card.contentItems?.map((item, idx) => (
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
              <p className="text-lg font-medium text-slate-200 leading-relaxed italic">"{card.contentItems?.[0]?.value || card.contentItems?.[0]}"</p>
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
            <span>HolisView UNITY</span>
            <div className={`w-1.5 h-1.5 rounded-sm ${styles.accent}`}></div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 rounded-tl-xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 rounded-br-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

const TextCompiler = ({ content, styles }) => {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={index} className={`text-lg font-bold mt-6 mb-2 flex items-center gap-2 ${styles.text}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${styles.accent}`}></div>
              {trimmed.replace('### ', '')}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={index} className={`text-xl font-black mt-8 mb-4 border-b-2 ${styles.border} pb-2 tracking-tight ${styles.text}`}>
              {trimmed.replace('## ', '')}
            </h3>
          );
        }
        if (trimmed.startsWith('- ')) {
          return (
            <li key={index} className="mr-4 list-none flex items-start gap-2 mb-2 text-slate-300">
              <span className={`${styles.text} mt-1`}>✦</span>
              <span>{trimmed.replace('- ', '')}</span>
            </li>
          );
        }
        if (trimmed.length === 0) {
          return <div key={index} />;
        }
        return (
          <p key={index} className="mb-4 leading-relaxed text-slate-300/90 font-light">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

const ResultCard = ({ segment }) => {
  const [copied, setCopied] = useState(false);
  const colorKey = segment.level === 1 ? 'blue' : segment.level === 2 ? 'green' : segment.level === 3 ? 'purple' : 'gold';
  const styles = getColorClasses(colorKey);

  return (
    <div className={`relative group overflow-hidden rounded-2xl border ${styles.border} ${styles.bg} ${styles.glow} backdrop-blur-xl transition-all duration-700 mb-10 animate-in fade-in slide-in-from-bottom-4`}>
      <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10 relative z-10">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center border ${styles.border} ${styles.text}`}>
            <Hexagon strokeWidth={1.5} />
          </div>
          <div>
            <h3 className={`text-2xl font-black tracking-tight ${styles.text}`}>{segment.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500">PHASE 0{segment.level}</span>
              <div className={`h-1 w-12 rounded-full ${styles.accent} opacity-30`}></div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(segment.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="p-3 rounded-xl hover:bg-white/10 text-slate-400 transition-all border border-transparent hover:border-white/10"
        >
          {copied ? <Check className="text-green-400" /> : <Copy size={20} />}
        </button>
      </div>

      <div className="p-8 md:p-10 relative z-10">
        <TextCompiler content={segment.content} styles={styles} />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

const EssenceCard = ({ card }) => {
  const isFire = card.element.includes('אש');
  const isWater = card.element.includes('מים');
  const isAir = card.element.includes('רוח') || card.element.includes('אוויר');
  const isEarth = card.element.includes('אדמה');

  const theme = isFire
    ? { border: 'border-orange-500/40', shadow: 'shadow-orange-500/20', text: 'text-orange-600', grad: 'from-orange-50 to-white', icon: <Flame className="text-orange-500" /> }
    : isWater
    ? { border: 'border-blue-500/40', shadow: 'shadow-blue-500/20', text: 'text-blue-600', grad: 'from-blue-50 to-white', icon: <Wind className="text-blue-500" /> }
    : isAir
    ? { border: 'border-cyan-500/40', shadow: 'shadow-cyan-500/20', text: 'text-cyan-600', grad: 'from-cyan-50 to-white', icon: <Wind className="text-cyan-500" /> }
    : isEarth
    ? { border: 'border-amber-700/40', shadow: 'shadow-amber-700/20', text: 'text-amber-800', grad: 'from-amber-50 to-white', icon: <Mountain className="text-amber-700" /> }
    : { border: 'border-purple-500/40', shadow: 'shadow-purple-500/20', text: 'text-purple-600', grad: 'from-purple-50 to-white', icon: <Sparkles className="text-purple-500" /> };

  return (
    <div className={`relative h-full bg-gradient-to-br ${theme.grad} rounded-2xl border-2 ${theme.border} p-5 flex flex-col justify-between overflow-hidden shadow-xl ${theme.shadow} hover:scale-[1.02] transition-all duration-500 group`}>
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
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">{theme.icon}</div>
        </div>

        <div className="space-y-3">
          {card.sentences.map((s, idx) => (
            <div key={idx} className="relative pr-3 border-r-2 border-slate-200">
              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-0.5 tracking-tighter">
                {['הוראה', 'מיקוד', 'יישום', 'זכירה'][idx]}
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
          <span className="text-[8px] font-black text-slate-500">HOLISVIEW UNITY</span>
        </div>
      </div>
    </div>
  );
};

const WelcomeStrip = ({ cards, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-500">
        <Loader2 className="animate-spin" size={16} /> טוען מטריצת פתיחה...
      </div>
    );
  }
  if (!cards?.length) return null;
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar">
      {cards.map((card, idx) => (
        <div key={idx} className="snap-start w-[280px]">
          <ProCard card={{ ...card, colorKey: card.colorKey }} index={idx} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('pro');
  const [proCards, setProCards] = useState(null);
  const [sections, setSections] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [cardsData, setCardsData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [welcomeCards, setWelcomeCards] = useState([]);
  const [loadingWelcome, setLoadingWelcome] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState({ 1: true, 2: false, 3: false, 4: false });
  const [selectedMethods, setSelectedMethods] = useState([]);

  const activeMethods = useMemo(() => {
    const methods = [];
    methodsData.forEach((level) =>
      level.methods.forEach((method) => {
        if (selectedMethods.includes(method.id)) {
          methods.push({ ...method, level: level.level, colorKey: level.baseColor });
        }
      })
    );
    return methods;
  }, [selectedMethods]);

  useEffect(() => {
    if (selectedMethods.length === 0) {
      setSelectedMethods(['l1_pardes', 'l1_elements', 'l3_sefirot', 'l4_soul_powers']);
    }
  }, [selectedMethods.length]);

  useEffect(() => {
    const generateWelcomeMatrix = async () => {
      setLoadingWelcome(true);
      const welcomePrompt = `
      You are an API that outputs ONLY valid JSON.
      Task: Create 4 interpretation cards for "ברוכים הבאים" (Welcome).
      Level 1 to 4.

      IMPORTANT:
      - Output MUST be valid JSON.
      - Escape all double quotes inside strings.
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
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: welcomePrompt }] }],
              generationConfig: { responseMimeType: "application/json" }
            })
          }
        );
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        const parsed = JSON.parse(cleanJson(rawText));
        if (parsed.cards) {
          setWelcomeCards(
            parsed.cards.map((card, i) => ({
              ...card,
              level: i + 1,
              colorKey: i === 0 ? 'blue' : i === 1 ? 'green' : i === 2 ? 'purple' : 'gold',
              methodName: `רמה ${i + 1}`
            }))
          );
        }
      } catch (error) {
        setWelcomeCards([
          {
            title: 'תקלת תקשורת',
            layout: 'central',
            hebrewDate: 'היום',
            contentItems: [{ label: '', value: 'ניסיון לטעון מטריצת פתיחה נכשל. נסה שוב.' }],
            colorKey: 'blue',
            methodName: 'שגיאה'
          }
        ]);
      }
      setLoadingWelcome(false);
    };

    generateWelcomeMatrix();
  }, []);

  const resetOutputs = () => {
    setProCards(null);
    setSections(null);
    setAnalysisData(null);
    setCardsData(null);
    setSummaryData(null);
    setStoryData(null);
  };

  const handleAnalyze = async () => {
    if (!inputText || activeMethods.length === 0) return;
    setLoading(true);
    resetOutputs();

    const systemPrompt = buildSystemPrompt({ inputText, activeMethods, mode });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const parsed = JSON.parse(cleanJson(rawText));

      if (mode === 'pro' && parsed.proCards) {
        setProCards(
          parsed.proCards.map((card) => ({
            ...card,
            colorKey: card.level === 1 ? 'blue' : card.level === 2 ? 'green' : card.level === 3 ? 'purple' : 'gold'
          }))
        );
      }

      if (mode === 'matrix' && parsed.sections) {
        setSections(
          parsed.sections.map((section) => ({
            ...section,
            colorKey: section.level === 1 ? 'blue' : section.level === 2 ? 'green' : section.level === 3 ? 'purple' : 'gold'
          }))
        );
      }

      if (mode === 'report') {
        setAnalysisData(parsed.analysis || []);
        setCardsData(parsed.cards || []);
        setSummaryData(parsed.summary || null);
      }

      if (mode === 'story') {
        setStoryData(parsed.story || null);
      }
    } catch (error) {
      setAnalysisData([{ title: 'שגיאה', level: 1, content: 'אירעה שגיאה ביצירת הניתוח. נסה שנית.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020204] text-slate-200 font-sans flex flex-col dir-rtl" dir="rtl">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; border: 2px solid #020204; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin-slow 12s linear infinite; }
          @media print {
            @page { size: A4 landscape; margin: 1cm; }
            body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
            .print-hidden { display: none !important; }
            .group { break-inside: avoid; page-break-inside: avoid; }
          }
        `}
      </style>

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
            <h1 className="text-lg font-bold text-slate-200 tracking-tight">
              HolisView <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-black italic pr-1">UNITY</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500 hidden md:block border border-white/5 px-2 py-1 rounded">V{VERSION}</span>
          <button onClick={() => window.print()} className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all" disabled={!analysisData && !proCards && !sections}>
            <Printer size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden print:block relative">
        <aside
          className={`absolute inset-y-0 right-0 z-40 w-80 bg-[#050508] border-l border-white/5 transform transition-transform duration-500 ${
            isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : 'translate-x-full pointer-events-none opacity-0'
          } md:relative md:translate-x-0 md:pointer-events-auto md:opacity-100 md:shadow-none ${
            isSidebarOpen ? 'md:w-80' : 'md:w-0 md:border-none'
          } overflow-hidden`}
        >
          <div className="p-5 h-full flex flex-col">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-1">Matrix Selection</h2>
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar px-1">
              {methodsData.map((level) => (
                <div key={level.level} className="space-y-1">
                  <button
                    onClick={() => setExpandedLevels((prev) => ({ ...prev, [level.level]: !prev[level.level] }))}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-sm group ${
                      expandedLevels[level.level] ? 'bg-white/[0.03] text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${level.baseColor}-500 shadow-[0_0_10px_currentColor] group-hover:scale-150 transition-transform`}></div>
                      <span className="font-medium">{level.title.split('-')[1]}</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${expandedLevels[level.level] ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${expandedLevels[level.level] ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden space-y-1">
                      {level.methods.map((method) => {
                        const isSelected = selectedMethods.includes(method.id);
                        return (
                          <div
                            key={method.id}
                            onClick={() =>
                              setSelectedMethods((prev) =>
                                prev.includes(method.id) ? prev.filter((x) => x !== method.id) : [...prev, method.id]
                              )
                            }
                            className={`ml-4 p-2 rounded-md text-xs cursor-pointer border transition-all flex items-center gap-3 ${
                              isSelected
                                ? `bg-${level.baseColor}-500/10 border-${level.baseColor}-500/30 text-${level.baseColor}-200`
                                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                            }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-all ${
                                isSelected ? `bg-${level.baseColor}-500 border-${level.baseColor}-500` : 'border-slate-700'
                              }`}
                            >
                              {isSelected && <Check size={8} className="text-white" />}
                            </div>
                            {method.name.split('(')[0]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Output Mode</h3>
              <div className="space-y-2">
                {modeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setMode(option.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all ${
                      mode === option.id
                        ? 'bg-white/10 border-white/10 text-white'
                        : 'text-slate-500 border-transparent hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#05050A] relative scroll-smooth">
          <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="max-w-6xl mx-auto p-6 md:p-12 relative z-10 min-h-full flex flex-col">
            <section className="print-hidden space-y-6">
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">מנוע HolisView UNITY</h2>
                  <p className="text-slate-400 text-sm md:text-base">
                    מאחד את כל הגרסאות למנוע אחד: כרטיסי פרו, מטריצות ניתוח, דוחות מעשיים וסיפור מקור מיתי.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Bookmark size={14} /> מבוסס על מסלולי AI-Flow, ReMatrix, 4/7/10/13
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={14} /> מנגנון ניקוי JSON מחוזק לתוצרים יציבים
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Activity size={14} /> התאמה מדויקת לשיטות הניתוח הנבחרות
                  </div>
                </div>
              </div>

              <div className="rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0 focus-within:from-purple-500/50 focus-within:to-blue-500/50 transition-all duration-500">
                <div className="relative bg-[#0A0A14] rounded-[23px] overflow-hidden shadow-2xl shadow-black/50">
                  <textarea
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                    placeholder="כאן כותבים את המחשבות, הדילמות והנושאים..."
                    className="w-full bg-transparent p-6 text-lg font-light text-slate-200 focus:outline-none placeholder:text-slate-700 resize-none custom-scrollbar h-44"
                  />
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-4 py-3 bg-[#0E0E1A] border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                      <span className="text-xs font-medium text-slate-400">{activeMethods.length} מודלים פעילים</span>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      disabled={loading || !inputText || activeMethods.length === 0}
                      className={`px-6 py-2.5 rounded-xl text-white font-medium text-sm transition-all flex items-center gap-2 ${
                        loading
                          ? 'bg-slate-800 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95'
                      }`}
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <><Zap size={16} /> נתח עומק</>}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-400" /> מטריצת פתיחה
                </h3>
                <button onClick={() => window.location.reload()} className="text-xs text-slate-500 hover:text-slate-200 flex items-center gap-2">
                  <RefreshCw size={12} /> רענון מהיר
                </button>
              </div>
              <WelcomeStrip cards={welcomeCards} loading={loadingWelcome} />
            </section>

            <section className="mt-12">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center min-h-[240px]">
                  <div className="w-16 h-16 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-6"></div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-medium text-white">מעבד נתונים</h3>
                    <p className="text-slate-500 text-sm animate-pulse">מפעיל אלגוריתמים הוליסטיים...</p>
                  </div>
                </div>
              ) : null}

              {mode === 'pro' && proCards && (
                <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
                  {proCards.map((card, i) => (
                    <ProCard key={i} card={card} index={i} />
                  ))}
                </div>
              )}

              {mode === 'matrix' && sections && (
                <div className="space-y-10">
                  {sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest">
                        <Hexagon size={12} /> {section.methodName}
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory">
                        {section.cards.map((card, cardIdx) => (
                          <div key={cardIdx} className="snap-start w-[320px]">
                            <ProCard card={{ ...card, colorKey: section.colorKey }} index={cardIdx} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mode === 'report' && analysisData && (
                <div className="space-y-12">
                  {analysisData.map((segment, idx) => (
                    <ResultCard key={idx} segment={segment} />
                  ))}

                  {summaryData && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <BookOpen size={18} className="text-purple-300" /> תקציר מנהלים
                      </h3>
                      <p className="text-slate-300 leading-relaxed">{summaryData.coreInsight}</p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">Actions</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {summaryData.actions?.map((item, i) => (
                              <li key={i} className="flex items-center gap-2"><CheckSquare size={12} className="text-emerald-400" /> {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">Risks</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {summaryData.risks?.map((item, i) => (
                              <li key={i} className="flex items-center gap-2"><ShieldCheck size={12} className="text-amber-400" /> {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">Opportunities</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {summaryData.opportunities?.map((item, i) => (
                              <li key={i} className="flex items-center gap-2"><Star size={12} className="text-purple-400" /> {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardsData && cardsData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cardsData.map((card, idx) => (
                        <EssenceCard key={idx} card={card} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {mode === 'story' && storyData && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Feather className="text-purple-300" />
                    <h3 className="text-2xl font-bold">{storyData.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{storyData.origin}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">מוסר השכל</h4>
                      <p className="text-slate-300">{storyData.lesson}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">טקס קצר</h4>
                      <p className="text-slate-300">{storyData.ritual}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4 text-slate-400 text-sm flex items-center gap-2">
                    <Anchor size={14} /> {storyData.sigil}
                  </div>
                </div>
              )}

              {!loading && !proCards && !sections && !analysisData && !storyData && (
                <div className="py-20 flex flex-col items-center text-slate-700 opacity-40 select-none">
                  <Hexagon size={120} strokeWidth={0.5} className="mb-6 animate-spin-slow" />
                  <p className="text-xl font-light">ממתין לפקודת ניתוח...</p>
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
