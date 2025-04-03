document.addEventListener("DOMContentLoaded", () => {
  // 1. Update Footer Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // 2. Scroll-to-Top Button
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    revealOnScroll();
  });
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. Reveal Sections on Scroll with Left-to-Right Animation
  function revealOnScroll() {
    const sections = document.querySelectorAll(".slide-in");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("show");
      }
    });
  }
  revealOnScroll();

  // 4. Accent Color Buttons - dynamically update the neon green variable
  document.querySelectorAll("#color-controls .color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newColor = btn.getAttribute("data-color");
      document.documentElement.style.setProperty("--neon-green", newColor);
    });
  });

  // 5. Theme Mode Buttons
  document.querySelectorAll("#theme-mode-controls .theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme");
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    });
  });

  // 6. Typing Effect for Hero Text
  const typingText = document.getElementById("typing-text");
  if (typingText) {
    const textToType = "Antony Gatitu Gichuki";
    let index = 0;
    function typeEffect() {
      if (index < textToType.length) {
        typingText.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeEffect, 150);
      }
    }
    typeEffect();
  }

  // 7. Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // 8. Fetch GitHub Projects
  async function fetchProjects() {
    const projectsGrid = document.getElementById("projects-grid");
    const projectsLoader = document.getElementById("projects-loader");
    projectsLoader.style.display = "block";
    try {
      const response = await fetch("https://api.github.com/users/gichukianthony/repos");
      const data = await response.json();
      const projects = data
        .filter((project) => project.homepage)
        .map(
          (project) => `
          <div class="project-card">
            <img src="${project.owner.avatar_url}" alt="${project.name}" />
            <h3>${project.name}</h3>
            <p>${project.description || "No description available."}</p>
            <a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="project-link">View Website</a>
          </div>
        `
        )
        .join("");
      projectsGrid.innerHTML = projects;
    } catch (error) {
      projectsGrid.innerHTML = "<p>Error loading projects.</p>";
    } finally {
      projectsLoader.style.display = "none";
    }
  }
  fetchProjects();

  // 9. Contact Form Submission Handling
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formMessage = document.getElementById("form-message");
    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "green";
    this.reset();
  });

  // 10. CV Viewer Toggle Button
  document.getElementById("view-cv-btn").addEventListener("click", () => {
    const cvContainer = document.getElementById("cv-container");
    cvContainer.style.display = cvContainer.style.display === "none" ? "block" : "none";
  });
});
