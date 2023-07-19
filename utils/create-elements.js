const posX = 10;
const posY = 10;

const createSquare = (iframeDoc, position) => {

    const squareSize = 50;
   
  
    const square = iframeDoc.createElement('div');
    square.style.position = 'absolute';
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.left =  position.left ||`${posX}px`;
    square.style.top = position.top || `${posY}px`;
    square.style.backgroundColor = 'red';
    square.classList.add("square")
    
    return square
}


const createCircle = (iframeDoc, position) => {

    console.log(position)

    console.log('called')
    var circle = iframeDoc.createElement('div');
    var circleSize = 50;
    
   
    circle.classList.add('circle')
    circle.classList.add('iframe-element')
    
    circle.style.width = circleSize + 'px';
    circle.style.height = circleSize + 'px';
    circle.style.borderRadius = '50%';
    circle.style.background = 'red';
    circle.style.position = 'absolute';
    circle.style.left = position?.left ||`${posX}px`;
    circle.style.top = position?.top ||`${posY}px`;
    
    return circle
}
