const r = document.querySelector(":root")
const GRID_SIZE = parseInt(getComputedStyle(r).getPropertyValue("--grid-container-size"));
let initialPixelSize = parseInt(getComputedStyle(r).getPropertyValue("--grid-item-size"));
let itemsPerRow = Math.floor(GRID_SIZE / initialPixelSize);
let total_items = (itemsPerRow * itemsPerRow)
let gridHeightMultiplier = (GRID_SIZE / (initialPixelSize * itemsPerRow));

const gridContainer = document.querySelector(".grid-container");
const pixelSetBtn = document.querySelector("#pixel-set-button");
const resetBtn = document.querySelector("#reset-grid-button");
const eraserBtn = document.querySelector("#toggle-eraser-button");

paintGrid(total_items, itemsPerRow);

pixelSetBtn.addEventListener("click", updateGridSizing);
resetBtn.addEventListener("click", resetGrid);
eraserBtn.addEventListener("click", toggleEraser);

let userPixelSize;

function updateGridSizing() {
    clearGrid();
    userPixelSize = getPixelSize();
    itemsPerRow = Math.floor(GRID_SIZE / userPixelSize);
    total_items = (itemsPerRow * itemsPerRow)
    gridHeightMultiplier = (GRID_SIZE / (userPixelSize * itemsPerRow));
    r.style.setProperty("--grid-item-size", `${userPixelSize}px`);
    r.style.setProperty("--grid-height-multiplier", gridHeightMultiplier);
    paintGrid(total_items, itemsPerRow);
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

    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.classList.add("grid-item-black");
        });
    });
}

function clearGrid() {
    wrappers = document.querySelectorAll(".grid-row-wrapper");
    wrappers.forEach((wrapper) => {
        wrapper.remove();
    })
}

function toggleEraser() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.classList.toggle("grid-item-black");
        });
    });
}

function resetGrid() {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
            item.classList.remove("grid-item-black");
    });
}