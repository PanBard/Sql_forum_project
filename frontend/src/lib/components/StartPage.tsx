import React, { useState } from "react"
import styled from "styled-components"
import { OneHeader } from "./OneHeader"
import { Footer } from "./Footer"
import { RegistrationForm } from "./RegistrationForm"
import { LoginForm } from "./LoginForm"
import { useTranslations } from "lib/hooks/useTranslations"
import { AboutPage } from "./AboutPage"
import { APP_CONFIG } from "lib/config"

type BeforeLoginProps = {
    choosenWeb(params: any): any
    language(params: any):any
}

export const StartPage: React.FunctionComponent<BeforeLoginProps> = ({
    choosenWeb,
    language
}) => {

    const [loginStatus,setLoginStatus] = useState('Start')
    const [lang,setlang] = useState<string>('PL')
    const T = useTranslations(lang);

    return(
        <Containerr >
            <OneHeader language={(e)=>{language(e);setlang(e)}} insideChoice={(e)=>{setLoginStatus(e)}} choosenWeb={e=>{ choosenWeb(e)}}/>
            
           { loginStatus =='Start' && 
           <ContainerMain>
                <div style={{margin:'20px'}}>
                {/* <div> */}
                    {/* <h1>{T.start_page.welcome_text_1}</h1> */}
                    {/* <H2s>{T.start_page.welcome_text_2}</H2s>
                    <H2s>{T.start_page.welcome_text_3}</H2s> */}
                     <h1>Zaloguj się aby korzystać z forum!</h1>
                </div>                      
            </ContainerMain>}

            {/* <div className="circles" style={{position: 'absolute'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
            </div> */}

            

            {loginStatus=='Register'&&
                <RegistrationForm lang={lang} result={(e)=>{ choosenWeb(e)}}/>
            }

            {loginStatus=='Login'&&
                <LoginForm lang={lang} result={(e)=>{choosenWeb(e)}}/>
            }

           
           <Footer lang={lang}/>      
        </Containerr>
    )
}

const Container = styled.div<{image_url: string}>`
    background-image: url(${p=>p.image_url});
    /* background-color: gold; */
    width: 100%;
    height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index:1;
    overflow-wrap:normal;

`

const H2s = styled.h3`
    width:50%;
`

const ContainerMain = styled.div`
    position: absolute;
    width: 70%;
    top: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
    /* border: 1px solid; */
    /* border-color: rgba(255,255,255,.15); */
     /* background-color:#161b22; */
`

const Containerr = styled.div`
    /* position: absolute; */
    /* width: 100%; */
    /* top: 20%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    /* border: 1px solid; */
    /* border-color: rgba(255,255,255,.15); */
     /* background-color:#161b22; */
    justify-content: space-between;
`