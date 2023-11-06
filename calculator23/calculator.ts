#! /usr/bin/env node

   
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = ()=>{
    return new Promise ((res)=>{
        setTimeout(res, 1800);
    })
}

async function Welcome() {
    let maintitle = chalkAnimation.neon("lets Start Calculation");
    await sleep();
    maintitle.stop();
    console.log(chalk.cyanBright(
`_____________________
|  _________________  |
| | ALINA        0. | |
| |_________________| |
|  ___ ___ ___   ___  |
| | 7 | 8 | 9 | | + | |
| |___|___|___| |___| |
| | 4 | 5 | 6 | | - | |
| |___|___|___| |___| |
| | 1 | 2 | 3 | | x | |
| |___|___|___| |___| |
| | . | 0 | = | | / | |
| |___|___|___| |___| |
|_____________________|`
    ));
}

await Welcome();


async function askQuestion() {
    const answers = await inquirer
    .prompt([
        //Type Your Question Here
        {
            type : "list",
            name : "operator",
            message : "Which Operation Do You Want?",
            choices : ["Addition","Subtraction","Multiplication","Division"]
        },
        {
            type : "number",
            name : "num1",
            message : "Enter First Number Here:"
        },
        {
            type : "number",
            name : "num2",
            message : "Enter Second Number:"
        }
    ])
    if(answers.operator == "Addition"){
        console.log(chalk.magenta(`${answers.num1} + ${answers.num2} = ${answers.num1 + answers.num2}`));
    }
    else if(answers.operator == "Subtraction"){
        console.log(chalk.blueBright(`${answers.num1} - ${answers.num2} = ${answers.num1 - answers.num2}`));
    }
    else if(answers.operator == "Multiplication"){
        console.log(chalk.green(`${answers.num1} * ${answers.num2} = ${answers.num1 * answers.num2}`));
    }
    else if(answers.operator == "Division"){
        console.log(chalk.yellowBright(`${answers.num1} / ${answers.num2} = ${answers.num1 / answers.num2}`));
    }
    }
                                   
//askQuestion();

async function startAgain() {
    do{
        await askQuestion();
        var again = await  inquirer
        .prompt({
            type : "input",
            name : "restart",
            message :"Do you want to continue? Press y or n:"
        })
    }while(again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES')
}


startAgain();