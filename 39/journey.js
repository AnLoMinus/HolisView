// נתוני המסע הרוחני
const journeyData = {
  // נתוני התקדמות המשתמש
  userProgress: {
    completedSections: [],
    currentSection: null,
    lastVisit: null,
    totalTime: 0,
  },

  // תוכן המסע
  sections: [
    {
      id: "intro",
      title: "מבוא ורקע",
      subsections: [
        {
          id: "gates-intro",
          title: "מבוא לשערי האורה",
          content: "הסבר כללי על המושג והקשר ל-39 מלאכות",
          isCompleted: false,
        },
        {
          id: "etz-chaim",
          title: 'יסודות מספר "עץ חיים"',
          content: 'תובנות מרכזיות מכתבי האר"י הקדוש',
          isCompleted: false,
        },
        {
          id: "soul-cycles",
          title: "גלגולי נשמות ותיקון",
          content: "הקשר בין גלגולי נשמות לשערי האורה",
          isCompleted: false,
        },
      ],
    },
    {
      id: "daily-practice",
      title: "עבודה יומיומית ותפילה",
      subsections: [
        {
          id: "daily-work",
          title: "עבודה יומיומית",
          content: "הדרכה מעשית לעבודה עם השערים",
          isCompleted: false,
        },
        {
          id: "prayer",
          title: "תפילה וכוונות השמות",
          content: "כוונות מיוחדות בתפילה",
          isCompleted: false,
        },
        {
          id: "shabbat",
          title: "הכנה לשבת",
          content: "הכנה רוחנית ומעשית לשבת",
          isCompleted: false,
        },
      ],
    },
  ],
};

// נתוני לימוד
const studyData = {
  "gates-table": {
    title: "טבלת השערים",
    content: [
      {
        category: "שערי אור",
        items: [
          { name: "שער הכוונה", description: "התכוונות והכנה לעבודת השם" },
          { name: "שער היראה", description: "יראת שמים ויראת חטא" },
          { name: "שער האהבה", description: "אהבת השם ואהבת ישראל" },
        ],
      },
      {
        category: "מלאכות",
        items: [
          { name: "זורע", description: "הצמחת דבר חדש" },
          { name: "חורש", description: "הכנת הקרקע לצמיחה" },
          { name: "קוצר", description: "איסוף התוצאות" },
        ],
      },
    ],
  },
  "torah-learning": {
    title: "לימוד תורה וקבלה",
    sections: [
      {
        title: "יסודות הקבלה",
        content: "לימוד יסודות תורת הקבלה והקשר לשערי האורה",
        resources: ["ספר יצירה", "עץ חיים", "זוהר"],
      },
      {
        title: "עבודה מעשית",
        content: "יישום הלימוד בחיי היומיום",
        exercises: ["התבוננות יומית", "לימוד בחברותא", "כתיבת חידושים"],
      },
    ],
  },
  "midot-repair": {
    title: "תיקון המידות",
    traits: [
      {
        name: "ענווה",
        description: "עבודה על מידת הענווה",
        exercises: ["התבוננות בגדולי ישראל", "קבלת ביקורת באהבה"],
      },
      {
        name: "חסד",
        description: "פיתוח מידת החסד",
        exercises: ["עזרה לזולת", "צדקה יומית"],
      },
      {
        name: "אמת",
        description: "דבקות באמת",
        exercises: ["דיבור אמת", "חשבון נפש יומי"],
      },
    ],
  },
};

// אתחול הדף
document.addEventListener("DOMContentLoaded", function () {
  initializeJourney();
  setupEventListeners();
  updateProgress();
});

// פונקציות אתחול
function initializeJourney() {
  // טעינת התקדמות שמורה
  const savedProgress = localStorage.getItem("journeyProgress");
  if (savedProgress) {
    journeyData.userProgress = JSON.parse(savedProgress);
  }

  // עדכון תאריך ביקור אחרון
  journeyData.userProgress.lastVisit = new Date().toISOString();
  saveProgress();
}

