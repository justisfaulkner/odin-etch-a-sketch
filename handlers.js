const handlersArray = [
    setPixelSize,
    blackPenHandler,
    randomPenHandler,
    whitePenHandler,
    gradientPenHandler
]

export function clickedOptionHandler(e) {
    const gridItems = document.querySelectorAll(".grid-item");

    if (e.target.id === "") {
        return;
    } else if (e.target.id === "set-pixel-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handler) => {
                item.removeEventListener("mouseenter", handler);
            });
            item.addEventListener("mouseenter", setPixelSize)
        });
    } else if (e.target.id === "use-black-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handler) => {
                if (handler != blackPenHandler) item.removeEventListener("mouseenter", handler);
            });
            item.addEventListener("mouseenter", blackPenHandler);
        })
    } else if (e.target.id === "use-white-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handler) => {
                item.removeEventListener("mouseenter", handler)
            });
            item.addEventListener("mouseenter", whitePenHandler)
        })
    } else if (e.target.id === "use-random-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handler) => {
                item.removeEventListener("mouseenter", handler)
            });
            item.addEventListener("mouseenter", randomPenHandler)
        })
    } else if (e.target.id === "use-gradient-button") {
        gridItems.forEach((item) => {
            handlersArray.forEach((handler) => {
                item.removeEventListener("mouseenter", handler)
            });
            item.addEventListener("mouseenter", gradientPenHandler)
        })
    }
}

function setPixelSize() {
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

function blackPenHandler(e) {
    e.target.backgroundColor = "black"
}

function randomPenHandler(e) {
    const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    e.target.style.backgroundColor = randomColor;
}

function whitePenHandler(e) {
    e.target.style.backgroundColor = "white"
}

function gradientPenHandler(e) {

}