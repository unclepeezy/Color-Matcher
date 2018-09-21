//   ******************VARIABLES*******************

var difficulty = 6; // Number of colors
var bgColor = "#232323"; // Background color
var headingBgColor = "#69f"; // Heading default color
var colors = []; // Color pallet to be displayed. Size varies
var squares = document.getElementsByClassName("square"); // Tiles onscreen to hold colors
var desiredColor = ""; // The color that is to be matched
var desiredColorDisplay = document.getElementById("colorDisplay"); // The area onscreen displaying the desired color's rgb value
var heading = document.querySelector("h1"); // The heading at the top of the page
var messageDisplay = document.querySelector("#message"); // Area on screen to display textual click feedback
var newColorsBtn = document.querySelector("#resetBtn"); // The onscreen button for getting new colors
var easyBtn = document.querySelector("#easyDiff"); // The onscreen button for making the difficulty easy
var hardBtn = document.querySelector("#hardDiff"); // The onscreen button for making the difficulty hard

//   *****************BUTTON EVENTS*****************

// Change colors on screen and desired color
newColorsBtn.addEventListener("click", function(){ newGame(difficulty); });

// Only show 3 colors
easyBtn.addEventListener("click", function(){
    // Check if the difficulty is on hard
    if(difficulty == 6) {
        // Hide the last 3 squares
        for (var lastThree = 3; lastThree < 6; lastThree++)
            squares[lastThree].hidden = true;

        //Set the number of square colors to 3
        difficulty = 3;
        newGame(difficulty);
    }
});

// Show 6 colors
hardBtn.addEventListener("click", function(){
    // Check if the difficulty is on easy
    if (difficulty == 3){
        // Show the last 3 squares
        for (var lastThree = 3; lastThree<6; lastThree++)
            squares[lastThree].hidden = false;

        // Set the number of square colors to 6
        difficulty = 6;
        newGame(difficulty);
    }
});

//   ****************SQUARE EVENTS******************

// Add an event listener to every square
for (var s=0; s< difficulty; s++){
    squares[s].addEventListener("click", function(){
        // Retrieve the clicked color
        var clickedColor = this.style.backgroundColor;

        // Notify if the correct color is pressed
        if (clickedColor === desiredColor) {
            messageDisplay.textContent = "Correct!";
            correctClicked();
        }
        // Notify if the incorrect color is pressed
        else {
            // Hide the incorrect color
            this.style.backgroundColor = bgColor;
            messageDisplay.textContent = "Try Again";
        }
    });
}

//   ******************METHODS*********************

// When the desired color is clicked
function correctClicked(){
    // Set every square to the desired color
    for (var index = 0; index < squares.length; index++)
        squares[index].style.backgroundColor = desiredColor;

    // Set the heading background to the desired color
    heading.style.backgroundColor = desiredColor;

    // Change "New Colors" to "Play Again"
    newColorsBtn.textContent = "Play Again";
}

// Generate colors for the squares
function generateColors(num){
    // Create a local function for generating a random RGB value
    function rgbGenerate(){ return Math.floor(Math.random() * 256);}

    // Create an empty array to hold generated colors
    var tempArr = [];

    // Populate the array with colors
    for (var i = 0; i<num; i++)
        tempArr[i] = "rgb(" +
            rgbGenerate() + ", "+
            rgbGenerate() + ", "+
            rgbGenerate() + ")";

    // Return the temp array of colors
    return tempArr;
}

// Choose a random color from the squares to be the desired color
function randColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

// Apply color to every visible square
function colorSquares(diff){
    for (var i=0; i< diff; i++)
        squares[i].style.backgroundColor = colors[i];
}

// Create the game experience based on the difficulty
function newGame(diff){
    // Set the color array based on the difficulty
    colors = generateColors(diff);

    // Set the desired color to a random color in the colors array
    desiredColor = randColor();

    // Set the heading background color to the page's bg color
    heading.style.backgroundColor = headingBgColor;

    // set message display to an empty string
    messageDisplay.textContent = "";

    // Call color squares to color the squares on screen
    colorSquares(diff);

    // Display the desired color in the heading
    desiredColorDisplay.textContent = desiredColor.toUpperCase();

    // Make sure the "New Colors" button doesn't say "Play Again" anymore
    newColorsBtn.textContent = "New Colors";
}

//   *******************START APPLICATION *********************

newGame(difficulty);