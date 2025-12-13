document.addEventListener("DOMContentLoaded", function () {
  // הצגת תאריך נוכחי בפורמט עברי
  const currentDateElement = document.getElementById("currentDate");
  if (currentDateElement) {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "hebrew",
      numberingSystem: "hebrew",
    };
    currentDateElement.textContent = date.toLocaleDateString("he-IL", options);
  }

  // ניהול הערות אישיות
  const notesTextarea = document.querySelector(".notes-section textarea");
  const saveNotesButton = document.querySelector(".notes-section button");

  if (notesTextarea && saveNotesButton) {
    // טעינת הערות שמורות
    const savedNotes = localStorage.getItem("studyNotes");
    if (savedNotes) {
      notesTextarea.value = savedNotes;
    }

    // שמירת הערות
    saveNotesButton.addEventListener("click", function () {
      localStorage.setItem("studyNotes", notesTextarea.value);
      showMessage("ההערות נשמרו בהצלחה", "success");
    });
  }

  // מעקב אחר התקדמות
  function updateProgress() {
    const progress = {
      completedLessons: localStorage.getItem("completedLessons") || 0,
      weeklyStudyTime: localStorage.getItem("weeklyStudyTime") || 0,
    };

    const completedBar = document.querySelector(".progress-bar.bg-success");
    const weeklyBar = document.querySelector(".progress-bar.bg-info");

    if (completedBar) {
      completedBar.style.width = `${progress.completedLessons}%`;
    }
    if (weeklyBar) {
      weeklyBar.style.width = `${progress.weeklyStudyTime}%`;
    }
  }

  // עדכון התקדמות בטעינת הדף
  updateProgress();

  // ניהול לשוניות לימוד
  const studyTabs = document.getElementById("studyTabs");
  if (studyTabs) {
    studyTabs.addEventListener("shown.bs.tab", function (event) {
      const activeTab = event.target
        .getAttribute("data-bs-target")
        .replace("#", "");
      localStorage.setItem("lastActiveTab", activeTab);
    });

    // שחזור לשונית אחרונה
    const lastTab = localStorage.getItem("lastActiveTab");
    if (lastTab) {
      const tab = new bootstrap.Tab(
        document.querySelector(`[data-bs-target="#${lastTab}"]`)
      );
      tab.show();
    }
  }

  // ניהול סימניות
  const bookmarkLinks = document.querySelectorAll(".list-group-item-action");
  bookmarkLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const bookmarkTitle = this.textContent.trim();

      // שמירת סימניה
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      if (!bookmarks.includes(bookmarkTitle)) {
        bookmarks.push(bookmarkTitle);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        showMessage("הסימניה נוספה בהצלחה", "success");
      }
    });
  });

  // מחשבון גימטריה
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
      .reduce((sum, letter) => sum + (gematriaValues[letter] || 0), 0);
  }

  // הוספת אירועי לחיצה לפרקי לימוד
  const studyChapters = document.querySelectorAll(".list-group-item");
  studyChapters.forEach((chapter) => {
    chapter.addEventListener("click", function () {
      // סימון פרק כהושלם
      this.classList.toggle("completed");

      // עדכון התקדמות
      const completedChapters = document.querySelectorAll(
        ".list-group-item.completed"
      ).length;
      const totalChapters =
        document.querySelectorAll(".list-group-item").length;
      const progress = (completedChapters / totalChapters) * 100;

      localStorage.setItem("completedLessons", progress);
      updateProgress();
    });
  });
});
