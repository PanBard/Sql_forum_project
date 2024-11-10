import { BestButton } from "lib/components/components_modules"
import React, {useEffect, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { API_ROUTS } from "./api_routs_forum"


type DataDashboard = {
    userName: string,
    postAdded(params: any): any,
    userID: any
}


export const NewPost: React.FunctionComponent<DataDashboard> = ({
    userName,
    postAdded,
    userID
}) => {
    const [title, setTitle] = useState<any>()
    const [content, setContent] = useState<any>()
    const [categories_id, setCategories_id] = useState<any>()
    const [categories, setCategories] = useState<any>()


    const send_new_post_to_db = async ( ) => {

        try {
            if(!categories_id || !title || !content)
                {
                    alert("uzupelnij brakujace dane!")
                    console.log(categories_id,title,content,"userID:",userID)
                }
            else{
                const response = await Axios.post(API_ROUTS.add_post,{ userId:userID, postTitle: title, postContent:content, postCategory_id:categories_id });
                // setDataFromDataBase(response.data);
                console.log(response.data);
                alert(response.data.message);
                postAdded(true);
            }            
                       
        } catch (err) {
            console.log('db status :(', err);
        }
    };
    



    return(
            
        <Konten>
            

            <h1>Dodaj nowy temat:</h1>
                
                     <h3> <label>Tytuł: </label> </h3>
                     <input style={{backgroundColor: 'gray'}} type="text"   onChange={ (e)=>{setTitle(e.target.value)} }/>
                     <div>{title}</div>
                     
                    <Topic2>
                    <h3>Kategorie:  </h3>
                        <div>
                            <label>Blog: </label>
                            <input style={{backgroundColor: 'gray'}} type="checkbox"   onChange={ ()=>{setCategories_id(1);setCategories("Blog")} }/>
                            <br />
                            <label>Poradnik: </label>
                            <input style={{backgroundColor: 'gray'}} type="checkbox"   onChange={ ()=>{setCategories_id(2);setCategories("Poradnik")} }/>
                            <br />
                            <label>Pytanie: </label>
                            <input style={{backgroundColor: 'gray'}} type="checkbox"   onChange={ ()=>{setCategories_id(3);setCategories("Pytanie")} }/>
                        </div>
                        
                        <p>Wybrana kategoria:  {categories}</p>
                    </Topic2>
                     

                    <h3><label >Tekst główny: </label></h3>
                    <textarea style={{backgroundColor: 'gray', width: '100%', height: '300px'}}  onChange={ (e)=>{setContent(e.target.value) ; console.log(e.target.value)}} ></textarea >

                    <p></p>
                    <BestButton onClick={()=>{send_new_post_to_db()}}> Zatwierdż </BestButton>
                

            

        </Konten>
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

    width: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:  center; 
    border: 1px solid;
    border-color: #FF8C00;
    margin: 5px;
     
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

