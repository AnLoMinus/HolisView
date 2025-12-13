// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.setAttribute("data-theme", "dark");
  }

  darkModeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
      body.removeAttribute("data-theme");
      localStorage.setItem("darkMode", "disabled");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "enabled");
    }
  });

  // Initialize document cards
  loadFeaturedDocuments();

  // Initialize search functionality
  initializeSearch();
});

// Featured Documents Data
const featuredDocuments = [
  {
    title: "איך אפשר להתחבר ל-39 אורות בחיי היום-יום?",
    description: "מדריך מעשי להתחברות לאורות הקדושים בחיי היומיום",
    category: "מדריך מעשי",
    icon: "fa-star",
  },
  {
    title: "חיבור 39 שערי האורה אל מול 39 מלאכות השבת",
    description: "העמקה בקשר בין שערי האורה למלאכות השבת",
    category: "לימוד מעמיק",
    icon: "fa-tools",
  },
  {
    title: "39 שערים, 39 קליפות ותיקון חטא אדם הראשון",
    description: "הבנת הקשר בין השערים, הקליפות והתיקון",
    category: "קבלה",
    icon: "fa-tree",
  },
];

// Load Featured Documents
function loadFeaturedDocuments() {
  const container = document.querySelector(".featured-docs .row");
  if (!container) return;

  featuredDocuments.forEach((doc) => {
    const card = createDocumentCard(doc);
    container.appendChild(card);
  });
}

// Create Document Card
function createDocumentCard(doc) {
  const div = document.createElement("div");
  div.className = "col-md-4 fade-in";
  div.innerHTML = `
        <div class="document-card card h-100">
            <div class="card-body">
                <div class="text-center mb-3">
                    <i class="fas ${doc.icon} fa-3x"></i>
                </div>
                <h5 class="card-title">${doc.title}</h5>
                <span class="category-pill d-inline-block mb-2">${doc.category}</span>
                <p class="card-text">${doc.description}</p>
                <a href="#" class="btn btn-outline-primary">קרא עוד</a>
            </div>
        </div>
    `;
  return div;
}

// Initialize Search
function initializeSearch() {
  const searchInput = document.querySelector(".search-box input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const articles = document.querySelectorAll(".document-card");

    articles.forEach((article) => {
      const title = article
        .querySelector(".card-title")
        .textContent.toLowerCase();
      const content = article
        .querySelector(".card-text")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        article.style.display = "";
      } else {
        article.style.display = "none";
      }
    });
  });
}

// Smooth Scroll
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

// Add animation classes on scroll
function addAnimationOnScroll() {
  const elements = document.querySelectorAll(
    ".card, .search-box, .document-card"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize animations
document.addEventListener("DOMContentLoaded", addAnimationOnScroll);

// Table of Contents Navigation
const tocLinks = document.querySelectorAll(".table-of-contents a");
tocLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Share Buttons
const shareButtons = document.querySelectorAll(".share-buttons button");
shareButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const url = window.location.href;
    const title = document.title;

    if (button.classList.contains("facebook")) {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    } else if (button.classList.contains("twitter")) {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
    } else if (button.classList.contains("whatsapp")) {
      window.open(`https://wa.me/?text=${title} ${url}`);
    }
  });
});

// Dynamic Document Loading
async function loadDocument(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.querySelector(".document-content").innerHTML = html;
  } catch (error) {
    console.error("Error loading document:", error);
  }
}

// Category Filter
const categoryPills = document.querySelectorAll(".category-pill");
categoryPills.forEach((pill) => {
  pill.addEventListener("click", (e) => {
    e.preventDefault();
    const category = pill.textContent.toLowerCase();
    const articles = document.querySelectorAll(".document-card");

    articles.forEach((article) => {
      const articleCategory = article.dataset.category.toLowerCase();
      if (category === "all" || articleCategory === category) {
        article.style.display = "";
      } else {
        article.style.display = "none";
      }
    });
  });
});
