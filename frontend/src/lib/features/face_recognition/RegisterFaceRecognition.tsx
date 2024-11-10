import { BestButton } from "lib/components/components_modules"
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam"
import styled from "styled-components"
import * as faceapi from '@vladmandic/face-api';
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";
import { APP_CONFIG } from "lib/config";


type RegisterFaceRecognitionProps = {
  userName: any
  lang: string,
  back(): void
}

export const RegisterFaceRecognition: React.FunctionComponent<RegisterFaceRecognitionProps> = ({
  userName,
  lang,
  back
}) => {

  const T = useTranslations(lang)
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);
  const [name,setName] = useState<any>()
  const [images,setImages] = useState<Array<string>>([])
  const [buttonDisplay, setButtonDisplay] = useState<boolean>(false);
  const [processIndicator, setProcessIndicator] = useState<boolean>(false);

  const videoRef = useRef<Webcam>(null);
  const videoHeight = 240;
  const videoWidth = 320;
  const canvasRef = useRef<any>(null);
  const wholeImageCanvasRef = useRef<any>(null);

  useEffect(() => {
    setName(userName)
    const loadModels = async () => {
      const MODEL_URL = APP_CONFIG.FACES_MODELS_URL
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ])
      .then(() => {setModelsLoaded(true)});
    }
    loadModels();
  }, []);

  const send_data_to_db = async () => {
    if(typeof images[2] != 'undefined'){
        const query = `INSERT INTO face_img_storage (userName, img1, img2, img3, date) VALUES ('${userName}','${images[0]}','${images[1]}','${images[2]}',now()) `
        await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
            .catch((err)=>{console.log('send status :(',err)})
        }
    }

  useMemo(()=>{
      send_data_to_db()
    },[images])
  
  const closeWebcam = () => {
    setCaptureVideo(false);
  }

  const startVideo = () => {
    setCaptureVideo(true);
  }

  const getLabeledFaceDescriptions =async () => {
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){
          const videoo = videoRef.current.video
          wholeImageCanvasRef.current.width = 640;
          wholeImageCanvasRef.current.height = 480;
          let description: any = []
          const labelos = name 
          for(let i =1; i<=3; i++){
              wholeImageCanvasRef.current.getContext('2d').drawImage(videoo, 0, 0, 640, 480 )
              const url = wholeImageCanvasRef.current.toDataURL()

              const image = await faceapi.fetchImage(url)
              setImages(images => [...images, url]);
              const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
              description.push(detection?.descriptor)
          }

          if(typeof description != 'undefined') {  
              await send_data_to_db().then(()=>{setProcessIndicator(false)})
              return  new faceapi.LabeledFaceDescriptors(labelos, description )
          }
    }
  }

  const rightInFace = async () => {
      if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){
            const labeledFaceDescriptor = await getLabeledFaceDescriptions()
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptor)

            const displaySize = {
              width: videoWidth,
              height: videoHeight
            }

            faceapi.matchDimensions(canvasRef.current, displaySize);

            setInterval( async ()=>{
                if(videoRef.current?.video){                                      
                    const detections = await  faceapi.detectAllFaces(videoRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                    canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                    const results = resizedDetections.map((den)=>{
                      return faceMatcher.findBestMatch(den.descriptor)
                    })
                    results.forEach((result , i)=>{
                      const box = resizedDetections[i].detection.box
                      const drawBox = new faceapi.draw.DrawBox(box, {label: result as unknown as string} )                    
                      drawBox.draw(canvasRef.current)
                    })
                  }
                },100)
      } 
  }

  return (
    <MainContainer1>
      <h3>Your new Face ID</h3> 
    <MainContainer2>
      <OrderContainer>
          <div style={{width:'100px'}}>
            <BestButton onClick={()=>{back()}}>{T.common.back}</BestButton>
             <canvas style={{width: 100, height: 100, margin: 5, display:'none'}} ref={wholeImageCanvasRef}/>
          </div>

          <SpaceBetweenContainer>
              {captureVideo && modelsLoaded ? <BestButton onClick={closeWebcam} > {T.face_recognition.close_webcam} </BestButton> : <BestButton onClick={startVideo} > {T.face_recognition.open_webcam} </BestButton> }
              {captureVideo ? 
                modelsLoaded ?
                  <div>
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                      <Webcam ref={videoRef} height={videoHeight} width={videoWidth}  style={{ borderRadius: '10px' , border: processIndicator ? '3px solid red' : 'none' }} />
                      <canvas ref={canvasRef} style={{ position: 'absolute' }} />                
                      </div>
                  </div>
                :   
                  <div>loading...</div>  
              : <>  </>
              }
          </SpaceBetweenContainer>

         {captureVideo && modelsLoaded &&  <Container>
             {!buttonDisplay && <BestButton onClick={()=>{rightInFace(); setProcessIndicator(true) ; setButtonDisplay(true)}} style={{cursor: 'pointer'}}>{T.face_recognition.start_scan}</BestButton>}
              {images[0] && images.map((img,index)=>{
              return(
              <Image key={index} src={img}></Image>
              )
              })}      
          </Container>}
      </OrderContainer>
    </MainContainer2></MainContainer1>
  );

}

const MainContainer2 = styled.div`
    /* position: absolute; */ 
    width: 100%;
    /* top: 20%; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
    background-color:#161b22;
`
const MainContainer1 = styled.div`
      justify-content: center;
`
const OrderContainer = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  width: 200px;
  max-width: 200px;
  overflow: hidden;
  padding: 10px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid;
  border-color: rgba(255,255,255,.15);   
`

const SpaceBetweenContainer = styled(Container)`
  width: 350px;
  max-width: 350px;
  justify-content: space-between;
`

const Image = styled.img`
  width:70px;
  height:70px;
  margin: 10px;
  display: flex;
  justify-self: center;
`
