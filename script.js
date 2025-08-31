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
    const arrow = album.querySelector(".arrow");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      desc.style.maxHeight = "0";
      desc.style.opacity = "0";
      desc.style.paddingBottom = "0";
      arrow.style.transform = "rotate(0deg)";
      arrow.style.filter = "drop-shadow(0 0 4px #65a7ffaa)";
      album.classList.remove("expanded");
    } else {
      // Zwijaj inne otwarte
      document.querySelectorAll(".album.expanded").forEach(otherAlbum => {
        if (otherAlbum !== album) {
          otherAlbum.classList.remove("expanded");
          const otherDesc = otherAlbum.querySelector(".description");
          const otherArrow = otherAlbum.querySelector(".arrow");
          otherDesc.style.maxHeight = "0";
          otherDesc.style.opacity = "0";
          otherDesc.style.paddingBottom = "0";
          otherArrow.style.transform = "rotate(0deg)";
          otherArrow.style.filter = "drop-shadow(0 0 4px #65a7ffaa)";
        }
      });

      desc.style.maxHeight = desc.scrollHeight + 20 + "px"; // zapas
      desc.style.opacity = "1";
      desc.style.paddingBottom = "20px";
      arrow.style.transform = "rotate(180deg)";
      arrow.style.filter = "drop-shadow(0 0 8px #65a7ff)";
      album.classList.add("expanded");

      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  // ——— INTERAKCJA NA KAŻDYM ALBUMIE ———
  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const desc = album.querySelector(".description");
    const arrow = summary.querySelector(".arrow");
    const spotifyIcon = summary.querySelector(".spotify-icon");

    // Początkowe ukrycie
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

    // Efekty hover
    [arrow, spotifyIcon].forEach(icon => {
      if (!icon) return;
      icon.style.transition = "transform 0.3s ease, filter 0.3s ease";
      icon.addEventListener("mouseenter", () => {
        icon.style.transform = "scale(1.25) rotate(10deg)";
        icon.style.filter = "drop-shadow(0 0 10px #1DB954)";
      });
      icon.addEventListener("mouseleave", () => {
        icon.style.transform = "scale(1) rotate(0deg)";
        icon.style.filter = "";
      });
    });
  });

  // ——— ANIMACJE ———
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
