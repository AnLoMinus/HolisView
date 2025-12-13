// נתונים
const namesData = [
  {
    name: "יהוה",
    meaning: "שם העצם",
    gematria: 26,
    gate: 1,
    description: "שם ההויה המיוחד, מורה על מהות האלוקות",
    combinations: ["יהוה", "יההו", "יוהה", "ההוי"],
  },
  {
    name: "אהיה",
    meaning: "שם ההויה",
    gematria: 21,
    gate: 2,
    description: "שם המורה על ההתהוות וההתגלות",
    combinations: ["אהיה", "איהה", "אההי", "ההאי"],
  },
  {
    name: "אדני",
    meaning: "שם האדנות",
    gematria: 65,
    gate: 3,
    description: "שם המורה על ההנהגה והמלכות",
    combinations: ["אדני", "אדין", "אניד", "דניא"],
  },
];

const termsData = [
  {
    term: "אצילות",
    definition: "העולם הראשון מארבעת העולמות, עולם האלוקות הטהור",
    category: "עולמות",
    source: "עץ חיים",
  },
  {
    term: "בריאה",
    definition: "העולם השני מארבעת העולמות, עולם הכסא והמלאכים העליונים",
    category: "עולמות",
    source: "עץ חיים",
  },
  {
    term: "יצירה",
    definition: "העולם השלישי מארבעת העולמות, עולם המלאכים",
    category: "עולמות",
    source: "עץ חיים",
  },
  {
    term: "עשיה",
    definition: "העולם הרביעי והתחתון, עולם הגשמי",
    category: "עולמות",
    source: "עץ חיים",
  },
];

const sourcesData = [
  {
    title: "שערי אורה",
    author: "רבי יוסף גיקטליה",
    year: "1248",
    description: "ספר יסוד בחכמת הקבלה העוסק בשמות הקודש ומשמעותם",
    gates: 39,
  },
  {
    title: "פרדס רימונים",
    author: "רבי משה קורדובירו",
    year: "1548",
    description: "חיבור מקיף בתורת הקבלה",
    gates: 32,
  },
  {
    title: "עץ חיים",
    author: "רבי חיים ויטאל",
    year: "1573",
    description: 'ספר יסוד בקבלת האר"י',
    gates: 50,
  },
];

// אתחול הדף
document.addEventListener("DOMContentLoaded", function () {
  // טעינת טבלת השמות
  loadNamesTable();

  // טעינת טבלת הגימטריה
  loadGematriaTable();

  // טעינת רשימת המושגים
  loadTermsList();

  // טעינת רשימת המקורות
  loadSourcesList();

  // עדכון סטטיסטיקות
  updateStatistics();

  // אתחול חיפוש
  initializeSearch();

  // הוספת מאזיני אירועים
  initializeEventListeners();
});

// פונקציות טעינת תוכן
function loadNamesTable() {
  const tbody = document.querySelector("#names-table table tbody");
  if (!tbody) return;

  tbody.innerHTML = namesData
    .map(
      (name) => `
    <tr>
      <td class="holy-name">${name.name}</td>
      <td>${name.meaning}</td>
      <td>${name.gematria}</td>
      <td>${name.gate}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" 
                onclick="showNameDetails('${name.name}')">
          <i class="bi bi-info-circle"></i>
          פרטים
        </button>
      </td>
    </tr>
  `
    )
    .join("");
}

