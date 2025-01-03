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
const favoriteBtn = document.getElementById('favoriteBtn');
const favoriteTable = document.getElementById('favoriteTable');
const removeFavoriteBtn = document.getElementById('removeFavoriteBtn');

function displayUserName() {
    const user = getUser();
    if (user) {
        welcome.textContent = `Welcome, ${user.email}`;
    }
}

window.onload = () => {
    handleSession();
    // preventFalseLogout();
    displayUserName();
    populateCityFilter();
    loadFlats();
};


let {firstName, lastName, email, password} = JSON.parse(localStorage.getItem('currentUser'));
welcome.textContent = `Welcome, ${firstName} ${lastName}!`;

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

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

document.addEventListener('DOMContentLoaded', () => {
    loadFavoriteFlats();
});

function loadFavoriteFlats() {
    const favoritesTBody = document.getElementById('favoritesTBody');
    const favoriteFlats = JSON.parse(localStorage.getItem('favoriteFlats')) || [];

    favoritesTBody.innerHTML = ''; // Clear existing content

    favoriteFlats.forEach(flat => {
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
        favoritesTBody.appendChild(row);
    });

    // Add event listeners for remove favorite buttons
    document.querySelectorAll('.removeFavoriteBtn').forEach(btn => {
        btn.addEventListener('click', removeFavoriteFlat);
    });
}


function removeFavoriteFlat(event) {
    const button = event.target;
    const flatId = button.getAttribute('data-id');
    let favoriteFlats = JSON.parse(localStorage.getItem('favoriteFlats')) || [];

    favoriteFlats = favoriteFlats.filter(flat => flat.Id !== flatId);

    localStorage.setItem('favoriteFlats', JSON.stringify(favoriteFlats));
    loadFavoriteFlats();
}


function applyFiltersAndSorting() {
    let flatsDB = getDB('flatsDB');

    // Filtrare
    const city = cityFilter.value;
    const minPrice = parseFloat(priceRangeMin.value) || 0;
    const maxPrice = parseFloat(priceRangeMax.value) || Infinity;
    const minAreaSize = parseFloat(areaSizeRangeMin.value) || 0;
    const maxAreaSize = parseFloat(areaSizeRangeRangeMax.value) || Infinity;

    flatsDB = flatsDB.filter(flat => 
        (city === '' || flat.city === city) &&
        flat.rentPrice >= minPrice && 
        flat.rentPrice <= maxPrice &&
        flat.areaSize >= minAreaSize &&
        flat.areaSize <= maxAreaSize
    );

    // Sortare
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

    
    favoritesTBody.innerHTML = ''; // Clear existing content

    favoriteFlats.forEach(flat => {
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
        favoritesTBody.appendChild(row);
    });

    // Add event listeners for remove favorite buttons
    document.querySelectorAll('.removeFavoriteBtn').forEach(btn => {
        btn.addEventListener('click', removeFavoriteFlat);
    });
}

filterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFiltersAndSorting();
});

// Event listener pentru butonul de sortare
sortBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFiltersAndSorting();
});

logOutBtn.addEventListener('click', logOut);


import { getDB, getUser } from "./modules/fetch.js";
import { handleSession, preventFalseLogout, logOut } from "./modules/auth.js";

