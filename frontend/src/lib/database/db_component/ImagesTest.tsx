import  Axios  from "axios"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, ModifyButton, MyImage, OptionButton, TableContainer, Tr_sticky_row } from "lib/components/components_modules"
import { useTranslations } from "lib/hooks"
import { APP_CONFIG } from "lib/config"

type ImagesTestProps = {
    lang: string
}

export const ImagesTest: React.FunctionComponent<ImagesTestProps> = ({
    lang
})=>{
    const T = useTranslations(lang)
    const [hide, setHide] =  useState<string>()
    const [dataFromDataBase, setDataFromDataBase] = useState([])

    const [showModyf, setTesto] = useState(false)
    const [modification, setModification] = useState<any>()

    const [id,setID] = useState<any>()
    const [img,setImg] = useState<any>()
    const [label,setLabel] = useState<any>()
    const [seed, setSeed] = useState(1);
    const [choosen_mode, setChoosen_mode] = useState('start')

    const reset = () => {
         setSeed(Math.random())
     }
     const rout_name = 'test_images'
    const header_name =  'Test images'
    const input_name = ['id','img','label']
    const setters = [setID,setImg,setLabel]
    
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = async () => {
        await  Axios.get(SERVER_ROUTS.test_images.get)
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .catch((err)=>{console.log('db status :(',err)})
    }

    const setuj =async ( id: any) => {
        const data = dataFromDataBase[id-1]
        setters.map((set,index)=>{set(data[input_name[index]])})
        setModification(id)
    }


    const update_data_in_db = (ajdi: any)=>{
        // Axios.put(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].put, {id:ajdi,img:img,label:label})
        // .then((response: any)=>{get_data_from_db()})
        // .then(()=>{reset()})
        // .then(()=>{ setters.map((set)=>{set(undefined)}) })
        // .catch(err => {console.log(err)})
    };

    const send_data_to_db = async ()=>{
        // Axios.post(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].post, {id:id,img:img,label:label})
        // .then((response: any)=>{get_data_from_db()})
        // .then(()=>{reset()} )
        // .then(()=>{ setters.map((set)=>{set(undefined)}) })
        // .catch(err => {console.log(err)})
        // setters.map((set)=>{set(undefined)})
    };

    const delete_row_from_db = (id: number)=>{
        // Axios.delete(  SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].delete+`/${id}`  )
        // .then((response: any)=>{get_data_from_db()})
        // .then(()=>{reset()} )
        // .catch(err => {console.log(err)})
    }; 

    
    const showComponent = ()=>{

        if(choosen_mode=='start'){
            return( 
                <Container>
                    <Container>{header_name}  </Container>
                    <TableContainer key={seed}>
                        <table >
                            <tbody >
                                <Tr_sticky_row>
                                    {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}
                                </Tr_sticky_row>
                                {dataFromDataBase.slice(0).reverse().map((data: any)=>{
                                    return (
                                        <tr key={data.id}>
                                             <Td>{data.id} </Td>
                                            <Td><MyImage style={{height: '150px', width:'150px' }}  src={data.img}/></Td>
                                            <Td>{T.analysis_results_names[data.label as keyof typeof T.analysis_results_names]} </Td>
                                            <Td_container style={{cursor:'pointer' , display: hide==`${data.id}` ? 'none' : 'block'}}  onClick={()=>{setHide(data.id)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>
                                                <Td_container style={{display: hide==`${data.id}` ? 'flex' : 'none'}} onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container> 
                                                <Td_container style={{display: hide==`${data.id}` ? 'flex' : 'none'}} onClick={ ()=> { setTesto(true);setuj(data.id);setChoosen_mode('modify')}} ><ModifyButton>{T.databse.mod_bt}</ModifyButton></Td_container>  
                                        </tr>)})}
                            </tbody>
                        </table>
                    </TableContainer>
                </Container>
                 
                )
        }

        if(choosen_mode=='add'){
            return(
                <Container  key={seed+1}>
                    <Container>
                        {input_name.map( (obj,i)=>{return(
                        <Container key={i}>
                            <label>{input_name[i]}</label>
                            <input style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
                        </Container>
                        )})}
                    </Container>
                    <button onClick={()=>{send_data_to_db();setChoosen_mode('start')}}>{T.databse.submit_bt}</button>
                    <button onClick={()=>{setChoosen_mode('start')}}>{T.common.back}</button>
                </Container>
            )
        }


        if(choosen_mode=='modify'){
            if(modification){ 
                 return(  
                    <Container >Modyfikacja wersetu nr: {modification} 
                        <Container >
                        {input_name.map( (obj,i)=>{return(
                            <Container key={i}>
                                <label>{input_name[i]}</label>
                                <input onClick={()=>{setters[i](dataFromDataBase[modification-1][obj]); }} defaultValue={dataFromDataBase[modification-1][obj]} style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
                            </Container>
                            )})} 
                        </Container>
                        <button onClick={()=>{setTesto(!showModyf); update_data_in_db(modification); reset();setChoosen_mode('start')}}>Update data</button>
                        <button onClick={()=>{setTesto(!showModyf);setChoosen_mode('start')}}>Back</button>
                    </Container >
            )}
        }
     }
     
    return(
        <ContainerP key={seed}>
            <Container>
                <BestButton style={{display: choosen_mode=='start' ? 'block' :'none' }} onClick={()=>{setChoosen_mode('add')}}>Add new</BestButton>
                <BestButton style={{display: choosen_mode=='start' ? 'none' : 'block'}} onClick={()=>{setChoosen_mode('start')}}>Table</BestButton>
            </Container>
            {showComponent()}
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






