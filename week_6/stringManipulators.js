sentenceVersions = []

function stringManipulator (sentence, commands){
    if(!sentence || sentence.length<20){
         return "Input valid sentence of 20 characters";
    }
    else{
        //Uppercase
         if (commands.includes('u')){
            sentence = sentence.toUpperCase();
            sentenceVersions.push(sentence);
        }

        //Lowercase
         if(commands.includes('l')){
            sentence = sentence.toLowerCase();
            sentenceVersions.push(sentence);
        }

        //Reverse 
         if(commands.includes('r')){
            let reverse="";
            for(let i= sentence.length - 1; i>=0;i--){
                reverse += sentence[i];
            }
            sentence = reverse
            sentenceVersions.push(sentence);
        }

        //Undo
           if(commands.includes('z')){
            sentenceVersions.pop()
            sentence = sentenceVersions[sentenceVersions.length-1];
        }

        // Replace
        //if(commands.includes('c')){

        // I can't seem to figure this out. I will ask my colleague for their code.
           // sentenceVersions.push(sentence)
        }

        //Terminate
        if(commands.includes('x')){
            return sentence
        }

    }




console.log(stringManipulator('Tech4Pride is a great program and HOD is a fantastic tutor', ['u','r','z','x']))
