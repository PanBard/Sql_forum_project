import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";
import { useEffect, useMemo, useState } from "react";


type ShuffleFateProps = {
    id?: any,
    data?:any,
    phase?:any,
    lang: string
    
    cation: boolean,
    return_script(params: any): any,
    ion_founded(): any,
    rerender_chat?():any,

}

export const ResultVerification: React.FunctionComponent<ShuffleFateProps> = ({
    cation,
    return_script,
    ion_founded,
    rerender_chat,
    lang
}) => {

    const T = useTranslations(lang)

    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [rightSymbol, setRightSymbol] = useState<any[]>([])
    const [foundIon, setfoundIon] = useState<boolean>()
    
    const db_type = cation ? 'cation_analysis_result' : 'anion_analysis_result' 
    const db_type_name = cation ? 'cation_script_flow' : 'anion_script_flow' 
    // const db_cation_voice_script_name = cation ? 'cation_voice_script' : 'anion_voice_script' 
    const db_cation_voice_script_name = lang=='EN' ? (cation ? 'cation_voice_script_en' : 'anion_voice_script_en') : (cation ? 'cation_voice_script' : 'anion_voice_script') 
    const db_text_name = cation ? 'c_analysis_texts' : 'a_analysis_texts' 
    // const cation_voice_script_for_custom_query = cation ? 'cation_voice_script' : 'anion_voice_script' 
    const cation_voice_script_for_custom_query = lang=='EN' ? (cation ? 'cation_voice_script_en' : 'anion_voice_script_en') : (cation ? 'cation_voice_script' : 'anion_voice_script') 

    const script_detected= {
        "brak": 'Wykryto próbówkę bez osadu!',
        "bialy" :'Wykryto próbówkę zawierającą biały osad!',
        "czarny" :'Wykryto próbówkę zawierającą czarny osad!',
        "zolty" :'Wykryto próbówkę zawierającą żółty osad!',
        "pomaranczowy" :'Wykryto próbówkę zawierającą pomarańczowy osad!',
        "zielony" :'Wykryto próbówkę zawierającą zielony osad!',
        "niebieski" :'Wykryto próbówkę zawierającą niebieski osad!',
        "nieb_rozowy" :'Wykryto próbówkę zawierającą niebiesko-różowy osad!'
    }

    useEffect(  ()  =>  {
        get_data()
    },[])

    const Voice = (words: string) => {
        if(false){
               const msg = new SpeechSynthesisUtterance()
        // msg.lang = "pl-PL" 
        msg.lang = lang=='EN' ? "en-US" : "pl-PL" 
        msg.text =  words
        window.speechSynthesis.speak(msg)
        }
     
}

      const get_data = async () => {
      
        await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{setData(response.data);set_up_phase(response.data)})
        .catch((err)=>{console.log('db status :(',err)})
        
      }
    

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

    const shuffle = async () => {

        const current = data[data.length-1]
            if(phase == 1 && typeof phase !== 'undefined'){first_phase_setup() }

            if(phase !== 1 && typeof phase !== 'undefined'){
                const prevoiusPhase = 'f'+(phase - 1)
                const prevoiusLabel = current[prevoiusPhase]

                await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: (phase-1), label: prevoiusLabel, db_type:db_type_name})
                .then((response)=>{
                    const data = response.data;
                    data.map((obj: any)=>{

                        if(phase==2){
                            if(obj.f1 == current.f1){
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==3){
                            if(obj.f1 == current.f1 && obj.f2 ==current.f2){
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==4){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3  ){                                
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==5){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  ){                            
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==6){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 ){                                
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==7){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6 ){                                
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==8){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6  && obj.f7 == current.f7){                            
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }
                        }
                    }
                    )
                    setfoundIon(true)
                }
                )
            }
        }

const set_failed_end = async () => {
    const current = data[data.length-1]
    if(current.end !== 'end' && current.end !== 'fail' ){
        await Axios.put(SERVER_ROUTS[db_type].put, {id: current.id , end:'fail'})        
}
}


const set_happy_end =async (id: any) => {
    const current = data[data.length-1]    
if(current.end !== 'end'){
    await Axios.put(SERVER_ROUTS[db_type].put, {id: current.id , end:'success'})
        .then(p => {            
            const query = `SELECT symbol FROM ${db_type_name} WHERE id = ${id}`
            Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
            .then((response)=>{
                Axios.put(SERVER_ROUTS[db_type].set_result, {id: current.id , result:response.data[0].symbol})              
                })
    })
}
    

}

const first_phase_setup = async () => {
    if(phase){
        const query = `SELECT script FROM ${cation_voice_script_for_custom_query} WHERE id = 1`
   await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
   .then((response)=>{
    const current = data[data.length-1]; 
    Axios.post(SERVER_ROUTS.chat_messages.post, {chat_id:current.id, message: response.data[0].script,author: 'bot', ion: cation ? 'cation' : 'anion' }).then(rerender_chat);Voice(response.data[0].script)
    })
    }
}


const get_script_from_db =async () => {
        if(phase)
    await Axios.put(SERVER_ROUTS[db_cation_voice_script_name].get_required_script,{phase: phase, match_id: rightSymbol[0] })
                .then((response)=>{
                const current = data[data.length-1];
                const query = `UPDATE ${db_text_name} SET f${phase-1}=? WHERE id=?`                
                if(response.data[0].f7 !== 'end')Axios.post(SERVER_ROUTS.chat_messages.post, {chat_id:current.id, message: response.data[0].script,author: 'bot', ion: cation ? 'cation' : 'anion' }).then(rerender_chat)                
                if(response.data[0].f7 == 'end'){const text = response.data[0].script + T.analysis.end_of_analysis  ; Axios.post(SERVER_ROUTS.chat_messages.post, {chat_id:current.id, message: text,author: 'bot', ion: cation ? 'cation' : 'anion' }).then(rerender_chat)}
                if(response.data[0].f7 !== 'end') {Voice(response.data[0].script); return_script(response.data[0].script)}                
                if(response.data[0].f7 == 'end'){ion_founded(); return_script(response.data[0].script);Voice(response.data[0].script); Voice(T.analysis.end_of_analysis );set_happy_end(response.data[0].f6)} 
                })
                .catch((err)=>{console.log(err)})
}

useMemo(()=>{
    if(typeof phase !== 'undefined'){; shuffle()}
},[phase])

useMemo(()=>{
    if(typeof phase !== 'undefined' && rightSymbol.length !== 0){ get_script_from_db()}
},[rightSymbol])


useMemo(()=>{
    if(typeof phase !== 'undefined' && phase!==1 && rightSymbol.length == 0 && foundIon==true){ 
        const current = data[data.length-1]
        const query = `UPDATE ${db_text_name} SET f${phase-1}=? WHERE id=?`      
        Axios.post(SERVER_ROUTS.chat_messages.post, {chat_id:current.id, message: T.analysis.wrong_result ,author: 'bot', ion: cation ? 'cation' : 'anion' })
        .then(rerender_chat)
        .then(()=>{set_failed_end()})
        .then(()=>{Voice(T.analysis.wrong_result )})
        }
},[foundIon])

return null
}



