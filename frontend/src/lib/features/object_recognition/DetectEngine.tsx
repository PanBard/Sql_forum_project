import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import { APP_CONFIG } from "lib/config";


type ColorProps = {
  changeColor: boolean
}

type DetectBaseProps = {
  return_results_to_parent_component(params: any): any
  refreshChat(params: any): any
}

export const DetectEngine: React.FunctionComponent<DetectBaseProps> = ({
    return_results_to_parent_component,
    refreshChat
}) => {
    
  const [functionReturn, setFunctionReturn] = useState<any>();
  const [redOrBlack, setRedOrBlack] = useState(false);
  const [detectedImage, setDetectedImage] = useState();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<any>(null);

  const wholeImageCanvasRef = useRef<any>(null);
  const croppedImageCanvasRef = useRef<any>(null);
  const doubleCroppedImageRef = useRef<any>(null);

  const [show, setShow] = useState<boolean>(false)

  const classification_labels = ['pomaranczowy_plyn','fioletowy_plyn','zolty_plyn','bialy','czarny','zolty','pomaranczowy','zielony','niebieski','niebiesko_rozowy']
  
   useEffect(()=>{
    if(functionReturn || functionReturn==0){
    const obj = [functionReturn,detectedImage]
    return_results_to_parent_component(obj)
    }
    
   },[functionReturn])
    
    const DetectFunction = (webcamRef: any, canvasRef: any) => {
    
    
        const  mainFunction = async (webcamRef: any, canvasRef: any) => {
            const detectModel = await loadModel()  
            const classifyModel = await loadModelC()            
            return await repeatingFunction(webcamRef,detectModel,classifyModel,canvasRef)
           
        }
        
  
        const repeatingFunction = async (webcamRef: any, model1: any,model2: any,canvasRef: any)=> {            
            const detectResult = await detect(webcamRef, model1, canvasRef)
               if(detectResult){                    
                    const classifyResult = await clasify(model2, detectResult)                     
                    if(classifyResult || classifyResult==0){                      
                        const classifyResult2 = await clasify(model2, detectResult)                           
                        setFunctionReturn(classifyResult2)
                        }
                }
                else setTimeout(()=>{repeatingFunction(webcamRef,model1,model2,canvasRef)}, 500);          
        }
    
        const loadModelC = async () => { 
            const net =  tf.loadGraphModel(APP_CONFIG.OBJECT_CLASSIFICATION_MODEL_URL)
            return net}
    
    
            const clasify = async (net:any, video:any, ) => {
                if (
                    typeof video !== "undefined" &&
                    video !== null 
                  ){
                
                    const img = tf.browser.fromPixels(video)
                    const resized = tf.image.resizeBilinear(img, [220,90])
                    const casted = resized.cast('float32')
                    const expanded = casted.expandDims(0)
                    const obj = await net.executeAsync(expanded)
               
                const scores = await obj.array()            

                if(scores){

                  const indexOfMaxValue = scores[0].reduce((iMax: any, x: any, i: any, arr: any) => x > arr[iMax] ? i : iMax, 0);
                  const mapping_index_from_model_to_result =  [9,10,11,1,2,3,4,5,6,7]              

                return mapping_index_from_model_to_result[indexOfMaxValue]
                }
    
                tf.dispose(img)
                tf.dispose(resized)
                tf.dispose(casted)
                tf.dispose(expanded)
                tf.dispose(obj)                                                    
          }
     }
        
        const loadModel = async () => { 
            const net =  tf.loadGraphModel(APP_CONFIG.OBJECT_DETECTION_MODEL_URL)            
            return net}
    
        
        const detect = async (webcamRef: any,net: any,canvasRef: any) => {
         
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video?.readyState === 4
            ) {
              
                const detected_image = webcamRef.current.getScreenshot();

                // Get Video Properties
                const video = webcamRef.current.video;
                const video2 = webcamRef.current.video;
                
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;
        
                // Set video width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;      
        
                // Detection
                const img = tf.browser.fromPixels(video)
                const resized = tf.image.resizeBilinear(img, [640,480])
                const casted = resized.cast('int32')
                const expanded = casted.expandDims(0)
                const obj = await net.executeAsync(expanded)
        
                
                const boxes = await obj[4].array()
                const classes = await obj[7].array()
                const scores = await obj[5].array()                               
                              
                if (boxes)  {setRedOrBlack(true)} //red border if ready
    
                if(boxes[0][0] && classes[0][0] && scores[0][0]>0.95){

                  // ------ canvas set and conversion to image ----------------------------------------------------------------
                  setShow(true)
                  const ymin =  parseInt((boxes[0][0][0]*videoHeight).toString())
                  const xmin =  parseInt((boxes[0][0][1]*videoWidth).toString())
                  const ymax =  parseInt((boxes[0][0][2]*videoWidth).toString())
                  const xmax =  parseInt((boxes[0][0][3]*videoWidth).toString())

                  //cropped image
                  croppedImageCanvasRef.current.width = 90;
                  croppedImageCanvasRef.current.height = 220;
                  croppedImageCanvasRef.current.getContext('2d').drawImage(video2, xmin-10, ymin+200, 90, 220, 0, 0,90,220 ) //wery gud

                  // whole image
                  wholeImageCanvasRef.current.width = 640;
                  wholeImageCanvasRef.current.height = 480;
                  wholeImageCanvasRef.current.getContext('2d').drawImage(video2, 0, 0, video2.width, video2.height )

                  //draw detect rectangle on image
                  const ctx = wholeImageCanvasRef.current.getContext("2d");
                  const [x, y, width, height] = boxes[0][0]; 
                  ctx.strokeStyle  = '#ffa500'
                  ctx.lineWidth = 3
                  const text =`DETECTION [${xmin-10}, ${ymin+200}, ${xmin+90}, ${ymin+200+220}]`
                  ctx.font = '18px Arial';
                  ctx.fillStyle = '#ffa500'
                  ctx.fillText(text, xmin-10, ymin+190);
                  ctx.rect(xmin-10, ymin+200, 90, 220);    
                  ctx.stroke();  
                  var target2 = wholeImageCanvasRef.current.toDataURL(); 

                  // new html img object for return to further detection
                  var target = new Image(90,220);
                  target.src = croppedImageCanvasRef.current.toDataURL();                

                  // ------ canvas set and conversion to image ----------------------------------------------------------------

                        tf.dispose(img)
                        tf.dispose(resized)
                        tf.dispose(casted)
                        tf.dispose(expanded)
                        tf.dispose(obj)
                        tf.dispose(boxes)
                        tf.dispose(classes)
                        tf.dispose(scores)
                        tf.dispose(net)
                        setDetectedImage(target2)                                              
                        tf.disposeVariables()                                            
                        return target
                }
                else{
                tf.dispose(img)
                tf.dispose(resized)
                tf.dispose(casted)
                tf.dispose(expanded)
                tf.dispose(obj)
                tf.dispose(boxes)
                tf.dispose(classes)
                tf.dispose(scores)                
            } 
            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)
            tf.dispose(boxes)
            tf.dispose(classes)
            tf.dispose(scores)            
            }
            }
        
          return mainFunction(webcamRef,canvasRef)
    }
    
    useEffect(()=>{  DetectFunction(webcamRef,canvasRef)},[])

       return (
    <CenterContainer>
        <Decoration changeColor = {redOrBlack}>
             <Webcam
                        ref={webcamRef}
                        muted={true} 
                        screenshotFormat="image/jpeg"
                        style={{                          
                          width: 540,
                          height: 480,
                        }}
                      />                
             </Decoration>

             <Container>                
                <canvas style={{width: 90, height: 220, display: show ? 'block' : 'none'}} ref={croppedImageCanvasRef}/>
                <canvas style={{width: 90, height: 220, display: show ? 'block' : 'none'}} ref={doubleCroppedImageRef}/>
                <canvas style={{width: 640, height: 480, margin: 5,  display: show ? 'block' : 'none'}} ref={wholeImageCanvasRef}/>                
            </Container>

    </CenterContainer> 
    
  );         
}

const Decoration = styled.div<ColorProps>`
  border:5px solid;
  border-color: ${({changeColor, theme})=> changeColor ? theme.colors.error : theme.colors.background  };
  width: 550px;
  height: 480px;
`
const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`
const Container = styled.div`
  
`

