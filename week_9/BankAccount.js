const fs = require('fs')

function writeToFile(accObj){
    fs.writeFileSync("sample.json",JSON.stringify(accObj, 2)
		);
}

class BankAccount{
    constructor(){
        this.accounts = JSON.parse(fs.readFileSync("accounts.json"))
    }

    //Methods

    creditAmount(accNum,amount){
        const account = this.accounts.find(acc => acc.accNum === accNum)
        if(!account || !acc.is_active){
            console.log("Account non existent or user inactive")
        }
        if (amount<= 0 || !(Number.isFinite(amount)) ){
            console.log('Amount invalid')
            return;
        }else{
            account.accBal = account.accBal + amount;
            writeToFile(this.accounts)

        };
        
    }

    debitAmount(accNum,amount){
        const account = this.accounts.find(acc => acc.accNum === accNum);

         if(!account || !acc.is_active){
            console.log("Account non existent or user inactive")
        }
        if (amount<= 0 || !(Number.isFinite(amount)) || amount>account.accBal ){
            console.log('Amount invalid')
            return;
        }else{
            account.accBal = account.accBal - amount;
            writeToFile(this.accounts)

        };

    }
}