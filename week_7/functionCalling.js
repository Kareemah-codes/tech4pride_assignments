function myFunc(a){
    a++;
    console.log(`Inside function, a is ${a}`)
}

let a = 2;
myFunc(2)
console.log(`Outside function, a is ${a}`)
