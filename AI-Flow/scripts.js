// פונקציות עזר
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// אתחול האפליקציה
document.addEventListener("DOMContentLoaded", () => {
  initializeAnalysis();
  initializeSearch();
  initializeForms();
  initializeDropdown();
});

// אתחול ניתוח הטקסטים
function initializeAnalysis() {
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.addEventListener(
      "input",
      debounce(() => {
        analyzeText(textarea);
      }, 500)
    );
  });
}

// פונקציית ניתוח טקסט
function analyzeText(textarea) {
  const method = textarea.closest(".card-title").textContent.trim();
  const step = textarea
    .closest(".method-step")
    .querySelector("h5")
    .textContent.trim();
  const text = textarea.value;

  if (text.length < 10) {
    return;
  }

  // ניתוח לפי השיטה המתאימה
  let analysis = "";
  switch (method) {
    case 'פרד"ס':
      analysis = analyzePardes(text, step);
      break;
    case "אביע עולמות":
      analysis = analyzeAbiya(text, step);
      break;
    case "ארבעת היסודות":
      analysis = analyzeElements(text, step);
      break;
    case "עשר הספירות":
      analysis = analyzeSefirot(text, step);
      break;
  }

  // הצגת התוצאות
  displayResults(method, step, analysis);
}

// פונקציות ניתוח ספציפיות
function analyzePardes(text, step) {
  // ניתוח לפי פרד"ס
  const analysis = {
    פשט: "ניתוח פשט: " + text.substring(0, 100),
    רמז: "ניתוח רמז: " + text.substring(0, 100),
    דרש: "ניתוח דרש: " + text.substring(0, 100),
    סוד: "ניתוח סוד: " + text.substring(0, 100),
  };
  return analysis[step] || "";
}

function analyzeAbiya(text, step) {
  // ניתוח לפי אביע עולמות
  const analysis = {
    אצילות: "ניתוח אצילות: " + text.substring(0, 100),
    בריאה: "ניתוח בריאה: " + text.substring(0, 100),
    יצירה: "ניתוח יצירה: " + text.substring(0, 100),
    עשייה: "ניתוח עשייה: " + text.substring(0, 100),
  };
  return analysis[step] || "";
}

function analyzeElements(text, step) {
  // ניתוח לפי ארבעת היסודות
  const analysis = {
    רוח: "ניתוח רוח: " + text.substring(0, 100),
    אש: "ניתוח אש: " + text.substring(0, 100),
    מים: "ניתוח מים: " + text.substring(0, 100),
    אדמה: "ניתוח אדמה: " + text.substring(0, 100),
  };
  return analysis[step] || "";
}

function analyzeSefirot(text, step) {
  // ניתוח לפי עשר הספירות
  const analysis = {
    חכמה: "ניתוח חכמה: " + text.substring(0, 100),
    בינה: "ניתוח בינה: " + text.substring(0, 100),
    חסד: "ניתוח חסד: " + text.substring(0, 100),
    גבורה: "ניתוח גבורה: " + text.substring(0, 100),
    תפארת: "ניתוח תפארת: " + text.substring(0, 100),
    נצח: "ניתוח נצח: " + text.substring(0, 100),
    הוד: "ניתוח הוד: " + text.substring(0, 100),
    יסוד: "ניתוח יסוד: " + text.substring(0, 100),
    מלכות: "ניתוח מלכות: " + text.substring(0, 100),
  };
  return analysis[step] || "";
}

// הצגת תוצאות
function displayResults(method, step, analysis) {
  const resultsContainer = document.getElementById("analysis-results");
  const resultElement = document.createElement("div");
  resultElement.className = "result-item mb-3";
  resultElement.innerHTML = `
        <h5>${method} - ${step}</h5>
        <p>${analysis}</p>
    `;
  resultsContainer.appendChild(resultElement);
}

// אתחול חיפוש
function initializeSearch() {
  const searchForm = document.querySelector("form");
  const searchInput = searchForm.querySelector('input[type="search"]');

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length >= 2) {
      searchResults(searchTerm);
    }
  });
}

// חיפוש תוצאות
function searchResults(term) {
  const results = document.querySelectorAll(".result-item");
  results.forEach((result) => {
    const text = result.textContent.toLowerCase();
    if (text.includes(term.toLowerCase())) {
      result.style.display = "block";
    } else {
      result.style.display = "none";
    }
  });
}

// אתחול טפסים
function initializeForms() {
  const contactForm = document.querySelector("footer button");
  if (contactForm) {
    contactForm.addEventListener("click", () => {
      showNotification("טופס יצירת קשר נפתח", "info");
    });
  }
}

// הצגת התראות
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// אתחול התפריט הנפתח
function initializeDropdown() {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        // סגירת התפריט הנפתח
        const dropdownMenu = document.querySelector(".dropdown-menu");
        const bsDropdown = bootstrap.Dropdown.getInstance(
          document.getElementById("methodsDropdown")
        );
        if (bsDropdown) {
          bsDropdown.hide();
        }
      }
    });
  });
}
