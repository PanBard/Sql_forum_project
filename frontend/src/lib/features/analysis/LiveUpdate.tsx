import  Axios  from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { BestButton, MyImage, Td_image } from "lib/components/components_modules";
import { useTranslations } from "lib/hooks";


type LiveUpdateProps = {
    cation: boolean
    lang: string
}

export const LiveUpdate: React.FunctionComponent<LiveUpdateProps> = ({
    cation,
    lang
}) => {

    const T = useTranslations(lang)
    const [data, setData] = useState<any[]>([])
    const [seed, setSeed] = useState(1);
    const [component, setComponent] = useState<any>()
    const ShadeRef = useRef<any>(null);
    const ModalRef = useRef<any>(null);


    const closeImagePreview = () =>{
        ShadeRef.current.style.display = ModalRef.current.style.display = 'none';
    
    }
    
    const db_type = cation ? 'cation_analysis_result' : 'anion_analysis_result' 
    

    const reset = () => {
        setSeed(Math.random())
        
    }

    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

   

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{const data = response.data;setData(data[data.length-1]);
    })
        .catch((err)=>{console.log('db status :(',err)})
    }

  
    const showFullImage = (source: any)=>{
        setComponent( 
        <div>
            <Shade ref={ShadeRef} ></Shade>
            <Modal ref={ModalRef}> 
                <img width={540} height={380} src={source}  />
            <BestButton style={{float:'right', backgroundColor:'black'}} onClick={closeImagePreview} id="close">{T.common.close}</BestButton>
            </Modal>
        </div>)
        ShadeRef.current.style.display = ModalRef.current.style.display = 'block'                     
     }
     
     const showComponent = ()=>{
        return component
     }



    const viewPoint = () =>{
        if(data){
            const all_key = Object.keys(data)
            // const keys = cation ?  ['Stage 1','Stage 2','Stage 3','Stage 4','Stage 5','Stage 6','Stage 7'] : ['Stage 1','Stage 2','Stage 3','Stage 4']
             const keys = lang=='EN' ? (cation ?  ['Stage 1','Stage 2','Stage 3','Stage 4','Stage 5','Stage 6','Stage 7'] : ['Stage 1','Stage 2','Stage 3','Stage 4']) : (cation ?  ['Faza 1','Faza 2','Faza 3','Faza 4','Faza 5','Faza 6','Faza 7'] : ['Faza 1','Faza 2','Faza 3','Faza 4'])
            const keys_f = cation ? ['f1',"f2","f3",'f4','f5','f6','f7'] : ['f1',"f2","f3",'f4']
            const keys_img = cation ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4']
            return (

                <TableContainer  key={seed}>
                    {showComponent()}
                {T.analysis.analysis_progress}
                    <table>
                                    <tbody >
                                    
                                        <Tr>{keys.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}</Tr>
                                        <tr key={seed+2}>{keys_f.map( (obj: any, i) => { return(<Td style={{maxWidth: '55px', overflow:'hidden'}} key={i}>{ T.analysis_results_names[data[obj] as keyof typeof T.analysis_results_names] }</Td>) })}</tr>
                                        <tr key={seed+1}>{keys_img.map( (obj: any, i) => { return(<Td_image key={i}><MyImage onClick={()=>{showFullImage(data[obj])}} style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })}</tr>
                                    </tbody>
                    </table>

                </TableContainer>
               
            )                 
        }
    } 
    
        return(
        <Container12>
                    <Container> 
                        {viewPoint()}
                    </Container>
        </Container12>)
}


const Th = styled.th`
      border: 1px solid;
    border-color: rgba(255,255,255,.35);
    justify-content: center;
`

const Tr = styled.tr`
    /* position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome */
    position: sticky;
    top: 0;
    z-index: 1; // any positive value, layer order is global
    /* background-color: gray; */
`

const TableContainer = styled.div`
      border: 1px solid;
    border-color: rgba(255,255,255,.35);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px;
    
`

const Td = styled.td`
      border: 1px solid;
    border-color: rgba(255,255,255,.35);
    justify-content: center;
    text-align:center; 
`

const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    justify-content: center;
    
`
const Container12 = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    width: 400px;
    /* background-color: grey; */
    
`
const Shade = styled.div`
display: block;
position: fixed;
z-index: 100;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: silver;
opacity: 0.5;
filter: alpha(opacity=50);
`


const Modal = styled.div`
display: block;
position: fixed;
z-index: 101;
top: 10%;
left: center;
/* width: 50%; */
`