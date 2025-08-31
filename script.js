document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const albums = document.querySelectorAll(".album");

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
      [{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(1)" }],
      { duration: 350, easing: "ease-in-out" }
    );

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  function toggleDescription(album) {
    const desc = album.querySelector(".description");
    const arrow = album.querySelector(".arrow");
    const isExpanded = album.classList.contains("expanded");

    if (isExpanded) {
      desc.style.maxHeight = "0px";
      arrow.style.transform = "rotate(0deg)";
      album.classList.remove("expanded");
    } else {
      desc.style.maxHeight = desc.scrollHeight + "px";
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
    desc.style.maxHeight = "0px";

    summary.style.cursor = "pointer";
    summary.addEventListener("click", () => {
      toggleDescription(album);
    });

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

  const spotifyRedirectBtn = document.getElementById("spotifyRedirect");
  if (spotifyRedirectBtn) {
    spotifyRedirectBtn.addEventListener("click", () => {
      window.open("https://open.spotify.com/", "_blank");
    });
  }
});
