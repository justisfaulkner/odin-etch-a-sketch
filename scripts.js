import { clickedOptionHandler } from "./handlers.js"

const r = document.querySelector(":root")
const GRID_SIZE = parseInt(getComputedStyle(r).getPropertyValue("--grid-container-size"));
let initialPixelSize = parseInt(getComputedStyle(r).getPropertyValue("--grid-item-size"));
let itemsPerRow = Math.floor(GRID_SIZE / initialPixelSize);
let total_items = (itemsPerRow * itemsPerRow)
let gridHeightMultiplier = (GRID_SIZE / (initialPixelSize * itemsPerRow));

const gridContainer = document.querySelector(".grid-container");
const optionsContainer = document.querySelector(".options-container")
const setPixelBtn = document.querySelector("#set-pixel-button");
const resetBtn = document.querySelector("#reset-grid-button");
// const blackPenBtn = document.querySelector("#use-black-button");
// const randomPenBtn = document.querySelector("#use-random-button");
// const eraserBtn = document.querySelector("#use-eraser-button");

paintGrid(total_items, itemsPerRow);
useBlackPen();

optionsContainer.addEventListener("click", clickedOptionHandler);

setPixelBtn.addEventListener("click", updateGridSizing);
resetBtn.addEventListener("click", resetGrid);
// blackPenBtn.addEventListener("click", useBlackPen);
// randomPenBtn.addEventListener("click", useRandomPen);
// eraserBtn.addEventListener("click", useEraser);

export let userPixelSize = 40;

function updateGridSizing() {
    clearGrid();
    userPixelSize = getPixelSize();
    itemsPerRow = Math.floor(GRID_SIZE / userPixelSize);
    total_items = (itemsPerRow * itemsPerRow)
    gridHeightMultiplier = (GRID_SIZE / (userPixelSize * itemsPerRow));
    r.style.setProperty("--grid-item-size", `${userPixelSize}px`);
    r.style.setProperty("--grid-height-multiplier", gridHeightMultiplier);
    paintGrid(total_items, itemsPerRow);
    useBlackPen();
}

function getPixelSize() {
    while (true) {
        let input = prompt("Pixel Size");
        if (input === "") {
            userPixelSize = initialPixelSize;
            break;
        }
        userPixelSize = parseInt(input);
        if (!isNaN(userPixelSize)) {
            if (userPixelSize < 5) userPixelSize = 5;
            if (userPixelSize > 300) userPixelSize = 300;
            break;
        }
    }
    return userPixelSize;
}

function resetGrid() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.style.backgroundColor = "white";
        item.style.opacity = 1;
    });
}

function clearGrid() {
    const wrappers = document.querySelectorAll(".grid-row-wrapper");
    wrappers.forEach((wrapper) => {
        wrapper.remove();
    })
}

function paintGrid(total_items, itemsPerRow) {
    let counter = 0;
    for (let i = 0; i < total_items; i++) {
        const gridItemDiv = document.createElement("div");
        gridItemDiv.classList.add("grid-item")
        gridItemDiv.setAttribute("data-grid-number", i)

        if (i === 0 || i % itemsPerRow === 0) {
            const gridRowContainer = document.createElement("div");
            gridRowContainer.classList.add("grid-row-wrapper");
            gridRowContainer.setAttribute("data-row-number", counter);
            gridContainer.appendChild(gridRowContainer);
            gridRowContainer.appendChild(gridItemDiv);
            counter++;
        } else {
            const currentContainer = gridContainer.lastChild;
            currentContainer.appendChild(gridItemDiv);
        }
    }
}

function useBlackPen() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.className = "grid-item";
            item.style.backgroundColor = "black"
        });
    });
}

function useRandomPen() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.className = "grid-item";
            const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
            // r.style.setProperty("--random-background-color", randomColor);
            // item.classList.add("grid-item-random");
            item.style.backgroundColor = randomColor;
        });
    });
}

function useGradientPen() {
    // code to implement 1% gradient pen
}

function useWhitePen() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.className = "grid-item";
            item.style.backgroundColor = "white"
            item.classList.add("grid-item-white");
        });
    });
}