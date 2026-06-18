//Bank Account class


const fs = require('fs')
let accounts;
function readJson(){

    fs.readFile("./accounts.json",(err, data)=>{
        if(err){
            console.log("File read failed because: ",err);
        }
        try{
        const account = JSON.parse(data)
        account += accounts
        } catch(err){
            console.log("Error retrieveing JSON string because: ", err)
        }

    })
}


readJson()

class BankAccount{
    constructor(name,accBal,accNum,is_active){
    this.name = accounts.name;
    this.accBal = accounts.accBal;
    this.accNum = accounts.accNum;
    this.is_active = accounts.is_active;

       
       //Accounts initialized with a negative balance should display an error and start with a balance of 0
       if (this.accBal <0) {
        this.accBall =0;
        console.log(`Can't start account with negative value`)
         
       }
    }

    //Methods

    creditAmount(amount){
        this.accBal +=amount //validate input, validate accBal
    };

    debitAmount(amount){
        if (amount > this.accBal){
            console.log("Debit amount exceeds account balance")
        }
        else this.accBal -=amount
    }

    getBalance(){
        return this.accBal
    }

}

//Objects
let salaryAccount = new BankAccount(500);
salaryAccount.creditAmount(700)
salaryAccount.debitAmount(2000)
console.log(salaryAccount.getBalance()); //An attempted debit that exceeds the balance (triggering the error message).

let savingsAccount = new BankAccount(-250); 
savingsAccount.creditAmount(100)
savingsAccount.debitAmount(50)
console.log(savingsAccount.getBalance())

let currentAccount = new BankAccount(-150);
currentAccount.creditAmount(35)
currentAccount.debitAmount(80)
console.log(currentAccount.getBalance())