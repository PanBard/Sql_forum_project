import  Axios  from "axios"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, MyImage, OptionButton, TableContainer, Td_image, Tr_sticky_row } from "lib/components/components_modules"
import { Attention } from "lib/components/components_modules/Attention"
import { useTranslations } from "lib/hooks"
import { APP_CONFIG } from "lib/config"

type AnalysysProps = {
    rout_name: string
    lang: string
    user?: boolean
    userName?: string
}

export const Analysis: React.FunctionComponent<AnalysysProps> = ({
    rout_name,
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
     const db_name = (rout_name == 'cation_analysis_result') ? 'cation_analysis_result' : 'anion_analysis_result'
    const header_name =  (rout_name=='cation_analysis_result') ? T.databse.cation_analysis : T.databse.anion_analisys
    const foraml_data = ['id','name']
    const phases = (rout_name=='cation_analysis_result') ? ['Stage 1',"Stage 2","Stage 3",'Stage 4','Stage 5','Stage 6','Stage 7'] : ['Stage 1',"Stage 2","Stage 3",'Stage 4'] //only for sticky row
    const keys_f = (rout_name=='cation_analysis_result') ? ['f1',"f2","f3",'f4','f5','f6','f7'] : ['f1',"f2","f3",'f4']
    const keys_img = (rout_name=='cation_analysis_result') ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4'] 
    const keys_end = ['end','result'] 
    const input_name = foraml_data.concat(["user"].concat(phases.concat(keys_img.concat(keys_end)))) 
   
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = () => {
        Axios.get(  ((rout_name=='cation_analysis_result') ?  SERVER_ROUTS.cation_analysis_result.get : SERVER_ROUTS.anion_analysis_result.get) )
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

    const delete_all_data = () => {
        if(confirm(T.databse.all_data_del_confirm)){
             const QUERY = `DELETE FROM ${db_name}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})
        .then(()=>{get_data_from_db()})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(',err)})
        } 
       
    }

    const showFullImage = (source: any)=>{
        setComponent( <Attention  > <img width={640} height={480} src={source} /> </Attention>)
        reset()
     }
     
     const showComponent = ()=>{
        return component
     }

     useMemo(()=>{
        if(dataFromDataBase.length) reset()
     },[dataFromDataBase])
    return(
        <ContainerP>

            <Container style={{display: user ? 'none' : 'block'}}>
                  <BestButton onClick={delete_all_data}>{T.databse.clear_all_bt}</BestButton>
            </Container>

            {!showModyf && dataFromDataBase.length && <Container key={seed}>
                <Container>
                    <Container>{header_name} </Container>
                    <TableContainer key={seed}>
                        {showComponent()} 
                        <table style={{tableLayout: 'fixed'}}>
                        <tbody >
                            <Tr_sticky_row>
                                {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}

                            </Tr_sticky_row>
                            {dataFromDataBase.slice(0).reverse().map((data: any, index)=>{                                                                   
                                if(user){                                                                    
                                    if(data.user_id == userName ){                                        
                                    return (
                                        <tr key={index}>  
                                            {foraml_data.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                            <Td>{data['user_id']}</Td>
                                            {keys_f.map( (obj, i) => { return(<Td key={i}>{T.analysis_results_names[data[obj] as keyof typeof T.analysis_results_names]}</Td>) })}                                            
                                            {keys_img.map( (obj, i) => { if( data[obj]!=null) {return(  <Td_image key={i} >  <MyImage onClick={()=>{showFullImage(data[obj])}}   src={data[obj]}/></Td_image>)} else { return(<Td_image key={i} style={{cursor:'auto'}}/> ) } })}
                                            {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='success' ? '#618685' : data[obj]=='fail' ? `#c44569` : 'none'}} key={i}>{data[obj]}</Td>) })}
                                            {!hide && <Td_container style={{cursor:'pointer', display: user ? 'none' : 'block'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>}
                                            {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container>  }
                                            {/* <Td style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td> */}
                                        </tr>
                                    )}
                                }
                                else{
                                    return (
                                        <tr key={index}>  
                                            {foraml_data.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                            <Td>{data['user_id']}</Td>
                                            {keys_f.map( (obj, i) => { return(<Td key={i}>{T.analysis_results_names[data[obj] as keyof typeof T.analysis_results_names]}</Td>) })}                                            
                                            {keys_img.map( (obj, i) => { if( data[obj]!=null) {return(  <Td_image key={i} >  <MyImage onClick={()=>{showFullImage(data[obj])}}   src={data[obj]}/></Td_image>)} else { return(<Td_image key={i} style={{cursor:'auto'}}/> ) } })}
                                            {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='success' ? '#618685' : data[obj]=='fail' ? `#c44569` : 'none'}} key={i}>{data[obj]}</Td>) })}
                                            {!hide && <Td_container style={{cursor:'pointer', display: user ? 'none' : 'block'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>}
                                            {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container>  }
                                            {/* <Td style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td> */}
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
    word-wrap:break-word;
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