function setupEventListeners() {
  // מאזיני לחיצה על כרטיסי תוכן
  document.querySelectorAll(".content-card").forEach((card) => {
    card.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section-id");
      openSection(sectionId);
    });
  });

  // מאזיני לחיצה על כרטיסי תרגול
  document.querySelectorAll(".practice-card").forEach((card) => {
    card.addEventListener("click", function () {
      const practiceId = this.getAttribute("data-practice-id");
      startPractice(practiceId);
    });
  });

  // מאזין לכפתור חזרה למעלה
  const backToTopButton = document.querySelector(".btn-back-to-top");
  if (backToTopButton) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // הוספת מאזיני אירועים לכרטיסי לימוד
  document.querySelectorAll("[data-study-id]").forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      const studyId = this.getAttribute("data-study-id");
      openStudyContent(studyId);
    });
  });
}

// פונקציות ניהול התקדמות
function updateProgress() {
  const completedSections = journeyData.userProgress.completedSections.length;
  const totalSections = journeyData.sections.reduce(
    (total, section) => total + section.subsections.length,
    0
  );

  const progressPercentage = (completedSections / totalSections) * 100;

  // עדכון סרגל התקדמות
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", progressPercentage);
  }
}

function saveProgress() {
  localStorage.setItem(
    "journeyProgress",
    JSON.stringify(journeyData.userProgress)
  );
}

// פונקציות ניווט ותצוגה
function openSection(sectionId) {
  const section = findSection(sectionId);
  if (!section) return;

  // שמירת המיקום הנוכחי
  journeyData.userProgress.currentSection = sectionId;
  saveProgress();

  // הצגת תוכן הסעיף
  showSectionContent(section);
}

function findSection(sectionId) {
  for (const section of journeyData.sections) {
    for (const subsection of section.subsections) {
      if (subsection.id === sectionId) {
        return subsection;
      }
    }
  }
  return null;
}

