

# CONCEPTS IN SOFTWARE ENGINEERING
NOTE: I mixed python and javascript code to explain the concepts.
### DRY
DRY (Don't Repeat Yourself) is a programming rule of thumb which states that "every piece of knowledge must have  a single, unambigious,authoritative representation within a system". What this means is that knowledge in your code such as code, comments, documentation e.t.c should have one single location. 
It enables efficiency as when knowledge is to be updated, it won't have to be changed in multiple places. 
E.g a car dealer is having a 50% discount on all items sold in the shop.
```python

def get_discount_car(price):
    return price * 0.5

def get_discount_wheels(price):
    return price*0.5

#Using DRY principle
def apply_discount(price):
    return price *0.5
```


### KISS
Keep It Simple,Stupid states that complex code does not enable easy maintainablity.It is better to write code that is easier to understand that trying to write clever code so that it won't be painful to debug later on and it can communicate its use to your teammates.
E.g you want to write code to check if a number is even

```javascript
const isEven = (n) => {
  return Boolean(
    [0,2,4,6,8].includes(Math.abs(n % 10) % 10 ===
    Math.abs(n % 10) ? n % 2 : n % 2)
  );
};
//KISS
const isEven = (n) => n % 2 === 0;
```

### YAGNI (You Aren’t Gonna Need It)
YAGNI is a principle never to add code "just in case" for future requirements that may never come. Its better not to overarchitect code that may not be useful in the future. It comes with the extra cost and time of testing, maintaining it and understanding it. You can update and change code as requirements occur instead.
E.g a function that creates users for an app:
```javascript
function createUser(name) {
  return {
    name,
    age:,  
    tribe: null,              
    education: null,         
  };
}

//YAGNI
function createUser(name,age) {
  return { name,age };
}
```

### Seperation of Concerns
SoC 's principle is to always seperate your code based on the different functions it is doing. Hence code that is writing into a file, and code that is applying some logic should be kept as seperate pieces so that it is easier to change and test in isolation.

```python
todos = [
    {"task": "Buy groceries", "done": False},
    {"task": "Walk the dog",  "done": True},
    {"task": "Read a book",   "done": False},
]
#This puts all the concerns on one place, the data, the logic and outputing it.

def show_pending_todos():
    for todo in todos:                     
        if not todo["done"]:                   
            print(f"- {todo['task']}") 

#Soc - seperates the different concerns 
def get_pending(todos):
    return [t for t in todos if not t["done"]]

def get_done(todos):
    return [t for t in todos if t["done"]]

def print_todos(todos):
    for todo in todos:
        print(f"- {todo['task']}")
```

### Convention over Configuration
This governs the insight behind frameworks like Next.js,Ruby on Rails and Django. It is a software design paradim that simplifies development by providing sensible default.Hence, developers only need to configure specific unconventional aspects of the application they are building.

```python
#No code example,however I found that Expres js and Nextjs are polar opposites on this issue. Express enables you to configure and customise while Next trades that freedom for speed. Therefore you spend zero time having to configure because a template is already provided.
```

### SOLID 
This governs rules for writing Object Oriented code, making it easy to maintain and update.

*S* - Single Responsibility
A class or function should do one thing only. If you need to change it for two different reasons, it's doing too much.

*O* - Open/Closed
You should be able to add new features by writing new code, not by editing existing working code.Your code should be extended not modified.

*L* - Liskov Substitution
If you swap a parent class for one of its children, the program should still work fine.

*I* - Interface Segregation
Don't force a class to implement methods it doesn't need.It is better to create a focused interface than a one size fits all.

*D* - Dependency Inversion
High-level code shouldn't depend on low-level details — both should depend on abstractions. 