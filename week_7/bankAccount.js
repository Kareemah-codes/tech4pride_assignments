//Bank Account class
class BankAccount{
    constructor(initialBal){
        // pass initial value, then initiate to account Balance
       this.initialBal = initialBal;

       //Validate initial ball
       if (this.initialBal >= 0) {
        let accBal = this.initialBal;
       }
        else{
        let accBal = 0;
        console.log(`Can't start account with negative value`)
       }
    }

    //METHODS

    //validate if amount is less than zero, a string, not a number,not negative
    creditAmount(amount){
        this.accBal +=amount
    };

    debitAmount(amount){
        if (amount > this.accBal){
            console.log("Debit amount excedds account balance")
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