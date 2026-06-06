console.log('start')
year = 2100
if (year % 100 == 0) {
   if (year % 400 == 0){
    console.log(29)
} //else {
//    console.log(28)
//    }
}
else if (year% 4 ==0)
    {
        console.log(29)
    }
else{
        console.log(28)
    }
console.log('end')