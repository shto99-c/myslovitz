document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

  // ——— TRYB CIEMNY Z LOCALSTORAGE ———
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (darkToggle) darkToggle.textContent = "☀️ Tryb jasny";
  }

  if (darkToggle) {
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
        { duration: 350, easing: "ease-in-out" }
      );

      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ——— ROZWIJANIE / ZWIJANIE OPISU ———
  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      // Zwijamy
      desc.style.maxHeight = "0";
      desc.style.opacity = "0";
      desc.style.paddingBottom = "0";
      album.classList.remove("expanded");
    } else {
      // Zwijamy inne otwarte
      document.querySelectorAll(".album.expanded").forEach(otherAlbum => {
        if (otherAlbum !== album) {
          otherAlbum.classList.remove("expanded");
          const otherDesc = otherAlbum.querySelector(".description");
          otherDesc.style.maxHeight = "0";
          otherDesc.style.opacity = "0";
          otherDesc.style.paddingBottom = "0";
        }
      });

      // Rozwijamy wybrany
      desc.style.maxHeight = desc.scrollHeight + 20 + "px";
      desc.style.opacity = "1";
      desc.style.paddingBottom = "20px";
      album.classList.add("expanded");

      // Scroll do albumu po rozwinięciu
      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }

  // ——— INTERAKCJA NA KAŻDYM ALBUMIE ———
  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const spotifyIcon = summary.querySelector(".spotify-icon");

    // Początkowe ukrycie opisu
    const desc = album.querySelector(".description");
    desc.style.maxHeight = "0";
    desc.style.opacity = "0";
    desc.style.paddingBottom = "0";

    // Kliknięcie nagłówka
    summary.style.cursor = "pointer";
    summary.addEventListener("click", () => toggleDescription(album));

    // Zapobiegaj rozwijaniu po kliknięciu Spotify
    if (spotifyIcon) {
      spotifyIcon.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });

  // ——— ANIMACJE WEJŚCIA ———
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
