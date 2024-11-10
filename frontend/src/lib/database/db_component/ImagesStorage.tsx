import  Axios  from "axios"
import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, ModifyButton, MyImage, OptionButton, TableContainer, Tr_sticky_row } from "lib/components/components_modules"
import { useTranslations } from "lib/hooks"
import { APP_CONFIG } from "lib/config"

type ImagesStorageProps = {
    lang: string
}

export const ImagesStorage: React.FunctionComponent<ImagesStorageProps> = ({
    lang
})=>{

    const T = useTranslations(lang)
    const [hide, setHide] =  useState<string>()
    const [dataFromDataBase, setDataFromDataBase] = useState([])
    const [allFiles,setAllFiles] =  useState<any>()
    const [showModyf, setTesto] = useState(false)
    const [modification, setModification] = useState<any>()

    const [id,setID] = useState<any>()
    const [img,setImg] = useState<any>()
    const [label,setLabel] = useState<any>()
    const [seed, setSeed] = useState(1);
    const [choosen_mode, setChoosen_mode] = useState('start')
    const [sendImage, setSendImage] = useState<boolean>(false);
    const reset = () => {
         setSeed(Math.random())
     }
     const rout_name = 'image_storage'
    const header_name =  'image_storage '
    const input_name = ['label']
    const setters = [setLabel]
    
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = async () => {
        await  Axios.get(SERVER_ROUTS.image_storage.get)
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .catch((err)=>{console.log('db status :(',err)})
    }

    const setuj =async ( id: any) => {

        const data = dataFromDataBase[id]
        setLabel(data['label'])
        setImg(data['img'])
        // setters.map((set,index)=>{set(data[input_name[index]])})
        setModification(id)
    }


    const update_data_in_db = (ajdi: any)=>{
        Axios.put(SERVER_ROUTS.image_storage.put, {id:ajdi,img:img,label:label})
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()})
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
    };

    // const send_data_to_db = async ()=>{
    //     Axios.post(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].post, {id:id,img:img,label:label})
    //     .then((response: any)=>{get_data_from_db(),console.log(response.data)})
    //     .then(()=>{reset()} )
    //     .then(()=>{ setters.map((set)=>{set(undefined)}); setImg(undefined) })
    //     .catch(err => {console.log(err)})
        
    // };

    const send_data_to_db_many_times = async (name:string,img:any)=>{
        Axios.post(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].post, {id:id,img:img,label:name})
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .then(()=>{ setters.map((set)=>{set(undefined)}); setImg(undefined) })
        .catch(err => {console.log(err)})
       
    };

    const delete_row_from_db = (id: number)=>{
        Axios.delete(  SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].delete+`/${id}`  )
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 

    useMemo(async ()=>{
        if(sendImage && allFiles){
            const keys = Object.keys(allFiles)
            keys.map((key)=>{
                const name = allFiles[key].name
                let reader = new FileReader(); //reader for converting file to base64
                reader.readAsDataURL(allFiles[key]);
                reader.onloadend = () => {
                    let base64String = reader.result; // img in base64 format
                   if(typeof label == 'undefined') send_data_to_db_many_times( name, base64String )
                   else send_data_to_db_many_times( label, base64String )
                        } })
        }
        setSendImage(false)
    },[sendImage])



    
    const showComponent = ()=>{

        if(choosen_mode=='start' && typeof dataFromDataBase[0] != 'undefined'){
          const keys_p = Object.keys(dataFromDataBase[0])
            return( 
                <Container>
                    <Container>{header_name}  </Container>
                    <TableContainer key={seed}>
                        <table >
                            <tbody >
                                <Tr_sticky_row>
                                    {dataFromDataBase && keys_p.map( (obj, i) => {
                                        return(<Th key={i}>{obj}</Th>) })}
                                </Tr_sticky_row>
                                { dataFromDataBase && dataFromDataBase.slice(0).reverse().map((data: any,index:any)=>{
                                    const date1 = data.date.replace('T',' | ').slice(0,-8)
                                    return (
                                        <tr key={data.id}>
                                             <Td>{data.id} </Td>
                                            <Td><MyImage style={{height: '150px', width:'150px' }}  src={data.img}/></Td>
                                            <Td>{data.label} </Td>
                                            <Td>{date1} </Td>
                                            <Td_container style={{cursor:'pointer' , display: hide==`${data.id}` ? 'none' : 'block'}}  onClick={()=>{setHide(data.id)}} ><OptionButton><ButtonImage src={APP_CONFIG.EDIT_BTN_IMG}/></OptionButton></Td_container>
                                                <Td_container style={{display: hide==`${data.id}` ? 'flex' : 'none'}} onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container> 
                                                <Td_container style={{display: hide==`${data.id}` ? 'flex' : 'none'}} onClick={ ()=> { setTesto(true);setuj(index);setChoosen_mode('modify')}} ><ModifyButton>{T.databse.mod_bt}</ModifyButton></Td_container>  
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

                             <input 
                                type="file"
                                name="myImage"
                                multiple={true}
                                onChange={(event: any) => {
                                    const f = event.target.files
                                    setAllFiles(f)                                  
                                    const name = event.target.files[0].name.slice(0, -4)                                                               
                                }}
                            />

                    </Container>
                    <BestButton onClick={()=>{setSendImage(true);setChoosen_mode('start')}}>Submit data to database</BestButton>
                    <BestButton onClick={()=>{setChoosen_mode('start')}}>back</BestButton>
                    {img && <img height={100} width={100} src={img} alt="" />}
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
                                <input onClick={()=>{setters[i](dataFromDataBase[modification][obj]); }} defaultValue={dataFromDataBase[modification][obj]} style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
                            </Container>
                            )})} 
                            
                        </Container>
                        <button onClick={()=>{setTesto(!showModyf); update_data_in_db(dataFromDataBase[modification]['id']); reset();setChoosen_mode('start')}}>Update data</button>
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






