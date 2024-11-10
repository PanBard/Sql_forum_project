import { BestButton } from "lib/components/components_modules"
import React, {useEffect, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { API_ROUTS } from "./api_routs_forum"


type DataDashboard = {
    userNumber: any,
    userData: any,
    showPostOrComment(params: any): any,
}


export const User: React.FunctionComponent<DataDashboard> = ({
    userNumber,
    userData,
    showPostOrComment
}) => {
    const SERVER_ADRESS = "http://localhost:4001"
    // const topic_data = post_data;
    let comment_content: any = null;
    // const userID = topic_data.post_user_id;
    const [commentsFromDB, setCommentsFromDB] = useState([])
    const [postsFromDB, setPostsFromDB] = useState([])
    const [postCount, setPostCount] = useState()
    const [commentCount, setCommentCount] = useState()

    const [state, setState] = useState<boolean>(false)

    const [showComment, setShowComment] = useState<boolean>(false)
    const [showPosts, setShowPosts] = useState<boolean>(false)

    const get_user_posts_from_db = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_all_users_posts + userData.id);
            setPostsFromDB(response.data[0]);
            console.log("setPostsFromDB",response.data[0]);
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_user_comments_from_db = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_all_users_comments + userData.id);
            setCommentsFromDB(response.data[0]);
            console.log("setCommentsFromDB",response.data[0]);
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_postCount_from_db = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_postsCount_for_user + userData.id);
            setPostCount(response.data[0].postCount);
            console.log("setPostCount",response.data[0].postCount);
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_commentCount_from_db = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_commentCount_for_user + userData.id);
            setCommentCount(response.data[0].commentCount);
            console.log("setCommentCount",response.data[0].commentCount);
        } catch (err) {
            console.log('db status :(', err);
        }
    };


    const delete_user = async (userId: any) => {
        try {
            const response = await Axios.delete(API_ROUTS.delete_user_and_related_data + `${userId}`);
            console.log("results_delete",response.data.results);
            get_postCount_from_db();
            get_commentCount_from_db();
            get_user_posts_from_db();
            get_user_comments_from_db();
            alert(response.data.message)
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    useEffect(  ()  =>  {
        get_postCount_from_db();
        get_commentCount_from_db();
        get_user_posts_from_db();
        get_user_comments_from_db();
    },[])



    const UserPosts = () => {
            return(
                <div>
                    {postsFromDB.map( (data: any, i) => { 
                return(
                    <Post_small onClick={()=>{showPostOrComment({postId:data.post_id})}} key={i}>Post ID:{data.post_id} | Post Title: {data.post_title}</Post_small>                                                         
                ) })}
                </div>
            )
        }

        const UserComments = () => {
            return(
                <div>
                    {commentsFromDB.map( (data: any, i) => { 
                return(
                    <Comment_small onClick={()=>{showPostOrComment({postId:data.post_id})}} key={i}>Comment ID:{data.comment_id} </Comment_small>                                                         
                ) })}
                </div>
            )
        }

    const UserAllDAta = () => {
        return(

            <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>

                <div>
                    <BestButton onClick={()=>{setShowPosts(!showPosts) }} >Posty</BestButton>                   
                    {showPosts && <UserPosts/>} 
                </div>

                <div>
                    <BestButton onClick={()=>{delete_user(userData.id); console.log(userData.id) }} >Usuń użytkownika</BestButton>                   
                </div>

                <div>
                    <BestButton onClick={()=>{setShowComment(!showComment)}}>Komentarze</BestButton>
                    {showComment && <UserComments/>} 
                </div>                           
            </div>
        )
    }



    return(
                  <div>
                 
                    
                    <Topic >
                               <p  onClick={()=>{setState(!state)}} >User {userNumber}  | Name: {userData.username} |  Liczba wszystkich postów: {postCount} |  Liczba wszystkich komentarzy: {commentCount}</p>  
                               {/* {postCount &&  <p>{postCount}</p>}    */}
                               {/* <BestButton onClick={()=>{postCount}}>elo</BestButton>                                                           */}
                               
                               {state && <UserAllDAta/>}
                    </Topic>  
                    
                   
                 
                 
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

const Coment = styled.div`
    border-radius: 8px; 
    background-color:#E9967A;
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
     
`

const Post_small = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
    margin: 15px;
    padding: 15px;
    cursor: pointer;
     
`

const Comment_small = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
    margin: 15px;
    padding: 15px;
    cursor: pointer;
     
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

