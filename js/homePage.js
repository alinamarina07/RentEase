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
    handleSession();
    // preventFalseLogout();
    displayUserName();
    populateCityFilter();
    loadFlats();
};

let {firstName, lastName, email, password} = JSON.parse(localStorage.getItem('currentUser'));
welcome.textContent = `Welcome, ${firstName} ${lastName}!`;

function displayUserName() {
    const user = getUser();
    if (user) {
        welcome.textContent = `Welcome, ${user.email}`;
    }
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
    const flatsDB = getDB('flatsDB');
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
            <td><button class="removeBtn" data-id="${flat.Id}">🗑️</button></td>
        `;
        tBody.appendChild(row);

    });

document.querySelectorAll('.removeBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        removeItemById(btn.getAttribute('data-id'));
    });
});

const removeItemById = (id) => {
    const flatsDB = getDB('flatsDB');
    const updatedFlatsDB = flatsDB.filter(flat => flat.Id !== id);
    localStorage.setItem('flatsDB', JSON.stringify(updatedFlatsDB));
    loadFlats();
}};

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
            <td><button class="removeBtn" data-id="${flat.Id}">🗑️</button></td>
        `;
        tBody.appendChild(row);
    });

        document.querySelectorAll('.removeBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                removeItemById(btn.getAttribute('data-id'));
            });
        });

}

function removeFlat(event) {
    const button = event.target;
    const flatId = button.getAttribute('data-id');
    let flatsDB = getDB('flatsDB');

    flatsDB = flatsDB.filter(flat => flat.Id !== flatId);

    localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
    loadFlats();
}

filterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    applyFiltersAndSorting();
});

document.querySelector('.sort button').addEventListener('click', (event) => {
    event.preventDefault();
    applyFiltersAndSorting();
});

logOutBtn.addEventListener('click', logOut);


import { getDB, getUser } from "./modules/fetch.js";
import { handleSession, preventFalseLogout, logOut } from "./modules/auth.js";