import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, MyImage, OptionButton, TableContainer, Td_image, Tr_sticky_row } from "lib/components/components_modules"
import { useTranslations } from "lib/hooks"
import { APP_CONFIG } from "lib/config"

type ChatMessagesProps = {
    rout_name?: string,
    lang: string
}

export const ChatMessages: React.FunctionComponent<ChatMessagesProps> = ({
    rout_name,
    lang
})=>{

    const T = useTranslations(lang)
    const [dataFromDataBase, setDataFromDataBase] = useState([])
    const [hide, setHide] =  useState<boolean>(false)
    const [showModyf, setTesto] = useState(false)
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
         
     }

    
    
    
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const delete_all_history = () => {
        if(confirm(T.databse.all_data_del_confirm)){
                const QUERY = `DELETE FROM chat_messages`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})        
        .then(()=>{get_data_from_db()})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(',err)})
        }
    
    }

    const get_data_from_db = async () => {
        
       await Axios.get(SERVER_ROUTS.chat_messages.get_all)
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(',err)})
    }

      const delete_row_from_db = (id: number)=>{
        Axios.delete(  SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].delete+`/${id}`  )
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 

    const generate_labels = () => {
        if(dataFromDataBase[0]){
            const keys_p = Object.keys(dataFromDataBase[0])           
        return( keys_p.map( (obj, i) => { return(<Th  key={i}>{obj}</Th>) }))
        }        
    }

    const generate_table_content = () => {
        if(dataFromDataBase[0]){
            return( dataFromDataBase.map( (data: any, index)=>{
                            const keys_q = Object.keys(dataFromDataBase[0])
                            return (
                                <tr key={index}>  
                                    {keys_q.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                    {!hide && <Td_container style={{cursor:'pointer'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>}
                                    {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container>  }
                                    <Td style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                                </tr>)
                        }
                    )
                )
            }
    }

    return(
        <ContainerP>
            <Container>
                  <BestButton onClick={delete_all_history}>Clear all</BestButton>
            </Container>
           
            {!showModyf &&  <Container>
                <Container>
                    <Container> Chat history </Container>
                    <TableContainer key={seed}>
                        <table >
                            <tbody >
                                <Tr_sticky_row>
                                    {generate_labels()}
                                </Tr_sticky_row>
                                {generate_table_content()}
                            </tbody>
                        </table>
                    </TableContainer>
                </Container> 
            </Container>}
        </ContainerP>
       
    )

}


const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    text-align:center; 
`
const Td_container = styled.td`
    justify-content: center;
    text-align:center;     
`

const Th = styled.th`
    border: 1px solid gray;
    justify-content: center;
`

const Tr = styled.tr`
    position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome
    position: sticky;
    top: 0;
    z-index: 1; // any positive value, layer order is global
    background-color: gray;
`
const Container = styled.div` `



