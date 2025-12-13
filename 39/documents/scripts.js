const tableData = [
  {
    number: 1,
    gate: "כתר עליון",
    gateMeaning: "מקור השפע",
    work: "זורע",
    workMeaning: "התחלה והכנה",
  },
  // ... המשך הנתונים יכולים להתווסף כאן
];

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("tableBody");

  // פונקציה ליצירת שורת טבלה
  function createTableRow(data) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${data.number}</td>
            <td>${data.gate}</td>
            <td>${data.gateMeaning}</td>
            <td>${data.work}</td>
            <td>${data.workMeaning}</td>
        `;
    return row;
  }

  // הוספת הנתונים לטבלה
  tableData.forEach((data) => {
    tableBody.appendChild(createTableRow(data));
  });
});

// יצירת תפריט צד
function createSideMenu() {
  const menuButton = document.createElement("button");
  menuButton.className = "menu-button";
  menuButton.innerHTML = "☰ תפריט";
  document.body.appendChild(menuButton);

  const sideMenu = document.createElement("div");
  sideMenu.className = "side-menu";
  sideMenu.innerHTML = `
        <div class="menu-header">
            <button class="close-menu">✕</button>
            <h2>תפריט ראשי</h2>
        </div>
        <div class="menu-content">
            <div class="menu-section">
                <h3>דפים ראשיים</h3>
                <a href="index.html" class="menu-link">🏠 דף הבית</a>
                <a href="documents.html" class="menu-link">📚 מאגר המסמכים</a>
            </div>
            
            <div class="menu-section">
                <h3>טבלאות ומבנה</h3>
                <a href="gates-and-works-table.html" class="menu-link">📊 טבלת השערים והמלאכות</a>
                <a href="39-gates-division.html" class="menu-link">🔄 חלוקת 39 השערים</a>
            </div>

            <div class="menu-section">
                <h3>חלק א׳: מבוא ויסודות</h3>
                <a href="#" class="menu-link">📝 מבוא כללי</a>
                <a href="#" class="menu-link">🔗 קשרים והקבלות</a>
            </div>

            <div class="menu-section">
                <h3>חלק ב׳: עץ חיים</h3>
                <a href="#" class="menu-link">🌳 יסודות עץ החיים</a>
                <a href="#" class="menu-link">💫 העמקה בספירות</a>
            </div>

            <div class="menu-section">
                <h3>חלק ג׳: גלגולי נשמות</h3>
                <a href="#" class="menu-link">👥 תורת הגלגול</a>
                <a href="#" class="menu-link">✨ תיקון הנשמה</a>
            </div>

            <div class="menu-section">
                <h3>חלק ד׳: טבלאות וחלוקות</h3>
                <a href="gates-and-works-table.html" class="menu-link">📊 טבלת 39 השערים</a>
                <a href="39-gates-division.html" class="menu-link">🔄 שלושת השלבים</a>
            </div>

            <div class="menu-section">
                <h3>כלים מעשיים</h3>
                <a href="#" class="menu-link">📝 יומן התבוננות</a>
                <a href="#" class="menu-link">🎯 מעקב התקדמות</a>
                <a href="#" class="menu-link">💡 תרגילים מעשיים</a>
            </div>
        </div>
    `;
  document.body.appendChild(sideMenu);

  // פתיחת וסגירת התפריט
  menuButton.addEventListener("click", () => {
    sideMenu.classList.add("open");
  });

  const closeButton = sideMenu.querySelector(".close-menu");
  closeButton.addEventListener("click", () => {
    sideMenu.classList.remove("open");
  });

  // סגירת התפריט בלחיצה מחוץ לו
  document.addEventListener("click", (event) => {
    if (
      !sideMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      sideMenu.classList.remove("open");
    }
  });
}

// הפעלת התפריט כשהדף נטען
document.addEventListener("DOMContentLoaded", createSideMenu);
