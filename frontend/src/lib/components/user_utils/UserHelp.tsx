import { APP_CONFIG } from "lib/config";
import { useTranslations } from "lib/hooks";
import { LoadingAnimation } from "lib/styles";
import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";


type UserHelpProps = {
    lang: string
  }
  
  
  export const UserHelp: React.FunctionComponent<UserHelpProps> = ({
    lang
  }) => {

    const T = useTranslations(lang)

    
  return (
    <MainContainer>
      <Text>{T.user_help.system_info}<a style={{color:'gray'}} href={APP_CONFIG.GITHUB_URL}>{T.components.header.github}</a> </Text>
      <p></p>
      <Text>{T.user_help.model_info}<a style={{color:'gray'}} href={APP_CONFIG.MODELS_URL}>{T.components.footer.models}</a></Text>      
    </MainContainer> 
  ); 

  }

const MainContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`
const Text = styled.span`
  margin:10px;
`