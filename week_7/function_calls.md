## Difference between Calling by Value & Calling by Reference

There are two ways that arguments are passed into a function: Call by Value and Call by Reference.

### Call by Value
In Call by Value, argument values are passed when the function is called. The value passed is declared outside the function. Hence, the value inside the fucntion and the one outside under the same variable name are different.

### Call by Reference
In Call by Reference, the memory address of the concerned variable is a the argument. Hence any changes made to the variable no matter its scope will reflect inside and outside the function.

### Verdict
The concept of call by reference and call by value applies more clearly to lower -level  languages such as C++. Python and Javascript don't explicitly carry this feature. 

In Javascript, all arguments are strictly passed by value. However if a primitive data type is passed,it will replicate the behaviour of call by value while if the datatype is an object,it will exhibit a call by refrence behaviour. This phenoomenon is "Called by Sharing". This is also how it works in Python. The concept in Python is "Called by Assignment".

## Code Snippet
### Call by Value
```javascript
function myFunc(a){
    a++;
    console.log(`Inside function, a is ${a}`)
}

let a = 2;
myFunc(2)
console.log(`Outside function, a is ${a}`)

//Inside function, a is 3
//Outside function, a is 2

```
### Call by Reference
```javascript
function myFunc(a){
    a.push(50)
    console.log(`Inside function, a is ${a}`)
}

const a =[10,20,30,40]
myFunc(a)
console.log(`Outside fucntion, a is ${a}`)
//Inside function, a is 10,20,30,40,50
//Outside fucntion, a is 10,20,30,40,50
 ```



