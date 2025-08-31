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

  // ——— ROZWIJANIE OPISU ———
  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".custom-arrow");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      desc.style.maxHeight = "0px";
      desc.style.opacity = "0";
      album.classList.remove("expanded");
    } else {
      // Zamknij inne otwarte
      document.querySelectorAll(".album.expanded").forEach(otherAlbum => {
        if (otherAlbum !== album) {
          otherAlbum.classList.remove("expanded");
          const otherDesc = otherAlbum.querySelector(".description");
          otherDesc.style.maxHeight = "0px";
          otherDesc.style.opacity = "0";
        }
      });

      desc.style.maxHeight = desc.scrollHeight + 24 + "px";
      desc.style.opacity = "1";
      album.classList.add("expanded");

      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  // ——— INTERAKCJE ———
  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".custom-arrow");
    const spotifyIcon = summary.querySelector(".spotify-icon");

    // Ukrycie opisu
    desc.style.maxHeight = "0px";
    desc.style.opacity = "0";

    // Kliknięcie na strzałkę
    if (arrow) {
      arrow.addEventListener("click", (e) => {
        e.stopPropagation(); // Zapobiega kliknięciu na cały nagłówek
        toggleDescription(album);
      });
    }

    // Zapobiegaj rozwijaniu po kliknięciu Spotify
    if (spotifyIcon) {
      spotifyIcon.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    // Kliknięcie na całą belkę
    summary.addEventListener("click", () => {
      toggleDescription(album);
    });
  });

  // ——— ANIMACJA POJAWIANIA ———
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
