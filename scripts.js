const GRID_SIZE = 16;
const GRID_TOTAL = GRID_SIZE * GRID_SIZE;
const gridContainer = document.querySelector(".grid-container");


for (let i = 0; i < GRID_TOTAL; i++) {
    const gridItemDiv = document.createElement("div");
    gridItemDiv.classList.add("grid-item")
    gridItemDiv.setAttribute("data-grid-number", i)

    if (i === 0 || i % GRID_SIZE === 0){
        const gridRowContainer = document.createElement("div");
        gridRowContainer.classList.add("grid-row-wrapper");
        gridContainer.appendChild(gridRowContainer);
        gridRowContainer.appendChild(gridItemDiv);
    } else {
        const currentContainer = gridContainer.lastChild;
        currentContainer.appendChild(gridItemDiv);
    }
}