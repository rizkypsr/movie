const menuBtn = document.querySelector("#menu-button");
const navbar = document.querySelector("nav");

const form = document.querySelector("form");
const usernameInput = form.elements.namedItem("username");

const usernameBtn = document.querySelector("#username");
const modalLogin = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");

window.addEventListener("load", checkAccount);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    setAccountLocalStorage(usernameInput.value);
    modalLogin.classList.toggle("show-modal");
    e.target.reset();
});

usernameInput.addEventListener("input", (e) => {
    const loginBtn = document.querySelector("#login-btn");
    const errorInfo = document.querySelector("#error-user");
    const usernameLocal = getAccountLocalStorage();
    const target = e.target;

    if (target.name == "username") {
        if (usernameLocal.includes(target.value)) {
            loginBtn.disabled = true;
            errorInfo.innerHTML = "Username has already taken";
            errorInfo.style.display = "block";
        } else {
            loginBtn.disabled = false;
            errorInfo.style.display = "none";
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
    const errorInfo = document.querySelector("#error-user");
    const username = getAccountLocalStorage();

    if (!username.includes(uname)) {
        username.push(uname);
        localStorage.setItem("username", JSON.stringify(username));
        usernameBtn.innerText = uname;
    } else {
        errorInfo.innerHTML = "Username has already taken";
        errorInfo.style.display = "block";
    }
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
