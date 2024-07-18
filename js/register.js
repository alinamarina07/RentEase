const registerForm = document.getElementById('registerForm');
const firstName = document.getElementById('firstName');
const firstNameError = document.getElementById('firstNameError');
const lastName = document.getElementById('lastName');
const lastNameError = document.getElementById('lastNameError');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const dateOfBirth = document.getElementById('dateOfBirth');
const dateOfBirthError = document.getElementById('dateOfBirthError');
const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const registerBtn = document.getElementById('registerBtn');
const loginLink = document.getElementById('loginLink');

window.onload = () => {
    preventBack();
}
let usersDB = getDB('usersDB');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let isValid = true;

    firstNameError.textContent = '';
    lastNameError.textContent = '';
    emailError.textContent = '';
    dateOfBirthError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';


    if (firstName.value.trim() === '') {
        firstNameError.textContent = 'Please enter your first name';
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        firstNameError.textContent = 'First name must be at least 2 characters';
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        lastNameError.textContent = 'Please enter your last name';
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        lastNameError.textContent = 'Last name must be at least 2 characters';
        isValid = false;
    }

    if (email.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        isValid = false;
    } else if (!email.value.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (dateOfBirth.value.trim() === '') {
        dateOfBirthError.textContent = 'Please enter your date of birth';
        isValid = false;
    } else {
        let today = new Date();
        let birthDate = new Date(dateOfBirth.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18 || age > 100) {
            dateOfBirthError.textContent = 'Age must be between 18 and 100';
            isValid = false;
        } else {
            dateOfBirthError.textContent = '';
        }
    }

    let hasLowerCase = /[a-z]/.test(password.value.trim());
    let hasUpperCase = /[A-Z]/.test(password.value.trim());
    let hasNumber = /[0-9]/.test(password.value.trim());
    let hasSpecialChar = /[^a-zA-Z0-9]/.test(password.value.trim());
    let hasMinLength = password.value.trim().length >= 6;

    if (password.value.trim() === '') {
        passwordError.textContent = 'Please enter your password';
        isValid = false;
    } else if (!hasLowerCase) {
        passwordError.textContent = 'Password must contain at least one lowercase letter';
        isValid = false;
    } else if (!hasUpperCase) {
        passwordError.textContent = 'Password must contain at least one uppercase letter';
        isValid = false;
    } else if (!hasNumber) {
        passwordError.textContent = 'Password must contain at least one number';
        isValid = false;
    } else if (!hasSpecialChar) {
        passwordError.textContent = 'Password must contain at least one special character';
        isValid = false;
    } else if (!hasMinLength) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        isValid = false;
    } else if (confirmPassword.value.trim() === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        isValid = false;
    } else if (confirmPassword.value.trim() !== password.value.trim()) {
        confirmPasswordError.textContent = 'Passwords do not match';
        isValid = false;
    };


    if (isValid) {
        registerUser();
    }

});

function registerUser() {
    let user = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        dateOfBirth: dateOfBirth.value.trim(),
        password: password.value.trim()
    };
    usersDB.push(user);
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
    alert('User registered successfully');
    window.location.href = 'login.html';
    }


import { getDB } from './modules/fetch.js';
import { preventBack } from './modules/auth.js';