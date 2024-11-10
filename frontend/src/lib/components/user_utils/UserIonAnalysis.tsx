import { Analysis } from "lib/database/db_component/Analysis";
import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { BestButton } from "../components_modules";


type UserIonAnalysisProps = {
    lang: string,
    userName: string
  }
  
  
  export const UserIonAnalysis: React.FunctionComponent<UserIonAnalysisProps> = ({
    lang,
    userName
  }) => {

    const [ion, setion]=useState<string>()
    const [seed, setSeed] = useState(1);

    const reset = () => {
      setSeed(Math.random())
  }
    
  return (
    <MainContainer> 
      <Container>
        <BestButton onClick={()=>{setion('anion_analysis_result');reset()}}>Anion</BestButton>
        <BestButton  onClick={()=>{setion('cation_analysis_result');reset()}}>Cation</BestButton>
      </Container>
      
    { ion && <Analysis key={seed}  lang={lang}  rout_name={ion} user={true} userName={userName}/>}
    </MainContainer> 
  ); 

  }

const MainContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`

const Container = styled.div`
   display: flex;
    flex-direction: column;
`