// home.js
import { getState, getAvailableCount, subscribe } from './data/store.js'; // sesuaikan path

const LOT_ID = 'filkom';

function render() {
  const state = getState();
  const lot = state.lots?.[LOT_ID];
  if (!lot) return;

  const available = getAvailableCount(LOT_ID);
  const totalSpots = Object.keys(lot.spots || {}).length || 1;
  const percent = Math.round((available / totalSpots) * 100);

  const countEl = document.getElementById('count-filkom');
  if (countEl) countEl.textContent = available;

  const lotCard = document.querySelector(`[data-lot-id="${LOT_ID}"]`);
  if (!lotCard) return;

  const fillEl = lotCard.querySelector('.fill');
  if (fillEl) {
    fillEl.style.setProperty('--p', percent);
    const hue = Math.max(0, Math.min(120, Math.round((percent / 100) * 120)));
    fillEl.style.setProperty('background-color', `hsl(${hue} 70% 45%)`);
  }

  const labelEl = lotCard.querySelector('.avail small');
  if (labelEl) labelEl.textContent = `of ${totalSpots} free`;

  const availEl = lotCard.querySelector('.avail');
  if (availEl) {
    availEl.classList.remove('ok', 'warn');
    availEl.classList.add(percent < 30 ? 'warn' : 'ok');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // inisialisasi (buat default kalau belum ada)
  getState();
  render();
  // dengarkan update dari halaman lain
  subscribe(render);
});
