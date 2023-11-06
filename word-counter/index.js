#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
console.clear();
console.log(chalk.greenBright(`WELLCOME TO WORDS & CHARACTER COUNTING APPLICATION. \n CREATED BY SYEDA ALINA SULTANA.`));
async function App() {
    const userDataInput = await inquirer.prompt([
        {
            name: "userdata",
            type: "input",
            message: "Enter Your Text: "
        }
    ]);
    let userData = userDataInput.userdata;
    console.log;
    chalk.blueBright(("userdata: " + userData));
    // // //function create words count
    function wordsCounter() {
        let wordsCounter = userData.split(" ").filter(function (element) {
            return element !== "";
        });
        console.log(chalk.magentaBright(`Total Words Are:  ${wordsCounter.length}`));
    }
    wordsCounter();
    // // function create character counting
    function characterCounter() {
        let i = 0;
        let newString = '';
        while (i < userData.length) {
            if (userData[i] != " ") {
                newString = newString + userData[i];
            }
            i++;
        }
        console.log(chalk.magentaBright(`Total Characters Are: ${newString.length}`));
    }
    characterCounter();
    Restart();
}
async function Restart() {
    const userDataRestart = await inquirer.prompt([
        {
            name: "userRestart",
            type: "list",
            message: "Do You Want To Restart Words & Character Counting Application? :",
            choices: ["Yes", "No"]
        }
    ]);
    let userReq = userDataRestart.userRestart;
    if (userReq === "Yes") {
        console.clear();
        App();
    }
    else {
        console.log(chalk.greenBright("THANKS FOR USING MY WORDS & CHARACTER COUNTING APPLICATION......."));
    }
}
App();
