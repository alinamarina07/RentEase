const cityFilter = document.getElementById('city');
const priceRangeMin = document.getElementById('priceRangeMin');
const priceRangeMax = document.getElementById('priceRangeMax');
const areaSizeRangeMin = document.getElementById('areaSizeRangeMin');
const areaSizeRangeMax = document.getElementById('areaSizeRangeMax');
const filterBtn = document.getElementById('filterBtn');
const sortBy = document.getElementById('sortBy');
const sortBtn = document.getElementById('sortBtn');
const allFlatsTable = document.getElementById('allFlatsTable');
const tBody = document.getElementById('tBody');
const logOutBtn = document.getElementById('logOutBtn');
const welcome = document.getElementById('welcome');

window.onload = () => {
    handleSession();
    populateCityFilter();
    loadFlats();
    displayUserName();
};

function displayUserName() {
    let { firstName, lastName } = JSON.parse(localStorage.getItem('currentUser'));
    welcome.textContent = `Welcome, ${firstName} ${lastName}!`;
}

function populateCityFilter() {
    const flatsDB = getDB('flatsDB');
    const cities = new Set(flatsDB.map(flat => flat.city));
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

function loadFlats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let flatsDB = getDB('flatsDB');
    tBody.innerHTML = '';
    
    flatsDB = flatsDB.filter(flat => flat.createdBy === currentUser.email);

    flatsDB.forEach(flat => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${flat.nameNewFlat}</td>
            <td>${flat.city}</td>
            <td>${flat.streetName}</td>
            <td>${flat.streetNumber}</td>
            <td>${flat.areaSize}</td>
            <td>${flat.hasAC ? 'Yes' : 'No'}</td>
            <td>${flat.yearBuilt}</td>
            <td>${flat.rentPrice}</td>
            <td>${flat.dateAvailable}</td>
            <td><button class="favoriteBtn" data-id="${flat.Id}">${flat.isFavorite ? '❤️' : '♡'}</button></td>
            <td><button class="removeBtn" data-id="${flat.Id}">🗑️</button></td>
        `;

        tBody.appendChild(row);
    });

    document.querySelectorAll('.favoriteBtn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });

    document.querySelectorAll('.removeBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeItemById(btn.getAttribute('data-id'));
        });
    });

    const removeItemById = (id) => {
        let flatsDB = getDB('flatsDB');
        flatsDB = flatsDB.filter(flat => flat.Id !== id);
        localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
        loadFlats();
    }
}

function applyFiltersAndSorting() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let flatsDB = getDB('flatsDB');
    
    flatsDB = flatsDB.filter(flat => flat.createdBy === currentUser.email);
    
    const city = cityFilter.value;
    const minPrice = parseFloat(priceRangeMin.value) || 0;
    const maxPrice = parseFloat(priceRangeMax.value) || Number.MAX_VALUE;
    const minArea = parseFloat(areaSizeRangeMin.value) || 0;
    const maxArea = parseFloat(areaSizeRangeMax.value) || Number.MAX_VALUE;

    flatsDB = flatsDB.filter(flat => flat.city.includes(city));
    flatsDB = flatsDB.filter(flat => flat.rentPrice >= minPrice && flat.rentPrice <= maxPrice);
    flatsDB = flatsDB.filter(flat => flat.areaSize >= minArea && flat.areaSize <= maxArea);

    const sortOrder = sortBy.value;
    switch (sortOrder) {
        case 'price_asc':
            flatsDB.sort((a, b) => a.rentPrice - b.rentPrice);
            break;
        case 'price_desc':
            flatsDB.sort((a, b) => b.rentPrice - a.rentPrice);
            break;
        case 'area_asc':
            flatsDB.sort((a, b) => a.areaSize - b.areaSize);
            break;
        case 'area_desc':
            flatsDB.sort((a, b) => b.areaSize - a.areaSize);
            break;
        default:
            break;
    }

    tBody.innerHTML = '';

    flatsDB.forEach(flat => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${flat.nameNewFlat}</td>
            <td>${flat.city}</td>
            <td>${flat.streetName}</td>
            <td>${flat.streetNumber}</td>
            <td>${flat.areaSize}</td>
            <td>${flat.hasAC ? 'Yes' : 'No'}</td>
            <td>${flat.yearBuilt}</td>
            <td>${flat.rentPrice}</td>
            <td>${flat.dateAvailable}</td>
            <td><button class="favoriteBtn" data-id="${flat.Id}">${flat.isFavorite ? '❤️' : '♡'}</button></td>
            <td><button class="removeBtn" data-id="${flat.Id}">🗑️</button></td>
        `;

        tBody.appendChild(row);
    });

    document.querySelectorAll('.favoriteBtn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });

    document.querySelectorAll('.removeBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeItemById(btn.getAttribute('data-id'));
        });
    });
}

filterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    applyFiltersAndSorting();
});

sortBtn.addEventListener('click', (e) => {
    e.preventDefault();
    applyFiltersAndSorting();
});

logOutBtn.addEventListener('click', logOut);

function toggleFavorite(e) {
    // const id = e.target.getAttribute('data-id');
    // let flatsDB = getDB('flatsDB');
    // const flat = flatsDB.find(f => f.Id === id);
    // flat.isFavorite = !flat.isFavorite;
    // localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
    // loadFlats();

    const id = e.target.getAttribute('data-id');
    let flatsDB = getDB('flatsDB');
    const flat = flatsDB.find(f => f.Id === id);
    if (flat) {
        flat.isFavorite = !flat.isFavorite;
        if (flat.isFavorite) {
            let favoriteFlatsDB = getDB('favoriteFlatsDB') || [];
            favoriteFlatsDB = favoriteFlatsDB.filter(favFlat => favFlat.Id !== id); // Avoid duplicates
            favoriteFlatsDB.push(flat);
            localStorage.setItem('favoriteFlatsDB', JSON.stringify(favoriteFlatsDB));
        } else {
            let favoriteFlatsDB = getDB('favoriteFlatsDB') || [];
            favoriteFlatsDB = favoriteFlatsDB.filter(favFlat => favFlat.Id !== id);
            localStorage.setItem('favoriteFlatsDB', JSON.stringify(favoriteFlatsDB));
        }
        localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
        loadFlats(); // Reload the flats to update the UI
    }
}

import { handleSession, logOut, preventFalseLogout } from "./modules/auth.js";
import { getDB, getUser } from "./modules/fetch.js";
