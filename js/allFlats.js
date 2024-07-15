const welcome = document.getElementById('welcome');
const logOutBtn = document.getElementById('logOutBtn');
const filter = document.getElementById('filter');
const city = document.getElementById('city');
const priceRangeMin = document.getElementById('priceRangeMin');
const priceRangeMax = document.getElementById('priceRangeMax');
const areaSizeRangeMin = document.getElementById('areaSizeRangeMin');
const areaSizeRangeMax = document.getElementById('areaSizeRangeMax');
const filterBtn = document.getElementById('filterBtn');
const sort = document.getElementById('sort');
const sortBy = document.getElementById('sortBy');
const sortBtn = document.getElementById('sortBtn');
const allFlatsTitle = document.getElementById('allFlatsTitle');
const toggleFavorite = document.getElementById('toggleFavorite');

let {firstName, lastName, email, password} = JSON.parse(localStorage.getItem('currentUser'));
welcome.textContent = `Welcome, ${firstName} ${lastName}!`;

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});
