function toggleNav(){
    document.querySelector('.menu').classList.toggle('active')
}

// Event listener to open and close the navbar when menu icon is clicked
document.querySelector('.hamburger-menu').addEventListener('click', function () {
    toggleNav()
})

// Event listener to close the navbar when a link is clicked
document.querySelectorAll('.menu a').forEach( (item) => {
    item.addEventListener('click', function() {
        if(document.querySelector('.menu').classList.contains('active')){
            toggleNav()
        }
    })
})

// Event listener to close the navbar when clicked outside
document.addEventListener('click', function(event){
    let target = event.target
    let navbar = document.querySelector('.menu')
    let hamburgerMenu = document.querySelector('.hamburger-menu')
    
    // Close navbar if click 
    if(!navbar.contains(target) && !hamburgerMenu.contains(target) && navbar.classList.contains('active')){
        toggleNav()
    }
})