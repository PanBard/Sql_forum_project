import { BestButton } from "lib/components/components_modules"
import React, {useEffect, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { API_ROUTS } from "./api_routs_forum"



type DataDashboard = {
    userName: string,
    showPost(params: any): any

}


export const ListaPostow: React.FunctionComponent<DataDashboard> = ({
    userName,
    showPost
}) => {
    
    const [dataFromDataBase_all, setDataFromDataBase_all] = useState([])
    const category = ["Blog","Poradnik","Pytanie"]

    useEffect(  ()  =>  {
        get_all_info_about_post_and_comments_from_db();
    },[])


 

    const get_all_info_about_post_and_comments_from_db = async () => {
        const query = `select * from user_posts_info`
        try {
            const response = await Axios.post(API_ROUTS.custom_query, {query: query});
            setDataFromDataBase_all(response.data);
            // setDataFromDataBase(response.data);
            console.log("DataFromDataBase_all:",response.data);
            
        } catch (err) {
            console.log('db status :(', err);
        }
    };


    const get_sorted_post_by_popularity_from_db = async () => {
        try {
            const response = await Axios.get(API_ROUTS.get_posts_sorted_by_popularity);
            setDataFromDataBase_all(response.data[0]);           
            console.log("get_sorted_post_by_popularity_from_db",response.data[0]);

        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_posts_sorted_by_date_from_db = async () => {
        try {
            const response = await Axios.get(API_ROUTS.get_posts_sorted_by_date);
            setDataFromDataBase_all(response.data[0]);           
            console.log("get_posts_sorted_by_date_from_db",response.data[0]);

        } catch (err) {
            console.log('db status :(', err);
        }
    };

    const get_posts_sorted_by_category_from_db = async (categoryId: any) => {
        try {
            const response = await Axios.get(API_ROUTS.get_posts_sorted_by_category+`${categoryId}`);
            setDataFromDataBase_all(response.data[0]);           
            console.log("get_posts_sorted_by_category_from_db",response.data[0]);

        } catch (err) {
            console.log('db status :(', err);
        }
    };


    return(
        <Topic2>
        {dataFromDataBase_all &&
        <div>
             <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                    <h1>Tematy na forum:</h1> 
                    <BestButton onClick={()=>{get_sorted_post_by_popularity_from_db(); }}>sortuj: popularne</BestButton>
                    <BestButton onClick={()=>{get_posts_sorted_by_date_from_db(); }}>sortuj: najnowsze</BestButton>
                    <h3>Sort po kategorii:</h3> 
                    <BestButton onClick={()=>{get_posts_sorted_by_category_from_db(1); }}>Blog</BestButton>
                    <BestButton onClick={()=>{get_posts_sorted_by_category_from_db(2); }}>Poradnik</BestButton>
                    <BestButton onClick={()=>{get_posts_sorted_by_category_from_db(3); }}>Pytanie</BestButton> 
        </div>

         {dataFromDataBase_all.map( (data: any, i) => { 
            return(
                <Topic key={i} onClick={()=>{ showPost(data.post_id)}}>
                    <p>Nr: {i}</p> 
                        <h3 >Temat: {data.post_title}</h3>
                        <h3 >Kategoria: {category[data.post_category_id-1] ? category[data.post_category_id-1] : "brak"}</h3>
                        <h3 >Created: {data.post_created_at.slice(0,20)}</h3>
                        
                        {/* <p >{data.content}</p> */}
                </Topic>                                   
            ) })}
        </div>
        }
        
       

    </Topic2>
        
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

