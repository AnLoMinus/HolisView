const modalContent = {
  exercises: {
    title: "תרגילים מעשיים",
    content: `
            <section class="element-section wind">
                <h3>תרגילי רוח 🌬️</h3>
                <ul>
                    <li>כתיבת יומן מחשבות והתבוננות</li>
                    <li>מדיטציה על מושג או רעיון</li>
                    <li>ניתוח פילוסופי של סיטואציה</li>
                    <li>זיהוי דפוסי חשיבה</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>תרגילי אש 🔥</h3>
                <ul>
                    <li>הצבת יעדים והגדרת מטרות</li>
                    <li>תרגילי העצמה והתלהבות</li>
                    <li>פעולות של יוזמה ומנהיגות</li>
                    <li>התמודדות עם פחדים</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>תרגילי מים 💧</h3>
                <ul>
                    <li>זיהוי והבעת רגשות</li>
                    <li>תרגילי הקשבה פעילה</li>
                    <li>פיתוח אמפתיה</li>
                    <li>עבודה על מערכות יחסים</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>תרגילי אדמה 🌍</h3>
                <ul>
                    <li>בניית תכנית פעולה מעשית</li>
                    <li>יצירת הרגלים חדשים</li>
                    <li>ארגון וסדר בסביבה</li>
                    <li>מעקב אחר התקדמות</li>
                </ul>
            </section>
        `,
  },
  questions: {
    title: "שאלות מנחות",
    content: `
            <section class="element-section wind">
                <h3>שאלות רוח 🌬️</h3>
                <ul>
                    <li>מה המשמעות העמוקה של הדבר?</li>
                    <li>איזה רעיון מנחה אותי?</li>
                    <li>מה אני באמת חושב על זה?</li>
                    <li>איך זה מתחבר לתפיסת עולמי?</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>שאלות אש 🔥</h3>
                <ul>
                    <li>מה מניע אותי לפעולה?</li>
                    <li>איפה אני רוצה להיות?</li>
                    <li>מה מעורר בי התלהבות?</li>
                    <li>איך אוכל להתגבר על המכשולים?</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>שאלות מים 💧</h3>
                <ul>
                    <li>מה אני מרגיש כלפי זה?</li>
                    <li>איך זה משפיע על אחרים?</li>
                    <li>מה הלב אומר לי?</li>
                    <li>איך אני יכול להיות יותר אמפתי?</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>שאלות אדמה 🌍</h3>
                <ul>
                    <li>מה הצעדים המעשיים?</li>
                    <li>איך אוכל ליישם את זה?</li>
                    <li>מה המשאבים הנדרשים?</li>
                    <li>איך אמדוד הצלחה?</li>
                </ul>
            </section>
        `,
  },
  tanach: {
    title: 'דוגמאות מהתנ"ך',
    content: `
            <section class="element-section wind">
                <h3>רוח בתנ"ך 🌬️</h3>
                <ul>
                    <li>חלומות יוסף - ראייה רוחנית</li>
                    <li>חכמת שלמה - תבונה עליונה</li>
                    <li>נבואת ישעיהו - חזון עתידי</li>
                    <li>קהלת - התבוננות פילוסופית</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>אש בתנ"ך 🔥</h3>
                <ul>
                    <li>פנחס - קנאות לה'</li>
                    <li>דוד המלך - אומץ ומנהיגות</li>
                    <li>אליהו בהר הכרמל - התלהבות</li>
                    <li>יהושע - מלחמות ה'</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>מים בתנ"ך 💧</h3>
                <ul>
                    <li>רחל - אהבה ורגש</li>
                    <li>חנה - תפילה מעומק הלב</li>
                    <li>רות - חסד ונאמנות</li>
                    <li>יונה - רחמים וחמלה</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>אדמה בתנ"ך 🌍</h3>
                <ul>
                    <li>אברהם - בניית משפחה ואומה</li>
                    <li>נחמיה - בניית חומות ירושלים</li>
                    <li>בצלאל - אומנות מעשית</li>
                    <li>יעקב - עבודה ומאמץ</li>
                </ul>
            </section>
        `,
  },
  daily: {
    title: "היסודות בחיי היומיום",
    content: `
            <section class="element-section wind">
                <h3>רוח ביומיום 🌬️</h3>
                <ul>
                    <li>קביעת זמן ללימוד והתבוננות</li>
                    <li>חשיבה לפני פעולה</li>
                    <li>הבנת המניעים שלנו</li>
                    <li>פיתוח השקפת עולם</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>אש ביומיום 🔥</h3>
                <ul>
                    <li>התחלת היום בהתלהבות</li>
                    <li>יוזמה בעבודה</li>
                    <li>הצבת אתגרים חדשים</li>
                    <li>התמודדות עם קשיים</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>מים ביומיום 💧</h3>
                <ul>
                    <li>הקשבה למשפחה וחברים</li>
                    <li>גילוי אמפתיה</li>
                    <li>שיתוף ברגשות</li>
                    <li>יצירת קשרים חדשים</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>אדמה ביומיום 🌍</h3>
                <ul>
                    <li>ארגון וסדר בבית</li>
                    <li>תכנון לוח זמנים</li>
                    <li>ביצוע משימות</li>
                    <li>שמירה על בריאות</li>
                </ul>
            </section>
        `,
  },
  midot: {
    title: "היסודות בעבודת המידות",
    content: `
            <section class="element-section wind">
                <h3>רוח במידות 🌬️</h3>
                <ul>
                    <li>ענווה - הכרת מקומנו</li>
                    <li>חכמה - שיקול דעת</li>
                    <li>אמת - חיפוש האמת</li>
                    <li>צדק - איזון והגינות</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>אש במידות 🔥</h3>
                <ul>
                    <li>זריזות - התלהבות למצוות</li>
                    <li>גבורה - התגברות על היצר</li>
                    <li>נדיבות - נתינה בשמחה</li>
                    <li>אומץ - עמידה על האמת</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>מים במידות 💧</h3>
                <ul>
                    <li>רחמים - חמלה לזולת</li>
                    <li>אהבה - קירוב לבבות</li>
                    <li>חסד - נתינה מהלב</li>
                    <li>שלום - הרמוניה ביחסים</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>אדמה במידות 🌍</h3>
                <ul>
                    <li>סבלנות - התמדה</li>
                    <li>אחריות - מחויבות</li>
                    <li>יציבות - עקביות</li>
                    <li>מתינות - איזון</li>
                </ul>
            </section>
        `,
  },
  relationship: {
    title: "היסודות בזוגיות",
    content: `
            <section class="element-section wind">
                <h3>רוח בזוגיות 🌬️</h3>
                <ul>
                    <li>הבנת עולמו של בן/בת הזוג</li>
                    <li>דיאלוג אינטלקטואלי</li>
                    <li>חזון משותף</li>
                    <li>ערכים משותפים</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>אש בזוגיות 🔥</h3>
                <ul>
                    <li>שמירת הלהט בקשר</li>
                    <li>יוזמה ויצירתיות</li>
                    <li>התחדשות מתמדת</li>
                    <li>פתרון קונפליקטים</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>מים בזוגיות 💧</h3>
                <ul>
                    <li>הבעת רגשות ואהבה</li>
                    <li>אמפתיה והקשבה</li>
                    <li>תמיכה רגשית</li>
                    <li>יצירת אינטימיות</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>אדמה בזוגיות 🌍</h3>
                <ul>
                    <li>בניית בית משותף</li>
                    <li>אחריות ומחויבות</li>
                    <li>יציבות כלכלית</li>
                    <li>שגרה בריאה</li>
                </ul>
            </section>
        `,
  },
  education: {
    title: "היסודות בחינוך",
    content: `
            <section class="element-section wind">
                <h3>רוח בחינוך 🌬️</h3>
                <ul>
                    <li>פיתוח חשיבה עצמאית</li>
                    <li>העשרת עולם הידע</li>
                    <li>חינוך לערכים</li>
                    <li>טיפוח סקרנות</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>אש בחינוך 🔥</h3>
                <ul>
                    <li>עידוד מוטיבציה</li>
                    <li>פיתוח מנהיגות</li>
                    <li>חיזוק ביטחון עצמי</li>
                    <li>התמודדות עם אתגרים</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>מים בחינוך 💧</h3>
                <ul>
                    <li>פיתוח אינטליגנציה רגשית</li>
                    <li>יצירת קשר אישי</li>
                    <li>הקשבה לצרכים</li>
                    <li>טיפוח אמפתיה</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>אדמה בחינוך 🌍</h3>
                <ul>
                    <li>הקניית הרגלים</li>
                    <li>משמעת עצמית</li>
                    <li>אחריות אישית</li>
                    <li>למידה מעשית</li>
                </ul>
            </section>
        `,
  },
  community: {
    title: "היסודות בקהילה",
    content: `
            <section class="element-section wind">
                <h3>רוח בקהילה 🌬️</h3>
                <ul>
                    <li>חזון קהילתי משותף</li>
                    <li>לימוד משותף</li>
                    <li>דיונים ערכיים</li>
                    <li>העשרה תרבותית</li>
                </ul>
            </section>
            <section class="element-section fire">
                <h3>אש בקהילה 🔥</h3>
                <ul>
                    <li>יוזמות חברתיות</li>
                    <li>מנהיגות קהילתית</li>
                    <li>פעילויות משותפות</li>
                    <li>התנדבות ותרומה</li>
                </ul>
            </section>
            <section class="element-section water">
                <h3>מים בקהילה 💧</h3>
                <ul>
                    <li>תמיכה הדדית</li>
                    <li>גמילות חסדים</li>
                    <li>אירועים משפחתיים</li>
                    <li>יצירת קשרים</li>
                </ul>
            </section>
            <section class="element-section earth">
                <h3>אדמה בקהילה 🌍</h3>
                <ul>
                    <li>בניית מוסדות</li>
                    <li>ארגון אירועים</li>
                    <li>ניהול משאבים</li>
                    <li>תחזוקה שוטפת</li>
                </ul>
            </section>
        `,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const modalContainer = document.getElementById("modalContainer");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.querySelector(".close-modal");
  const sectionCards = document.querySelectorAll(".section-card");

  function openModal(modalType) {
    const content = modalContent[modalType];
    if (!content) return;

    modalBody.innerHTML = `
        <h2>${content.title}</h2>
        <div class="elements-grid">
            ${content.content}
        </div>
    `;
    modalContainer.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeModalHandler() {
    modalContainer.classList.remove("visible");
    document.body.style.overflow = "";
  }

  sectionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalType = card.getAttribute("data-modal");
      if (modalContent[modalType]) {
        openModal(modalType);
      }
    });
  });

  closeModal.addEventListener("click", closeModalHandler);
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeModalHandler();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("visible")) {
      closeModalHandler();
    }
  });
});
