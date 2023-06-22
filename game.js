const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsZise;

function setCanvasSize() {
    
    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    }else {
        canvasSize = window.innerHeight * 0.7;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsZise = canvasSize / 10; 
    
    startGame();
    
}


function startGame() {

    console.log({canvasSize,elementsZise});

    game.font= elementsZise + 'px Verdana';
    game.textAlign= 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows,mapRowCols});

    for (let row = 1; row <= 10 ; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsZise * col , elementsZise * row);
        } 
    }

    // window.innerHeight
    // window.innerWidth
    // game.fillRect(0,50,100,100);
    // game.clearRect(50,50,50,50);
    // game.clearRect(,0,50,50);
    // game.font='25px Verdana';
    // game.fillStyle='purple';
    // game.textAlign ='left';
    // game.fillText('Platzi',5,25);
}