import { BestButton } from "lib/components/components_modules"
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam"
import styled from "styled-components"
import * as faceapi from '@vladmandic/face-api';
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";
import { APP_CONFIG } from "lib/config";

type FaceRecognitionDemoProps = {
  lang: any
}

export const FaceRecognitionDemo: React.FunctionComponent<FaceRecognitionDemoProps> = ({
  lang
}) => {

  const T = useTranslations(lang)
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [age, setAge] = useState<any>()
  const [gender, setGender] = useState<any>()
  const [expression, setExpression] = useState<any>()
  const [data,setData] = useState<any>([])

  const videoRef = useRef<Webcam>(null);
  const videoHeight = 340;
  const videoWidth = 520;
  const canvasRef = useRef<any>(null);
  const wholeImageCanvasRef = useRef<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = APP_CONFIG.FACES_MODELS_URL
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(async () => {setModelsLoaded(true);
        const query = 'SELECT id, CONVERT(img1 USING utf8) as img1, CONVERT(img2 USING utf8) as img2, CONVERT(img3 USING utf8) as img3, username, date FROM face_img_storage'
       await Axios.post(SERVER_ROUTS.custom_query.get, {query: query}).then((response)=>{setData(response.data)})
      });
    }
    loadModels();
  }, []);


  const startVideo = () => {
    setCaptureVideo(true);
    setShowVideo(true)

  }

  //          https://www.youtube.com/watch?v=yBgXx0FLYKc&ab_channel=Computervisionengineer

  const closeWebcam = () => {
    setCaptureVideo(false);
  }

  const getLabeledFaceDescriptions =async () => {
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){

    const face_number = Object.keys(data)
    return Promise.all(
      face_number.map(async (nr: any)=>{
        let description: Float32Array[] = []
        const userData = data[nr]
      
        for(let i =1; i==1; i++){
            const url = userData[`img${i}`]
            const image = await faceapi.fetchImage(url)
            const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            description.push(detection?.descriptor!)    //non-null assertion      
          }
          
          if(description.length) {  
            return  new faceapi.LabeledFaceDescriptors(userData['username'], description )
          }
        })
      
    )
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
                    
                    const detections = await  faceapi.detectAllFaces(videoRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                    canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                    const results = resizedDetections.map((den)=>{
                      return faceMatcher.findBestMatch(den.descriptor)
                    })

                    if(detections){
                      setAge(  parseInt((detections[0].age).toString()))
                      setGender(detections[0].gender)                       
                      const expression = detections[0].expressions
                      const propertyNames = Object.keys(expression);
                      const value = Object.values(expression)
                      propertyNames.map((name)=>{
                        if(expression[name as keyof  typeof expression] == Math.max(...value)) setExpression(name)
                      })
                    }                    
                    results.forEach(async (result , i)=>{
                      const box = resizedDetections[i].detection.box
                      
                      const drawBox = new faceapi.draw.DrawBox(box, {label: result as unknown as string} )                           
                      drawBox.draw(canvasRef.current)
                    })
                  }
                },100)
      } 
  }

  useMemo(()=>{
    let condition = true;
    if(captureVideo){
      const interval =  setInterval(()=>{
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){      
      clearInterval(interval);
      condition = false
       rightInFace()
    }    
    },100)
    }
    },[captureVideo])

  return (
    <ContainerC >
      
      <div style={{ textAlign: 'center', padding: '10px' }}>
    {!showVideo &&  <BestButton onClick={startVideo} style={{cursor: 'pointer', display: data[0] ? 'block' : 'none'}}>{T.face_recognition.open_webcam}</BestButton>}
      </div>
      
      {captureVideo ? modelsLoaded ?
            <div>
              <Container >
                  <Webcam ref={videoRef} height={videoHeight} width={videoWidth}  style={{display:'block',position: 'fixed', right:'30%',  borderRadius: '10px' }} />
                  <canvas ref={canvasRef} style={{ display:'block',position: 'fixed', right:'30%'}} />               
              </Container>

            </div>
            :   <div>loading...</div>  : <>  </>
        }

      {captureVideo && modelsLoaded && <ContainerC2>
        <ContainerLabel>{T.face_recognition.age} {age}</ContainerLabel>
        <ContainerLabel>{T.face_recognition.gender} {gender}</ContainerLabel>
        <ContainerLabel>{T.face_recognition.expression} {expression}</ContainerLabel>
      </ContainerC2>}
        <canvas style={{width: 640, height: 480, margin: 5, display: 'none'}} ref={wholeImageCanvasRef} />
    </ContainerC>
  );

}

const Container = styled.div`
  position: relative;
  top: 20%;
  z-index: 5;
  justify-content: center;
`
const ContainerC = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`
const ContainerLabel = styled.div`
    margin: 20px;
`
const ContainerC2 = styled.div`
    position: absolute;
    width: 200px;
    top: 50%;
    left: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`