import  Axios  from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";

type ShuffleFateProps = {
    id?: any,
    data?:any,
    phase?:any,
    label?:any,
    cation: boolean,
    lang: string
}

export const ProbabilityResultMatching: React.FunctionComponent<ShuffleFateProps> = ({
    cation,
    lang
}) => {
    const T = useTranslations(lang)
    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [rightSymbol, setRightSymbol] = useState<any[]>([])
    const [foundIon, setfoundIon] = useState<any>()
    const shuffleDiv = useRef<any>(null);

    const db_type = cation ? 'cation_analysis_result' : 'anion_analysis_result' 
    const db_type_name = cation ? 'cation_script_flow' : 'anion_script_flow' 
    const word = T.analysis.propability
    

    useEffect(  ()  =>  {
        get_data()
    },[])

      const get_data = async () => {
        let kontrol = false
      await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{            
            setData(response.data); kontrol=true ;set_up_phase(response.data)})
        .catch((err)=>{console.log('db status :(',err)})
        if(kontrol) return 'ok'
      }

    const set_up_phase = async (data: any)  => {
         const current = data[data.length-1]
         
        if(typeof current !== 'undefined'){
             if((current['end'] == 'incomplete') ){
             if(current['f1'] == null){setPhase(1);return true}
             if(current['f2'] == null){setPhase(2);return true}
             if(current['f3'] == null){setPhase(3);return true}
             if(current['f4'] == null){setPhase(4);return true}
             if(current['f5'] == null){setPhase(5);return true}
             if(current['f6'] == null){setPhase(6);return true}
             if(current['f7'] == null){setPhase(7);return true}
            }  
            
            if((current['end'] == 'end') && (phase !== 100)){                
                setPhase(8)              
            }
        }
    }

    const shuffle = async () => {
                if(phase !== 1 && typeof phase !== 'undefined'){
                    const current = data[data.length-1]

                const prevoiusPhase = phase-1
                await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: prevoiusPhase, label: current[`f${prevoiusPhase}`],db_type:db_type_name})
                .then( (response: any)=>{

                const data = response.data;
                data.map((obj: any)=>{
                    if(phase==2){
                        if(obj.f1 == current.f1){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }}
                        


                    if(phase==3){
                        if(obj.f1 == current.f1 && obj.f2 ==current.f2){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2  && obj.f3=='-' ){
                            setfoundIon(obj.symbol)                            
                        }}


                    if(phase==4){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3  ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4=='-' ){
                            setfoundIon(obj.symbol)                            
                        }}


                    if(phase==5){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5=='-' ){
                            setfoundIon(obj.symbol)                            
                        }}


                    if(phase==6){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6=='-' ){
                            setfoundIon(obj.symbol)                            
                        }}


                    if(phase==7){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6 ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6 == current.f6 && obj.f7=='-' ){
                            setfoundIon(obj.symbol)                            
                        }}

                    if(phase==8){                        
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6 == current.f6 && obj.f7 == current.f7 ){
                            setfoundIon(obj.symbol)                            
                        }}

                   })})                
                .catch((err)=>{console.log('db status :(',err)})
                }}

useMemo(()=>{
    if(typeof phase !== 'undefined') shuffle()
},[phase])

    const returnComponent = () => {
        if(typeof phase !== 'undefined'){
            if(typeof foundIon !== 'undefined'){
                return(
                    <Container>
                        {T.analysis.ion_found}{foundIon}                    
                    </Container>
                    )
            }
            else{
                if(rightSymbol.length == 0 && phase!==1){
                    const current = data[data.length-1]
                    if(current.end == 'end' && current.f7 !== 'brak'){
                        return(
                            <Container>
                              {T.analysis.end_analysis}
                            </Container>
                            )
                    }
                   
                    return(
                        <Container>
                            {T.analysis.wrong_result}
                        </Container>
                        )
                }
                else{   
                        
                      return(
                        <ShuffleContainer ref={shuffleDiv}>
                            {word}
                            <div style={{width:'40px'}}></div>
                            {rightSymbol.map((obj: any,index:number)=>{ return(obj+' ')})}
                        </ShuffleContainer>
                        
                            
                     )
                }
            } 
        }
    }

    return(
        <Container>
            {returnComponent()}
        </Container>
    )
}


const Container = styled.div`    
`
const ShuffleContainer = styled.div`
      border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    justify-content: center;
    padding: 5px;
    
`



