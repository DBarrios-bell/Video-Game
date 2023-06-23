const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition ={
    x: undefined,
    y: undefined,
}

const gifPosition = {
    x: undefined,
    y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    
    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    }else {
        canvasSize = window.innerHeight * 0.7;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10; 
    
    startGame();
    
}


function startGame() {

    // console.log({canvasSize,elementsSize});

    game.font= elementsSize + 'px Verdana';
    game.textAlign= 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log({map,mapRows,mapRowCols});

    // game.clearRect(0,0,canvasSize, canvasSize);
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => { 
        row.forEach((col, colI)=>{
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y) { 
                    playerPosition.x = posX; 
                    playerPosition.y = posY;
                    // console.log({playerPosition});
                }
            }else if(col == 'I'){
                gifPosition.x = posX; 
                gifPosition.y = posY;
            }
            game.fillText(emoji, posX, posY);
        });
    });

    // for (let row = 1; row <= 10 ; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col , elementsSize * row);
    //     } 
    // }

    // window.innerHeight
    // window.innerWidth
    // game.fillRect(0,50,100,100);
    // game.clearRect(50,50,50,50);
    // game.clearRect(,0,50,50);
    // game.font='25px Verdana';
    // game.fillStyle='purple';
    // game.textAlign ='left';
    // game.fillText('Platzi',5,25);

    movePlayer();
}

function movePlayer() {
    const gifCollisionX = playerPosition.x.toFixed(2) == gifPosition.x.toFixed(2);
    const gifCollisionY = playerPosition.y.toFixed(2) == gifPosition.y.toFixed(2);
    const gifCollision = gifCollisionX && gifCollisionY; 
    // console.log({gifCollisionX,gifCollisionY});

    if (gifCollision) {
        console.log('Subiste de nivel');
    }

    game.fillText(emojis['PLAYER'], playerPosition.x.toFixed(2), playerPosition.y.toFixed(2));
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == "ArrowUp") moveUp();
    else if (event.key == "ArrowLeft") moveLeft();
    else if (event.key == "ArrowRight")moveRight();
    else if (event.key == "ArrowDown") moveDown();
    else console.log("presione solo arriba abajo <-> derecha izquierda");
}

function moveUp() {
    console.log('mequiero mover hacia arriba');

    if ((playerPosition.y - elementsSize) < (elementsSize -1)) {
        console.log('out');
    }else{
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft() {
    console.log('mequiero mover hacia izquierda');

    if ((playerPosition.x - elementsSize) < (elementsSize - 1)) {
        console.log('out');
    }else{
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {
    console.log('mequiero mover hacia derecha');

    if ((playerPosition.x + elementsSize) > (canvasSize + 1)) {
        console.log('out');
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown() {
    console.log('mequiero mover hacia abajo');

    if ((playerPosition.y + elementsSize) > (canvasSize + 1)) {
        console.log('out');
    }else{
        playerPosition.y += elementsSize;
        startGame();
    }
}