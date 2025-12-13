// ניהול תרגול יומי
let practiceTimer = null;
let practiceSeconds = 0;

function startPractice() {
  if (practiceTimer === null) {
    practiceTimer = setInterval(updatePracticeTimer, 1000);
    document.getElementById("startPracticeBtn").textContent = "הפסק תרגול";
  } else {
    clearInterval(practiceTimer);
    practiceTimer = null;
    document.getElementById("startPracticeBtn").textContent = "התחל תרגול";
    savePracticeTime(practiceSeconds);
    practiceSeconds = 0;
    updatePracticeTimer();
  }
}

function updatePracticeTimer() {
  const minutes = Math.floor(practiceSeconds / 60);
  const seconds = practiceSeconds % 60;
  document.getElementById("practiceTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  practiceSeconds++;
}

function savePracticeTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const weeklyTime = parseInt(
    localStorage.getItem("weeklyPracticeTime") || "0"
  );
  localStorage.setItem("weeklyPracticeTime", weeklyTime + minutes);
  updateWeeklyPracticeTime();
  showMessage(`נוספו ${minutes} דקות לזמן התרגול השבועי`, "success");
}

// ניהול מדיטציות
function startMeditation(meditationId) {
  const button = document.querySelector(`#${meditationId} button`);
  let timeLeft = 900; // 15 דקות

  button.disabled = true;
  const timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    button.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      button.textContent = "התחל מדיטציה";
      button.disabled = false;
      showMessage("המדיטציה הסתיימה", "success");
      updateProgress();
    }
  }, 1000);
}

// ניהול תרגילים
function toggleExercise(exerciseId) {
  const checkbox = document.getElementById(exerciseId);
  const exercises = JSON.parse(
    localStorage.getItem("completedExercises") || "{}"
  );
  exercises[exerciseId] = checkbox.checked;
  localStorage.setItem("completedExercises", JSON.stringify(exercises));
  updateExercisesProgress();

  if (checkbox.checked) {
    showMessage("התרגיל סומן כהושלם", "success");
  }
}

function updateExercisesProgress() {
  const exercises = JSON.parse(
    localStorage.getItem("completedExercises") || "{}"
  );
  const completed = Object.values(exercises).filter(Boolean).length;
  const total = document.querySelectorAll(".form-check-input").length;

  document.getElementById(
    "completedExercises"
  ).textContent = `${completed}/${total}`;

  const progressBar = document.querySelector(".progress-bar");
  const percentage = (completed / total) * 100;
  progressBar.style.width = percentage + "%";
  progressBar.setAttribute("aria-valuenow", percentage);
}

// ניהול יומן אישי
function saveJournalEntry() {
  const date = document.getElementById("journalDate").value;
  const entry = document.getElementById("journalEntry").value;

  if (!date || !entry) {
    showMessage("נא למלא תאריך ותוכן", "warning");
    return;
  }

  const journal = JSON.parse(localStorage.getItem("practiceJournal") || "{}");
  journal[date] = entry;
  localStorage.setItem("practiceJournal", JSON.stringify(journal));

  document.getElementById("journalEntry").value = "";
  showMessage("הרשומה נשמרה בהצלחה", "success");
}

function loadJournalEntry() {
  const date = document.getElementById("journalDate").value;
  const journal = JSON.parse(localStorage.getItem("practiceJournal") || "{}");

  if (journal[date]) {
    document.getElementById("journalEntry").value = journal[date];
  } else {
    document.getElementById("journalEntry").value = "";
  }
}

// עדכון זמן תרגול שבועי
function updateWeeklyPracticeTime() {
  const weeklyTime = parseInt(
    localStorage.getItem("weeklyPracticeTime") || "0"
  );
  document.getElementById(
    "weeklyPracticeTime"
  ).textContent = `${weeklyTime} דקות`;
}

