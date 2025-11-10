const button = document.querySelector('[data-lot-id=\"filkom\"] .btn');
if (button) {
    button.addEventListener('click', () => {
        window.location.href = 'pages/parkiran_filkom/parkiran_filkom.html';
    });
}

const searchInput = document.getElementById('search-input');
const cards = Array.from(document.querySelectorAll('.grid-cards .card'));

function buildSearchIndex(card) {
    if (card.dataset.searchText) return card.dataset.searchText;
    const title = card.querySelector('h3')?.textContent ?? '';
    const metaText = Array.from(card.querySelectorAll('.card-meta span'))
        .map((span) => span.textContent)
        .join(' ');
    const searchText = `${title} ${metaText}`.trim().toLowerCase();
    card.dataset.searchText = searchText;
    return searchText;
}

function filterCards(query = '') {
    const normalizedQuery = query.trim().toLowerCase();
    cards.forEach((card) => {
        const searchText = buildSearchIndex(card);
        const matches = !normalizedQuery || searchText.includes(normalizedQuery);
        card.style.display = matches ? '' : 'none';
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        filterCards(event.target.value);
    });
    filterCards();
}


