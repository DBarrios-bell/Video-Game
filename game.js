const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector("#lives");
const spanTimes= document.querySelector("#times");
const spanRecord= document.querySelector("#record");
const pResult= document.querySelector("#result");

let canvasSize;
let elementsSize;
let level = 0;
let lives =3;

let timeStart;
let timePlayer;
let timeInterval;


const playerPosition ={
    x: undefined,
    y: undefined,
}

const gifPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function fixNumber(n) {
    return Number(n.toFixed(0));
}

function setCanvasSize() {
    
    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    }else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = fixNumber(canvasSize);

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10; 

    elementsSize = fixNumber(elementsSize);

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    
    startGame();
    
}


function startGame() {

    // console.log({canvasSize,elementsSize});

    game.font= elementsSize + 'px Verdana';
    game.textAlign= 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime ,100);
        showRecord();
    }


    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log({map,mapRows,mapRowCols});

    showLives();
    showTime();
    
    enemyPositions = [];
   
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => { 
        row.forEach((col, colI)=>{
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            // posX = fixNumber(posX);
            // posY = fixNumber(posY);

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y) { 
                    playerPosition.x = fixNumber(posX); 
                    playerPosition.y = fixNumber(posY);
                    // console.log({playerPosition});
                }
            }else if(col == 'I'){
                gifPosition.x = fixNumber(posX); 
                gifPosition.y = fixNumber(posY);
            }else if(col == 'X'){
                enemyPositions.push({
                    x: fixNumber(posX),
                    y: fixNumber(posY),
                });
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
    const gifCollisionX = playerPosition.x == gifPosition.x;
    const gifCollisionY = playerPosition.y == gifPosition.y;
    const gifCollision = gifCollisionX && gifCollisionY; 
    // console.log({gifCollisionX,gifCollisionY});

    if (gifCollision) {
       levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy =>{
        const enemyCollisionX = enemy.x == playerPosition.x;
        const enemyCollisionY = enemy.y == playerPosition.y;
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
        
    };

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    lives--;    

    if (lives <= 0) {
        level = 0; 
        lives = 3;
        timeStart = undefined;
    }
    console.log(lives);
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    // alert('Terminaste el juego :p');
    console.log('Terminaste el juego :p');
    clearInterval(timeInterval);

    recordPlayer();
    
   
}

function recordPlayer() {
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'HAS SUPERADO EL RECORD 🎉';
        }else{
            pResult.innerHTML = 'NO SUPERASTE EL RECORD 😂';
            // localStorage.removeItem('record_time',playerTime);
        }
    }else{
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primer juego 🛴';
    }

    console.log({recordTime,playerTime});
}

function showLives() {
    const arrayLives = Array(lives).fill(emojis['HEART']); //llenar el array - fill
    spanLives.innerHTML= "";
    arrayLives.forEach( heart => spanLives.append(heart)); //agregar sin borrar
}

function showTime() {
    spanTimes.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
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
    
    if ((playerPosition.y - elementsSize) < (elementsSize -1)) {
        console.log('bloqueado');
    }else{
        // console.log('mequiero mover hacia arriba');
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft() {
    
    if ((playerPosition.x - elementsSize) < (elementsSize - 1)) {
        console.log('bloqueado');
    }else{
        // console.log('mequiero mover hacia izquierda');
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {
    
    if ((playerPosition.x + elementsSize) > (canvasSize + 1)) {
        console.log('bloqueado');
    }else{
        // console.log('mequiero mover hacia derecha');
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown() {
    
    if ((playerPosition.y + elementsSize) > (canvasSize + 1)) {
        console.log('bloqueado');
    }else{
        // console.log('Voy para abajo');
        playerPosition.y += elementsSize;
        startGame();
    }
}