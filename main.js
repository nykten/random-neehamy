// Data structure for catalog entries
const catalogData = [
    {
        id: 1,
        title: "Cool Website",
        description: "An amazing interactive experience",
        image: "https://picsum.photos/seed/1/400/400",
        url: "https://example.com",
        category: "Interactive"
    },
    {
        id: 2,
        title: "Creative Portfolio",
        description: "Beautiful design showcase",
        image: "https://picsum.photos/seed/2/400/400",
        url: "https://example.com",
        category: "Design"
    },
    {
        id: 3,
        title: "Learning Platform",
        description: "Educational resources and tutorials",
        image: "https://picsum.photos/seed/3/400/400",
        url: "https://example.com",
        category: "Education"
    },
    {
        id: 4,
        title: "Game Hub",
        description: "Fun and engaging web games",
        image: "https://picsum.photos/seed/4/400/400",
        url: "https://example.com",
        category: "Games"
    },
    {
        id: 5,
        title: "Art Gallery",
        description: "Stunning visual artworks",
        image: "https://picsum.photos/seed/5/400/400",
        url: "https://example.com",
        category: "Design"
    },
    {
        id: 6,
        title: "Music Studio",
        description: "Create and share music online",
        image: "https://picsum.photos/seed/6/400/400",
        url: "https://example.com",
        category: "Interactive"
    }
];

let currentFilter = 'all';
let currentSearch = '';

// Initialize catalog
function renderCatalog() {
    const catalog = document.getElementById('catalog');
    const filteredData = catalogData.filter(item => {
        const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
        const matchesSearch = item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                              item.description.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredData.length === 0) {
        catalog.innerHTML = '<div class="no-results">No entries found</div>';
        return;
    }

    catalog.innerHTML = filteredData.map(item => `
        <div class="catalog-item" onclick="window.open('${item.url}', '_blank')">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="category">${item.category}</span>
        </div>
    `).join('');
}

// Initialize filter buttons
function initializeFilters() {
    const categories = ['all', ...new Set(catalogData.map(item => item.category))];
    const filterPanel = document.querySelector('.filter-panel');
    
    filterPanel.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');

    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.category;
            renderCatalog();
        });
    });
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', function(e) {
    currentSearch = e.target.value;
    renderCatalog();
});

// Randomisation function
document.getElementById('randomiseBtn').addEventListener('click', function() {
    const btn = this;
    const display = document.getElementById('randomDisplay');
    
    btn.disabled = true;
    btn.textContent = 'Randomising...';
    
    let cycles = 0;
    const maxCycles = 15;
    const baseInterval = 100;
    
    const cycleInterval = setInterval(() => {
        const randomItem = catalogData[Math.floor(Math.random() * catalogData.length)];
        
        document.getElementById('displayImg').src = randomItem.image;
        document.getElementById('displayTitle').textContent = randomItem.title;
        document.getElementById('displayDesc').textContent = randomItem.description;
        display.classList.add('show');
        
        cycles++;
        
        if (cycles >= maxCycles) {
            clearInterval(cycleInterval);
            
            setTimeout(() => {
                window.location.href = randomItem.url;
            }, 1500);
        }
    }, baseInterval + (cycles * 30));
});

// Initialize on page load
initializeFilters();
renderCatalog();