// נתונים
const practiceData = {
  dailyPractices: [
    {
      id: "dp1",
      title: "התבוננות בשם יהו״ה",
      duration: 15,
      steps: [
        "התבודדות במקום שקט",
        "נשימות עמוקות ומדיטציה",
        "התבוננות באותיות השם",
        "חיבור למשמעות הפנימית",
      ],
      description: "התבוננות עמוקה בשם המפורש וחיבור למשמעויותיו הפנימיות",
    },
    {
      id: "dp2",
      title: "יחוד השמות",
      duration: 20,
      steps: [
        "לימוד משמעות השמות",
        "הבנת הקשרים ביניהם",
        "תרגול היחוד",
        "סיכום והפנמה",
      ],
      description: "תרגול מעשי של יחוד שמות הקודש על פי הכוונות",
    },
  ],
  meditations: [
    {
      id: "med1",
      title: "מדיטציית אותיות",
      duration: 30,
      level: "מתחיל",
      instructions: [
        "שב בתנוחה נוחה",
        "התמקד בנשימה",
        "דמיין את האותיות",
        "התחבר לאנרגיה שלהן",
      ],
    },
    {
      id: "med2",
      title: "מדיטציית שערים",
      duration: 45,
      level: "מתקדם",
      instructions: [
        "הכנה מוקדמת",
        "כוונת השער הראשון",
        "העלאת האור",
        "סיום והודיה",
      ],
    },
  ],
  exercises: [
    {
      id: "ex1",
      title: "צירופי אותיות",
      duration: 15,
      category: "בסיסי",
      steps: ["בחירת אותיות", "יצירת צירופים", "הבנת המשמעויות", "תרגול מעשי"],
    },
    {
      id: "ex2",
      title: "עבודת המידות",
      duration: 20,
      category: "מתקדם",
      steps: ["זיהוי המידה", "התבוננות פנימית", "תיקון המידה", "יישום בפועל"],
    },
  ],
};

// אתחול הדף
document.addEventListener("DOMContentLoaded", function () {
  // טעינת התרגול היומי
  loadDailyPractice();

  // טעינת המדיטציות
  loadMeditations();

  // טעינת התרגילים
  loadExercises();

  // אתחול טיימרים
  initializeTimers();

  // טעינת התקדמות
  loadProgress();

  // טעינת יומן אישי
  loadJournal();

  // הוספת מאזיני אירועים
  initializeEventListeners();
});

// פונקציות טעינת תוכן
function loadDailyPractice() {
  const today = new Date();
  const practiceIndex = today.getDate() % practiceData.dailyPractices.length;
  const dailyPractice = practiceData.dailyPractices[practiceIndex];

  const practiceContent = document.querySelector(".practice-content");
  if (!practiceContent) return;

  practiceContent.innerHTML = `
        <h3>${dailyPractice.title}</h3>
        <p class="practice-text">${dailyPractice.description}</p>
        
        <h4>שלבי התרגול:</h4>
        <ol class="practice-steps">
            ${dailyPractice.steps.map((step) => `<li>${step}</li>`).join("")}
        </ol>
        
        <div class="practice-timer mt-4">
            <p>משך מומלץ: ${dailyPractice.duration} דקות</p>
            <div class="d-flex align-items-center">
                <button class="btn btn-primary me-3" onclick="startPracticeTimer('${
                  dailyPractice.id
                }')">
                    <i class="bi bi-play-circle"></i>
                    התחל תרגול
                </button>
                <div id="practiceTimer" class="h4 mb-0">00:00</div>
            </div>
        </div>
    `;
}

