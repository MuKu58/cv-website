// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Dropdown toggle
const dropdown = document.querySelector(".dropdown");
const moreBtn = document.getElementById("moreBtn");

moreBtn?.addEventListener("click", () => {
  if (!dropdown) return;
  const isOpen = dropdown.classList.toggle("is-open");
  moreBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown || !moreBtn) return;
  const target = e.target;

  if (target instanceof Node && !dropdown.contains(target)) {
    dropdown.classList.remove("is-open");
    moreBtn.setAttribute("aria-expanded", "false");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const el = document.querySelector(href);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close mobile nav after click
    navMenu?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Footer: last updated
const lastUpdated = document.getElementById("lastUpdated");
if (lastUpdated) {
  const d = new Date();
  lastUpdated.textContent = d.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
const photoUpload = document.getElementById("photoUpload");
const profilePreview = document.getElementById("profilePreview");

// opgeslagen foto laden bij refresh
const savedPhoto = localStorage.getItem("profilePhoto");
if (savedPhoto && profilePreview) {
  profilePreview.src = savedPhoto;
}

if (photoUpload && profilePreview) {
  photoUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        const imageData = reader.result;

        // afbeelding tonen
        profilePreview.src = imageData;

        // afbeelding opslaan
        localStorage.setItem("profilePhoto", imageData);
      };

      reader.readAsDataURL(file);
    }
  });
}