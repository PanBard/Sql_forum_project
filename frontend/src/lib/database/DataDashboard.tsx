import { BestButton } from "lib/components/components_modules"
import React, {useState } from "react"
import styled from "styled-components"
import { Analysis } from "./db_component/Analysis"
import { VoiceScript } from "./db_component/VoiceScript"
import { DataScript } from "./db_component/DataScript"
import { ImagesTest } from "./db_component/ImagesTest"
import { ChatMessages } from "./db_component/ChatMessages"
import { ImagesStorage } from "./db_component/ImagesStorage"
import { FaceImage } from "./db_component/FaceImage"
import { Users } from "./db_component/Users"
import { PhAnalysis } from "./db_component/PhAnalysis"
import { useTranslations } from "lib/hooks"

type DataDashboard = {
    lang: string
}


export const DataDashboard: React.FunctionComponent<DataDashboard> = ({
    lang
}) => {
    
    const T = useTranslations(lang)
    const [component, setComponent] = useState()
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
     }

     const showComponent = (component: any)=>{
        setComponent(component)
        reset()
     }
     
     const showComponent2 = ()=>{
        return component
     }


     const DropdownMenu_analysis = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">{T.database_buttons.ion_analysis}</BestButton>
            <div className="dropdown-content">
              <a onClick={()=>{showComponent(<Analysis lang={lang} key={seed} rout_name="anion_analysis_result"/>)}}> {T.database_buttons.anion} </a>
              <a onClick={()=>{showComponent(<Analysis lang={lang} key={seed} rout_name="cation_analysis_result"/>)}} > {T.database_buttons.cation} </a>
            </div>
          </div> 
        )
    }

    const DropdownMenu_dataflow = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">{T.database_buttons.dataflow}</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<DataScript lang={lang} key={seed} rout_name="anion_script_flow"/>)}}> {T.database_buttons.anion} </a>
            <a onClick={()=>{showComponent(<DataScript lang={lang} key={seed} rout_name="cation_script_flow"/>)}}> {T.database_buttons.cation} </a>
            </div>
          </div> 
        )
    }

    const DropdownMenu_voicescript = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">{T.database_buttons.voicescript}</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<VoiceScript lang={lang} rout_name="anion_voice_script" key={seed}/>)}}> {T.database_buttons.anion} </a>
            <a onClick={()=>{showComponent(<VoiceScript lang={lang} rout_name="cation_voice_script" key={seed}/>)}}> {T.database_buttons.cation} </a>
            </div>
          </div> 
        )
    }

    const DropdownMenu_images = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">{T.database_buttons.images}</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<ImagesTest lang={lang} key={seed}/>)}}> {T.database_buttons.img_1} </a>
            <a onClick={()=>{showComponent(<ImagesStorage lang={lang} key={seed}/>)}}> {T.database_buttons.img_2} </a>
            {/* <a  onClick={()=>{showComponent(<FaceImage lang={lang} key={seed}/>)}}> {T.database_buttons.img_3} </a> */}
            </div>
          </div> 
        )
    }



    return(
        <Container>
            <HeaderContainer>
                <DropdownMenu_analysis/>
                {/* <BestButton onClick={()=>{showComponent(<PhAnalysis lang={lang} key={seed}/>)}}> {T.database_buttons.ph} </BestButton>         */}
                <DropdownMenu_dataflow/>
                <DropdownMenu_voicescript/>
                <DropdownMenu_images/>
                <BestButton onClick={()=>{showComponent(<ChatMessages lang={lang} key={seed}/>)}}> {T.database_buttons.chat} </BestButton>
                {/* <BestButton onClick={()=>{showComponent(<Users lang={lang} key={seed}/>)}}> {T.database_buttons.users} </BestButton> */}
                       
            </HeaderContainer>
            {showComponent2()}
        </Container>
        
    )
}


const Container = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`

const HeaderContainer = styled.div`
    height: 60px;
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    background-color:#36626a;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
  
`

