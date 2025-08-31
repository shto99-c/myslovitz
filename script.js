document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

  // ——— TRYB CIEMNY Z LOCALSTORAGE ———
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    darkToggle.textContent = "☀️ Tryb jasny";
  }

  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️ Tryb jasny" : "🌙 Tryb ciemny";

    darkToggle.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.15)" },
        { transform: "scale(1)" }
      ],
      { duration: 300, easing: "ease-in-out" }
    );

    // Dodajemy płynne przejście kolorów body (na wszelki wypadek)
    body.style.transition = "background-color 0.3s ease, color 0.3s ease";

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ——— ROZWIJANIE / ZWIJANIE OPISU ———
  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".arrow");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      // Zwinięcie z animacją
      desc.style.maxHeight = null; // usuń inline maxHeight
      desc.style.opacity = "0";
      arrow.style.transform = "rotate(0deg)";
      album.classList.remove("expanded");
    } else {
      // Zwijaj inne otwarte
      document.querySelectorAll(".album.expanded").forEach(otherAlbum => {
        if (otherAlbum !== album) {
          otherAlbum.classList.remove("expanded");
          const otherDesc = otherAlbum.querySelector(".description");
          const otherArrow = otherAlbum.querySelector(".arrow");
          otherDesc.style.maxHeight = null;
          otherDesc.style.opacity = "0";
          otherArrow.style.transform = "rotate(0deg)";
        }
      });

      // Rozwinięcie z animacją
      desc.style.maxHeight = desc.scrollHeight + 24 + "px"; // padding zapas
      desc.style.opacity = "1";
      arrow.style.transform = "rotate(180deg)";
      album.classList.add("expanded");

      // Smooth scroll do albumu
      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }

  // ——— INTERAKCJA NA KAŻDYM ALBUMIE ———
  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const desc = album.querySelector(".description");
    const arrow = summary.querySelector(".arrow");
    const spotifyIcon = summary.querySelector(".spotify-icon");

    // Początkowe ukrycie opisu (ważne - bez inline maxHeight, żeby CSS mógł działać)
    desc.style.maxHeight = null;
    desc.style.opacity = "0";

    // Kliknięcie nagłówka rozwija/zawija opis
    summary.style.cursor = "pointer";
    summary.addEventListener("click", () => toggleDescription(album));

    // Zapobiegaj rozwijaniu po kliknięciu Spotify
    spotifyIcon.addEventListener("click", (e) => e.stopPropagation());

    // Animacje hover ikon
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

  // ——— INTERSECTION OBSERVER DLA ANIMACJI FADE-IN ———
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // obserwuj tylko raz
      }
    });
  }, observerOptions);

  albums.forEach(album => {
    observer.observe(album);
  });
});
