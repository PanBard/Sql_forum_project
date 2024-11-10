import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import { ProbabilityResultMatching } from "../analysis/ProbabilityResultMatching"
import { useTest_labels } from "lib/hooks/useDetectFlow";
import { BestButton, ContainerP } from "lib/components/components_modules"
import { LiveUpdate } from "../analysis/LiveUpdate"
import { DetectEngine } from "./DetectEngine"
import { useTranslations } from "lib/hooks"


type AnalysisProps = {
    id: number,
    name?: string,
    back(): void,
    rerender?(params: any): any,
    cation: boolean,
    chatCanTellNow(params: any): any,
    result_from_voice_description: any,
    lang: string
}

export const ObjectDetectionDashboard: React.FunctionComponent<AnalysisProps> = ({
    id,
    name,
    rerender,
    cation,
    chatCanTellNow,
    result_from_voice_description,
    lang,
    back
}) => {
    const T = useTranslations(lang);
    const [data, setData] = useState<any[]>([])
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [testowy_label,setTestowy_label] = useState<any>()
    const [image, setImage] = useState<any>()
    const [imgFromDataBase,setImgFromDataBase] = useState<any>([])
    const labelMap = useTest_labels()
    const [bollena, setBoollena] = useState<boolean>(false)
    const [showFakeDetection,setShowFakeDetection] = useState<boolean>(false);

    const db_type = cation ? 'cation_analysis_result' : 'anion_analysis_result' 
    const title = cation ? T.analysis.cation_identification : T.analysis.anion_identification
    const phases =cation ? ['f1','f2','f3','f4','f5','f6','f7'] : ['f1','f2','f3','f4']
    
    

    const catchMessageFromChild = (message: any) => {
        if(message[0] !== '404' && typeof message[0] !== 'undefined') //in case if choose option choose image
        {            
            setTestowy_label(message[0]);
            setImage(message[1]);
            setDataFromChildComponent(message)
            setEndDetect(!endDetect)
        }
      }; 

      useEffect(()=>{
        get_data()       
      },[])

      const get_data = async () => {
      await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{setData(response.data);
          Axios.get(SERVER_ROUTS.test_images.get)
          .then( (response: any)=>{            
          setImgFromDataBase(response.data) })
          .catch((err)=>{console.log('db status :(',err)})        
        })
        .catch((err)=>{console.log('db status :(',err)})
      }

    const quck_update = async (label: any, img_index:string,f_index:string, end:string)=>{      
        await Axios.put(SERVER_ROUTS[db_type].put, {id:id,name:name,[f_index]: labelMap[label] ,[img_index]:image,end:end})    
        .then(rerender)
    }; 

    const send_detection_results_to_db = async ()  => {
       await get_data()
       .then(e =>{   
             
        const current = data[data.length-1]
        if((current['end'] == 'incomplete') && (phase !== 100)){
          
          let condition = true
          phases.map((phase: string, index)=>{            
            if(current[phase] == null && current['end'] !== 'end' && condition){quck_update(testowy_label,`img${index+1}`,phase,'incomplete'); condition=false}
          })

        }
        if((current['end'] == 'incomplete') && (current['f7'] !== null)){
           rerender
        }
       })}

      useEffect(() => {
        if(endDetect){
            send_detection_results_to_db()
            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])

      useMemo(()=>{
        if(typeof result_from_voice_description != 'undefined'){
          catchMessageFromChild([result_from_voice_description,''])
        }
      },[result_from_voice_description])
 

      return(
        <ContainerP style={{margin:'10px'}}>
          
          <Container>
            <BestButton onClick={()=>{back()}} > {T.common.end} </BestButton>
          </Container>

          <Container style={{width: '150px' , margin: '50px'}}>
            <ProbabilityResultMatching lang={lang} cation={cation} />
          </Container>

          <Container2>
               {bollena && <DetectEngine refreshChat={(e)=>{chatCanTellNow(e)}} return_results_to_parent_component={e => {catchMessageFromChild(e)}} key={phase}/>}                 
            </Container2>

          {  !bollena &&  <Container>

                <Container>
                    
                    <h4>[ {title} ]</h4>
                    <h2>  {T.analysis.analysis_name} {name} </h2>
                    <h3>ID: {id}</h3>
                </Container>

              
                   <Container>
                        <label>{T.analysis.choose_img }</label>
                        <select name="op" id="op" onChange={(obj)=>{ 
                          setTestowy_label(obj.target.value);
                          setImage(imgFromDataBase[obj.target.value].img );
                          }}>
                        <option key={89} value={404}>  {T.analysis.test_image} </option>
                        {imgFromDataBase.map((obj: any,index: number)=>{                          
                        return(  <option key={index} value={index}> {T.analysis_results_names[obj.label as keyof typeof T.analysis_results_names]} </option>  )})}
                        </select>
                        <BestButton onClick={()=>{catchMessageFromChild([testowy_label,image])}} > {T.analysis.fake_analysis}</BestButton>
                      
                    </Container>

                     {/* <BestButton onClick={()=>{setBoollena(!bollena)}} >  {T.analysis.webcam_detection} </BestButton> */}
                
                  <LiveUpdate lang={lang} cation={cation}/>
                
            </Container>}
        </ContainerP>
       
    )
}

const Container = styled.div`
    margin-bottom: 10px;
`

const Container2 = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex: 1;
    z-index: 10000;
    
`