function showSectionContent(section) {
  // יצירת מודל להצגת התוכן
  const modalHtml = `
        <div class="modal fade" id="sectionModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${section.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="content-container">
                            ${section.content}
                        </div>
                        <div class="progress-container mt-4">
                            <button class="btn btn-success" onclick="markAsCompleted('${section.id}')">
                                <i class="bi bi-check-circle"></i>
                                סמן כהושלם
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  // הוספת המודל לדף
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // הצגת המודל
  const modal = new bootstrap.Modal(document.getElementById("sectionModal"));
  modal.show();

  // הסרת המודל מה-DOM לאחר סגירה
  document
    .getElementById("sectionModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

// פונקציות תרגול ועבודה מעשית
function startPractice(practiceId) {
  // התחלת תרגול חדש
  const practice = findPractice(practiceId);
  if (!practice) return;

  showPracticeGuide(practice);
}

function findPractice(practiceId) {
  const practices = {
    "daily-work": {
      title: "עבודה יומיומית",
      steps: [
        "התבוננות בשער היומי",
        "תרגול מעשי",
        "רישום תובנות",
        "שיתוף וחיבור לחיי היומיום",
      ],
    },
    prayer: {
      title: "תפילה וכוונות",
      steps: ["הכנה לתפילה", "כוונות השמות", "חיבור לאור העליון", "המשכת השפע"],
    },
    shabbat: {
      title: "הכנה לשבת",
      steps: ["הכנות רוחניות", "תיקון המלאכות", "קבלת שבת", "שמירת הקדושה"],
    },
  };

  return practices[practiceId];
}

function showPracticeGuide(practice) {
  const modalHtml = `
        <div class="modal fade" id="practiceModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${practice.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <ol class="practice-steps">
                            ${practice.steps
                              .map((step) => `<li>${step}</li>`)
                              .join("")}
                        </ol>
                        <div class="mt-4">
                            <button class="btn btn-primary w-100" onclick="startPracticeSession('${
                              practice.title
                            }')">
                                <i class="bi bi-play-circle"></i>
                                התחל תרגול
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modal = new bootstrap.Modal(document.getElementById("practiceModal"));
  modal.show();

  document
    .getElementById("practiceModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

function startPracticeSession(practiceTitle) {
  // התחלת סשן תרגול
  const startTime = new Date();

  // שמירת זמן התחלה
  journeyData.userProgress.totalTime += 1;
  saveProgress();

  // הצגת הודעת התחלה
  showMessage(`התחלת תרגול: ${practiceTitle}`, "success");
}

// פונקציות עזר
function showMessage(message, type = "info") {
  const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index: 1050;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", alertHtml);

  // הסרה אוטומטית לאחר 3 שניות
  setTimeout(() => {
    const alert = document.querySelector(".alert");
    if (alert) {
      alert.remove();
    }
  }, 3000);
}

function markAsCompleted(sectionId) {
  if (!journeyData.userProgress.completedSections.includes(sectionId)) {
    journeyData.userProgress.completedSections.push(sectionId);
    saveProgress();
    updateProgress();
    showMessage("סעיף זה סומן כהושלם!", "success");
  }
}

// פונקציות לימוד
function openStudyContent(studyId) {
  const data = studyData[studyId];
  if (!data) return;

  let contentHtml = "";

  switch (studyId) {
    case "gates-table":
      contentHtml = createGatesTableContent(data);
      break;
    case "torah-learning":
      contentHtml = createTorahLearningContent(data);
      break;
    case "midot-repair":
      contentHtml = createMidotRepairContent(data);
      break;
  }

  showStudyModal(data.title, contentHtml);
}

// יצירת תוכן טבלת השערים
function createGatesTableContent(data) {
  return `
        <div class="gates-table">
            ${data.content
              .map(
                (category) => `
                <div class="category-section mb-4">
                    <h4 class="category-title">${category.category}</h4>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>שם</th>
                                    <th>תיאור</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${category.items
                                  .map(
                                    (item) => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.description}</td>
                                    </tr>
                                `
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

// יצירת תוכן לימוד תורה
function createTorahLearningContent(data) {
  return `
        <div class="torah-learning">
            ${data.sections
              .map(
                (section) => `
                <div class="learning-section mb-4">
                    <h4 class="section-title">${section.title}</h4>
                    <p class="section-content">${section.content}</p>
                    ${
                      section.resources
                        ? `
                        <div class="resources">
                            <h5>מקורות ללימוד:</h5>
                            <ul>
                                ${section.resources
                                  .map(
                                    (resource) => `
                                    <li>${resource}</li>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    `
                        : ""
                    }
                    ${
                      section.exercises
                        ? `
                        <div class="exercises">
                            <h5>תרגילים מעשיים:</h5>
                            <ul>
                                ${section.exercises
                                  .map(
                                    (exercise) => `
                                    <li>${exercise}</li>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    `
                        : ""
                    }
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

// יצירת תוכן תיקון המידות
function createMidotRepairContent(data) {
  return `
        <div class="midot-repair">
            ${data.traits
              .map(
                (trait) => `
                <div class="trait-card mb-4">
                    <h4 class="trait-title">${trait.name}</h4>
                    <p class="trait-description">${trait.description}</p>
                    <div class="trait-exercises">
                        <h5>תרגילים לעבודה:</h5>
                        <ul>
                            ${trait.exercises
                              .map(
                                (exercise) => `
                                <li>${exercise}</li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

// הצגת מודל לימוד
function showStudyModal(title, content) {
  const modalHtml = `
        <div class="modal fade" id="studyModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="startStudySession('${title}')">
                            <i class="bi bi-play-circle"></i>
                            התחל ללמוד
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modal = new bootstrap.Modal(document.getElementById("studyModal"));
  modal.show();

  document
    .getElementById("studyModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

// התחלת סשן לימוד
function startStudySession(title) {
  // שמירת זמן התחלה
  const startTime = new Date();
  journeyData.userProgress.totalTime += 1;
  saveProgress();

  // הצגת הודעת התחלה
  showMessage(`התחלת לימוד: ${title}`, "success");
}
