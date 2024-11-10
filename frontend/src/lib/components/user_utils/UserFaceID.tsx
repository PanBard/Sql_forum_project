import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { BestButton } from "../components_modules";
import { APP_CONFIG } from "lib/config";
import { RegisterFaceRecognition } from "lib/features";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";


type UserFaceIDsProps = {
    lang: string,
    userName: string
  }

  type userdata = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    date: string,
    phone: string
  }
  
  
  export const UserFaceID: React.FunctionComponent<UserFaceIDsProps> = ({
    lang,
    userName
  }) => {
    
    const T = useTranslations(lang)
    const [status, setStatus] = useState<any>()
    const [showMenuWithButton, setShowMenuWithButton] = useState<boolean>(true)
    const [userImageDate, setuserImageDate] = useState<string>()

    const [userImage, setuserImage] = useState()

  const get_user_image_from_db = async () => {
      const query = `SELECT CONVERT(img1 USING utf8) as img, date FROM face_img_storage WHERE username = '${userName}'`
      await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
      .then( (response: any)=>{setuserImage(response.data[0].img);setuserImageDate(response.data[0].date)  })
      .catch((err)=>{console.log('db status :(',err)})
  }

  useEffect(()=>{
    get_user_image_from_db();
  },[])

    const returnSetting = ()=>{
      if(status=='RegisterFaceRecognition'){
         return(
          <RegisterFaceRecognition back={()=>{setStatus(""); setShowMenuWithButton(true)}} lang={lang} userName={userName}  />

        )
      }
      if(status=='apperance'){
        return(
           <SettingContainer>
            {userImage && userImageDate ? <div style={{marginTop:"10px"}}>{T.user_faceid.scan_exist_text} {userImageDate.replace('T',' | ').slice(0,-8) }</div> : <div style={{marginTop:"10px"}}>{T.user_faceid.no_scan_text}</div>}
            {userImage ? <UserImage src={userImage}/> :  <BestButton onClick={()=>{setStatus("RegisterFaceRecognition"); setShowMenuWithButton(false) }}>{T.user_faceid.no_scan_btn}</BestButton> }
            {userImage && <BestButton onClick={()=>{setStatus("RegisterFaceRecognition"); setShowMenuWithButton(false) }}>{T.user_faceid.scan_exist_btn}</BestButton> }
           </SettingContainer>
       )
     }
    }

  return (
    <OrderContainer>        

   {showMenuWithButton && <UserDataContainer >
      <BestButton onClick={()=>{setStatus("apperance")}}>{T.user_faceid.menu_btn}</BestButton>
      </UserDataContainer>
    }


 
  <CenterContainer>
  
    {returnSetting()}
  </CenterContainer>
  
            
</OrderContainer>
  ); 

  }

  const OrderContainer = styled.div`
  color: ${({theme}) => theme.colors.typography};
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 30px;
  /* justify-content: space-between; */
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  overflow: hidden;
  padding: 10px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid;
  border-color: rgba(255,255,255,.15);    
`
const SettingContainer = styled(Container)`
border: none;
flex: 1;
`

const UserDataContainer = styled(Container)`
 /* justify-content: space-between; */
 width:300px;
`

const ImageContainer = styled.div`
 display: flex;
 flex-direction: column;
  height: 400px;    
 justify-content: space-around;
`

const CenterContainer = styled.div`
display: flex;  
width:60&;
justify-content: center;
border: 1px solid;
border-color: rgba(255,255,255,.15);    
`

const DataBar = styled.span`  
padding: 10px;
height: 50px;
display: flex;
justify-content: space-between;
justify-items: center;
`
const DataBar2 = styled(DataBar)`
background-color:#282728;
`

const UserImage = styled.img`
    background-color:rgb(200, 214, 229);
    border-radius: 15px;
    margin: 10px;
    height: 50px;
    width:  50px;
`

