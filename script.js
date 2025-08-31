document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  toggle.addEventListener("click", () => document.body.classList.toggle("dark"));

  document.querySelectorAll(".album .summary").forEach(summary => {
    summary.addEventListener("click", () => {
      const album = summary.parentElement;
      const wasOpen = album.classList.contains("open");
      document.querySelectorAll(".album.open").forEach(a => a.classList.remove("open"));
      if (!wasOpen) {
        album.classList.add("open");
        album.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
