import { BestButton } from "lib/components/components_modules"
import React, {useEffect, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { API_ROUTS } from "./api_routs_forum"
import { User } from "./User"


type DataDashboard = {
    showPostOrComment(params: any): any,
}


export const UsersDashboard: React.FunctionComponent<DataDashboard> = ({
    showPostOrComment
}) => {
    const SERVER_ADRESS = "http://localhost:4001"
    // const topic_data = post_data;
    let comment_content: any = null;
    // const userID = topic_data.post_user_id;
    const [usersFromDB, setUsersFromDB] = useState([])



    const get_users_from_db = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_all_users);
            setUsersFromDB(response.data);
            console.log("response.data",response.data);
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    useEffect(  ()  =>  {
        get_users_from_db();
    },[])

    // const send_new_comment_to_db = async ( ) => {
    //     try {
    //         const response = await Axios.post(API_ROUTS.add_comment,{ post_id:postId, user_id: userID, content:comment_content });
    //         // setDataFromDataBase(response.data);
    //         console.log(response.data);
    //         get_comments_from_db();
    //         alert(response.data.message);
    //         // showComponent(<List_of_topics />)            
    //     } catch (err) {
    //         console.log('db status :(', err);
    //     }
    // };



    return(
        <div>
            {usersFromDB.map( (data: any, i) => { 
            return(
                <User showPostOrComment={(e)=>{showPostOrComment(e)}} key={i} userNumber={i+1} userData={data}/>                                                         
            ) })}
      </div> 
        
    )
}


const Container = styled.div`
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
` 

const Coment = styled.p`
    padding: 10px;
    border-radius: 8px; 
    background-color:#008080;
`

const Spannno = styled.span`
    font-weight:600;
    color: black;
`

const Topic = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: #FF8C00;
    margin: 15px;
    padding: 15px;
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.foreground}}; 
`

const Choosen_topic = styled.div`

    width: 100%;
    font-Size: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: #36626a;
    margin: 15px;
    padding: 15px;

`

const HeaderContainer = styled.div`
    height: 60px;
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    background-color:#36626a;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`

