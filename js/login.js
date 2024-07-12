const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const registerLink = document.getElementById('registerLink');

let arrayofusers = JSON.parse(localStorage.getItem('arrayofusers')) || [];

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginUser();

});


function loginUser() {
    const verificationUser = arrayofusers.find(
        (user) => user.email === email.value.trim() && user.password === password.value.trim()
    );

    if (verificationUser) {
        localStorage.setItem('currentUser', JSON.stringify(verificationUser));
        alert('Login successful');
        window.location.href = 'homePage.html';
    } else {
        alert('Invalid email or password');
    }
}

