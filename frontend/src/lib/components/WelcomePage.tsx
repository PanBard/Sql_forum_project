import { APP_CONFIG } from "lib/config"
import { useTranslations } from "lib/hooks"
import React, { useState } from "react"
import styled from "styled-components"

type WelcomePageProps = {
    lang: string
}

export const WelcomePage: React.FunctionComponent<WelcomePageProps> = ({
    lang
}) => {

    const T = useTranslations(lang);
    return(
        <ContainerMain>
            
            <Container>
                <h1>{T.welcome_page.text_1}</h1>
                <H2s>{T.welcome_page.forum_text}</H2s>                                             
            </Container>

            {/* <Container> */}
                {/* <Imagee src={APP_CONFIG.PROBE_GALAXY_URL}></Imagee> */}
            {/* </Container> */}
        </ContainerMain>
      
    )
}

const H2s = styled.h2`
    width:40%;
`

const Imagee = styled.img`
    border-radius: 10px;
`
const ContainerMain = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#346357;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`