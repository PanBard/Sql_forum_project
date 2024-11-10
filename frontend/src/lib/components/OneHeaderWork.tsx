import { APP_CONFIG } from "lib/config"
import styled from "styled-components"
import { BestButton } from './components_modules';
import { useTranslations } from "lib/hooks/useTranslations";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useEffect, useRef, useState } from "react";


type OneHeaderWorkProps = {
    choosenWeb(params: any): any,
    userName: any,
    lang: string,
    language(param: any): any
}


export const OneHeaderWork: React.FunctionComponent<OneHeaderWorkProps> = ({
    choosenWeb,
    userName,
    lang,
    language
}) => {
    const T = useTranslations(lang)
    const [userImage,setUserImage] = useState()
    const [menu, setMenu] = useState<any>()

    const ShadeRef = useRef<any>(null);
    const ModalRef = useRef<any>(null);

    // useEffect(()=>{
    //     getUserImage()
    // },[])

    // const getUserImage = async ()=> {
    //     const query = `select CONVERT(img1 USING utf8) as img1 from face_img_storage where username='${userName}'`
    //     await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
    //         .then((response)=>{ setUserImage(response.data[0].img1)  })
    //         .catch((err)=>{console.log('send status :(',err)})
    // }

    const makeInstanceOfMenu = ()=>{
        setMenu( 
        <div>
            <Shade ref={ShadeRef} onClick={closeMenu}></Shade>
            <Modal ref={ModalRef} > 
                <MenuButton onClick={()=>{choosenWeb('UserProfile');closeMenu()}}>  <CustomImage src={APP_CONFIG.USER_IMAGE_MENU}  alt=""  />   {T.dashboard_header.dropdown_profile} </MenuButton>          
                {/* <MenuButton onClick={()=>{choosenWeb('RegisterFaceRecognition');closeMenu()}} > <CustomImage src={APP_CONFIG.FACEID_IMAGR}  alt=""  />  {T.dashboard_header.dropdown_faceid}</MenuButton>  */} 
                <MenuButton onClick={()=>{choosenWeb('RegisterFaceRecognition');closeMenu()}} > <CustomImage src={APP_CONFIG.FACEID_IMAGR}  alt=""  />  {T.dashboard_header.dropdown_faceid}</MenuButton>   
                <MenuButton onClick={()=>{choosenWeb('UserIonAnalysis');closeMenu()}}> <CustomImage src={APP_CONFIG.ION_ANNALYS_IMAGE}  alt=""  />{T.dashboard_header.dropdown_ion}</MenuButton>   
                <MenuButton onClick={()=>{choosenWeb('UserPHAnalysis');closeMenu()}}> <CustomImage src={APP_CONFIG.PH_ANALYS_IMAGE}  alt=""  />{T.dashboard_header.dropdown_ph}</MenuButton>   
                <MenuButton onClick={()=>{choosenWeb('UserHelp');closeMenu()}}> <CustomImage src={APP_CONFIG.HELP_IMAGE}  alt=""  />{T.dashboard_header.dropdown_help}</MenuButton>   
                <MenuButton onClick={()=>{choosenWeb('UserSettings');closeMenu()}}> <CustomImage src={APP_CONFIG.SETTINGS_IMAGE}  alt=""  />{T.dashboard_header.dropdown_Settings}</MenuButton>   
                <MenuButton onClick={()=>{location.reload();closeMenu()}} >{T.dashboard_header.dropdown_signout}</MenuButton>        
            </Modal>
        </div>)
        ShadeRef.current.style.display = ModalRef.current.style.display = 'flex'                     
     }
     
     const showMenu = ()=>{
        return menu
     }

     const closeMenu = () =>{
        ShadeRef.current.style.display = ModalRef.current.style.display = 'none';    
    }
  
    return(
        <HeaderContainer>
             {/* <LogoContainer>
                <Linkos onClick={()=>{choosenWeb('Start')}}>
                    <Title>
                        {T.components.header.title}
                    </Title>
                </Linkos>  
                <img src={APP_CONFIG.LOGO_URL} alt=""  height={25} width={25}/>              
            </LogoContainer> */}

            <LinkContainer>  
            {/* <BestButton onClick={()=>{choosenWeb('Analysis')}}>{T.dashboard_header.analysis} </BestButton>     */}
            {/* <BestButton onClick={()=>{choosenWeb('pH')}}> {T.dashboard_header.ph}  </BestButton>                */}
            <BestButton onClick={()=>{choosenWeb('Forum')}}> {T.dashboard_header.forum}  </BestButton>         
            {/* <BestButton onClick={()=>{choosenWeb('FaceRecognition')}}> {T.dashboard_header.face_recognition}  </BestButton> */}
            {/* <BestButton onClick={()=>{choosenWeb('Screenshot')}}> {T.dashboard_header.others}  </BestButton> */}
            </LinkContainer>

            <LogoContainer>
            
                {/* <DropdownMenu_analysis /> */}
                <div>{T.dashboard_header.user_id} {userName}</div>
                {/* <UserImage onClick={()=>{makeInstanceOfMenu()}} src={userImage ? userImage : APP_CONFIG.USER_IMG_URL}  alt=""  />      take img from db or set default img as avatar */}
                {/* {showMenu()} */}
                {/* <BestButton onClick={()=>{language('EN')}}>{T.user_settings.EN_btn}</BestButton>
                <BestButton onClick={()=>{language('PL')}}>{T.user_settings.PL_btn}</BestButton> */}
            </LogoContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    height: 60px;
    padding: 0 15px;
    display: flex;
    // flex-direction: row;
    align-items: center;
    justify-content: center;
`

const LogoContainer = styled.div`
position: fixed;
top: 0;
right: 0;
padding: 10px;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Linkos = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px;
      text-decoration: none;
      display: flex;
    //   height:100px;
    //   width:200px;

`

const UserImage = styled.img`
    cursor: pointer;
    background-color:rgb(200, 214, 229);
    border-radius: 15px;
    margin: 10px;
    height:30px;
    width:30px;
`

const CustomImage = styled.img`
    cursor: pointer;
    /* background-color:rgb(200, 214, 229); */
    /* border-radius: 15px; */
    zoom:0.5;
    height:40px;
    width:40px;
`
const Shade = styled.div`
    display: block;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(110,118,129,0.4);
    /* opacity: 0.5; */
    filter: alpha(opacity=50);
`

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #282728;

    position: absolute;
    z-index: 101;
    top: 10%;
    right: 5px;
    width: 200px;
`

const MenuButton = styled(BestButton)`
    display: flex;
    justify-content: space-between;
    justify-items: center;
    flex-direction: row;
    z-index: 101;
    background-color:black;
    margin: 2px;
`