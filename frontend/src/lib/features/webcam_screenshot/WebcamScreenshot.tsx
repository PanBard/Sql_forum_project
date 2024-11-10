import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import ExpenseForm from "../../components/ExpenseForm"
// import { fetchExpenseById, postExpense, updateExpenseById } from "../../services"
import React from "react";
import Webcam from "react-webcam";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { BestButton } from "lib/components/components_modules";

type WebcamScreenshotProps = {
  lang: string
}

export  const WebcamScreenshot: React.FunctionComponent<WebcamScreenshotProps> = ({
  lang
}) => {

    const [img, setImg] = useState<any>(null);
    const [number_of_image, setNumber_of_image] = useState<any>(1);
    const [numer_zdjecia, setnum] = useState(1);
    const webcamRef = React.useRef<any>(null);

    const screenshot = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);

        const numer = numer_zdjecia.toString();
      const pelna_nazwa = "zdjecie_"+numer+".jpg";
      saveAs(imageSrc, pelna_nazwa); // Put your image url here.
       setnum(numer_zdjecia+1)
        mysetnum()
    }

   const mysetnum =async () => {
    setnum(numer_zdjecia+1)
   }

  const multiple_screenshot =async () => {
    let i = 1
    const loop_screenshot =  setInterval(() => {
        if(i>=number_of_image) clearInterval(loop_screenshot)
         screenshot()
        i++
        
      }, 2000);
  }

    return (
      <section style={{display:'flex',flexDirection:'row'}}>
        <Container>
             <BestButton style={{margin: '10px'}} onClick={screenshot}>Zapisz aktualny obraz z kamery</BestButton>
            <input onChange={(e)=>{setNumber_of_image(e.target.value)}} ></input>
            <BestButton onClick={multiple_screenshot}>Multiple shot</BestButton>
        </Container>
     
        <Container>
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
        />
        
        <p>Liczba zapisanych zdjęć: {numer_zdjecia - 1}</p>
        {/* <button onClick={pobierz}>Pobierz</button> */}
        <img width={100} height={100} src={img} alt="screenshot" />
        </Container>
      </section>
    );
   
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    width: 200px;
`


const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };
  
