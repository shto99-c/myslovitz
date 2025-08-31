document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

  // Tryb ciemny z localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    darkToggle.textContent = "☀️ Tryb jasny";
  }

  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️ Tryb jasny" : "🌙 Tryb ciemny";

    // Animacja przy przełączeniu
    darkToggle.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(1)" }],
      { duration: 350, easing: "ease-in-out" }
    );

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Rozwijanie/zamykanie albumów
  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".arrow");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      desc.style.maxHeight = "0px";
      arrow.style.transform = "rotate(0deg)";
      album.classList.remove("expanded");
    } else {
      // Zamknij inne
      document.querySelectorAll(".album.expanded").forEach(otherAlbum => {
        if (otherAlbum !== album) {
          otherAlbum.classList.remove("expanded");
          otherAlbum.querySelector(".description").style.maxHeight = "0px";
          otherAlbum.querySelector(".arrow").style.transform = "rotate(0deg)";
        }
      });

      desc.style.maxHeight = desc.scrollHeight + 24 + "px";
      arrow.style.transform = "rotate(180deg)";
      album.classList.add("expanded");

      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const desc = album.querySelector(".description");
    const arrow = summary.querySelector(".arrow");
    const spotifyIcon = summary.querySelector(".spotify-icon");

    desc.style.maxHeight = "0px";

    summary.addEventListener("click", () => toggleDescription(album));

    [arrow, spotifyIcon].forEach(icon => {
      icon.style.transition = "transform 0.3s ease, filter 0.3s ease";
      icon.addEventListener("mouseenter", () => {
        icon.style.transform = "scale(1.25) rotate(10deg)";
        icon.style.filter = "drop-shadow(0 0 6px #1DB954)";
      });
      icon.addEventListener("mouseleave", () => {
        icon.style.transform = "scale(1) rotate(0deg)";
        icon.style.filter = "none";
      });
    });
  });

  // Intersection Observer – animacja wejścia
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  });

  albums.forEach(album => {
    observer.observe(album);
  });
});

// Ukrycie loadera po załadowaniu strony
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
});
