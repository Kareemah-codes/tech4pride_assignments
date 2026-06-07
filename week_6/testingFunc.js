sentence = "I love Jesus";
commands =['r','L','z','C o a'];
    //sentence = sentence.toLowerCase().trim()
    commands.forEach((command)=>{command.toLowerCase()})

     //console.log(commands)
      if(commands.includes('z')){
            sentenceVersions.pop()
            sentence = sentenceVersions[-1];
        }
        console.log(sentence)
        
    
