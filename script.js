document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

  // Load dark mode preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    darkToggle.textContent = "☀️ Tryb jasny";
  }

  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️ Tryb jasny" : "🌙 Tryb ciemny";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const arrow = album.querySelector(".arrow");
    const description = album.querySelector(".description");
    const spotifyIcon = album.querySelector(".spotify-icon");

    // Initial state
    description.style.maxHeight = "0px";
    description.style.opacity = "0";

    summary.addEventListener("click", () => {
      const isExpanded = album.classList.contains("expanded");

      // Close all others
      document.querySelectorAll(".album.expanded").forEach(other => {
        if (other !== album) {
          other.classList.remove("expanded");
          other.querySelector(".description").style.maxHeight = "0px";
          other.querySelector(".description").style.opacity = "0";
        }
      });

      // Toggle current
      album.classList.toggle("expanded");

      if (!isExpanded) {
        description.style.maxHeight = description.scrollHeight + "px";
        description.style.opacity = "1";
        setTimeout(() => {
          album.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 250);
      } else {
        description.style.maxHeight = "0px";
        description.style.opacity = "0";
      }
    });

    if (spotifyIcon) {
      spotifyIcon.addEventListener("click", e => e.stopPropagation());
    }
  });
});
