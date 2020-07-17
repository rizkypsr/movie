const menuBtn = document.querySelector("#menu-button");
const navbar = document.querySelector("nav");

const form = document.querySelector("form");
const usernameInput = form.elements.namedItem("name");

const usernameBtn = document.querySelector("#name");
const modalLogin = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const loginBtn = document.querySelector("#login-btn");

let isNameExist;

window.addEventListener("load", checkAccount);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    setAccountLocalStorage(usernameInput.value);
    modalLogin.classList.toggle("show-modal");
    e.target.reset();
});

usernameInput.addEventListener("input", (e) => {
    const storedName = getAccountLocalStorage();

    if (e.target.value.length >= 3) {
        loginBtn.disabled = false;
        usernameInput.classList.add("valid");
        usernameInput.classList.remove("invalid");
    } else {
        loginBtn.disabled = true;
        usernameInput.classList.add("invalid");
        usernameInput.classList.remove("valid");
    }

    isNameExist = storedName.includes(e.target.value);
});

menuBtn.addEventListener("click", () => {
    showNavbar();
});

usernameBtn.addEventListener("click", () => {
    showNavbar();
    loginBtn.disabled = true;
    modalLogin.classList.toggle("show-modal");
});

closeModal.addEventListener("click", () => {
    modalLogin.classList.remove("show-modal");
});

function checkAccount() {
    const storedUsername = getAccountLocalStorage();

    if (storedUsername.length != 0) {
        modalLogin.classList.remove("show-modal");
    } else {
        modalLogin.classList.add("show-modal");
    }
}

function setAccountLocalStorage(uname) {
    const username = getAccountLocalStorage();

    if (!isNameExist) {
        username.push(uname);
        localStorage.setItem("username", JSON.stringify(username));
    }
    usernameBtn.innerText = uname;
}

function getAccountLocalStorage() {
    let storedUsername = [];

    if (localStorage.getItem("username") != null) {
        storedUsername = JSON.parse(localStorage.getItem("username"));
    }

    return storedUsername;
}

function showNavbar() {
    const windowWidth = window.innerWidth;
    const navbarWidth = navbar.offsetWidth;

    const posLeft = `${(windowWidth - navbarWidth).toString()}px`;

    if (menuBtn.getAttribute("src") == "img/icons8-menu-30.png") {
        menuBtn.setAttribute("src", "img/close.png");
    } else {
        menuBtn.setAttribute("src", "img/icons8-menu-30.png");
    }

    if (menuBtn.style.left == "") {
        menuBtn.style.left = posLeft;
    } else {
        menuBtn.style.left = "";
    }

    navbar.classList.toggle("show-up");
}
