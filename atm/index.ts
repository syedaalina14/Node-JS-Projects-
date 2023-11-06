#! /usr/bin/env node

import inquirer from "inquirer";

interface anstype {
    userId : string,
    userPin : number,
    accountType : string,
    transType : string,
    amount : number
};

type user = {
    userId : string,
    userPin : number,   
};

let users : user [] = [
    {
        userId : "Alina",
        userPin : 1234
    },
    {
        userId : "Kinza",
        userPin : 2468
    },
    {
        userId : "Meran",
        userPin : 1357
    },
];

let balance: number = Math.floor((Math.random()*1000000)); 
let answer1 : anstype;
let answer2 : anstype;

stratLoop();

async function stratLoop() {  
    await getUserId();
    do{
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type : "list",
                name : "restart",
                choices : ['Yes' , 'No'],
                message : "Do You Want To Continue",
            }
        ]);
    }while(again.restart == 'Yes');
}

async function getUserId() {
    answer1 = await inquirer.prompt ([
        {
            type : "input",
            name : "userId",
            message : "Please enter your user ID: "
        },
        {
            type : "number",
            name : "userPin",
            message : "Please enter your Pin: "
        },
    ]);
    await checkUserId (answer1.userId, answer1.userPin)
}

async function checkUserId(userId:string , userPin : number) {
    let condition = false ;
    for(let i=0; i<users.length; i++) {
        if(userId === users[i].userId && userPin === users[i].userPin) {
            condition = true;
            break;
        }
    }
    if(condition){
        console.log(`Inavlid user ID or Pin. Try Again.`)
        await getUserId();
    }
}

async function getTransaction() {
    answer2 = await inquirer.prompt([
        {
            type: "list",
            name : "accountType",
            choices : ["Current" , "Saving"],
            message : "Please slect account type: ",
        },   
        {
            type: "list",
            name : "transType",
            choices : ["Fast Cash" , "Withdraw"],
            message : "Please slect transaction type: ",
        },   
        {
            type: "list",
            name : "amount",
            choices : [5000 , 10000, 15000, 20000, 25000],
            message : `Please slect your ammount(Current balance is ${balance}): `,
            when(answer2) {
                return answer2.transType == "Fast Cash";
            }
        },   
        {
            type: "number",
            name : "amount",
            message : `Please slect your ammount(Current balance is ${balance}): `,
            when(answer2) {
                return answer2.transType == "Withdraw";
            }
        }
    ])

    if(answer1.userId && answer1.userPin){
        if(answer2.amount<=balance){
            balance -= answer2.amount;
            console.log(`Your current balance is ${balance}`);
        }else{
            console.log(`Insufficient balance ${balance}`)
        }
    }
}