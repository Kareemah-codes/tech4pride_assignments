

function manipulate_str(sentence,commands){  

    sentence = sentence.toLowerCase().trim()
    sentenceVersions =[];

    commands.forEach((command)=>{command.toLowerCase()})


    
    while(!sentence || sentence.length<20){
        return "Input valid sentence of 20 characters";
    }
    while(sentence && sentence.length >=20){
        if (commands.includes('u')){
            sentence = sentence.toUpperCase();
            sentenceVersions.push(sentence);
        }

        if(commands.includes('l')){
            sentence = sentence.toLowerCase();
            sentenceVersions.push(sentence);
        }

       if(commands.includes('r')){
            let reverse="";
            for(let i= sentence.length - 1; i>=0;i--){
                reverse += sentence[i];
            }
        sentenceVersions.push(reverse);
        }

        if(commands.includes('z')){
            version = -2;
            sentence = sentenceVersions[version];
            //The index is '-2' because it is the current state which is '-1'.
            //when we undo the last change, we are going one step before the current state.
            version -=1;
        }

        if(commands.includes(/C \w \w/)){
            sentence = sentence.replace(commands[1],commands[2])

            sentenceVersions.push(sentence)
        }
}
}

manipulate_str('I love God and Jesus is my savior',['U '])