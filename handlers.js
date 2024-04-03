import { userPixelSize } from "./scripts.js"

const handlersArray = [
    { "mouseenter": blackPenHandler },
    { "mouseenter": randomPenHandler },
    { "mouseenter": whitePenHandler },
    { "mouseenter": gradientPenHandler }
]

export function clickedOptionHandler(e) {
    const gridItems = document.querySelectorAll(".grid-item");

    if (e.target.id === "") {
        return;
    } else if (e.target.id === "use-black-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handlerObj) => {
                const key = Object.keys(handlerObj)[0];
                const value = handlerObj[key]
                item.removeEventListener(key, value);
            });
            counter = 0;
            item.addEventListener("mouseenter", blackPenHandler);
        });
    } else if (e.target.id === "use-white-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handlerObj) => {
                const key = Object.keys(handlerObj)[0];
                const value = handlerObj[key]
                item.removeEventListener(key, value);
            });
            counter = 0;
            item.addEventListener("mouseenter", whitePenHandler);
        });
    } else if (e.target.id === "use-random-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handlerObj) => {
                const key = Object.keys(handlerObj)[0];
                const value = handlerObj[key]
                item.removeEventListener(key, value);
            });
            counter = 0;
            item.addEventListener("mouseenter", randomPenHandler);
        });
    } else if (e.target.id === "use-gradient-button") {
        gridItems.forEach((item, index) => {
            handlersArray.forEach((handlerObj) => {
                const key = Object.keys(handlerObj)[0];
                const value = handlerObj[key]
                item.removeEventListener(key, value);
            });
            counter = 0;
            item.addEventListener("mouseenter", gradientPenHandler);
        });
    }
}

function blackPenHandler(e) {
    e.target.style.opacity = 1;
    e.target.backgroundColor = "black"
}

function randomPenHandler(e) {
    e.target.style.opacity = 1;
    const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    console.log(randomColor)
    e.target.style.backgroundColor = randomColor;
}

function whitePenHandler(e) {
    e.target.style.opacity = 1;
    e.target.style.backgroundColor = "white"
}

let counter = 0;
function gradientPenHandler(e) {
    e.target.style.backgroundColor = "black";
    if (userPixelSize < 15) {
        e.target.style.opacity = counter / 2500;
    } else if (userPixelSize <= 30) { 
        e.target.style.opacity = counter / 750;
    } else if (userPixelSize <= 50) { 
        e.target.style.opacity = counter / 500;
    } else if (userPixelSize >= 50) {
        e.target.style.opacity = counter / 100;
    }
    counter++;
}