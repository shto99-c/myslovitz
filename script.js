// Futurystyczny skrypt interakcji i animacji dla albumów Myslovitz

document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

  // Inicjalne sprawdzenie preferencji trybu ciemnego z localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    darkToggle.textContent = "☀️ Tryb jasny";
  }

  // Przełącznik trybu ciemnego z animacją i zapisem w localStorage
  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️ Tryb jasny" : "🌙 Tryb ciemny";

    // Animacja pulsowania na przycisku podczas przełączania
    darkToggle.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.15)" },
        { transform: "scale(1)" }
      ],
      { duration: 350, easing: "ease-in-out" }
    );

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Funkcja animująca rozwijanie / zwijanie opisu albumu
  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".arrow");
    const isExpanded = desc.style.maxHeight && desc.style.maxHeight !== "0px";

    if (isExpanded) {
      // Zwijanie z animacją
      desc.style.maxHeight = "0px";
      arrow.style.transform = "rotate(0deg)";
      album.classList.remove("expanded");
    } else {
      // Rozwijanie z animacją i przewinięciem do albumu
      desc.style.maxHeight = desc.scrollHeight + "px";
      arrow.style.transform = "rotate(180deg)";
      album.classList.add("expanded");

      // Smooth scroll do albumu z lekkim opóźnieniem, by animacja maxHeight się rozpoczęła
      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  // Podłącz zdarzenia click na nagłówki albumów
  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const desc = album.querySelector(".description");

    // Ustaw początkową maksymalną wysokość opisu na 0, ukrywając go
    desc.style.maxHeight = "0px";

    // Dodaj event click na summary (nagłówek)
    summary.style.cursor = "pointer";
    summary.addEventListener("click", () => {
      toggleDescription(album);
    });

    // Efekt hover na strzałce i ikonie Spotify
    const arrow = summary.querySelector(".arrow");
    const spotifyIcon = summary.querySelector(".spotify-icon");

    [arrow, spotifyIcon].forEach(elem => {
      elem.style.transition = "transform 0.3s ease, filter 0.3s ease";

      elem.addEventListener("mouseenter", () => {
        elem.style.transform = "scale(1.25) rotate(10deg)";
        elem.style.filter = "drop-shadow(0 0 6px #1DB954)";
      });

      elem.addEventListener("mouseleave", () => {
        elem.style.transform = "scale(1) rotate(0deg)";
        elem.style.filter = "none";
      });
    });
  });

  // Intersection Observer - animacja albumów przy przewijaniu
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  albums.forEach(album => {
    observer.observe(album);
  });

});
