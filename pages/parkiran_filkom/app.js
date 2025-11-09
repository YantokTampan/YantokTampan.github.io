// Toggle status spot & hitung available
document.addEventListener('DOMContentLoaded', () => {
  const spots = Array.from(document.querySelectorAll('.spot'));
  const availableCountEl = document.getElementById('availableCount');

  function recalc() {
    const available = spots.filter(s => s.classList.contains('available')).length;
    availableCountEl.textContent = available;
  }

  // Demo interaksi: klik untuk ganti status
  spots.forEach(spot => {
    spot.addEventListener('click', () => {
      spot.classList.toggle('available');
      spot.classList.toggle('occupied');
      recalc();
    });
  });

  // Hitung awal
  recalc();
});
