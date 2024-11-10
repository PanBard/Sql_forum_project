import { BestButton } from "lib/components/components_modules"
import React, {useEffect, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { API_ROUTS } from "./api_routs_forum"


type DataDashboard = {
    postId: string,
    editPost(params: any): any,
}


export const Post: React.FunctionComponent<DataDashboard> = ({
    postId,
    editPost
}) => {
    let comment_content: any = null;
    const [commentsFromDB, setCommentsFromDB] = useState([])
    const [dataFromDataBase_all, setDataFromDataBase_all] = useState<any>()
    const [stats_from_db, setStats_from_db] = useState<any>()


    const get_comments_from_db = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_comments_for_specific_post + postId);
            setCommentsFromDB(response.data[0]);
            console.log("response.data",response.data[0]);
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_summary_post_stats = async () => {

        try {
            const response = await Axios.get(API_ROUTS.get_summary_stats);
            setStats_from_db(response.data[0][0]);
            console.log("get_summary_stats",response.data[0][0]);
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_all_info_about_post_and_comments_from_db = async () => {
        const query = `SELECT * FROM user_posts_info AS upi
         JOIN view_post_statistics AS vps ON upi.post_id = vps.id 
         JOIN view_posts_with_categories AS vpwc ON upi.post_id = vpwc.post_id 
         WHERE upi.post_id = '${postId}';`
        try {
            const response = await Axios.post(API_ROUTS.custom_query, {query: query});
            setDataFromDataBase_all(response.data[0]);
            // setDataFromDataBase(response.data);
            console.log("JOIN data:",response.data);

            get_comments_from_db();
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const delete_comment = async (comment_Id: number) => {
        try {
            const response = await Axios.delete(API_ROUTS.delete_comment + comment_Id);
            console.log("response.data",response.data);
            get_comments_from_db()
            alert(response.data.message)
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const delete_post = async (post_Id: any) => {
        try {
            const response = await Axios.delete(API_ROUTS.delete_post_and_related_comments + post_Id);
            console.log("results_delete",response.data.results);
            get_all_info_about_post_and_comments_from_db()
            alert(response.data.message)
        } catch (err) {
            console.log('db status :(', err);
        }
    };

    useEffect(  ()  =>  {
        get_all_info_about_post_and_comments_from_db();
        get_summary_post_stats();
    },[])

    const send_new_comment_to_db = async ( ) => {
        try {
            const response = await Axios.post(API_ROUTS.add_comment,{ post_id:postId, user_id: dataFromDataBase_all.post_user_id, content:comment_content });
            // setDataFromDataBase(response.data);
            console.log(response.data);
            get_comments_from_db();
            get_all_info_about_post_and_comments_from_db();
            alert(response.data.message);
            // showComponent(<List_of_topics />)            
        } catch (err) {
            console.log('db status :(', err);
        }
    };



    return(
        <Topic2>
            {dataFromDataBase_all && commentsFromDB && stats_from_db &&
            <div>
            <div>
            <h3>Post użytkownika <span style={{fontSize: '20px', fontStyle: 'italic'}}>{dataFromDataBase_all.user_username}</span></h3>
            <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                <h1>Topic: {dataFromDataBase_all.post_title}</h1>
                <div>
                    <BestButton onClick={()=>{editPost(dataFromDataBase_all.post_id)}}>Edytuj post</BestButton>
                    <BestButton onClick={()=>{delete_post(dataFromDataBase_all.post_id)}}>Usuń post</BestButton>
                </div>
            </div>
            
            <Choosen_topic>
                <p>{dataFromDataBase_all.post_content}</p>
            </Choosen_topic>
            
        </div>

        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'center' , width:'70%'}}>
                <h3>Komentarze:</h3>

                {commentsFromDB.map( (data: any, i) => { 
            return(
                <Topic key={i} >
                    <Container>
                    <p>Comment no: {i+1}  </p>  
                    <p>  User: {data.user_name}</p>
                    </Container>
                    
                        {/* <h3 >Treść komentarza: </h3> */}
                        <Coment> <Spannno >Treść komentarza:</Spannno> {data.content}</Coment>
                        <p>Created:  {data.created_at}</p>
                        <BestButton onClick={()=>{delete_comment(data.comment_id)}}>Usuń komentarz</BestButton>
                        {/* <p >{data.content}</p> */}
                </Topic>                                   
            ) })}

                <p><label >Napisz nowy: </label></p>
                <textarea style={{backgroundColor: 'gray'}}  onChange={ (e)=>{comment_content = e.target.value; console.log(e.target.value)}} ></textarea >
                <p></p>
                <BestButton onClick={()=>{send_new_comment_to_db()}}> Wyślij komentarz </BestButton>
                </div>


                <HeaderContainer>
                    <p>Dane i statystyki:</p>
                    
                    <p>user id: {dataFromDataBase_all.post_user_id}</p>
                    <p>user name: {dataFromDataBase_all.user_username}</p>
                    <p>user email: {dataFromDataBase_all.user_email}</p>
                    <p></p>

                    <p>post id: {dataFromDataBase_all.post_id}</p>
                    <p>post type: {dataFromDataBase_all.category_name}</p>
                    <p>this post length: {dataFromDataBase_all.average_post_length}</p>
                    <p>comment count: {dataFromDataBase_all.comment_count}</p>

                    <p></p>

                    <p>average_comment_length: {stats_from_db.average_comment_length}</p>
                    <p>average_post_length: {stats_from_db.average_post_length}</p>
                    <p>total_comments: {stats_from_db.total_comments}</p>
                    <p>total_posts: {stats_from_db.total_posts}</p>

                    <p>Ogólny udział w treści w serwisie: {((dataFromDataBase_all.average_post_length/stats_from_db.average_post_length)*100).toFixed(2)}%</p>
                    <p>Popularność postu: {((dataFromDataBase_all.comment_count/stats_from_db.total_comments)*100).toFixed(2)}%</p>
 
                    
                </HeaderContainer>
        </div>

        
        
        </div>
            }



      
      </Topic2> 
        
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

    width: 90%;

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: #FF8C00;
    margin: 15px;
    padding: 15px;

   
`

const Topic2 = styled.div`

    min-width: 80%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: #cadded;
    margin: 15px;
    padding: 15px; 
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
  
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    width: 30%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 4px solid;
    border-color: rgba(255,255,255,.15);
`

