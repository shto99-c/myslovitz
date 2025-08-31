document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

  // Tryb ciemny z localStorage
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

  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".custom-arrow");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      desc.style.maxHeight = "0px";
      desc.style.opacity = "0";
      album.classList.remove("expanded");
      if (arrow) arrow.classList.remove("rotated");
    } else {
      // Zamknij inne rozwinięte
      document.querySelectorAll(".album.expanded").forEach(otherAlbum => {
        if (otherAlbum !== album) {
          otherAlbum.classList.remove("expanded");
          const otherDesc = otherAlbum.querySelector(".description");
          const otherArrow = otherAlbum.querySelector(".custom-arrow");
          otherDesc.style.maxHeight = "0px";
          otherDesc.style.opacity = "0";
          if (otherArrow) otherArrow.classList.remove("rotated");
        }
      });

      desc.style.maxHeight = desc.scrollHeight + 24 + "px";
      desc.style.opacity = "1";
      album.classList.add("expanded");
      if (arrow) arrow.classList.add("rotated");

      setTimeout(() => {
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  albums.forEach(album => {
    const summary = album.querySelector(".summary");
    const desc = album.querySelector(".description");
    const spotifyIcon = summary.querySelector(".spotify-icon");
    const arrow = summary.querySelector(".custom-arrow");

    desc.style.maxHeight = "0px";
    desc.style.opacity = "0";

    summary.style.cursor = "pointer";
    summary.addEventListener("click", () => toggleDescription(album));

    if (spotifyIcon) {
      spotifyIcon.addEventListener("click", e => e.stopPropagation());
    }
  });

  // Animacje fade-in
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
