import Axios  from "axios";
import { APP_CONFIG } from "lib/config";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";
import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";


type UserProfileProps = {
    lang: string
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
  phone: string,
  status: string
}
  
  
  export const UserProfile: React.FunctionComponent<UserProfileProps> = ({
    lang,
    userName
  }) => {

    const T = useTranslations(lang)
    const [userData, setUserData] = useState<userdata>()
    const [userImage, setuserImage] = useState()

    const get_user_data_from_db = async () => {
      const query = `SELECT * FROM account_credentials WHERE username = '${userName}' `
      await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
      .then( (response: any)=>{setUserData(response.data[0])})
      .catch((err)=>{console.log('db status :(',err)})
  }

  const get_user_image_from_db = async () => {
      const query = `SELECT CONVERT(img1 USING utf8) as img FROM face_img_storage WHERE username = '${userName}'`
      await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
      .then( (response: any)=>{setuserImage(response.data[0].img) })
      .catch((err)=>{console.log('db status :(',err)})
  }

  useEffect(()=>{
    get_user_data_from_db();
    get_user_image_from_db();
  },[])

  const mapPasswordToStars = (passord: string) => {
    const num = passord.length
    let stars = ""
    for(let i = 0; i<num; i++){
      stars = stars + '*'
    }
    return stars
  }

  
    return(
      <OrderContainer>        

          <UserDataContainer >
            {T.user_profile.data_header}
            <DataBar></DataBar>
           <DataBar2>{T.user_profile.username}    <span/>  {userData?.username ? userData.username : T.common.no_data}                                </DataBar2>
           <DataBar>{T.user_profile.first_name}   <span/>  {userData?.first_name ? userData.first_name : T.common.no_data}                            </DataBar>
           <DataBar2>{T.user_profile.last_name}   <span/>  {userData?.last_name ? userData.last_name : T.common.no_data}                              </DataBar2>
           <DataBar>{T.user_profile.emial}        <span/>  {userData?.email ? userData.email : T.common.no_data}                                      </DataBar>
           <DataBar2>{T.user_profile.phone}       <span/>  {userData?.phone ? userData.phone : T.common.no_data}                              </DataBar2>
           <DataBar>{T.user_profile.auth}         <span/>  {userData?.id ? userData.id : T.common.no_data}                                      </DataBar>
           <DataBar2>{T.user_profile.password}    <span/>  {userData?.password ? mapPasswordToStars(userData.password) : T.common.no_data}        </DataBar2>
           <DataBar> {T.user_profile.accout_type}        <span/> {userData?.status ? userData.status : T.common.no_data}      </DataBar>
           <DataBar2>{T.user_profile.date}  <span/>   {userData?.date ? userData.date.replace('T',' | ').slice(0,-16) : T.common.no_data}         </DataBar2>
          </UserDataContainer>


       
        <CenterContainer>
          <ImageContainer >
          {T.user_profile.image_header}
            <UserImage src={userImage ? userImage : APP_CONFIG.USER_IMG_URL} />
        </ImageContainer>
        </CenterContainer>
        
                  
    </OrderContainer>
    )

  }


const OrderContainer = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    flex: 1;
    margin: 10px;
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

const UserDataContainer = styled(Container)`
   justify-content: space-between;
   width:60%;
`

const ImageContainer = styled.div`
   display: flex;
   flex-direction: column;
    height: 400px;    
   justify-content: space-around;
`

const CenterContainer = styled.div`
  display: flex;  
  width:300px;
  justify-content: center;
  border: 1px solid;
  border-color: rgba(255,255,255,.15);    
`

const DataBar = styled.span`  
  padding: 10px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
`
const DataBar2 = styled(DataBar)`
  background-color:#282728;
`

// const UserImage = styled.img`
//   width: 200px;
//   height: 200px;
// `
const UserImage = styled.img`
    background-color:rgb(200, 214, 229);
    border-radius: 15px;
    margin: 10px;
    height:200px;
    width:200px;
`