document.addEventListener("DOMContentLoaded", () => {
  // Tryb ciemny toggle
  const toggle = document.getElementById("darkModeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark")
      ? "☀️ Tryb jasny"
      : "🌙 Tryb ciemny";
  });

  // Rozwijanie albumów
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const summary = album.querySelector(".summary");
    const description = album.querySelector(".description");

    summary.addEventListener("click", () => {
      const isOpen = album.classList.contains("open");

      // Zamknij wszystkie inne
      albums.forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".description").style.height = 0;
      });

      if (!isOpen) {
        album.classList.add("open");
        const scrollHeight = description.scrollHeight;
        description.style.height = scrollHeight + "px";
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
