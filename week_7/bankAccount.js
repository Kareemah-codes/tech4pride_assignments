//Bank Account class
let accBal;
class BankAccount{
    constructor(initialBal){
        // pass initial value, then initiate to account Balance
       this.initialBal = initialBal;

       //Validate initial ball
       if (this.initialBal >= 0) {
        accBal = this.initialBal;
       }
        else{
        accBal = 0;
        console.log(`Can't start account with negative value`)
       }
    }

    //METHODS

    //validate if amount is less than zero, a string, not a number,not negative
    creditAmount(amount){
        if (amount<= 0 || !(Number.isFinite(amount)) )
            console.log('Amount invalid')
        else {
            accBal +=amount
        }
    }


    debitAmount(amount){
        if (amount > accBal||amount< 0 || !(Number.isFinite(amount))){
            console.log("Debit amount exceeds account balance or Amount invalid")
        }
        else accBal -=amount;
    }

    getBalance(){
        return accBal;
    }

}

//Objects
let salaryAccount = new BankAccount(500);
salaryAccount.creditAmount(700)
salaryAccount.debitAmount(100)
console.log(salaryAccount.getBalance()); 

let savingsAccount = new BankAccount(-250); 
savingsAccount.creditAmount(100)
savingsAccount.debitAmount(50)
console.log(savingsAccount.getBalance())

let currentAccount = new BankAccount(-150);
currentAccount.creditAmount(35)
currentAccount.debitAmount(80)
console.log(currentAccount.getBalance())