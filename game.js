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

    for (let i = 1; i <= 10 ; i++) {
        game.fillText(emojis['X'], elementsZise , elementsZise * i);
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