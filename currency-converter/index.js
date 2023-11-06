#! /usr/bin/env node
import inquirer from "inquirer";
let conversation = {
    "GBP": {
        "GBP": 1.0000,
        "USD": 1.2200,
        "EUR": 1.1576,
        "AUD": 1.9097,
        "PKR": 352.9500
    },
    "EUR": {
        "GBP": 0.8734,
        "USD": 1.1012,
        "EUR": 1.000,
        "AUD": 1.6753,
        "PKR": 306.3400
    },
    "USD": {
        "GBP": 0.81,
        "USD": 1.0000,
        "EUR": 0.9081,
        "AUD": 1.5216,
        "PKR": 278.56
    },
    "AUD": {
        "GBP": 0.5151,
        "USD": 0.6571,
        "EUR": 0.5965,
        "AUD": 1.0000,
        "PKR": 185.4000
    },
    "PKR": {
        "GBP": 0.0027,
        "USD": 0.0036,
        "EUR": 0.0032,
        "AUD": 0.0054,
        "PKR": 1.0000
    },
};
async function startLoop() {
    let again;
    do {
        await convertAmount();
        again = await inquirer.prompt([
            {
                type: "list",
                name: "cont",
                choices: ["Yes", "No"],
                message: "Do You Want To Continue?: "
            }
        ]);
    } while (again.cont == "Yes");
}
startLoop();
async function convertAmount() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "from",
            choices: ["GBP", "USD", "EUR", "AUD", "PKR"],
            message: "Please Select Currenncy From: "
        },
        {
            type: "list",
            name: "to",
            choices: ["GBP", "USD", "EUR", "AUD", "PKR"],
            message: "Please Select Currenncy To: "
        },
        {
            type: "number",
            name: "amount",
            message: `Please Enter Amount To Convert From To`
        }
    ]);
    const { from, to, amount } = answer;
    if (from && to && amount) {
        let result = conversation[from][to] * amount;
        console.log(`The Converted Amount Of ${amount} ${from} in ${to} is ${result}`);
    }
    else {
        console.log(`Invalid Input`);
    }
}
