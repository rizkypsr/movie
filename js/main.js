const menuBtn = document.querySelector("#menu-button");
const navbar = document.querySelector("nav");

const form = document.querySelector("form");
const username = form.elements.namedItem("username");

const usernameBtn = document.querySelector("#username");
const modalLogin = document.querySelector(".modal-container");

window.addEventListener("load", checkAccount);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    setAccountLocalStorage(username.value);
    modalLogin.classList.toggle("show-modal");
});

username.addEventListener("input", (e) => {
    const loginBtn = document.querySelector("#login-btn");
    const target = e.target;

    if (target.name == "username") {
        if (target.value.length >= 3) {
            loginBtn.disabled = false;
            target.classList.add("valid");
            target.classList.remove("invalid");
        } else {
            loginBtn.disabled = true;
            target.classList.add("invalid");
            target.classList.remove("valid");
        }
    }
});

menuBtn.addEventListener("click", () => {
    showNavbar();
});

usernameBtn.addEventListener("click", () => {
    showNavbar();
    modalLogin.classList.toggle("show-modal");
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
    const errorInfo = document.querySelector("#error-user");
    const username = getAccountLocalStorage();

    if (!username.includes(uname)) {
        username.push(uname);
        localStorage.setItem("username", JSON.stringify(username));
    } else {
        errorInfo.innerHTML = "Username has already taken";
        errorInfo.style.display = "block";
    }
    console.log(username);
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
        menuBtn.setAttribute("src", "img/icons8-multiply-24.png");
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
