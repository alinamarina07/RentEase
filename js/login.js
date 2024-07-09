loginForm = document.getElementById('loginForm');
email = document.getElementById('email');
emailError = document.getElementById('emailError');
password = document.getElementById('password');
passwordError = document.getElementById('passwordError');
loginBtn = document.getElementById('loginBtn');
registerLink = document.getElementById('registerLink');

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