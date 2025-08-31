document.addEventListener("DOMContentLoaded", () => {
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const summary = album.querySelector(".summary");
    const description = album.querySelector(".description");

    summary.addEventListener("click", () => {
      const isOpen = album.classList.contains("open");

      // Zamykamy wszystkie
      albums.forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".description").style.height = 0;
      });

      if (!isOpen) {
        album.classList.add("open");

        // Ustawiamy height na scrollHeight dla animacji
        const scrollHeight = description.scrollHeight;
        description.style.height = scrollHeight + "px";
      }
    });
  });
});
