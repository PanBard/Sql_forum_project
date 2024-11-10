import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { GptDisplayStyleChat } from "./GptDisplayStyleChat"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs";
import { VoiceRecognition } from "../voice_recognition/VoiceRecognition";
import { useTranslations } from "lib/hooks";
import { APP_CONFIG } from "lib/config";


type ChatCatProps = {
    script: any,
    cation: boolean,
    id?: any,
    ready: boolean,
    refreshChat?: any,
    return_results_to_parent_component(params: any): any,
    lang: string
}

export const Chat: React.FunctionComponent<ChatCatProps> = ({
    cation,
    id,
    ready,
    refreshChat,
    return_results_to_parent_component,
    lang
}) =>{

    const T = useTranslations(lang)
    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [script, setScript] = useState<string>()
    const [currentConversation,setCurrentConversation] = useState<any>()
    const [nowTellSomething, setNowTellSomething] = useState<boolean>(false)
    const refChat = useRef<any>(null);

    const [seed, setSeed] = useState(1);

    const reset = () => {
        setSeed(Math.random())
    }

    const db_type = cation ? 'cation_analysis_result' : 'anion_analysis_result' 
    const db_type_name = cation ? 'cation_script_flow' : 'anion_script_flow' 
    const db_cation_voice_script_name = cation ? 'cation_voice_script' : 'anion_voice_script' 
    const db_rout = cation ? 'cation_analysis_result_texts' : 'anion_analysis_result_texts'
    const ion_type = cation ? 'cation' : 'anion'

    useEffect(  ()  =>  {
        get_data()  
    },[])
        
    const set_up_phase = async (data: any)  => {
        const current = data[data.length-1]
       if(typeof current !== 'undefined'){
            if((current['end'] == 'incomplete') && (phase !== 100)){
            if(current['f1'] == null){setPhase(1);return true}
            if(current['f2'] == null){setPhase(2);return true}
            if(current['f3'] == null){setPhase(3);return true}
            if(current['f4'] == null){setPhase(4);return true}
            if(current['f5'] == null){setPhase(5);return true}
            if(current['f6'] == null){setPhase(6);return true}
            if(current['f7'] == null){setPhase(7);return true}
           }  
           
           if((current['end'] == 'incomplete') && (current['f7'] !== null)){
               setPhase(8)
           }
       }
   }

const show_conversation = () => {
    if(currentConversation && phase){        
         const key = Object.keys(currentConversation)        
         return(
            key.map((obj,index)=>{
            const date = currentConversation[obj].date.replace('T',' | ').slice(13,-8)
        
       if(currentConversation[obj] !== currentConversation[key.length-1] && currentConversation[obj].author == 'bot' && currentConversation[obj].ion == ion_type) {        
            return(
                <div key={index}>
                    <ChatContainer_left key={index}>{currentConversation[obj].message} <div style={{marginLeft:'220px', marginTop:'20px' , fontSize:'11px', float:'left'}}>{date}</div></ChatContainer_left>                    
                </div>
            )
        
        }

        if(currentConversation[obj] !== currentConversation[key.length-1] && currentConversation[obj].author == 'human' && currentConversation[obj].ion == ion_type) {            
            return(
                <div key={index}>
                    <ChatContainer_right key={index}>{currentConversation[obj].message} <div style={{marginLeft:'220px', marginTop:'20px' , fontSize:'11px', float:'left'}}>{date}</div>  </ChatContainer_right>
                </div>
            )
            
        }

    })
         )
    
    }
    else{
        return (<div>{T.analysis.default_message}</div>)
    }
   }


   const get_data = async () => {
      
    await  Axios.get(SERVER_ROUTS[db_type].get)
    .then( (response: any)=>{setData(response.data);set_up_phase(response.data)})
    .catch((err)=>{console.log('db ChatCat status :(',err)})
    
  }

  const get_script = async () => {
    await Axios.get(SERVER_ROUTS.chat_messages.get_one_conversation+`/${id}` )
    .then( (response: any)=>{
        const data = response.data
        setCurrentConversation(data)
    })
    .catch((err)=>{console.log('db status :(',err)})
}

useMemo(async ()=>{
    if(ready) get_script()
},[ready])

useMemo(async ()=>{
     reset()
},[refreshChat])

    return(
        <ContainerP>
            
            <ContainerF>
                <ChatHeader>
                 {T.analysis.chat_name}
                </ChatHeader>
                <ChatBody >

                    {show_conversation()}
                    <div style={{clear: 'left'}}></div>
                    <div style={{clear: 'right'}}></div>
                    {ready && < GptDisplayStyleChat key={seed} cation={cation} id ={id} script={script} phase={phase}/>  }
                    <div style={{clear: 'left'}}></div>

                    <Container2 ref={refChat}><Container > {nowTellSomething && <VoiceRecognition lang={lang} cation={cation} id={id} phase={phase} return_described_to_parent_component={e => {return_results_to_parent_component(e)}} grabSound={3}/>}   </Container></Container2>
                </ChatBody>
                {/* <AnswerBox onClick={()=>{ setNowTellSomething(!nowTellSomething)}} >
                   <img style={{cursor:'pointer', backgroundColor: 'rgb(200, 214, 229)' , borderRadius: '5px', margin: '5px'}} src={APP_CONFIG.MICROPHONE_IMAGE} alt=""  height={25} width={25}/>    
                </AnswerBox> */}
            </ContainerF>
          
        </ContainerP>
    )

}

const ChatContainer_left = styled.div`
    border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: left;
    margin: 5px;
    padding: 5px;   
`
const ChatContainer_right = styled.div`
      border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: right;
    margin: 5px;
    padding: 5px;
`
const ContainerF = styled.div`
   overflow: hidden;
`

const AnswerBox = styled.div`
    height: 50px;
    width: 50px;
    float: right;
    cursor: pointer;
`

const Container = styled.div`
    border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    padding: 5px;
`

const Container2 = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ChatHeader = styled.div`
     border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 40px;
    width: 100px;
    margin-bottom: 5px;
`
const ChatBody = styled.div`
    width:350px;
    padding: 5px;
    border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    justify-content: center;
    height: 350px;
    max-height: 350px;
    color: ${({theme}) => theme.colors.typography};
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 5px;  
        background: grey;  
    }
    ::-webkit-scrollbar-thumb {
    background-color:#225763;
    }
    
`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 5px;
    background: #346357;
`