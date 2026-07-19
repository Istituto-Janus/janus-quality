async function initializeApp() {
  try {
    const response = await fetch('data/janus-data.json');
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }

    const data = await response.json();
    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebar = document.getElementById('sidebar');

    function showView(id) {
      views.forEach(view => view.classList.toggle('active-view', view.id === id));
      navLinks