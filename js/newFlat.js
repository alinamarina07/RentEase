const newFlatForm = document.getElementById('newFlatForm');
const nameNewFlat = document.getElementById('nameNewFlat');
const city = document.getElementById('city');
const streetName = document.getElementById('streetName');
const streetNumber = document.getElementById('streetNumber');
const areaSize = document.getElementById('areaSize');
const hasAC = document.getElementById('hasAC');
const yearBuilt = document.getElementById('yearBuilt');
const rentPrice = document.getElementById('rentPrice');
const dateAvailable = document.getElementById('dateAvailable');
const saveBtn = document.getElementById('saveBtn');

window.onload = () => {
    handleSession();
    // preventFalseLogout();
};

let usersDB = getDB('usersDB');

function validateForm() {
    let isValid = true;
    let errorMessages = [];

    if (nameNewFlat.value.trim() === '') {
        isValid = false;
        errorMessages.push('Please enter a name');
    }

    if (city.value.trim() === '') {
        isValid = false;
        errorMessages.push('Please enter a city');
    }

    if (streetName.value.trim() === '') {   
        isValid = false;
        errorMessages.push('Please enter a street name');
    }

    if (streetNumber.value.trim() === '' || isNaN(streetNumber.value)) {
        isValid = false;
        errorMessages.push('Please enter a street number');
    }

    if (areaSize.value.trim() === '' || isNaN(areaSize.value)) {
        isValid = false;
        errorMessages.push('Please enter an area size');
    }

    if (yearBuilt.value.trim() === '' || isNaN(yearBuilt.value)) {
        isValid = false;
        errorMessages.push('Please enter a year built');
    }

    if (rentPrice.value.trim() === '' || isNaN(rentPrice.value)) {
        isValid = false;
        errorMessages.push('Please enter a rent price');
    }

    if (dateAvailable.value.trim() === '') {
        isValid = false;
        errorMessages.push('Please enter a date available');
    }

    if (!isValid) {
        alert(errorMessages.join('\n'));
    }

    return isValid;
}

// let flatsDB = JSON.parse(localStorage.getItem('flatsDB')) || [];
let flatsDB = getDB('flatsDB');

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
    
    const flats = {
        Id : uid(),
        nameNewFlat: nameNewFlat.value,
        city: city.value,
        streetName: streetName.value,
        streetNumber: streetNumber.value,
        areaSize: areaSize.value,
        hasAC: hasAC.checked,
        yearBuilt: yearBuilt.value,
        rentPrice: rentPrice.value,
        dateAvailable: dateAvailable.value,
        // createdBy: getUser().email,
        };

    flatsDB.push(flats);
    localStorage.setItem('flatsDB', JSON.stringify(flatsDB));
    alert('Flat added successfully');
    nameNewFlat.value = '';
    city.value = '';
    streetName.value = '';
    streetNumber.value = '';
    areaSize.value = '';
    hasAC.checked = false;
    yearBuilt.value = '';
    rentPrice.value = '';
    dateAvailable.value = '';

    window.location.href = 'allFlats.html';
});

import { getDB, getUser } from "./modules/fetch.js";
import {uid} from "./modules/id.js";
import {preventFalseLogout, handleSession} from "./modules/auth.js"