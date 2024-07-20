const profileUpdateForm = document.getElementById('profileUpdateForm');
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
const profileUpdateBtn = document.getElementById('profileUpdateBtn');

profileUpdateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

document.querySelectorAll('.error').forEach(function (span) {
    span.textContent = '';
});

if (firstName.value.trim() === '') {
    firstNameError.textContent = 'First name is required.';
    isValid = false;
} else if (firstName.value.trim().length < 2) {
    firstNameError.textContent = 'First name must be at least 2 characters long.';
    isValid = false;
}

if (lastName.value.trim() === '') {
    lastNameError.textContent = 'Last name is required.';
    isValid = false;
} else if (lastName.value.trim().length < 2) {
    lastNameError.textContent = 'Last name must be at least 2 characters long.';
    isValid = false;
}

if (email.value.trim() === '') {
    emailError.textContent = 'Email is required.';
    isValid = false;
} else if (!email.value.trim().match(/^\S+@\S+\.\S+$/)) {
    emailError.textContent = 'Invalid email address.';
    isValid = false;
}

if (dateOfBirth.value.trim() === '') {
    dateOfBirthError.textContent = 'Date of birth is required.';
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
        dateOfBirthError.textContent = 'Age must be between 18 and 100.';
        isValid = false;
    }
}

let hasLowerCase = /[a-z]/.test(password.value.trim());
let hasUpperCase = /[A-Z]/.test(password.value.trim());
let hasNumber = /[0-9]/.test(password.value.trim());
let hasSpecialChar = /[^a-zA-Z0-9]/.test(password.value.trim());
let hasMinLength = password.value.trim().length >= 6;

if (password.value.trim() === '') {
    passwordError.textContent = 'Password is required.';
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
}

if (isValid) {
    const profileData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        dateOfBirth: dateOfBirth.value.trim(),
        password: password.value.trim()
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Profile updated successfully!');
    window.location.href = 'homePage.html';
}
});

document.addEventListener('DOMContentLoaded', function() {
const storedProfileData = JSON.parse(localStorage.getItem('profileData'));
if (storedProfileData) {
    firstName.value = storedProfileData.firstName;
    lastName.value = storedProfileData.lastName;
    email.value = storedProfileData.email;
    dateOfBirth.value = storedProfileData.dateOfBirth;
}
});