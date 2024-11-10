import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, MyImage, OptionButton, TableContainer, Td_image, Tr_sticky_row } from "lib/components/components_modules"
import { Attention } from "lib/components/components_modules/Attention"
import { useTranslations } from "lib/hooks"
import { APP_CONFIG } from "lib/config"

type PhAnalysisProps = {
    lang: string
    user?: boolean
    userName?: string
}

export const PhAnalysis: React.FunctionComponent<PhAnalysisProps> = ({
    lang,
    user,
    userName
})=>{

    const T = useTranslations(lang)
    const [dataFromDataBase, setDataFromDataBase] = useState([])
    const [hide, setHide] =  useState<boolean>(false)
    const [showModyf, setTesto] = useState(false)
    const [seed, setSeed] = useState(1);
    const [component, setComponent] = useState<any>()

    const reset = () => {
         setSeed(Math.random())
         
     }
    
    const header_name =   'ph analysis'
    const keys_f = ['id','username','analysis_name']
    const keys_img = ['img']
    const keys_end = ['ph',"rgb",'date','R','G','B'] 
    const input_name = keys_f.concat(keys_img.concat(keys_end))
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = () => {
        const query = `SELECT id, CONVERT(img USING utf8) as img, username, ph, rgb, date, analysis_name,R,G,B,ph_number FROM ph_analysis `
        Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(',err)})
    }

    const delete_row_from_db = (id: number)=>{
        const query = `DELETE FROM ph_analysis WHERE id=${id}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 

    const delete_all_data = () => {
        if(confirm("Na pewno chcesz usunąć wszystkie zapisane kalibracje?")){
             const QUERY = `DELETE FROM ph_analysis`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})
        .then(()=>{get_data_from_db()})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(')})
        } 
       
    }


 
    

    const showFullImage = (source: any)=>{
        setComponent( <Attention  > <img width={640} height={480} src={source} /> </Attention>)
        reset()
     }
     
     const showComponent = ()=>{
        return component
     }

    return(
        <ContainerP>

            <Container style={{display: user ? 'none' : 'block'}}>
                  <BestButton onClick={delete_all_data}>{T.databse.clear_all_bt}</BestButton>
            </Container>

            {!showModyf &&  <Container>
                <Container>
                    <Container>{header_name} </Container>
                    <TableContainer key={seed}>
                        {showComponent()} 
                        <table >
                        <tbody >
                            <Tr_sticky_row>
                                {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}

                            </Tr_sticky_row>
                            {dataFromDataBase.map((data: any, index)=>{
                                 if(user){  
                                    if(data.username == userName ){  
                                        return (
                                            <tr key={index}>  
                                                {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                                {/* {keys_img.map( (obj, i) => {  return( <Td_image key={i}>  <MyImage style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })} */}
                                                {keys_img.map( (obj, i) => { if( data[obj]!=null) {return(  <Td_image key={i} >  <MyImage onClick={()=>{showFullImage(data[obj])}}   src={data[obj]}/></Td_image>)} else { return(<Td_image key={i} style={{cursor:'auto'}}/> ) } })}
                                                {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='end' ? '#618685' : data[obj]=='fail' ? `#c44569` : 'none'}} key={i}>{data[obj]}</Td>) })}
                                                {!hide && <Td_container style={{cursor:'pointer', display: user ? 'none' : 'block'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>}
                                                {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container>  }
                                                <Td style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                                            </tr>
                                        )
                                      }

                                 } 
                                 else{
                                      return (
                                    <tr key={index}>  
                                        {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                        {/* {keys_img.map( (obj, i) => {  return( <Td_image key={i}>  <MyImage style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })} */}
                                        {keys_img.map( (obj, i) => { if( data[obj]!=null) {return(  <Td_image key={i} >  <MyImage onClick={()=>{showFullImage(data[obj])}}   src={data[obj]}/></Td_image>)} else { return(<Td_image key={i} style={{cursor:'auto'}}/> ) } })}
                                        {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='end' ? '#618685' : data[obj]=='fail' ? `#c44569` : 'none'}} key={i}>{data[obj]}</Td>) })}
                                        {!hide && <Td_container style={{cursor:'pointer', display: user ? 'none' : 'block'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>}
                                        {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container>  }
                                        <Td style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                                    </tr>
                                )
                                 }
                              
                                })}
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


const Container = styled.div` `



