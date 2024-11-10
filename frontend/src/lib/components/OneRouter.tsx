import React, { useState } from "react"
import styled from "styled-components";
import {WelcomePage, Footer, StartPage, OneHeaderWork } from "./";
import { DataDashboard } from "lib/database/DataDashboard";
import { AnalysisDashboard, WebcamScreenshot, PHAnalyser, FaceRecognitionDemo, RegisterFaceRecognition} from "lib/features";
import { UserSettings, UserProfile, UserIonAnalysis, UserPhAnalysis, UserHelp} from "./user_utils";
import { UserFaceID } from "./user_utils/UserFaceID";
import { Forum } from "lib/forum/Forum";


export const OneRouter: React.FunctionComponent = () => {

    const [webStatus, setWebStatus] = useState('Start')
    const [loginStatus,setLoginStatus] = useState('Start')
    const [userName, setUserName] = useState<any>()
    const [language, setLanguage] = useState<string>("PL")

    return(
        <Container>
             {loginStatus=='Login' && 
             
             <MojDIV>
                <OneHeaderWork language={(e)=>{setLanguage(e)}} lang={language} userName={userName} choosenWeb={e => {setWebStatus(e)}}/> {/*this bar is working outside routes, so is working in all moduls */}
                <Container>
                    {webStatus=='Start' && <WelcomePage lang={language}/>}
                    {webStatus=='Forum' && <Forum userName={userName} lang={language}/>} 
                    {/* {webStatus=='DataBase' && <DataDashboard lang={language}/>}                
                    {webStatus=='Analysis' && <AnalysisDashboard  userName={userName} lang={language} back={(e)=>{setWebStatus(e)}}/>}                                                 */}
                    {/* {webStatus == 'pH' && <PHAnalyser userName={userName} lang={language}/>}                 */}
                    {/* {webStatus == 'FaceRecognition' && <FaceRecognitionDemo lang={language} />} */}
                    {/* {webStatus == 'RegisterFaceRecognition' && <UserFaceID lang={language} userName={userName} />} */}
                    {/* {webStatus == 'Screenshot' && <WebcamScreenshot lang={language}/>}       */}
                    {/* {webStatus == 'UserSettings' && <UserSettings language={(e)=>{setLanguage(e)}} lang={language}/>}      */}
                    {/* {webStatus == 'UserProfile' && <UserProfile userName={userName} lang={language}/>}         */}
                    {/* {webStatus == 'UserIonAnalysis' && <UserIonAnalysis userName={userName} lang={language}/>}       */}
                    {/* {webStatus == 'UserPHAnalysis' && <UserPhAnalysis userName={userName} lang={language}/>}   */}
                    {/* {webStatus == 'UserHelp' && <UserHelp lang={language}/>}   */}
                </Container>
            </MojDIV>}

            {loginStatus=='Start' &&   <StartPage language={(e)=>{setLanguage(e)}} choosenWeb={e => {setUserName(e['userName']) ; setLoginStatus(e['result']) }} />}
        </Container>              
    )
}

const Container = styled.div`   
`
const MojDIV = styled.div`
/* width: 100%;
height: 100vh; */
background-color: #346357;
color: ${({theme}) => theme.colors.typography};
display: flex;
flex-direction: column;
justify-content: space-between;
`