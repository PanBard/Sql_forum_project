import styled from "styled-components"


export const LoadingAnimation2: React.FunctionComponent = () => {
    return(
       

        <SpinnerBox>Loading
            <CircleBorder >
                <CircleCore></CircleCore>
            </CircleBorder>  
        </SpinnerBox>
    )
}



const SpinnerBox = styled.div`
     width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
     
`


const CircleBorder = styled.div`
     width: 30px;
  height: 30px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  /* background: rgb(63,249,220);
  background: linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%); */
  background: rgb(210, 235, 232);
  background: linear-gradient(0deg, rgba(63,249,220,0.1) 33%, #e0eceb 100%);
  animation: spin .8s linear 0s infinite;
    
  @keyframes spin {
    from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}

`

const CircleCore = styled.div`
     width: 100%;
  height: 100%;
  /* background-color: #1d2630; */
  border-radius: 50%;  width: 100%;
  height: 100%;
  background-color: #1d2630;
  border-radius: 50%;

`
