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

       
    };

    transfer_amount(source,destination,amount){
        if(source ==+ destination){
            console.log("Self tranfser not allowed")
        }
        else{
            const sourceAccount = this.account.find(acc=> acc.accNum ===source )
            const destinationAccount = this.account.find(acc=> acc.accNum ===destination )                

            if(!sourceAccount || !sourceAccount.is_active){
                console.log('Sender account invalid')
            }
            if(!destinationAccount || !destinationAccount.is_active){
                console.log('Destination account invalid')
            }

            if (amount<= 0 || !(Number.isFinite(amount)) || amount>account.accBal ){
            console.log('Amount invalid')
            }else
            {
                sourceAccount.accBal = sourceAccount.accBal - amount;
                destinationAccount.accBal = destinationAccount.accBal + amount;
                writeToFile(this.accounts)
            }
        }    
    }

    getBalance(accNum){
        const account = this.accounts.find(acc=>acc.accNum === accNum)
        if(!account || !account.is_active){
            console.log("Invalid account")
        }else{
             return account.accBal;
        }
       
    }

}