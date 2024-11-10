import styled from "styled-components"
import { BestButton } from "."
import { useEffect, useMemo, useRef, useState } from "react";

type AttentionProps = {
    children?: any,
}


export const Attention: React.FunctionComponent<AttentionProps> = ({
    children,

}) => {


    const ShadeRef = useRef<any>(null);
    const ModalRef = useRef<any>(null);


    const close = () =>{
        ShadeRef.current.style.display = ModalRef.current.style.display = 'none';
    
    }
   
   useEffect(()=>{
     ShadeRef.current.style.display = ModalRef.current.style.display = 'block'
   },[])

    return(
        <div>
            <Shade ref={ShadeRef} ></Shade>
            <Modal ref={ModalRef}> 
            {children ? children : "Nic nie podano!"}
             <BestButton style={{float:'right', backgroundColor:'black'}} onClick={close} id="close">Close</BestButton>
            </Modal>
            
        </div>
        
        
    )
} 

const Shade = styled.div`
    display: none;
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
    display: none;
    position: fixed;
    z-index: 101;
    top: 10%;
    left: center;
    /* width: 50%; */
    
    
`