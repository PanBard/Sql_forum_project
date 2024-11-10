import { BestButton } from "lib/components/components_modules"
import React, {useEffect, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { API_ROUTS } from "./api_routs_forum"
import { Post } from "./Post"
import { UsersDashboard } from "./UsersDashboard"
import { ListaPostow } from "./ListaPostow"
import { NewPost } from "./NewPost"
import { EditPost } from "./EditPost"


type DataDashboard = {
    userName: string
}


export const Forum: React.FunctionComponent<DataDashboard> = ({
    userName
}) => {
    const [component, setComponent] = useState()
    const [userID, setUserID] = useState<any>()
    const [showCommetOrPostFromUser,setShowCommetOrPostFromUser] = useState<any>()
    let title: any = null;
    let content: any = null;
    const [categories, setCategories] = useState<any>()
    let categories_id: any = null;
    // const categories = ["blog","poradnik","pytanie"]

    useEffect(  ()  =>  {
        get_user_id_from_db();
    },[])

    useEffect(()=>{
        if(showCommetOrPostFromUser){
            if(showCommetOrPostFromUser.postId){
            console.log("postId", showCommetOrPostFromUser.postId);
            showComponent(<Post editPost={(e)=>{showComponent(<EditPost  postId={e} postAdded={()=>{showComponent(<List_of_topics />)}} />)}} postId={showCommetOrPostFromUser.postId} />)
        }
        }
    },[showCommetOrPostFromUser])

    const get_user_id_from_db = async () => {
        const query = `select id from users where username='${userName}'`
        try {
            const response = await Axios.post(API_ROUTS.custom_query, {query: query});
            setUserID(response.data[0].id);
            // setDataFromDataBase(response.data);
            // console.log("response.data.id",response.data[0].id);
        } catch (err) {
            console.log('db status :(', err);
        }
    };


     const showComponent = (component: any)=>{
        setComponent(component)
   
     }

     const showComponent2 = ()=>{
        return component
     }

    const List_of_topics = () =>{
        return(
            <ListaPostow showPost={(e)=>{showComponent(<Post editPost={(e)=>{showComponent(<EditPost  postId={e} postAdded={()=>{showComponent(<List_of_topics />)}} />)}} postId={e} />)}} userName={userName}/>
            )
    }



    const Add_new_topic = () =>{
        

        return(
            <NewPost userID = {userID} userName={userName} postAdded={()=>{showComponent(<List_of_topics />)}}/>
        )
    }



    return(
        <Container>
            <HeaderContainer>
                <BestButton onClick={()=>{showComponent(<UsersDashboard showPostOrComment={(e)=>{setShowCommetOrPostFromUser(e)}}/>) }}> Pokaż użytkowników </BestButton>
                <BestButton onClick={()=>{showComponent(<List_of_topics />) }}> Pokaż tematy na forum </BestButton>
                <BestButton onClick={()=>{showComponent(<Add_new_topic />)}}> Dodaj swój temat </BestButton>
            </HeaderContainer>
                {/* <List_of_topics/> */}
                {/* <DropdownMenu_analysis/> */}
                {/* <BestButton onClick={()=>{showComponent(<PhAnalysis lang={lang} key={seed}/>)}}> {T.database_buttons.ph} </BestButton>         */}
                {/* <DropdownMenu_dataflow/> */}
                {/* <DropdownMenu_voicescript/> */}
                {/* <DropdownMenu_images/> */}
                
                {/* <BestButton onClick={()=>{showComponent(<Users lang={lang} key={seed}/>)}}> {T.database_buttons.users} </BestButton> */}
                       
            
            {showComponent2()}
        </Container>
        
    )
}


const Container = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`

const Konten = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: #36626a;
    margin: 15px;
    padding: 15px;

`



const Topic = styled.div`

    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:  space-between; 
    border: 1px solid;
    border-color: #36626a;
    margin: 15px;
    padding: 15px;
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.foreground}}; 
`

const Topic2 = styled.div`

    width: 80%;

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

