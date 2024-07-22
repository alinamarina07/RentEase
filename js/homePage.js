const welcome = document.getElementById('welcome');
const logOutBtn = document.getElementById('logOutBtn');
const filter = document.getElementById('filter');
const city = document.getElementById('city');
const priceRangeMin = document.getElementById('priceRangeMin');
const priceRangeMax = document.getElementById('priceRangeMax');
const areaSizeRangeMin = document.getElementById('areaSizeRangeMin');
const areaSizeRangeMax = document.getElementById('areaSizeRangeMax');
const filterBtn = document.getElementById('filterBtn');
const cityFilter = document.getElementById('city');
const sortBy = document.getElementById('sortBy');
const sortBtn = document.getElementById('sortBtn');
const allFlatsTable = document.getElementById('allFlatsTable');
const tBody = document.getElementById('tBody');
const removeBtn = document.getElementById('removeBtn');
const homeTable = document.getElementById('homeTable');

window.onload = () => {
    loadFavoriteFlats();
    populateCityFilter();
    handleSession();
    // preventFalseLogout();
    displayUserName();
    loadFavoriteFlats();

};
function displayUserName() {
let {firstName, lastName} = JSON.parse(localStorage.getItem('currentUser'));
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

function loadFavoriteFlats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserId = currentUser ? currentUser.Id : null;

    if (!currentUserId) return;

    const favoriteFlatsDB = getDB('favoriteFlatsDB').filter(flat => flat.userId === currentUserId);
    // const favoriteFlatsDB = getDB('favoriteFlatsDB') || [];
    tBody.innerHTML = '';

    favoriteFlatsDB.forEach(flat => {
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
            <td><button class="removeFavoriteBtn" data-id="${flat.Id}">🗑️</button></td>
        `;
        tBody.appendChild(row);
    });

    document.querySelectorAll('.removeFavoriteBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFavoriteItemById(btn.getAttribute('data-id'));
        });
    });
}

function removeFavoriteItemById(id) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserId = currentUser ? currentUser.Id : null;

    if (!currentUserId) return;

    let favoriteFlatsDB = getDB('favoriteFlatsDB').filter(flat => flat.userId === currentUserId);
    let flatsDB = getDB('flatsDB');
    // let favoriteFlatsDB = getDB('favoriteFlatsDB') || [];
    // let flatsDB = getDB('flatsDB');

    favoriteFlatsDB = favoriteFlatsDB.filter(flat => flat.Id !== id);
    flatsDB = flatsDB.map(flat => {
        if (flat.Id === id && flat.userId === currentUserId) {
            flat.isFavorite = false;
        }
        return flat;
    });

    localStorage.setItem('favoriteFlatsDB', JSON.stringify(favoriteFlatsDB));
    localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
    loadFavoriteFlats();
}

function applyFiltersAndSorting() {
    let flatsDB = getDB('flatsDB');

    const city = cityFilter.value;
    const minPrice = parseFloat(priceRangeMin.value) || 0;
    const maxPrice = parseFloat(priceRangeMax.value) || Infinity;
    const minAreaSize = parseFloat(areaSizeRangeMin.value) || 0;
    const maxAreaSize = parseFloat(areaSizeRangeMax.value) || Infinity;

    flatsDB = flatsDB.filter(flat => 
        (city === '' || flat.city === city) &&
        flat.rentPrice >= minPrice && 
        flat.rentPrice <= maxPrice &&
        flat.areaSize >= minAreaSize &&
        flat.areaSize <= maxAreaSize
    );

    const sortOption = sortBy.value;
    switch (sortOption) {
        case 'city_asc':
            flatsDB.sort((a, b) => a.city.localeCompare(b.city));
            break;
        case 'city_desc':
            flatsDB.sort((a, b) => b.city.localeCompare(a.city));
            break;
        case 'price_asc':
            flatsDB.sort((a, b) => a.rentPrice - b.rentPrice);
            break;
        case 'price_desc':
            flatsDB.sort((a, b) => b.rentPrice - a.rentPrice);
            break;
        case 'area_size_asc':
            flatsDB.sort((a, b) => a.areaSize - b.areaSize);
            break;
        case 'area_size_desc':
            flatsDB.sort((a, b) => b.areaSize - a.areaSize);
            break;
    }   
    displayFilteredFlats(flatsDB);
}

function displayFilteredFlats(flatsDB) {
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
            <td><button class="removeFavoriteBtn" data-id="${flat.Id}">🗑️</button></td>
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

filterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFiltersAndSorting();
});

sortBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFiltersAndSorting();
});

logOutBtn.addEventListener('click', logOut);

import { getDB, getUser } from "./modules/fetch.js";
import { handleSession, preventFalseLogout, logOut } from "./modules/auth.js";