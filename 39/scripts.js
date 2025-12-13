// אתחול רכיבי Bootstrap
document.addEventListener("DOMContentLoaded", function () {
  // אתחול טולטיפים
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // אתחול פופוברים
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // הצגת התאריך העברי
  displayHebrewDate();

  // אתחול טאבים עם זכרון
  initTabsWithMemory();

  // אתחול גלילה חלקה
  initSmoothScroll();

  // השוואת גובה כרטיסים
  equalizeCardHeights();

  // אתחול טופס חיפוש
  initSearchForm();

  // טעינת העדפות משתמש
  loadUserPreferences();
});

// פונקציה להצגת התאריך העברי
function displayHebrewDate() {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    calendar: "hebrew",
    numberingSystem: "hebrew",
  };
  const hebrewDate = date.toLocaleDateString("he-IL", options);
  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    dateElement.textContent = hebrewDate;
  }
}

// פונקציה לאתחול טאבים עם זכרון
function initTabsWithMemory() {
  const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabElements.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (event) {
      localStorage.setItem("activeTab", event.target.getAttribute("href"));
    });
  });

  const activeTab = localStorage.getItem("activeTab");
  if (activeTab) {
    const tab = document.querySelector(`[href="${activeTab}"]`);
    if (tab) {
      new bootstrap.Tab(tab).show();
    }
  }
}

// פונקציה לאתחול גלילה חלקה
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// פונקציה להשוואת גובה כרטיסים
function equalizeCardHeights() {
  const cardRows = document.querySelectorAll(".row");
  cardRows.forEach((row) => {
    const cards = row.querySelectorAll(".card");
    let maxHeight = 0;
    cards.forEach((card) => {
      card.style.height = "auto";
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    cards.forEach((card) => {
      card.style.height = maxHeight + "px";
    });
  });
}

// פונקציה לאתחול טופס חיפוש
function initSearchForm() {
  const searchForm = document.querySelector("form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchTerm = this.querySelector('input[type="search"]').value;
      performSearch(searchTerm);
    });
  }
}

// פונקציה לביצוע חיפוש
function performSearch(term) {
  // כאן יש להוסיף את לוגיקת החיפוש
  showMessage("מבצע חיפוש: " + term, "info");
}

// פונקציה להצגת הודעות
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

// פונקציות לניהול העדפות משתמש
function saveUserPreferences(preferences) {
  localStorage.setItem("userPreferences", JSON.stringify(preferences));
  showMessage("העדפות נשמרו בהצלחה", "success");
}

function loadUserPreferences() {
  const preferences = localStorage.getItem("userPreferences");
  if (preferences) {
    return JSON.parse(preferences);
  }
  return {};
}

// פונקציה לחישוב גימטריה
function calculateGematria(word) {
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
    ך: 20,
    ם: 40,
    ן: 50,
    ף: 80,
    ץ: 90,
  };

  return word
    .split("")
    .reduce((sum, char) => sum + (gematriaValues[char] || 0), 0);
}

// פונקציה להדפסת עמוד
function printPage() {
  window.print();
}

// האזנה לשינויי גודל חלון
window.addEventListener("resize", debounce(equalizeCardHeights, 250));

// פונקציית עזר להשהיית ביצוע פונקציות
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

// ניהול מועדפים
function toggleBookmark(element, itemId) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const index = bookmarks.indexOf(itemId);

  if (index === -1) {
    bookmarks.push(itemId);
    element.classList.add("active");
    showMessage("נוסף למועדפים", "success");
  } else {
    bookmarks.splice(index, 1);
    element.classList.remove("active");
    showMessage("הוסר מהמועדפים", "info");
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// ניהול התקדמות בלימוד
function updateProgress(chapterId, isCompleted) {
  const progress = JSON.parse(localStorage.getItem("learningProgress") || "{}");
  progress[chapterId] = isCompleted;
  localStorage.setItem("learningProgress", JSON.stringify(progress));

  updateProgressUI();
  showMessage(isCompleted ? "השיעור סומן כהושלם" : "סימון ההשלמה הוסר", "info");
}

// עדכון ממשק המשתמש של ההתקדמות
function updateProgressUI() {
  const progress = JSON.parse(localStorage.getItem("learningProgress") || "{}");
  const totalChapters = document.querySelectorAll(".chapter").length;
  const completedChapters = Object.values(progress).filter(Boolean).length;

  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    const percentage = (completedChapters / totalChapters) * 100;
    progressBar.style.width = percentage + "%";
    progressBar.setAttribute("aria-valuenow", percentage);
    progressBar.textContent = Math.round(percentage) + "%";
  }
}
