class DateTimeWidget {
  constructor() {
    this.hebrewMonths = {
      1: "תשרי",
      2: "חשון",
      3: "כסלו",
      4: "טבת",
      5: "שבט",
      6: "אדר",
      7: "ניסן",
      8: "אייר",
      9: "סיון",
      10: "תמוז",
      11: "אב",
      12: "אלול",
    };

    // Add weekly portions data
    this.weeklyPortions = [
      "בראשית",
      "נח",
      "לך לך",
      "וירא",
      "חיי שרה",
      "תולדות",
      "ויצא",
      "וישלח",
      "וישב",
      "מקץ",
      "ויגש",
      "ויחי",
      "שמות",
      "וארא",
      "בא",
      "בשלח",
      "יתרו",
      "משפטים",
      "תרומה",
      "תצוה",
      "כי תשא",
      "ויקהל",
      "פקודי",
      "ויקרא",
      "צו",
      "שמיני",
      "תזריע",
      "מצורע",
      "אחרי מות",
      "קדושים",
      "אמור",
      "בהר",
      "בחוקותי",
      "במדבר",
      "נשא",
      "בהעלותך",
      "שלח",
      "קרח",
      "חקת",
      "בלק",
      "פינחס",
      "מטות",
      "מסעי",
      "דברים",
      "ואתחנן",
      "עקב",
      "ראה",
      "שופטים",
      "כי תצא",
      "כי תבוא",
      "נצבים",
      "וילך",
      "האזינו",
      "וזאת הברכה",
    ];

    this.init();
  }

  init() {
    // Create widget container
    const widget = document.createElement("div");
    widget.className = "datetime-widget";

    // Create sections
    const dateSection = this.createSection("date-section", "📅", "תאריך:", "");
    const timeSection = this.createSection("time-section", "⏰", "שעה:", "");
    const hebrewDateSection = this.createSection(
      "hebrew-date-section",
      "✡️",
      "תאריך עברי:",
      ""
    );
    const parashaSection = this.createSection(
      "parasha-section",
      "📖",
      "פרשת השבוע:",
      ""
    );

    // Add dividers
    const divider1 = this.createDivider();
    const divider2 = this.createDivider();
    const divider3 = this.createDivider();

    // Assemble widget
    widget.appendChild(dateSection);
    widget.appendChild(divider1);
    widget.appendChild(timeSection);
    widget.appendChild(divider2);
    widget.appendChild(hebrewDateSection);
    widget.appendChild(divider3);
    widget.appendChild(parashaSection);

    // Insert widget before the nav-bar
    const navBar = document.querySelector(".nav-bar");
    navBar.parentNode.insertBefore(widget, navBar);

    // Start updates
    this.updateDateTime();
    setInterval(async () => await this.updateDateTime(), 1000);

    // Add scroll event listener for shadow effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        widget.style.boxShadow = "0 2px 15px rgba(31, 38, 135, 0.15)";
      } else {
        widget.style.boxShadow = "0 2px 10px rgba(31, 38, 135, 0.1)";
      }
    });
  }

  createSection(className, icon, label, initialValue) {
    const section = document.createElement("div");
    section.className = className;

    const iconSpan = document.createElement("span");
    iconSpan.className = "icon";
    iconSpan.textContent = icon;

    const labelSpan = document.createElement("span");
    labelSpan.className = "label";
    labelSpan.textContent = label;

    const valueSpan = document.createElement("span");
    valueSpan.className = "value";
    valueSpan.textContent = initialValue;

    section.appendChild(iconSpan);
    section.appendChild(labelSpan);
    section.appendChild(valueSpan);

    return section;
  }

  createDivider() {
    const divider = document.createElement("div");
    divider.className = "divider";
    return divider;
  }

  async updateDateTime() {
    const now = new Date();
    const hour = now.getHours();

    // קביעת האייקון והטקסט לפי שעות היום
    let timeEmoji = "";
    let timeOfDay = "";
    if (hour >= 5 && hour < 12) {
      timeEmoji = "🌅";
      timeOfDay = "בוקר טוב";
    } else if (hour >= 12 && hour < 17) {
      timeEmoji = "☀️";
      timeOfDay = "צהריים טובים";
    } else if (hour >= 17 && hour < 20) {
      timeEmoji = "🌇";
      timeOfDay = "ערב טוב";
    } else {
      timeEmoji = "🌙";
      timeOfDay = "לילה טוב";
    }

    // Update Gregorian date with day of the week
    const dateValue = now.toLocaleDateString("he-IL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.querySelector(".date-section .value").textContent = dateValue;

    // Update time with emoji
    const timeValue = now.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    document.querySelector(
      ".time-section .value"
    ).textContent = `${timeValue} ${timeEmoji} ${timeOfDay}`;

    // Update Hebrew date
    const hebrewDate = this.getHebrewDate();
    document.querySelector(".hebrew-date-section .value").textContent =
      hebrewDate;

    // Update Parasha
    const parasha = await this.getCurrentParasha();
    document.querySelector(".parasha-section .value").textContent = parasha;
  }

  getHebrewDate() {
    // This is a simplified version. For production, you should use a proper Hebrew calendar library
    const now = new Date();
    const hebcal = new Intl.DateTimeFormat("he-u-ca-hebrew", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(now);

    return hebcal;
  }

  async getCurrentParasha() {
    try {
      const response = await fetch(
        "https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=now&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&M=on&s=on"
      );
      const data = await response.json();

      // Find the next or current parasha
      const today = new Date();
      const parasha = data.items.find(
        (item) => item.category === "parashat" && new Date(item.date) >= today
      );

      if (!parasha) return "טוען...";

      // מציאת הספר לפי שם הפרשה
      const parashaName = parasha.hebrew;
      let bookName = "";

      if (this.weeklyPortions.indexOf(parashaName) <= 11) {
        bookName = "בראשית";
      } else if (this.weeklyPortions.indexOf(parashaName) <= 22) {
        bookName = "שמות";
      } else if (this.weeklyPortions.indexOf(parashaName) <= 32) {
        bookName = "ויקרא";
      } else if (this.weeklyPortions.indexOf(parashaName) <= 42) {
        bookName = "במדבר";
      } else {
        bookName = "דברים";
      }

      return `${parashaName} (${bookName})`;
    } catch (error) {
      console.error("Error fetching parasha:", error);
      return "לא זמין";
    }
  }
}

// Initialize widget when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DateTimeWidget();
});
