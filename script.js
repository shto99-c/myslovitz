// Funkcja pokazująca lub ukrywająca loader i treść strony
function toggleLoader(show) {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');
  if (show) {
    loader.style.display = 'flex';
    content.style.display = 'none';
  } else {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      content.style.display = 'block';
      content.style.opacity = '0';
      setTimeout(() => {
        content.style.opacity = '1';
      }, 50);
    }, 400); // animacja zanikania loadera
  }
}

// Obsługa ładowania strony
window.addEventListener('load', () => {
  toggleLoader(false);
});

// Inicjalne pokazanie loadera (jeśli potrzebne przy odświeżeniu itp.)
toggleLoader(true);

// Obsługa przełączania trybu ciemnego
const toggleBtn = document.getElementById('toggleDarkMode');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '🌙 Tryb ciemny';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    toggleBtn.textContent = '🌞 Tryb jasny';
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Sprawdzenie ustawienia trybu ciemnego przy starcie strony
window.addEventListener('DOMContentLoaded', () => {
  const darkModeSetting = localStorage.getItem('darkMode');
  if (darkModeSetting === 'enabled') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '🌙 Tryb ciemny';
  } else {
    toggleBtn.textContent = '🌞 Tryb jasny';
  }
});
