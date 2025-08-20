import * as readline from 'node:readline';

const target = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Guess the number between 1-100");

function ask(){
    rl.question('>', (input) => {
        const guess = parseInt(input);

        if(isNaN(guess)){
            console.log("you have not enter a number. Please Enter the Number.");
            return ask();
        }

        if(guess < 0 || guess > 100) {
            console.log("Number must be between 1 to 100. Please try again!");
            return ask();
        }
        attempts++;

        if(guess === target){
            console.log(`Correct! NUmber is ${target} and Attempts is ${attempts}`);
            rl.close();
        } else if(guess < target ){
            console.log("Too Low, try again");
            ask();
        }else {
            console.log("Too High, try again");
            ask();
        }
    })
}

ask();

