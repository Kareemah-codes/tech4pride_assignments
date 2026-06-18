//Bank Account class
let accounts;
const fs = require('fs')
function readJson(){
    data = JSON.parse(fs.readFileSync("./accounts.json"))
    accounts = data
}
readJson()


class BankAccount{
    constructor(initialBal,name,accNum,is_active){
       this.initialBal = initialBal;
       this.name = accounts.name;
       this.accNum = accounts.accNum;
       this.is_active= accounts.is_active;

       //Validate initial ball
       if (this.initialBal >= 0) {
       accounts.accBal = this.initialBal;
       }
        else{
        accounts.accBal = 0;
        console.log(`Can't start account with negative value`)
        return
       }
    }

    //METHODS

    //validate if amount is less than zero, a string, not a number,not negative
    creditAmount(accNum,amount){
        
        if (amount<= 0 || !(Number.isFinite(amount)) ){
            console.log('Amount invalid')
            return;
        }
        else {
            accBal +=amount
        }
    }


    debitAmount(amount){
        if (amount > accBal||amount< 0 || !(Number.isFinite(amount))){
            console.log("Debit amount exceeds account balance or Amount invalid")
            return
        }
        else accBal -=amount;
    }

    getBalance(){
        return accBal;
    }

}


