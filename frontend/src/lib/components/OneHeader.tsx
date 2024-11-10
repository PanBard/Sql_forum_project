import styled from "styled-components"
import { BestButton } from './components_modules';
import { useTranslations } from "lib/hooks/useTranslations";
import { APP_CONFIG } from "lib/config";
import { useState } from "react";

type OneHeaderProps = {
    choosenWeb(params: any): any,
    insideChoice(params: any): any,
    language(params: any):any
}

export const OneHeader: React.FunctionComponent<OneHeaderProps> = ({
    choosenWeb,
    insideChoice,
    language
}) => {
    
    const [language_bt, setLanguage_bt] = useState<string>("PL")
    const T = useTranslations(language_bt)
    
    const DropdownChangeLanguage = () =>{
        return(
            <div className="dropdown">
                {language_bt}
            <div style={{width:'20px'}} className="dropdown-content-user">
              <Clk style={{display: language_bt=='EN' ? 'none' : 'block'}} onClick={()=>{language("EN");setLanguage_bt("EN")}} >{T.supported_languages.en}</Clk>
              <Clk style={{display: language_bt=='EN' ? 'block' : 'none'}} onClick={()=>{language("PL");setLanguage_bt("PL")}} >{T.supported_languages.pl}</Clk>
            </div>
          </div> 
        )
    }
    
    return(
        <HeaderContainer>

            <LogoContainer onClick={()=>{insideChoice('Start')}}>
                <Linkos >
                    <Title>
                        {/* {T.components.header.title}  */}
                    </Title>
                </Linkos>  
                {/* <img onClick={()=>{choosenWeb({result:'Login'})}} src={APP_CONFIG.LOGO_URL}alt=""  height={25} width={25}/>               */}
                <div onClick={()=>{choosenWeb({result: 'Login', userName : 'test'})}}>sec</div>
            </LogoContainer>

            {/* <LinkContainer>                                 
                <BestButton style={{background: 'transparent'}} onClick={()=>{insideChoice('AboutPage')}}> {T.start_page.button_about} </BestButton>                                                                       
            </LinkContainer> */}

            <LinkContainer>

                <Linkos  onClick={()=>{insideChoice('Login')}} >  {/* target='_blank' eby otwierao sié w nowym oknie */}
                    {T.start_page.button_sign_in}
                </Linkos>

                <Linkos onClick={()=>{insideChoice('Register')}} >
                {T.start_page.button_sign_up}
                </Linkos>

                <Linkoss>
                    {/* <DropdownChangeLanguage/> */}
                </Linkoss>

            </LinkContainer>

        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    padding: 0 15px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 4;
    width: 100%;
    
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
`

const Linkos = styled.a`
    color: ${({theme})=> theme.colors.typography};
    text-decoration: underline;
    cursor: pointer; 
    padding: 0 10px;
    text-decoration: none;
    :hover{text-decoration: underline};
    font-size: large;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Linkoss = styled.div`
    color: ${({theme})=> theme.colors.typography};
    text-decoration: underline;
    cursor: pointer; 
    padding: 0 10px;
    text-decoration: none;
    :hover{text-decoration: underline};
    font-size: large;
    display: flex;
    flex-direction: row;
    align-items: center;
`


const Clk = styled.div`
    width: 20px;
    height: 20px;
`