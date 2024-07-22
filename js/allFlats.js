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
    // preventFalseLogout();
    populateCityFilter();
    loadFlats();
    displayUserName();
};

function displayUserName(){
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
        // const updatedFlatsDB = flatsDB.filter(flat => flat.Id !== id);
        localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
        loadFlats();
    }};

function applyFiltersAndSorting() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let flatsDB = getDB('flatsDB');

    flatsDB = flatsDB.filter(flat => flat.createdBy === currentUser.email);

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
function toggleFavorite(event) {
    const button = event.target;
    const flatId = button.getAttribute('data-id');
    // let flatsDB = getDB('flatsDB');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserId = currentUser ? currentUser.Id : null;

    if (!currentUserId) return;

    let flatsDB = getDB('flatsDB');
    let favoriteFlatsDB = getDB('favoriteFlatsDB') || [];

    flatsDB = flatsDB.map(flat => {
        if (flat.Id === flatId && flat.userId === currentUserId) {
            flat.isFavorite = !flat.isFavorite;

            if (flat.isFavorite) {
                if (!favoriteFlatsDB.find(favFlat => favFlat.Id === flatId)) {
                      favoriteFlatsDB.push(flat);}
            } else {
                favoriteFlatsDB = favoriteFlatsDB.filter(favFlat => favFlat.Id !== flatId);
            }
        }
        return flat;
    });

    localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
    localStorage.setItem('favoriteFlatsDB', JSON.stringify(favoriteFlatsDB));
    loadFavoriteFlats();
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

import { handleSession, logOut, preventFalseLogout } from "./modules/auth.js";
import { getDB, getUser } from "./modules/fetch.js";