const navbar = document.querySelector(".navbar");
const button = document.querySelector(".button");
const urls = document.querySelectorAll(".pages a");
const socials = document.querySelectorAll(".social a");

button.addEventListener("click", () => {
    button.classList.toggle("active");
    navbar.classList.toggle("active");

    if (button.classList.value.includes("active")) {
        button.innerHTML = `<i class="fas fa-times"></i>`
    } else {
        button.innerHTML = `<i class="fas fa-bars"></i>`;
    };

});

urls.forEach(btn => {
    btn.addEventListener("click", () => {
        navbar.classList.remove("active")
    })
})

socials.forEach(btn => {
    btn.addEventListener("click", () => {
        navbar.classList.remove("active")
    })
})