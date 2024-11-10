import styled from "styled-components"


export const Kropki: React.FunctionComponent = () => {
    return(
        <Containder> <Dots1 /> <Dots2 /> <Dots3 /> </Containder>
    )
}



const Containder = styled.div`
    float: left; 
    position: relative; 
    bottom: 0px;
    right: 10px; 
    /* display: flex;
    flex:1; */
    /* padding: 1.5rem 0.8rem 0.8rem 0.8rem ; */
    margin-left: 10px;
    margin-right: 1px;
     
`


const Dots1 = styled.div`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: gray;
    animation: jumpingAnimation 1s 0.6s linear infinite ;
    
  @keyframes jumpingAnimation {
    0% {
    transform: translate(0, 0);
  }
  16% {
    transform: translate(0, -10px);
  }
  33% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

`

const Dots2 = styled.div`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: gray;
    animation: jumpingAnimation 1s 0.3s linear infinite;
  
  @keyframes jumpingAnimation {
    0% {
    transform: translate(0, 0);
  }
  16% {
    transform: translate(0, -10px);
  }
  33% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

`

const Dots3 = styled.div`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: gray;
    animation: jumpingAnimation 1s 0s linear infinite;
    
  @keyframes jumpingAnimation {
    0% {
    transform: translate(0, 0);
  }
  16% {
    transform: translate(0, -10px);
  }
  33% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

`