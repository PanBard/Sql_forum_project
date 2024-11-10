import { PhAnalysis } from "lib/database/db_component/PhAnalysis";
import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";


type UserPhAnalysisProps = {
    lang: string
    userName: string
  }
  
  
  export const UserPhAnalysis: React.FunctionComponent<UserPhAnalysisProps> = ({
    lang,
    userName
  }) => {
    
  return (
    <MainContainer>
     <PhAnalysis lang={lang} user={true} userName={userName}/>  
    </MainContainer> 
  ); 

  }

const MainContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`