import React, { useMemo, useState } from "react";
import { Kropki } from "../../styles/Dots";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


type VoiceRecognitionProps = {
  grabSound: any,
  return_described_to_parent_component(params: any): any,
  cation: boolean,
  id?: any,
  phase?:any,
  lang: string
}

export const VoiceRecognition: React.FunctionComponent<VoiceRecognitionProps> = ({
  grabSound,
  return_described_to_parent_component,
  cation,
  id,
  phase,
  lang
}) => {

  const [word , setWord] = useState<string>()
  const [show, setShow] = useState(true)
  let recognition_words = ''
  let detected: any;

let speechRecognition = new SpeechRecognition()
speechRecognition.lang = (lang == 'PL' ? 'pl-PL' : 'en-US')
speechRecognition.continuous = false;
speechRecognition.interimResults = true;
speechRecognition.maxAlternatives = 1;

const renderSpeech = () => {
speechRecognition.start()
speechRecognition.onresult = (event: any) => {
  setShow(true)  
  setWord(event.results[0][0].transcript) 
  recognition_words = event.results[0][0].transcript

  if((event.results[0][0].transcript.search("brak")!=-1) || (event.results[0][0].transcript.search("nic")!=-1)){
    detected=0
  }

  if((event.results[0][0].transcript.search("nothing")!=-1) || (event.results[0][0].transcript.search("nic")!=-1)){
    detected=0
  }

  if((event.results[0][0].transcript.search("biały")!=-1) || (event.results[0][0].transcript.search("białe")!=-1)){
    detected=1
  }
  if((event.results[0][0].transcript.search("czarny")!=-1) || (event.results[0][0].transcript.search("Czarny")!=-1) || (event.results[0][0].transcript.search("ciemny")!=-1)){    
    detected=2
  }

  if((event.results[0][0].transcript.search("dark")!=-1) || (event.results[0][0].transcript.search("Czarny")!=-1) || (event.results[0][0].transcript.search("ciemny")!=-1)){    
    detected=2
  }

  if((event.results[0][0].transcript.search("pomarańczowy")!=-1) || (event.results[0][0].transcript.search("pomarańczowym")!=-1)){    
    detected=9
  }

  if((event.results[0][0].transcript.search("fioletowy")!=-1) || (event.results[0][0].transcript.search("fioletowym")!=-1)){    
    detected=10
  }

  if((event.results[0][0].transcript.search("zółtym")!=-1) || (event.results[0][0].transcript.search("żółty")!=-1)){    
    detected=11
  }
  
}

speechRecognition.onend = (event) => {
  if(recognition_words?.length)(Axios.post(SERVER_ROUTS.chat_messages.post, {chat_id:id, message: recognition_words,author: 'human', ion: cation ? 'cation' : 'anion' }).then(res=>console.log('Messages db: ',res.data))
  .then(()=>{
    if(typeof detected != 'undefined'){
      return_described_to_parent_component(detected)
    }
  }))
  setShow(false)
};
}


useMemo(()=>{
  renderSpeech()
},[grabSound])


  return(
    <div>
  
      <div>
          {word}
      </div> 
         {show && <Kropki/>}
    </div>
      
  )
}