function loadMeditations() {
  const meditationsAccordion = document.getElementById("meditationsAccordion");
  if (!meditationsAccordion) return;

  meditationsAccordion.innerHTML = practiceData.meditations
    .map(
      (meditation, index) => `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button ${
                  index === 0 ? "" : "collapsed"
                }" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#meditation${
                          meditation.id
                        }">
                    ${meditation.title} - ${meditation.duration} דקות (${
        meditation.level
      })
                </button>
            </h2>
            <div id="meditation${
              meditation.id
            }" class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
                 data-bs-parent="#meditationsAccordion">
                <div class="accordion-body">
                    <ol class="meditation-instructions">
                        ${meditation.instructions
                          .map((instruction) => `<li>${instruction}</li>`)
                          .join("")}
                    </ol>
                    <button class="btn btn-primary mt-3" onclick="startMeditation('${
                      meditation.id
                    }')">
                        <i class="bi bi-play-circle"></i>
                        התחל מדיטציה
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function loadExercises() {
  const exercisesList = document.querySelector(".list-group");
  if (!exercisesList) return;

  exercisesList.innerHTML = practiceData.exercises
    .map(
      (exercise) => `
        <div class="list-group-item">
            <h5 class="mb-1">${exercise.title}</h5>
            <p class="mb-1">קטגוריה: ${exercise.category}</p>
            <small class="text-muted">משך: ${exercise.duration} דקות</small>
            <div class="exercise-steps mt-2">
                <ol>
                    ${exercise.steps.map((step) => `<li>${step}</li>`).join("")}
                </ol>
            </div>
            <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" id="${
                  exercise.id
                }"
                       onchange="toggleExercise('${exercise.id}')">
                <label class="form-check-label" for="${exercise.id}">
                    סמן כהושלם
                </label>
            </div>
        </div>
    `
    )
    .join("");
}

// ניהול טיימרים
let activeTimer = null;
let timerSeconds = 0;

function startPracticeTimer(practiceId) {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
    document.querySelector(
      `[onclick="startPracticeTimer('${practiceId}')"]`
    ).innerHTML = `
            <i class="bi bi-play-circle"></i>
            התחל תרגול
        `;
    savePracticeSession(practiceId, timerSeconds);
    timerSeconds = 0;
    updateTimerDisplay();
  } else {
    activeTimer = setInterval(updateTimer, 1000);
    document.querySelector(
      `[onclick="startPracticeTimer('${practiceId}')"]`
    ).innerHTML = `
            <i class="bi bi-pause-circle"></i>
            הפסק תרגול
        `;
  }
}

function updateTimer() {
  timerSeconds++;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  document.getElementById("practiceTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// שמירת נתונים
function savePracticeSession(practiceId, duration) {
  const sessions = JSON.parse(localStorage.getItem("practiceSessions") || "[]");
  sessions.push({
    id: practiceId,
    duration: duration,
    date: new Date().toISOString(),
  });
  localStorage.setItem("practiceSessions", JSON.stringify(sessions));
  updateProgress();
}

// ניהול התקדמות
function loadProgress() {
  const sessions = JSON.parse(localStorage.getItem("practiceSessions") || "[]");
  const totalMinutes = sessions.reduce(
    (acc, session) => acc + Math.floor(session.duration / 60),
    0
  );
  const completedExercises = Object.keys(
    JSON.parse(localStorage.getItem("completedExercises") || "{}")
  ).length;

  document.getElementById(
    "weeklyPracticeTime"
  ).textContent = `${totalMinutes} דקות`;
  document.getElementById(
    "completedExercises"
  ).textContent = `${completedExercises}/${practiceData.exercises.length}`;

  updateProgressBar((completedExercises / practiceData.exercises.length) * 100);
}

function updateProgressBar(percentage) {
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", percentage);
  }
}

// ניהול יומן
function loadJournal() {
  const journalEntries = JSON.parse(
    localStorage.getItem("practiceJournal") || "{}"
  );
  const today = new Date().toISOString().split("T")[0];

  document.getElementById("journalDate").value = today;
  if (journalEntries[today]) {
    document.getElementById("journalEntry").value = journalEntries[today];
  }
}

// מאזיני אירועים
function initializeEventListeners() {
  // האזנה לשינויי תאריך ביומן
  const dateInput = document.getElementById("journalDate");
  if (dateInput) {
    dateInput.addEventListener("change", function () {
      const journal = JSON.parse(
        localStorage.getItem("practiceJournal") || "{}"
      );
      const entry = journal[this.value] || "";
      document.getElementById("journalEntry").value = entry;
    });
  }

  // שמירת הלשונית הפעילה
  const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabElements.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (event) {
      localStorage.setItem(
        "activePracticeTab",
        event.target.getAttribute("href")
      );
    });
  });

  // שחזור הלשונית האחרונה
  const activeTab = localStorage.getItem("activePracticeTab");
  if (activeTab) {
    const tab = document.querySelector(`[href="${activeTab}"]`);
    if (tab) {
      new bootstrap.Tab(tab).show();
    }
  }
}

// פונקציות עזר
function showMessage(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  alertDiv.style.zIndex = "1050";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
