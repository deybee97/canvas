
const createSquare = (iframeDoc) => {

    const squareSize = 50;
    const posX = 10;
    const posY = 10;
  
    const square = iframeDoc.createElement('div');
    square.style.position = 'absolute';
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.left = `${posX}px`;
    square.style.top = `${posY}px`;
    square.style.backgroundColor = 'red';
    square.classList.add("square")
    
    return square
}