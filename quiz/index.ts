#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const  apiLink : string = 
"https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

let fetchData = async (data: string ) => { 
    let fetchQuiz : any = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
}

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score : number = 0 
    // for username 
    let name = await inquirer.prompt({
        type : "input",
        name : "fname",
        message : "What Is Your Name?: "
    })

    for(let i = 1 ; i < 10 ; i++){
        let answers = [...data[i].incorrect_answers, data [i].correct_answer]

        let ans = await inquirer.prompt({
            type : "list",
            name : "quiz",
            message : data[i].question,
            choices : answers.map((val:any) => val),
        });

        if(ans.quiz == data[i].correct_answer){
            ++score;
            console.log(chalk.bold.italic.blue("Correct Answer"))
        } else {
            console.log(`Correct Answer Is ${chalk.bold.italic.red(data[i].correct_answer)}`)
        }
    }

    console.log(
        `Dear ${chalk.cyanBright.bold(name.fname)}, Your Score Is ${chalk.green.bold(score
            )} Out Of ${chalk.red.bold("10")}`
    )
}

startQuiz();