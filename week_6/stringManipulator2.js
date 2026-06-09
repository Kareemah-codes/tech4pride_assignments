
function manipulate(sentence, commands){
     sentence = sentence.toLowerCase().trim()
    sentenceVersions =[];

     const commands_lower = commands.map((command)=> command.toLowerCase())
    commands = commands_lower

    if(!sentence || sentence.length<20){
         return "Input valid sentence of 20 characters";
    }
    else{

        for(const command of commands){
            //upper
            if (command == 'u'){
                sentence = sentence.toUpperCase()
                sentenceVersions.push(sentence)
            }
            else if(command =='l'){
                sentence = sentence.toLowerCase()
                sentenceVersions.push(sentence)
            }
            else if(command =='r'){
                let reverse="";
                for(let i= sentence.length - 1; i>=0;i--){
                reverse += sentence[i];
                }
                sentence = reverse
                sentenceVersions.push(sentence);
            }
            else if(command == 'z'){
                sentenceVersions.pop()
                sentence = sentenceVersions[sentenceVersions.length-1];
            }
            else if(command.startsWith('c')){

            const[c,original,replacement]= command.split(" ");
             sentence = sentence.replaceAll(original,replacement);
            sentenceVersions.push(sentence);
            }  
            else if (command == 'x'){
                return sentence
                break
            }
        }
    }


}

console.log(manipulate('Tech4Pride is a great program and HOD is a fantastic tutor', ['U','R','Z','L','U','C O a','X']))