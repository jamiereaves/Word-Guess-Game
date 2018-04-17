//create an array of potential answers and assign to the variable words
var words = ["jerry", "elaine", "costanza", "festivus", "frogger", "kramer", "newman"];
//generate a random number between 0 and the highest array index.  assign this to the variable choice
var choice = Math.floor(Math.random()*7);
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

//create a function to display "_" for each letter in the randomly chosen word
var initialView = function(){
    //for loop that creates a "_" for each letter in the word
    for (var i=0; i < answerLength; i++) {
        //for each i above, display "_"
        display[i]="_ ";
        //add this "_" to the output for each i above
        output = output + display[i];
    }
    //display the resultant output in the div with id=gameDisplay
    document.getElementById("gameDisplay").innerHTML = output;
    document.getElementById("guessBox").innerHTML = "you have " + guesses + " guesses left.";
    //reset output
    output = "";
}

window.onload = function(){
    initialView();
}
//create function that runs when the user keys a guess
document.onkeyup = function(event){
    output="";
    //wrong="";
    //store this value as userGuess
    userGuess=event.key;
    //change the letter to lower case to avoid caps lock errors
    userGuess.toLowerCase();
    //add letter to wrong guess collection
    wrong = wrong + userGuess + " ";
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
        output = output + display[d] + " ";
        
        }

        //decrease number of available guesses by one    
        guesses--
        //display the resultant output in the div with id=gameDisplay
        document.getElementById("gameDisplay").innerHTML = output;
        //display wrong guesses (if any) in div w. id=wrongLetterBox
        document.getElementById("wrongLetterBox").innerHTML = wrong;
        //display number of remaining guesses
        document.getElementById("guessBox").innerHTML = "you have " + guesses + " guesses left.";
        //reset output and wrong
        output = "";
        //wrong = "";

        //check if the user wins (the condition for this is if there are fewer than 1 guesses needed to win)
        if (g2Win < 1){
            alert("You Win!!!!");
            initialView();
        }

        else if (guesses < 1){
            alert("You Lose.")
        }
    
}