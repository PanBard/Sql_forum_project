import  Axios  from "axios"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, ModifyButton, OptionButton, TableContainer, Tr_sticky_row } from "lib/components/components_modules"
import { useTranslations } from "lib/hooks"
import { APP_CONFIG } from "lib/config"

type VoiceScriptProps = {
    rout_name: string,
    lang: string
}

export const VoiceScript: React.FunctionComponent<VoiceScriptProps> = ({
    rout_name,
    lang
})=>{
    const T = useTranslations(lang)
    const [hide, setHide] =  useState<string>()
    const [dataFromDataBase, setDataFromDataBase] = useState([])

    const [showModyf, setTesto] = useState(false)
    const [modification, setModification] = useState<any>()

    const [id,setID] = useState<any>()
    const [script,setScript] = useState<any>()
    const [phase,setPhase] = useState<any>()
    const [f6,set6] = useState<any>()
    const [f7,set7] = useState<any>()
    const [match_id,setMatch_id] = useState<any>()
    const [seed, setSeed] = useState(1);
    const [choosen_mode, setChoosen_mode] = useState('start')

    const reset = () => {
         setSeed(Math.random())
     }
    const header_name =  (rout_name=='cation_voice_script') ? T.databse.cation_voicescript : T.databse.anion_voicescript
    const input_name = ['id','phase','f6','f7','match_id','script']
    const setters = [setID,setPhase,set6,set7,setMatch_id,setScript]
    const db_rout_get = lang=='EN' ? ((rout_name=='anion_voice_script') ?  SERVER_ROUTS.anion_voice_script_en.get : SERVER_ROUTS.cation_voice_script_en.get) : ((rout_name=='anion_voice_script') ?  SERVER_ROUTS.anion_voice_script.get : SERVER_ROUTS.cation_voice_script.get)
    const db_rout_put = lang=='EN' ? ((rout_name=='anion_voice_script') ?  SERVER_ROUTS.anion_voice_script_en.put : SERVER_ROUTS.cation_voice_script_en.put) : ((rout_name=='anion_voice_script') ?  SERVER_ROUTS.anion_voice_script.put : SERVER_ROUTS.cation_voice_script.put)
    
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = async () => {
        await  Axios.get(db_rout_get)
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .catch((err)=>{console.log('db status :(',err)})
    }

    const setuj =async ( id: any) => {
        const data = dataFromDataBase[id-1]
        setters.map((set,index)=>{set(data[input_name[index]])})
        setModification(id)
    }


    const update_data_in_db = (ajdi: any)=>{
        Axios.put(db_rout_put, {id:ajdi,phase:phase,script:script,f6:f6,f7:f7,match_id:match_id})
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()})
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
    };

    const send_data_to_db = async ()=>{
        Axios.post(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].post, {id:id,phase:phase,script:script,f6:f6,f7:f7,match_id:match_id})
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
        setters.map((set)=>{set(undefined)})
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
                    <Container>{header_name}</Container>
                    <TableContainer key={seed}>
                        <table >
                            <tbody >
                                <Tr_sticky_row>
                                    {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}
                                </Tr_sticky_row>
                                {dataFromDataBase.slice(0).reverse().map((data: any)=>{
                                    return (
                                        <tr key={data.id}>
                                            {input_name.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
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
                    <BestButton onClick={()=>{send_data_to_db();setChoosen_mode('start')}}>{T.databse.submit_bt}</BestButton>
                    <BestButton onClick={()=>{setChoosen_mode('start')}}>{T.common.back}</BestButton>
                </Container>
            )
        }


        if(choosen_mode=='modify'){
            if(modification){ 
                 return(  
                    <Container >{T.databse.entry_modification} {modification} 
                        <Container >
                        {input_name.map( (obj,i)=>{return(
                            <Container key={i}>
                                <label>{input_name[i]}</label>
                                <input onClick={()=>{setters[i](dataFromDataBase[modification-1][obj]); }} defaultValue={dataFromDataBase[modification-1][obj]} style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
                            </Container>
                            )})} 
                        </Container>
                        <BestButton onClick={()=>{setTesto(!showModyf); update_data_in_db(modification); reset();setChoosen_mode('start')}}>{T.databse.update_data}</BestButton>
                        <BestButton onClick={()=>{setTesto(!showModyf);setChoosen_mode('start')}}>{T.common.back}</BestButton>
                    </Container >
            )}
        }
     }
     
    return(
        <ContainerP key={seed}>
            <Container>
                <BestButton style={{display: choosen_mode=='start' ? 'block' :'none' }} onClick={()=>{setChoosen_mode('add')}}>{T.databse.add_new}</BestButton>
                {/* <BestButton style={{display: choosen_mode=='start' ? 'none' : 'block'}} onClick={()=>{setChoosen_mode('start')}}>Table</BestButton> */}
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






