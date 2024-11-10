import { APP_CONFIG } from "lib/config"
import { useTranslations } from "lib/hooks"
import React, { useState } from "react"
import styled from "styled-components"
import { BestButton, ContainerP } from './components_modules';
type AboutPageProps = {
    lang: string
}

export const AboutPage: React.FunctionComponent<AboutPageProps> = ({
    lang
}) => {

    const T = useTranslations(lang);
    return(
        <Container >
            <RelativeContainer>
                    {/* <ContainerP> */} 
                <BackgroundDiv></BackgroundDiv>
                <TableContainer >
                    
                    <Text>{T.about_page.text_1}</Text>                   
                    <Text>{T.about_page.text_2}</Text>
                    <Text>{T.about_page.text_3}</Text>
                    <Text>{T.about_page.text_4}</Text>
                                                               
                </TableContainer>
            {/* </ContainerP> */}
           
            </RelativeContainer>
        
        </Container>
       
    )       
}

const Container = styled.div`
  padding: 0 15px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    position: absolute; 
    top: 20%;
    z-index: 4;
    width: 100%;    
`

const Input = styled.input`
    background-color: ${ ({theme}) => theme.colors.foreground };
    width: 60%;
    color: ${ ({theme}) => theme.colors.typography };
    height: 30px;
    ::placeholder{color:gray}
    border-radius: 10px;
    border: 1px solid;
    border-color: rgba(255,255,255,.35);
`

const TableContainer = styled.div`
   
    justify-content: center;
    border-radius: 5px;
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const RelativeContainer = styled.div`
    position: relative;
    /* width: 300px; */
    /* height: 200px; */
    border: 1px solid ;
    border-color: rgba(255,255,255,.55);
    border-radius: 10px;
    top: 20%;
    
    width: 80%;   
    height: 350px;

`

const BackgroundDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;    
    opacity: 30%;
    border-radius: 10px;

`
const Text = styled.h3`
    opacity:100%;
`