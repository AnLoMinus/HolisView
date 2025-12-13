// נתונים
const guideData = {
  sections: [
    {
      id: "intro",
      title: "מבוא ויסודות",
      icon: "stars",
      subsections: [
        {
          id: "basic-intro",
          title: "מבואות בסיסיים",
          articles: [
            {
              id: "connect-39-lights",
              title: "איך אפשר להתחבר ל-39 אורות בחיי היום-יום?",
              icon: "sparkle",
              completed: false,
            },
            {
              id: "tal-orot",
              title: "טל אורות – 39 שערי האורה וגילוי האור האלוקי",
              icon: "sun",
              completed: false,
            },
          ],
        },
        {
          id: "connections",
          title: "חיבורים והקבלות",
          articles: [
            {
              id: "shabbat-connection",
              title: "חיבור 39 שערי האורה אל מול 39 מלאכות השבת",
              icon: "sparkle",
              completed: false,
            },
            {
              id: "klipot",
              title: "39 שערי האורה מול 39 קליפות – בירור הקדושה מהטומאה",
              icon: "fire",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: "etz-chaim",
      title: "העמקה בתורת עץ חיים",
      icon: "tree",
      subsections: [
        {
          id: "etz-chaim-foundations",
          title: "יסודות עץ חיים",
          articles: [
            {
              id: "deep-learning",
              title:
                'לימוד עומק – "עץ חיים" לרבי חיים ויטאל על 39 שערי האורה ותיקון החטא הקדמון',
              icon: "scroll",
              completed: false,
            },
            {
              id: "deep-dive",
              title: 'ממשיכים לצלול עמוק – "עץ חיים", גלגולים ותיקון הנשמות!',
              icon: "fire",
              completed: false,
            },
          ],
        },
        {
          id: "sefirot-worlds",
          title: "העמקה בספירות ועולמות",
          articles: [
            {
              id: "sefirot-perspective",
              title: "העמקה נוספת – 39 שערי האורה בראי הספירות והעולמות",
              icon: "fire",
              completed: false,
            },
          ],
        },
      ],
    },
  ],
};

// אתחול הדף
document.addEventListener("DOMContentLoaded", function () {
  // טעינת התקדמות שמורה
  loadProgress();

  // הוספת מאזיני אירועים
  initializeEventListeners();

  // עדכון מונה הנושאים
  updateTopicsCounter();
});

// פונקציות טעינת נתונים
function loadProgress() {
  const progress = JSON.parse(localStorage.getItem("guideProgress") || "{}");

  // עדכון סימוני השלמה
  document.querySelectorAll(".list-group-item").forEach((item) => {
    const articleId = item.getAttribute("data-article-id");
    if (progress[articleId]) {
      item.classList.add("completed");
      const icon = item.querySelector("i.bi-check-circle");
      if (icon) {
        icon.classList.remove("d-none");
      }
    }
  });

  // עדכון סרגל התקדמות
  updateProgressBar();
}

function updateProgressBar() {
  const progress = JSON.parse(localStorage.getItem("guideProgress") || "{}");
  const totalArticles = document.querySelectorAll(".list-group-item").length;
  const completedArticles = Object.keys(progress).length;

  const percentage = (completedArticles / totalArticles) * 100;
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", percentage);
  }

  // עדכון מונה נושאים שהושלמו
  document.getElementById(
    "completedTopics"
  ).textContent = `${completedArticles}/${totalArticles}`;
}

// מאזיני אירועים
function initializeEventListeners() {
  // מעקב אחר לחיצות על פריטי תוכן
  document.querySelectorAll(".list-group-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const articleId = this.getAttribute("data-article-id");
      toggleArticleCompletion(articleId, this);
    });
  });

  // כפתור חזרה למעלה
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
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
  }
}

// פונקציות עזר
function toggleArticleCompletion(articleId, element) {
  const progress = JSON.parse(localStorage.getItem("guideProgress") || "{}");

  if (progress[articleId]) {
    delete progress[articleId];
    element.classList.remove("completed");
    const icon = element.querySelector("i.bi-check-circle");
    if (icon) {
      icon.classList.add("d-none");
    }
  } else {
    progress[articleId] = true;
    element.classList.add("completed");
    const icon = element.querySelector("i.bi-check-circle");
    if (icon) {
      icon.classList.remove("d-none");
    }
  }

  localStorage.setItem("guideProgress", JSON.stringify(progress));
  updateProgressBar();
}

function updateTopicsCounter() {
  const totalTopics = document.querySelectorAll(".list-group-item").length;
  document.getElementById("completedTopics").textContent = `0/${totalTopics}`;
}

// פונקציות ניווט
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// הודעות מערכת
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
  }, 3000);
}