function loadGematriaTable() {
  const gematriaValues = {
    א: 1,
    ב: 2,
    ג: 3,
    ד: 4,
    ה: 5,
    ו: 6,
    ז: 7,
    ח: 8,
    ט: 9,
    י: 10,
    כ: 20,
    ל: 30,
    מ: 40,
    נ: 50,
    ס: 60,
    ע: 70,
    פ: 80,
    צ: 90,
    ק: 100,
    ר: 200,
    ש: 300,
    ת: 400,
  };

  const tbody = document.querySelector("#gematria table tbody");
  if (!tbody) return;

  let html = "";
  let counter = 0;

  for (const [letter, value] of Object.entries(gematriaValues)) {
    if (counter % 4 === 0) {
      html += "<tr>";
    }

    html += `
      <td class="text-center">${letter}</td>
      <td class="text-center">${value}</td>
    `;

    if (counter % 4 === 3) {
      html += "</tr>";
    }

    counter++;
  }

  if (counter % 4 !== 0) {
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function loadTermsList() {
  const termsList = document.getElementById("termsList");
  if (!termsList) return;

  termsList.innerHTML = termsData
    .map(
      (term) => `
    <div class="list-group-item">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h5 class="mb-1">${term.term}</h5>
          <p class="mb-1">${term.definition}</p>
          <small class="text-muted">מקור: ${term.source}</small>
        </div>
        <span class="badge bg-primary rounded-pill">${term.category}</span>
      </div>
    </div>
  `
    )
    .join("");
}

function loadSourcesList() {
  const sourcesAccordion = document.getElementById("referencesAccordion");
  if (!sourcesAccordion) return;

  sourcesAccordion.innerHTML = sourcesData
    .map(
      (source, index) => `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button ${
          index === 0 ? "" : "collapsed"
        }" type="button" 
                data-bs-toggle="collapse" data-bs-target="#source${index}">
          ${source.title} - ${source.author}
        </button>
      </h2>
      <div id="source${index}" class="accordion-collapse collapse ${
        index === 0 ? "show" : ""
      }"
           data-bs-parent="#referencesAccordion">
        <div class="accordion-body">
          <p>${source.description}</p>
          <div class="source-details">
            <p><strong>שנת חיבור:</strong> ${source.year}</p>
            <p><strong>מספר שערים:</strong> ${source.gates}</p>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// פונקציות חיפוש
function calculateGematriaValue() {
  const input = document.getElementById("gematriaInput").value;
  const result = calculateGematria(input);

  const resultDiv = document.getElementById("gematriaResult");
  const valueSpan = document.getElementById("gematriaValue");

  valueSpan.textContent = result;
  resultDiv.classList.remove("d-none");

  // חיפוש שמות בעלי אותה גימטריה
  const matchingNames = namesData.filter((name) => name.gematria === result);
  if (matchingNames.length > 0) {
    resultDiv.innerHTML += `
      <div class="mt-2">
        <strong>שמות בעלי אותה גימטריה:</strong>
        <ul>
          ${matchingNames
            .map((name) => `<li>${name.name} - ${name.meaning}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }
}

function performAdvancedSearch() {
  const category = document.getElementById("searchCategory").value;
  const sortBy = document.getElementById("searchSort").value;
  const searchTerm = document
    .querySelector('input[type="search"]')
    .value.toLowerCase();

  let results;
  switch (category) {
    case "names":
      results = namesData.filter(
        (name) =>
          name.name.includes(searchTerm) || name.meaning.includes(searchTerm)
      );
      if (sortBy === "gematria") {
        results.sort((a, b) => a.gematria - b.gematria);
      } else if (sortBy === "alphabetical") {
        results.sort((a, b) => a.name.localeCompare(b.name, "he"));
      }
      break;

    case "terms":
      results = termsData.filter(
        (term) =>
          term.term.includes(searchTerm) || term.definition.includes(searchTerm)
      );
      if (sortBy === "alphabetical") {
        results.sort((a, b) => a.term.localeCompare(b.term, "he"));
      }
      break;

    case "sources":
      results = sourcesData.filter(
        (source) =>
          source.title.includes(searchTerm) ||
          source.author.includes(searchTerm)
      );
      if (sortBy === "alphabetical") {
        results.sort((a, b) => a.title.localeCompare(b.title, "he"));
      }
      break;

    default:
      // חיפוש בכל הקטגוריות
      results = [
        ...namesData.filter(
          (name) =>
            name.name.includes(searchTerm) || name.meaning.includes(searchTerm)
        ),
        ...termsData.filter(
          (term) =>
            term.term.includes(searchTerm) ||
            term.definition.includes(searchTerm)
        ),
        ...sourcesData.filter(
          (source) =>
            source.title.includes(searchTerm) ||
            source.author.includes(searchTerm)
        ),
      ];
  }

  displaySearchResults(results, category);
}

function displaySearchResults(results, category) {
  const resultsContainer = document.createElement("div");
  resultsContainer.className = "search-results mt-3";

  if (results.length === 0) {
    resultsContainer.innerHTML =
      "<div class='alert alert-info'>לא נמצאו תוצאות</div>";
  } else {
    resultsContainer.innerHTML = `
      <h4>נמצאו ${results.length} תוצאות:</h4>
      <div class="list-group">
        ${results
          .map(
            (result) => `
          <div class="list-group-item">
            <h5 class="mb-1">${result.name || result.term || result.title}</h5>
            <p class="mb-1">${
              result.meaning || result.definition || result.description
            }</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  const existingResults = document.querySelector(".search-results");
  if (existingResults) {
    existingResults.remove();
  }

  document.querySelector(".card-body").appendChild(resultsContainer);
}

// פונקציות עזר
function updateStatistics() {
  document.getElementById("namesCount").textContent = namesData.length;
  document.getElementById("termsCount").textContent = termsData.length;
  document.getElementById("sourcesCount").textContent = sourcesData.length;
}

function showNameDetails(name) {
  const nameData = namesData.find((n) => n.name === name);
  if (!nameData) return;

  const modal = new bootstrap.Modal(
    document.getElementById("nameDetailsModal")
  );
  document.getElementById("nameDetailsTitle").textContent = nameData.name;
  document.getElementById("nameDetailsBody").innerHTML = `
    <p><strong>משמעות:</strong> ${nameData.meaning}</p>
    <p><strong>גימטריה:</strong> ${nameData.gematria}</p>
    <p><strong>שער:</strong> ${nameData.gate}</p>
    <p><strong>תיאור:</strong> ${nameData.description}</p>
    <div class="mt-3">
      <h5>צירופים:</h5>
      <div class="combinations-grid">
        ${nameData.combinations
          .map(
            (comb) => `
          <div class="combination-item">${comb}</div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  modal.show();
}

// מאזיני אירועים
function initializeEventListeners() {
  // חיפוש במילון מושגים
  const dictionarySearch = document.getElementById("dictionarySearch");
  if (dictionarySearch) {
    dictionarySearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredTerms = termsData.filter(
        (term) =>
          term.term.toLowerCase().includes(searchTerm) ||
          term.definition.toLowerCase().includes(searchTerm)
      );

      const termsList = document.getElementById("termsList");
      loadTermsList(filteredTerms);
    });
  }

  // שמירת הלשונית הפעילה
  const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabElements.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (event) {
      localStorage.setItem("activeTableTab", event.target.getAttribute("href"));
    });
  });

  // שחזור הלשונית האחרונה
  const activeTab = localStorage.getItem("activeTableTab");
  if (activeTab) {
    const tab = document.querySelector(`[href="${activeTab}"]`);
    if (tab) {
      new bootstrap.Tab(tab).show();
    }
  }
}

// אתחול חיפוש
function initializeSearch() {
  const searchForm = document.querySelector("form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      performAdvancedSearch();
    });
  }
}

// טעינת נתונים נוספים בעת גלילה
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // כאן אפשר להוסיף טעינת נתונים נוספים
  }
});
