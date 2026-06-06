// import readline module 

import {createInterface} from "readline";

const readline = createInterface({
    input: process.stdin,                       
    output: process.stdout
});

readline.question('Welcome to the leap year determiner \n Input a year : ', (year)=> {
    year = Number(year)
if (year % 100 == 0) {
   if (year % 400 == 0){
    console.log(29)
   } else {
    console.log(28)
   }
}
else if (year% 4 ==0)
    {
        console.log(29)
    }
else{
        console.log(28)
    }

    readline.close();
});


