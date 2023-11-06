#! /usr/bin/env node
import inquirer from 'inquirer';
let score = 0;
console.log("Number Guessing Game");
async function guessNumber() {
    let question = Math.floor(Math.random() * 10);
    let tip;
    if (question % 2 == 0) {
        tip = "Tip = Number is even.";
    }
    else {
        tip = "Tip = Number is odd.";
    }
    const result = await inquirer.prompt([
        {
            type: "number",
            name: "userGuess",
            message: `Guess a number between 1 to 10 (${tip}):`
        }
    ]);
    console.log(`Your guessed is: ${result.userGuess} and System generated number is: ${question}`);
    if (result.userGuess === question) {
        score++;
        console.log(`Congratulations Your answer is correct \n You Win! and your score is ${score}.`);
    }
    else {
        console.log(`Your answer is wrong and your score is ${score} \n Better Luck Next Time.`);
    }
}
async function startLoop() {
    do {
        await guessNumber();
        var again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue?? press y or n:"
        });
    } while (again.restart == "Yes" || again.restart == "Y" || again.restart == "y" || again.restart == "yes");
}
startLoop();
