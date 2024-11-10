import  Axios  from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { BestButton } from "lib/components/components_modules";

type Db_push_and_getProps = {
}

export const ReturnToOldAnalysis: React.FunctionComponent<Db_push_and_getProps> = () => {


    const [data, setData] = useState<any[]>([])
    const [boolean, setBoolean] = useState(false)
    const [seed, setSeed] = useState(1);
    const [cation,setCation] = useState<boolean>()
    const [keys, setKeys] = useState<any[]>([])

    const db_type = cation ? 'cation_analysis_result' : 'anion_analysis_result'     

    const reset = () => {
        setSeed(Math.random())
    }

    const get_data_from_db = async () => {
       await Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{setData(response.data);setKeys(Object.keys(response.data[0]))})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(')})
    }

    const delete_row_from_db = async (id: number)  =>{
      await  Axios.delete(SERVER_ROUTS[db_type].delete+`/${id}`)
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
        
    }; 
    


    const viewPoint = () =>{
        
        if(keys.length !== 0 && data[0]){                       
            const keys_f = cation ? ['id','name','f1',"f2","f3",'f4','f5','f6','f7'] : ['id','name','f1',"f2","f3",'f4']
            const keys_img = cation ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4']
            return (
                <TableContainer key={seed}>

                      <table>
                    <tbody >
                        <tr>
                        {keys.map( (obj, index) => { return(<th key={index}>{obj}</th>) })}
                        </tr>

                        {data.map((data: any, index)=>{
                            return (
                            <tr key={index}>  
                            {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                            {keys_img.map( (obj, i) => { return( <Td key={i}><MyImage  src={data[obj]}/></Td>) })}
                            
                            <Td key={index}>{data['end']}</Td>
                            <Td key={index+1}>{data['result']}</Td>
                            <Td style={{cursor:'pointer', background: 'red'}} onClick={ ()=> { delete_row_from_db(data.id)}} >USUŃ </Td>
                            <Td style={{cursor:'pointer', background: 'gray'}}  >MOD </Td>
                            <Td  style={{cursor:'pointer'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                            </tr>)
                            })
                        }
                    </tbody>
                </table>
                
                </TableContainer>
              
            )                 
        }
    } 
     
     useMemo(()=>{

     },[cation])
     
    

        return(
            <ContainerP>
                     <Container12>
            {boolean && 
                <Container>
                    <BestButton onClick={()=>{setBoolean(!boolean)}}>Ukryj panel</BestButton>

                    <Container> 
                        {viewPoint()}
                    </Container>
                    
                </Container> 
            }

           {!boolean && 
           <HeaderContainer>
                <BestButton onClick={()=>{setCation(true);setBoolean(!boolean); get_data_from_db()}}>Kationy</BestButton>
                <BestButton onClick={()=>{setCation(false);setBoolean(!boolean); get_data_from_db()}}>Aniony</BestButton>
           </HeaderContainer>
           }
          

        
        </Container12>
            </ContainerP>)
       
}


const HeaderContainer = styled.div`
    height: 60px;
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: space-between; */
`


const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    
`

const MyImage = styled.img`
width: 50px;
height: 50px;
`

const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    
`

const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`
const Container12 = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    
`

const Contr = styled.div`
    /* display: inline-block; */
    display: flex;
    flex-direction: row;
`

const SmallButton = styled.button`
    background-color: gray;
    border: 1px solid red;
    margin-left: 10px;
    cursor: pointer;
`
const TableContainer = styled.div`
    height: 400px;
    overflow-y: scroll;
    border: 5px solid gray;
`