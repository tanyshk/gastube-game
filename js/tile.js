export class Tile {
    constructor (gridElement, type = 0, val = 0) {
        this.tileElement = document.createElement("div");
        this.tileElement.classList.add("tile");
        
        switch (type) {
            case 0:
                this.tileElement.style.setProperty("background-image", 'url("img/line.svg")');
                break;
            case 1:
                this.tileElement.style.setProperty("background-image", 'url("img/corner.svg")');
                break;
            default:
                break;
        }
        
        this.setValue(val);

        gridElement.append(this.tileElement);
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", x);
        this.tileElement.style.setProperty("--y", y);
    }

    setValue(deg) {
        this.value = deg;
        this.tileElement.style.setProperty("--degree", `${deg * 90}deg`);
    }
}