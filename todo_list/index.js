#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let loop = true;
let answer1;
let answer2;
let answer3;
async function startLoop() {
    while (loop) {
        await displayMenuItem();
    }
}
startLoop();
async function displayMenuItem() {
    answer1 = await inquirer.prompt([
        {
            type: "list",
            name: "menuOpt",
            choices: [`Add Todo Item`, `Delete Todo Item`, `Exit`],
            message: `Please select menu item: `
        }
    ]);
    switch (answer1.menuOpt) {
        case `Add Todo Item`: {
            await addTodo();
            break;
        }
        case `Delete Todo Item`: {
            await deleteTodo();
            break;
        }
        default: {
            loop = false;
            console.log("Exit Program.");
            break;
        }
    }
}
async function addTodo() {
    answer2 = await inquirer.prompt([
        {
            type: "input",
            name: "todo",
            message: "Enter what to do? "
        }
    ]);
    todos.push(answer2.todo);
    console.log(todos);
}
async function deleteTodo() {
    if (todos.length > 0) {
        answer3 = await inquirer.prompt([
            {
                type: "list",
                name: "menuOpt",
                choices: todos,
                message: "Please Select Todo For Delete: "
            }
        ]);
        let i = 0;
        do {
            if (todos[i] === answer3.menuOpt) {
                todos.splice(i, 1);
                break;
            }
            i++;
        } while (i < todos.length);
        console.log(todos);
    }
    else {
        console.log("No Todo Items To Delete.");
    }
}
