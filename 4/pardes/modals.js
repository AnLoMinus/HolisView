document.addEventListener("DOMContentLoaded", function () {
  const modalContainer = document.getElementById("modal-container");
  const learnMoreButtons = document.querySelectorAll(".learn-more");

  // תוכן המודלים
  const modalContents = {
    פשט: {
      title: "פשט - הרמה הפשוטה",
      content: `
                <h2>פשט - הרמה הפשוטה</h2>
                <p>הרמה הראשונה והבסיסית ביותר בפרד"ס היא הפשט. ברמה זו אנו מבינים את הטקסט כפשוטו, על פי המשמעות המילולית והגלויה שלו.</p>
                <h3>מאפיינים עיקריים:</h3>
                <ul>
                    <li>הבנה מילולית של הטקסט</li>
                    <li>פירוש על פי פשוטו של מקרא</li>
                    <li>התמקדות במשמעות הגלויה</li>
                </ul>
            `,
    },
    רמז: {
      title: "רמז - הרמה האלגורית",
      content: `
                <h2>רמז - הרמה האלגורית</h2>
                <p>הרמה השנייה בפרד"ס היא הרמז. ברמה זו אנו מחפשים רמזים וסימנים בטקסט שמצביעים על משמעויות עמוקות יותר.</p>
                <h3>מאפיינים עיקריים:</h3>
                <ul>
                    <li>חיפוש רמזים וסימנים בטקסט</li>
                    <li>פירוש אלגורי</li>
                    <li>הבנת המשמעויות הנסתרות</li>
                </ul>
            `,
    },
    דרש: {
      title: "דרש - הרמה הדרשנית",
      content: `
                <h2>דרש - הרמה הדרשנית</h2>
                <p>הרמה השלישית בפרד"ס היא הדרש. ברמה זו אנו מפרשים את הטקסט בצורה דרשנית, תוך שילוב של מוסר והלכה.</p>
                <h3>מאפיינים עיקריים:</h3>
                <ul>
                    <li>פירוש דרשני</li>
                    <li>שילוב של מוסר והלכה</li>
                    <li>הבאת לימודים ומדרשים</li>
                </ul>
            `,
    },
    סוד: {
      title: "סוד - הרמה המיסטית",
      content: `
                <h2>סוד - הרמה המיסטית</h2>
                <p>הרמה הרביעית והעמוקה ביותר בפרד"ס היא הסוד. ברמה זו אנו חוקרים את המשמעויות המיסטיות והנסתרות של הטקסט.</p>
                <h3>מאפיינים עיקריים:</h3>
                <ul>
                    <li>הבנה מיסטית</li>
                    <li>חקר הסודות הנסתרים</li>
                    <li>התחברות לרבדים העמוקים ביותר</li>
                </ul>
            `,
    },
  };

  // יצירת מודל
  function createModal(element) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = `modal-${element}`;

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => (modal.style.display = "none");

    content.innerHTML = modalContents[element].content;
    content.prepend(closeButton);
    modal.appendChild(content);

    return modal;
  }

  // הוספת אירועי לחיצה לכפתורים
  learnMoreButtons.forEach((button) => {
    const element = button.dataset.modal;
    const modal = createModal(element);
    modalContainer.appendChild(modal);

    button.onclick = () => {
      modal.style.display = "block";
    };

    // סגירת המודל בלחיצה מחוץ לתוכן
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });
});
