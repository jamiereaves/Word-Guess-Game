//create an array of potential answers and assign to the variable words
var words = ["jerry", "elaine", "costanza", "festivus", "frogger", "kramer", "newman", "puddy", "pez"];
//create an array of associated hint images
var hints =["assets/images/jerryhint.gif", 
"assets/images/elainehint.gif", 
"assets/images/costanzahint.gif", 
"assets/images/festivushint.gif", 
"assets/images/froggerhint.gif",
"assets/images/kramerhint.gif", 
"assets/images/newmanhint.gif", 
"assets/images/puddyhint.gif", 
"assets/images/pezhint.gif"
];
//generate a random number between 0 and the highest array index.  assign this to the variable choice
var choice = Math.floor(Math.random()*9);
//use this random number to select an element of the array. assign this to the variable answer.
var answer = words[choice];
//determine the length of the chosen word. assign this to the variable answerLength.
var answerLength = answer.length;
//set up wins counter
var wins = 0;
//set up guesses counter
var guesses = answerLength + 6;
//set up guesses to win counter (i.e. how many correct guesses will lead to a win this is equivalent to the number of letters in the chosen word (answerLength))
var g2Win = answerLength;
//split the random word into an array of it's constituent letters
var ansLetters = answer.split('');
//display "_" for each letter of the random word
var display = [answerLength];
//create a variable to hold the output (i.e. the chosen word, with missing letters disguised/revealed as appropriate)
var output = "";
//create a variable to hold the user guess
var userGuess = "";
//create a variable to hold wrong guesses
var wrong = "";
//create a variable to hold used letters
var usedLetters = [];
//create a variable to hold victory/defeat music
var victory = new Audio("assets/images/winner.mp3");
var defeat = new Audio("assets/images/loser.mp3");

//create a function to display "_" for each letter in the randomly chosen word
var initialView = function(){
    //for loop that creates a "_" for each letter in the word
    for (var i=0; i < answerLength; i++) {
        //for each i above, display "_ "
        display[i]="_ ";
        //add this "_ " to the output for each i above i.e. for each letter in the word
        output += display[i];
    }
    //display the resultant output in the div with id=gameDisplay
    document.getElementById("gameDisplay").innerHTML = output;
    //display the initial number of guesses in the div with id=guessBox
    document.getElementById("guessBox").innerHTML = "guesses remaining: " + guesses;
    //display initial instructions in div with id=messageBox
    document.getElementById("messageBox").innerHTML = "press any key to guess a letter and start the game";
    //display number of wins
    document.getElementById("winBox").innerHTML = "number of wins: " + wins;
    //set default game image
    document.getElementById("gameImg").src = "assets/images/default.gif"
    //reset output
    output = "";
}

//function called resetVars that resets the global variables.
var resetVars =function(){
    words = ["jerry", "elaine", "costanza", "festivus", "frogger", "kramer", "newman", "puddy", "pez"];
    choice = Math.floor(Math.random()*9);
    answer = words[choice];
    answerLength = answer.length;
    guesses = answerLength + 6;
    g2Win = answerLength;
    ansLetters = answer.split('');
    display = [answerLength];
    output = "";
    userGuess = "";
    wrong = "";
    usedLetters = [];   
}

/*function called resetTriggers that triggers the reset after win/loss (win preferred) and
terminates the key triggered function in both cases.*/
var resetTriggers = function(){
    if (g2Win<1){
        resetVars();
        initialView();
        return;
        }
    else if (guesses<1){
        resetVars();
        initialView();
        return;
        }
    }

//function called hintClick that changes the default image to an image of a hint for any given answer
var hintClick = function(){
    for (var a=0; a < words.length; a++){
        if (answer == words[a]){
            document.getElementById("gameImg").src = hints[a];
        }
    } 
}


//sets initial game board when loading page.
window.onload = function(){
    initialView();
}



    

//create function that runs when the user keys a guess
document.onkeyup = function(event){
    //store this value as userGuess
    keyPress=event.key;
    //change the letter to lower case to avoid caps lock errors
    userGuess = keyPress.toLowerCase();
    //call program resetTriggers
    resetTriggers();
    //hide instructions during gameplay
    document.getElementById("messageBox").style.visibility= "hidden";
    //reset output so it doesn't keep adding to the gameDisplay
    output="";
    //add letter to wrong guess collection
    wrong = wrong + userGuess + " ";
    //block repeats
    for (var c=0; c < usedLetters.length; c++){
        if (userGuess == usedLetters[c]){
        alert("This letter has already been guessed");
        //remove this guess from the variable wrong so there aren't duplicates in the wrong letter
        //box
        wrong = wrong.replace(userGuess, "");
        //exit function
        return;
        }
    
}
    //for loop that compares user guess to each element of ansLetters (random word broken into array of constituent letters)
    for (var d=0; d < answerLength; d++){
        //compare userGuess to each letter of the answer: if it matches,
        if (userGuess == ansLetters[d]){
            //replace corresponding "_" with the letter guessed
            display[d] = userGuess;
            //decrease guesses to win
            g2Win--;
            //remove userGuess from the wrong guess collection
            wrong = wrong.replace(userGuess, "");
        }
        //change output to reflect correct guess
        output += display[d] + " ";
        usedLetters.push(userGuess);
        }
    //decrease number of available guesses by one    
    guesses--
    //display the resultant output in the div with id=gameDisplay
    document.getElementById("gameDisplay").innerHTML = output;
    //display wrong guesses (if any) in div w. id=wrongLetterBox
    document.getElementById("wrongLetterBox").innerHTML = wrong;
    //display number of remaining guesses
    document.getElementById("guessBox").innerHTML = "guesses remaining: " + guesses;
    //reset output
    output = "";

    /*check if the user wins (the condition for this is if there are fewer than 1 
    guesses needed to win)*/
    if (g2Win < 1){
        //add to win counter
        wins++;
        //update win counter display
        document.getElementById("winBox").innerHTML = "number of wins: " + wins;
        //make message box visible for win message
        document.getElementById("messageBox").style.visibility= "visible";
        //set text for win message
        document.getElementById("messageBox").innerHTML = "you win!! press any key to play again.";
        //hide the hint button
        document.getElementById("hintButton").style.display = "none";
        //change image to celebration image
        document.getElementById("gameImg").src = "assets/images/winner.gif";
        //play victory music
        victory.play();
        }
    /*check if the user has lost (i.e. fewer than one guess available). if time allows, would like
    to add condition for unwinnable game (g2Win<guesses +1)*/
    else if (guesses < 1){
        //make message box visible for loss message
        document.getElementById("messageBox").style.visibility= "visible";    
        //set text for loss message
        document.getElementById("messageBox").innerHTML = "you lose...press any key to play again";
        //hide hint button
        document.getElementById("hintButton").style.display = "none";
        //change image to consolation image
        document.getElementById("gameImg").src = "assets/images/loser.gif";
        //play defeat music
        defeat.play();
        }
    /*check if the user needs a hint (if the guesses to win is equal to (or one less than in the 
    case of repeat letters) the guesses left)*/    
    else if (g2Win >= guesses){
        //reveal hint button
        document.getElementById("hintButton").style.display = "inline-block";
        //change image to hint encouragement image
        document.getElementById("gameImg").src = "assets/images/hint.gif"
        }   
    
}