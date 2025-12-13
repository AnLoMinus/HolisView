// נתונים
const sefirotData = [
  {
    name: "כתר",
    description: "הספירה הראשונה והגבוהה ביותר, מקור הרצון העליון",
    attributes: ["רצון", "אמונה", "תענוג"],
    color: "white",
    direction: "מעלה",
  },
  {
    name: "חכמה",
    description: "ראשית ההתגלות, נקודת ההברקה הראשונית",
    attributes: ["מחשבה", "התבוננות", "ראיה"],
    color: "blue",
    direction: "ימין",
  },
  // יתווספו עוד ספירות
];

const holyNames = [
  {
    name: "יהוה",
    description: "שם העצם, מורה על ההוויה האלוקית",
    gate: 1,
    combinations: ["יהוה", "יההו", "יוהה", "ההוי"],
  },
  {
    name: "אהיה",
    description: "שם ההוויה, מורה על הקיום העצמי",
    gate: 2,
    combinations: ["אהיה", "איהה", "אההי", "ההאי"],
  },
  // יתווספו עוד שמות
];

// אתחול הדף
document.addEventListener("DOMContentLoaded", function () {
  // טעינת תוכן הספירות
  loadSefirotContent();

  // טעינת שמות הקודש
  loadHolyNames();

  // אתחול מצב התקדמות
  initializeProgress();

  // טעינת הערות אישיות
  loadPersonalNotes();

  // הוספת מאזינים לאירועים
  initializeEventListeners();
});

// פונקציות טעינת תוכן
function loadSefirotContent() {
  const accordion = document.getElementById("sefirotAccordion");
  if (!accordion) return;

  accordion.innerHTML = "";
  sefirotData.forEach((sefirah, index) => {
    accordion.innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${
                      index === 0 ? "" : "collapsed"
                    }" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#sefirah${index}">
                        ${sefirah.name} - ${sefirah.attributes.join(", ")}
                    </button>
                </h2>
                <div id="sefirah${index}" class="accordion-collapse collapse ${
      index === 0 ? "show" : ""
    }" 
                     data-bs-parent="#sefirotAccordion">
                    <div class="accordion-body">
                        <p>${sefirah.description}</p>
                        <div class="sefirah-details">
                            <p><strong>תכונות:</strong> ${sefirah.attributes.join(
                              ", "
                            )}</p>
                            <p><strong>צבע:</strong> ${sefirah.color}</p>
                            <p><strong>כיוון:</strong> ${sefirah.direction}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });
}

function loadHolyNames() {
  const namesContent = document.querySelector(".names-content");
  if (!namesContent) return;

  holyNames.forEach((name) => {
    const nameSection = document.createElement("div");
    nameSection.className = "mb-4";
    nameSection.innerHTML = `
            <h3>שער ${name.gate} - ${name.name}</h3>
            <p>${name.description}</p>
            <div class="combinations-grid">
                ${name.combinations
                  .map((comb) => `<span class="combination">${comb}</span>`)
                  .join("")}
            </div>
        `;
    namesContent.appendChild(nameSection);
  });
}

// פונקציות צירופי אותיות
function generateCombinations() {
  const input = document.getElementById("letterInput").value;
  if (!input) {
    showMessage("נא להזין אותיות", "warning");
    return;
  }

  const letters = input.split("");
  const combinations = permute(letters);

  const resultDiv = document.getElementById("combinationsResult");
  const gridDiv = resultDiv.querySelector(".combinations-grid");

  gridDiv.innerHTML = combinations
    .map(
      (comb) => `
        <div class="combination-item">
            ${comb.join("")}
        </div>
    `
    )
    .join("");

  resultDiv.classList.remove("d-none");
}

function permute(arr) {
  if (arr.length <= 2)
    return arr.length === 2 ? [arr, [arr[1], arr[0]]] : [arr];
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permute([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
          item,
          ...val,
        ])
      ),
    []
  );
}

// פונקציות מדיטציה
function startAdvancedMeditation(type) {
  const button = document.querySelector(
    `[onclick="startAdvancedMeditation('${type}')"]`
  );
  let timeLeft = 1800; // 30 דקות

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

// ניהול התקדמות
function initializeProgress() {
  const progress = JSON.parse(localStorage.getItem("kabbalahProgress") || "{}");
  const completedLessons = progress.completedLessons || 0;
  const totalLessons = 10;

  document.getElementById(
    "completedLessons"
  ).textContent = `${completedLessons}/${totalLessons}`;

  const level = calculateLevel(completedLessons);
  document.getElementById("currentLevel").textContent = level;

  const progressBar = document.querySelector(".progress-bar");
  const percentage = (completedLessons / totalLessons) * 100;
  progressBar.style.width = percentage + "%";
  progressBar.setAttribute("aria-valuenow", percentage);
}

function calculateLevel(completedLessons) {
  if (completedLessons < 3) return "מתחיל";
  if (completedLessons < 6) return "מתקדם";
  if (completedLessons < 9) return "מעמיק";
  return "מומחה";
}

function updateProgress() {
  const progress = JSON.parse(localStorage.getItem("kabbalahProgress") || "{}");
  progress.completedLessons = (progress.completedLessons || 0) + 1;
  localStorage.setItem("kabbalahProgress", JSON.stringify(progress));
  initializeProgress();
}

// ניהול הערות אישיות
function loadPersonalNotes() {
  const notes = localStorage.getItem("kabbalahNotes");
  if (notes) {
    document.getElementById("personalNotes").value = notes;
  }
}

function savePersonalNotes() {
  const notes = document.getElementById("personalNotes").value;
  localStorage.setItem("kabbalahNotes", notes);
  showMessage("ההערות נשמרו בהצלחה", "success");
}

// מאזיני אירועים
function initializeEventListeners() {
  // שמירת הלשונית הפעילה
  const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabElements.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (event) {
      localStorage.setItem(
        "activeKabbalahTab",
        event.target.getAttribute("href")
      );
    });
  });

  // שחזור הלשונית האחרונה
  const activeTab = localStorage.getItem("activeKabbalahTab");
  if (activeTab) {
    const tab = document.querySelector(`[href="${activeTab}"]`);
    if (tab) {
      new bootstrap.Tab(tab).show();
    }
  }

  // האזנה לשינויים בהערות
  const notesTextarea = document.getElementById("personalNotes");
  if (notesTextarea) {
    notesTextarea.addEventListener(
      "input",
      debounce(() => {
        savePersonalNotes();
      }, 1000)
    );
  }
}

// פונקציית עזר להשהיית ביצוע
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
