import Logo from './logo.js'
window.onload = draw()

//Image switcher
let myImage = document.querySelector('img')

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/locked-chest.png'){
        myImage.setAttribute('src', 'images/open-chest.png');
        setTimeout(() => alert("Congratulations! You have reached an easter egg!"), 1000)
    }
    else if(mySrc === 'images/open-chest.png'){
        myImage.setAttribute('src', 'images/sad-turtle.png');
    }
    else{
        myImage.setAttribute('src', 'images/locked-chest.png');
    }
}

//Creating Canvas turtle
let turtle = new Logo(150, 150, 270.0);

//and defining its draw function
function drawTurtle(){

    const ctx = canvas.getContext('2d'); //TO DO: think whether this line should be put in a different way
    const cursor = new Image();
        cursor.style.width = '16px'
        cursor.style.height = '16px'
        cursor.onload = function(){
              ctx.drawImage(cursor, turtle.x_position, turtle.y_position, 16, 16);
        }
        cursor.src = "images/icon.png"
}

function cleanTurtle(){
    //replacing the turtle with a rectangle
    const ctx = canvas.getContext('2d'); //TO DO: think whether this line should be put in a different way
    ctx.fillStyle = "#ffdab3";
    ctx.fillRect(turtle.x_position, turtle.y_position, 32, 32);
}

//canvas graphics

function draw(){

    const canvas = document.getElementById('canvas');
    
    if (canvas.getContext){
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#ffdab3";
        ctx.fillRect(0,0, canvas.width, canvas.height);
 
        // ctx.fillStyle = "black";
        // ctx.moveTo(90, 130);
        // ctx.lineTo(95, 25);
        // ctx.lineTo(150, 80);
        // ctx.lineTo(205, 25);
        // ctx.lineTo(210, 130);
        // ctx.lineWidth = 2;
        // ctx.stroke();
    
        drawTurtle()
    }
    else{
        //Canvas not supported
    }
}

//reset button - Clear canvas
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetBoard)

function resetBoard(){
    const canvas = document.getElementById('canvas');
    //console.log(canvas)
    const ctx = canvas.getContext('2d');
    console.log(ctx)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = "#ffdab3";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    turtle.x_position = 150
    turtle.y_position = 150
    turtle.angle = 270
    ctx.moveTo(turtle.x_position, turtle.y_position)
    ctx.lineWidth = 0;
    //here, logo turtle needs to be drawn
    drawTurtle()
    //ctx.moveTo(turtle.x_position, turtle.y_position)
 
}

//I wanted to use some event bubbling here - but I am gonna leave it for future


//button at the bottom - selected by its ID
const authorButton = document.getElementById("author-button");

authorButton.addEventListener('click', updateName);

function updateName() {
    const input = document.getElementById("author-input")
    if(input){
        input.style = "display: inline-block";
    }
}

const temp = document.getElementById("author-input");
temp.addEventListener('keydown', myFunction);

function myFunction(e){
    console.log(e)
    if (e.key === "Enter")
    authorButton.textContent = 'Author: ' + temp.value;
}

//buttons at the bottom - by class
const buttonElements = document.getElementsByClassName("decision-button")
const inputElements = document.querySelectorAll(".my-input")

for (let i = 0; i < buttonElements.length; i++){
    console.log(buttonElements[i]);
    buttonElements[i].addEventListener('click', (e) => revealInput(e, i));
    //inputElements[i].
}

function revealInput(e, i ){
    console.log(inputElements)
    const input = inputElements[i];
    input.style = "display: inline-block";
    console.log(input)

}

//rotate left input - event listener
const leftInput = document.getElementById('left-input')
leftInput.addEventListener('keydown', leftInputFunction)

function leftInputFunction(e){
    if (e.key === "Enter"){
        turtle.rotate_left(leftInput.value)
        //TO DO: Here our turtle should be turned and redrawn
        drawTurtle()
    }
}

//rotate right input - event listener
const rightInput = document.getElementById('right-input')
rightInput.addEventListener('keydown', rightInputFunction)

function rightInputFunction(e){
    if (e.key === "Enter"){
        turtle.rotate_right(rightInput.value)
        //TO DO: Here our turtle should be turned and redrawn
        drawTurtle()
    }
}

//forward input - event listener
const forwardInput = document.getElementById('forward-input')
forwardInput.addEventListener('keydown', forwardInputFunction)

function forwardInputFunction(e){
    if (e.key === "Enter"){

        cleanTurtle();
        const ctx = canvas.getContext('2d');
        ctx.moveTo(turtle.x_position, turtle.y_position)
        if(turtle.keep_drawing){
            ctx.fillStyle = "black";
            const [x,y] = turtle.forward(forwardInput.value) 
            console.log(x,y)
            ctx.lineTo(x, y)
            ctx.lineWidth = 2;
            ctx.stroke();
            //turtle.forward(forwardInput.value)
            //TO DO: Here out turtle should be turned and redrawn

        }
        else{
            turtle.forward(forwardInput.value) 
        }
        drawTurtle()
        //ctx.moveTo(turtle.x_position, turtle.y_position)
    
    }
}

//stop drawing button
const stopDrawingButton = document.getElementById('stop-drawing-button');
stopDrawingButton.addEventListener('click', stopDrawing)

function stopDrawing(){
    turtle.keep_drawing = false
 
}

//start drawing button
const startDrawingButton = document.getElementById('start-drawing-button');
startDrawingButton.addEventListener('click', startDrawing)

function startDrawing(){
    turtle.keep_drawing = true
 
}