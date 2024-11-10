import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Kropki } from "../../styles/Dots"

type ChatProps = {
    script: any,
    phase?: any,
    cation?: boolean,
    id?: any
}

export const GptDisplayStyleChat: React.FunctionComponent<ChatProps> = ({
    script,
    phase,
    cation,
    id
}) =>{
    const [shown,setShown] = useState(true)
    const divowansko = useRef<any>(null);
    const kropki = useRef<any>(null);
    const db_rout = cation ? 'cation_analysis_result_texts' : 'anion_analysis_result_texts'
    
    const get_script = async () => {
    
    await  Axios.get(SERVER_ROUTS.chat_messages.get_one_conversation+`/${id}`)
        .then( (response: any)=>{
            const data = response.data
            if(data[data.length-1].mark != 'read' && data[data.length-1].author != 'human'){
                wyswietlacz_2(data[data.length-1].message)
                Axios.put(SERVER_ROUTS.chat_messages.mark_message,{id:data[data.length-1].id, mark:'read'})                
            }            

        })
        .catch((err)=>{console.log('db Chat status :(',err)})
    }

 
const wyswietlacz_2 = (script: any)=> {
    
    if(typeof script !== 'undefined' && script.length > 0){
        const scrypt_copy =  script.slice();
        const script_slowa = scrypt_copy.split(" ");
        let index = 0
        setShown(true)
        const loop =  setInterval(()=>{            
            if(script_slowa.length >= index){                
                
                
                   if(typeof script_slowa[index] !== 'undefined' && script_slowa) {
                    try{
                       divowansko.current.append(script_slowa[index]+" ") 
                    }
                    catch (error) {
                        () => {console.log(error)}
                    }
                    
                }
                    try {
                        divowansko.current.scrollIntoView({ behavior: "smooth" }) //scroll to bottom box after write
                    } catch (error) {
                        () => {console.log(error)}
                    }                                
                   index = index + 1
                }
                else {setShown(false) ; clearTimeout(loop)} },350)
    }
    
}

useMemo(async ()=>{
    if(typeof phase=='number'){
        await get_script()}
    },[phase])

    return(            
            <div>
                 {shown && <Kropki/>}
                <ChatContainer  ref={divowansko}>   </ChatContainer>                           
            </div>
            
           
    )
}

const ChatContainer = styled.div`
      border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: left;
    margin: 5px;
    padding: 5px;
`
const ActivityIndicatro = styled.div`
    width: 50px;
    height: 2px;
    margin: 5px;
    background-color:  ${({theme}) => theme.colors.primary};
    border-radius: 6px;
    animation: ladowanko 0.7s linear infinite alternate ;

    @keyframes ladowanko {
        0% {
            width:0%
        }
        100% {
            width:50%
        }
    }
`
