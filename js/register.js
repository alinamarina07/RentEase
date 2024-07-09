registerForm = document.getElementById('registerForm');
firstName = document.getElementById('firstName');
firstNameError = document.getElementById('firstNameError');
lastName = document.getElementById('lastName');
lastNameError = document.getElementById('lastNameError');
email = document.getElementById('email');
emailError = document.getElementById('emailError');
dateOfBirth = document.getElementById('dateOfBirth');
dateOfBirthError = document.getElementById('dateOfBirthError');
password = document.getElementById('password');
passwordError = document.getElementById('passwordError');
confirmPassword = document.getElementById('confirmPassword');
confirmPasswordError = document.getElementById('confirmPasswordError');
registerBtn = document.getElementById('registerBtn');
loginLink = document.getElementById('loginLink');

let arrayofusers = JSON.parse(localStorage.getItem('arrayofusers')) || [];

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerUser();

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

});

function registerUser() {
    let user = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        dateOfBirth: dateOfBirth.value.trim(),
        password: password.value.trim()
    };
    arrayofusers.push(user);
    localStorage.setItem('arrayofusers', JSON.stringify(arrayofusers));
    alert('User registered successfully');
    window.location.href = 'login.html';
    }


