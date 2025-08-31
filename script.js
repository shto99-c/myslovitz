document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark")
      ? "☀️ Tryb jasny"
      : "🌙 Tryb ciemny";
  });

  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const summary = album.querySelector(".summary");
    const description = album.querySelector(".description");

    summary.addEventListener("click", () => {
      const isOpen = album.classList.contains("open");

      // Zamknij wszystkie
      albums.forEach((el) => {
        el.classList.remove("open");
      });

      if (!isOpen) {
        album.classList.add("open");
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
