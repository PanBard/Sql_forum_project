import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { BestButton, MyImage, TableContainer, Td_image, Tr_sticky_row } from "lib/components/components_modules";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks";

type PHAnalyserProps = {
  lang: string,
  userName: string
}


export const PHAnalyser: React.FunctionComponent<PHAnalyserProps> = ({
  lang,
  userName
}) => {


  const T = useTranslations(lang);
  const webcamRef = useRef<Webcam>(null);
  const divRef = useRef<any>(null);
  const imageCanvasRef = useRef<any>(null);
  const WholeImageCanvasRef = useRef<any>(null);
  const DrawImageCanvasRef = useRef<any>(null);  


  
  const [rgbString,setRgbString] = useState<String>();
  const [firstPosition,setFirstPosition] = useState<any>();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [rect,setRect] = useState<any>();
  const [dimension,setDimension] = useState<any>();
  const [objectToDatabase, setObjectToDatabase] = useState<any[]>([]);
  const [componentForDisplay,setComponentForDisplay] = useState<any>();
  const [PHvalue, setPHvalue] = useState<any>();
  const [seed, setSeed] = useState(1);
  const [showLabelForm,setShowLabelForm] = useState<any>(false);
  const [status,setStatus] = useState<any>('panel')
  const [sendFlag, setSendFlag] = useState<any>();
  const [rgb, setRgb] = useState<any>();
  const [rgbForDiv,setRgbForDiv] = useState<any>();
  const [analysis_name, setAnalysis_name] = useState<string>('Default')
  const [foregoingAnalysis ,setForegoingAnalysis] = useState([])
  const [currentSetAnalysis,setCurrentSetAnalysis] = useState([])
  const [status2, setStatus2] = useState<any>('start')
  const [oryginalImage,setOryginalImage] = useState<any>()
  const [bestResult,setBestResult] = useState()
  const reset = () => {
    setSeed(Math.random()+1)
}

  const  getFirstMousePos = ( evt:any) => {
    var rect = WholeImageCanvasRef.current.getBoundingClientRect();
    WholeImageCanvasRef.current.onMouseMove
    const position = {x: evt.clientX - rect.left, y: evt.clientY - rect.top}
    setFirstPosition(position)    
    setIsDown(true)
  }

const getSecondMousePos = async (evt: any) =>{
 
    const canvas = DrawImageCanvasRef.current
    WholeImageCanvasRef.current.onMouseMove
    const position = {x: evt.clientX , y: evt.clientY-dimension?.height}
    var ctx=canvas.getContext("2d");
    ctx.fillStyle = "#9ea7b8";
    ctx.fillRect(firstPosition?.x,firstPosition?.y,dimension?.width,dimension?.height);
    canvas.style.opacity = '0.3';
  
    setIsDown(false)
   await cutImage().then(()=>{insertLabelComponent(position);setShowLabelForm(true)})

}

const handleMouseMove = (evt: any) =>{
  evt.preventDefault();
  evt.stopPropagation();

  // if we're not dragging, just return
  if(!isDown){return;}
 
  const canvas = DrawImageCanvasRef.current
  let mouseX=evt.clientX - rect.left;
  let mouseY=evt.clientY - rect.top;
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let width=mouseX-firstPosition?.x;
  let height=mouseY-firstPosition?.y;
  setDimension({width: width, height: height})
  ctx.strokeRect(firstPosition?.x,firstPosition?.y,width,height);
  imageCanvasRef.current.getContext('2d').drawImage(WholeImageCanvasRef.current, firstPosition.x, firstPosition.y,width,height,0,0,Math.abs(width) ,Math.abs(height))
}

const cutImage = async () =>{
  imageCanvasRef.current.width = Math.abs(dimension.width);
  imageCanvasRef.current.height =Math.abs(dimension.height) ;
  imageCanvasRef.current.getContext('2d').drawImage(WholeImageCanvasRef.current, firstPosition.x, firstPosition.y,dimension.width,dimension.height,0,0,Math.abs(dimension.width) ,Math.abs(dimension.height))
  await makeRGBAnalysis()
}

const  getAverageRGB = (img: any) =>{
  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:12,g:12,b:12}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = img.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:10,g:10,b:10},
      count = 0;
      
  if (!context) {return defaultRGB;}
  
  height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
  width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;
  context.drawImage(img, 0, 0);

  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      /* security error, img on diff domain */alert('x');
      return defaultRGB;
  }
  
  length = data.data.length;
  
  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);
  return rgb;
}



const setWholeImage = async () => {
  if(webcamRef.current){
    const detected_image = webcamRef.current.getScreenshot();
    if(detected_image){
      const image = new Image(540,380)
      image.src = detected_image;
      await smallFunction()
      .then( ()=> { setCanvas(image) } )
      
    }
  }
}

const setImageFromDevice = async (img: any) => {
      const image = new Image(540,380)
      const reader = new FileReader(); //reader for converting file to base64
      reader.readAsDataURL(img[0]);
      reader.onloadend = async () => {
      const base64String = reader.result;// img in base64 format
      image.src = base64String as string;
    } 

      
      await smallFunction2()
      .then( ()=> {setCanvas(image)} )
}

const setImageToComparison = async () => {
  if(webcamRef.current){
    const detected_image = webcamRef.current.getScreenshot();
    if(detected_image){
      const image = new Image(540,380)
      image.src = detected_image;
      await smallFunction2()
      .then( ()=> { setCanvas(image) } )
      
    }
  }
}

const setCanvas = (image: any) => {
    
    WholeImageCanvasRef.current.width = 540
    WholeImageCanvasRef.current.height = 380
    DrawImageCanvasRef.current.width = 540
    DrawImageCanvasRef.current.height = 380
    WholeImageCanvasRef.current.getContext('2d').drawImage(image, 0, 0, 540, 380)
    setRect(WholeImageCanvasRef.current.getBoundingClientRect())
}

const onNewLabelHandle = () => {
  if(PHvalue){
  const img = imageCanvasRef.current.toDataURL()
  const obj = {value: PHvalue, img: img, rgb:rgb, rgbForDiv: rgbForDiv}
  setObjectToDatabase(preVImg => [...preVImg, obj])
  reset()
  setShowLabelForm(false)
  const canvas = DrawImageCanvasRef.current
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  setSendFlag('no')
  }
}

const getNewRgbValue = async () => {
  setShowLabelForm(false)
  const canvas = DrawImageCanvasRef.current
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  setSendFlag('no') 
  let R_difference =0
  let G_difference =0
  let B_difference =0
  let R_averageError =0
  let G_averageError =0
  let B_averageError =0
  let sum = 1000
  let sumErr = 0
  let bestResult = 10000;
  let bestPhName = '';
  await currentSetAnalysis.map((obj:any, index)=>{

    if(obj.R != null){
    R_difference = Math.abs(obj.R-rgb.r) 
    G_difference = Math.abs(obj.G-rgb.g) 
    B_difference = Math.abs(obj.B-rgb.b) 
    R_averageError = (R_difference/rgb.r)
    G_averageError = (G_difference/rgb.g)
    B_averageError = (B_difference/rgb.b)
    sum = R_difference+G_difference+B_difference
    sumErr = R_averageError+G_averageError+B_averageError
      if(sum <= bestResult){
        bestResult = sum
        setBestResult(obj.ph)
      }
  }
  })
  
}

useMemo(()=>{
  if(sendFlag == 'ok' && status=='labellinngPh') onNewLabelHandle()
  if(sendFlag == 'ok' && status=='makeComparison') getNewRgbValue()
},[sendFlag])
 
const insertLabelComponent = (position: any) =>{
  if(status=='labellinngPh'){
    setComponentForDisplay(
        <LabelComponent  key={seed+1} style={{ top: `${(position.y )+ 'px'}`, left: `${position.x + 'px'}`}} >
          <input type="text" placeholder={T.ph.p_value}  onChange = {(e) => {setPHvalue(e.target.value)}} />
          <BestButton onClick={()=>{setSendFlag('ok')}}>OK</BestButton>
        </LabelComponent>
      )
  }
  
  if(status=='makeComparison'){
    setComponentForDisplay(
        <LabelComponent  key={seed+1} style={{ top: `${(position.y )+ 'px'}`, left: `${position.x + 'px'}`}} >          
          <BestButton onClick={()=>{ setSendFlag('ok')}}>OK</BestButton>
        </LabelComponent>
      )
  }
}

const makeScreenToComparison = ( ) =>{

   if(status2=='makeScreenToComparison'){return(
        <CenterContainer>
          <Webcam
                ref={webcamRef}
                muted={true} 
                screenshotFormat="image/jpeg"
                style={{margin: 10, width: 540, height: 380}}
              /> 
            <Container>
              <BestButton style={{width:'150px',height:'50px'}} onClick={ ()=>{ setImageToComparison()} } > {T.ph.take_screenshot} </BestButton>
            </Container> 
        </CenterContainer>
      )}

      if(status2=='getFileFromDevice'){return(
        <CenterContainer>
            <Container>
            <input 
                type="file"
                // name="myImage"
                multiple={true}
                onChange={(event: any) => {const f = event.target.files; setImageFromDevice(f); const name = event.target.files[0].name.slice(0, -4) }}
            />
            </Container> 
        </CenterContainer>
      )}  
}

const defaultDisplay = () => {
  if(status2=='start'){
    return(
    <div><BestButton style={{width:'auto',height:'50px', zIndex:2}}  onClick={()=>{setStatus2('makeScreenToComparison')}}> {T.ph.take_screenshot}  </BestButton>
    <BestButton style={{width:'auto',height:'50px', zIndex:2}}  onClick={()=>{setStatus2('getFileFromDevice')}}> {T.ph.file_from_device}  </BestButton></div>
    )
  }

  if(status2=='imageTaken'){ 
    return(
      <div>
        <Canvas   ref={WholeImageCanvasRef}/>
        <DrawCanvas  onMouseMove={(e)=>{handleMouseMove(e)}}  onMouseUp={(e)=>{getSecondMousePos(e)}} onMouseDown={(e)=>{getFirstMousePos(e)}}  ref={DrawImageCanvasRef}/> 
      </div>        
    )
  }
}

const diplayComponent = () => {
  return componentForDisplay
}

const makeRGBAnalysis = () => {
  let rgb = getAverageRGB(imageCanvasRef.current)
  divRef.current.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
  setRgbForDiv('rgb('+rgb.r+','+rgb.g+','+rgb.b+')')
  setRgb(rgb)
  setRgbString('RGB ['+rgb.r+' , '+rgb.g+' , '+rgb.b+']')
}

 

  const smallFunction = async () => {
     setStatus('labellinngPh')
  }

  const smallFunction2 = async () => {
    setStatus2('imageTaken')
 }

  const send_data_to_db = async () => {
    const keys = Object.keys(objectToDatabase)
    let name = analysis_name

    if(analysis_name =='Default') {
        const date = new Date()
        name = 'Default' +  date.toISOString().toString()
      }

        const owner = userName ? userName : 'test'
        const wholeImage = WholeImageCanvasRef.current.toDataURL()
        const queryONE = `INSERT INTO ph_analysis (username, img, ph, rgb, date, analysis_name) VALUES ('${owner}','${wholeImage}','prime','-',now(), '${name}') `
        // console.log(queryONE)
        Axios.post(SERVER_ROUTS.custom_query.get, {query: queryONE})        
        .then( ()=>{
           keys.map((nr: any)=>{
            const query = `INSERT INTO ph_analysis (username, img, ph, rgb, date, analysis_name,R,G,B,ph_number) VALUES ('${owner}','${objectToDatabase[nr]['img']}','${objectToDatabase[nr]['value']}','${objectToDatabase[nr]['rgbForDiv']}',now(), '${name}',${objectToDatabase[nr]['rgb']['r']},${objectToDatabase[nr]['rgb']['g']},${objectToDatabase[nr]['rgb']['b']},${objectToDatabase[nr]['value']}) `
            Axios.post(SERVER_ROUTS.custom_query.get, {query: query})            
            .then( )
            .catch((err)=>{console.log('send status :(',err)})
        })
        } )
        .then(()=>{  setStatus('panel')})
        .catch((err)=>{console.log('send status :(',err)})
    }
  
   
  const getDataFromDb = () => {
    const query = userName ? `SELECT DISTINCT analysis_name FROM ph_analysis WHERE username = '${userName}'` : 'SELECT DISTINCT analysis_name FROM ph_analysis'
    Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
    .then((response)=>{ setForegoingAnalysis(response.data)})
    .then( )
    .catch((err)=>{console.log('send status :(',err)})
  }

  const getSpecificAnalysis = (analysisName: any) => {
    const query = `SELECT * FROM ph_analysis WHERE analysis_name = '${analysisName}' ORDER BY ph_number `
    Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
    .then((response)=>{ setCurrentSetAnalysis(response.data)})
    .then( ()=>{
      const query2 = `SELECT CONVERT(img USING utf8) as img FROM ph_analysis WHERE analysis_name = '${analysisName}' AND ph = 'prime' `
      Axios.post(SERVER_ROUTS.custom_query.get, {query: query2})
      .then((response)=>{ setOryginalImage(response.data)})
    } )
    .catch((err)=>{console.log('send status :(',err)})
  }

  const returnComponent = () => {

    if(status == 'panel'){
      return(
        <CenterContainer >
        <Container>
        <BestButton style={{width:'auto',height:'50px', zIndex:2}}  onClick={()=>{setStatus('start')}}> {T.ph.new_calibrations}  </BestButton>
        <BestButton style={{width:'auto',height:'50px', zIndex:2}}  onClick={()=>{setStatus('choose');getDataFromDb()}}> {T.ph.prevoius_calibrations} </BestButton>
        </Container>
      </CenterContainer>
      )
    }

    if(status == 'choose'){
      
      return(
        <CenterContainer >
        <Container>
        <span style={{margin:'10px'}}>{T.ph.saved_cal}</span>
        <TableContainer>
                   <table >
                        <tbody >
                           { foregoingAnalysis.map((obj:any, index)=>{                            
                             return( 
                              <tr key={index}> 
                                <Td style={{cursor:'pointer', width: '180px',borderRadius:'5px'}} onClick={()=>{getSpecificAnalysis(obj.analysis_name) ;setStatus('makeComparison')}} >{obj.analysis_name}</Td>
                              </tr>
                             )
                             }) }
                        </tbody> 
                    </table>
                     
                   </TableContainer>
        </Container>
      </CenterContainer>
      )
    }

    if(status == 'makeComparison'){

      return(
        <OrderContainer>
          
            {showLabelForm && diplayComponent()}

          
            <SavedContainer style={{overflowY:'hidden', width:'250px'}} key={seed+100}>
              <div >
                <h3>pH table:</h3>              
                { oryginalImage &&  <img style={{width:'220px', height:'100px'}} src={oryginalImage[0]['img']} alt="" />}
                <TableContainer style={{height:'200px'}}>
                <table >
                      <tbody >
                        <Tr_sticky_row>
                                <Th key={100}> pH</Th>
                                <Th key={300}>color</Th>
                                <Th key={400}>rgb</Th>
                        </Tr_sticky_row>                      
                      
                        { currentSetAnalysis.map((obj:any, index)=>{
                          return( 
                            <tr key={index}> 
                              {<Td>{obj.ph_number}</Td>}
                              {<Td style={{backgroundColor:`${obj.rgb}`}} ></Td>}
                              {<Td style={{fontSize:'small'}} >[{obj.rgb}]</Td>}
                            </tr>
                          )
                          }) }
                      </tbody>
                  </table>
                  
                </TableContainer>
              
              </div>
              <div></div>
            </SavedContainer>


            <div style={{margin:'10px',position:'relative',width: 'auto', height: 'auto',}}>
            {makeScreenToComparison()}
            {defaultDisplay()}
            
            </div>

          <SpaceBetweenContainer style={{width:'300px'}}>
            <h3>{T.ph.preview}</h3>
            <Container  style={{marginLeft:'0px', marginRight: '0px', width:'auto'}}>
              <div>
                <canvas  ref={imageCanvasRef} style={{height: `${dimension ? dimension.height+'px' : '0px'}`,width: `${dimension ? dimension.width+'px' : '0px'}` }}/>
              
              </div>
              <div>
                <div style={{marginTop: '10px',width: '100px', height: '100px', zIndex: '100'}} ref={divRef}> <h6>{rgbString}</h6>  </div>
              </div>
            </Container>
            
            <Container style={{marginLeft:'0px', marginRight: '0px', width:'auto'}}>
            {T.ph.result} {bestResult}
            </Container>
              
            </SpaceBetweenContainer>
                    
      </OrderContainer>
      )
    }

    if(status == 'start'){
      return(
        <CenterContainer >
          <Container style={{width:'250px' , maxWidth:'300px'}}>
          {T.ph.cal_name}
            <input style={{backgroundColor: 'gray'}} type="text"  onChange={ (e)=>{setAnalysis_name(e.target.value)} }/>
          <BestButton style={{width:'auto',height:'50px', zIndex:2}}  onClick={()=>{setStatus('takeImg')}}> {T.common.begin}  </BestButton>
          </Container>
        </CenterContainer>
      )
    }
  
    if(status == 'takeImg'){
      return(
        <CenterContainer>
          <Webcam
                ref={webcamRef}
                muted={true} 
                screenshotFormat="image/jpeg"
                style={{margin: 10, width: 540, height: 380}}
              /> 
            <Container>
              <BestButton style={{width:'150px',height:'50px'}} onClick={ ()=>{ setWholeImage(); } } >{T.ph.take_screenshot}</BestButton>
              <BestButton style={{width:'auto',height:'50px', zIndex:2}}  onClick={()=>{setStatus2('getFileFromDevice')}}> {T.ph.file_from_device}  </BestButton>
            </Container> 
        </CenterContainer>
      )
    }

    if(status == 'labellinngPh'){
      const keys = Object.keys(objectToDatabase)
      return(
        <OrderContainer>
              {showLabelForm && diplayComponent()}
              <SpaceBetweenContainer>
                <h3>{T.ph.preview}</h3>
                <div>
                  <canvas  ref={imageCanvasRef} style={{height: `${dimension ? dimension.height+'px' : '0px'}`,width: `${dimension ? dimension.width+'px' : '0px'}` }}/>
                 
                </div>
                <div>
                  <div style={{marginTop: '10px',width: '100px', height: '100px', zIndex: '100'}} ref={divRef}> <h6>{rgbString}</h6>  </div>
                </div>
              </SpaceBetweenContainer>

              <div style={{margin:'10px',position:'relative',width: 'auto', height: 'auto',}}>
              <Canvas   ref={WholeImageCanvasRef}/>
              <DrawCanvas  onMouseMove={(e)=>{handleMouseMove(e)}}  onMouseUp={(e)=>{getSecondMousePos(e)}} onMouseDown={(e)=>{getFirstMousePos(e)}}  ref={DrawImageCanvasRef}/>
              </div>

              <SavedContainer style={{overflowY:'hidden'}} key={seed+100}>
                <div >
                   <h3>{T.ph.ph_table}</h3>
                   <BestButton style={{float:'right'}} onClick={()=>{send_data_to_db()}}>Save</BestButton>
                   <TableContainer>
                   <table >
                        <tbody >
                          <Tr_sticky_row>
                                  <Th key={100}> pH</Th>
                                  <Th key={200}>img</Th>
                                  <Th key={300}>color</Th>
                                  <Th key={400}>rgb</Th>
                          </Tr_sticky_row>
                        
                        
                           { keys.map((obj:any, index)=>{
                             return( 
                              <tr key={index}> 
                                {<Td>{objectToDatabase[obj]['value']}</Td>}
                               { <Td_image >  <MyImage2    src={objectToDatabase[obj]['img']}/></Td_image>}
                                {<Td style={{backgroundColor:`${objectToDatabase[obj]['rgbForDiv']}`}} ></Td>}
                                {<Td style={{fontSize:'small'}} >[{objectToDatabase[obj]['rgb']['r']}-{objectToDatabase[obj]['rgb']['g']}-{objectToDatabase[obj]['rgb']['b']}]</Td>}
                              </tr>
                             )
                             }) }
                        </tbody>
                    </table>
                     
                   </TableContainer>
                 
                </div>
                <div></div>
              </SavedContainer>        
        </OrderContainer>
      )
    }
  }

  return (
    <MainContainer>
      {returnComponent()}           
    </MainContainer> 
  ); 
}

const MainContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`
const CenterContainer = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    flex: 1;
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
  border-color: rgba(255,255,255,.15);    border: 1px solid;
  border-color: rgba(255,255,255,.15);

`

const SpaceBetweenContainer = styled(Container)`
   justify-content: space-between;
`

const SavedContainer = styled(SpaceBetweenContainer)`
  width: 350px;
  max-width: 350px;

`

const Canvas = styled.canvas`
  width: 540px;
  height: 380px;
  z-index:3;
`

const DrawCanvas = styled(Canvas)`
  position: absolute;
  z-index:5;
  top: 0;
  right: 0;
`

const LabelComponent = styled.div`
  position: fixed;
  z-index: 100;
  height: auto;
`
const Th = styled.th`
    border: 1px solid gray;
    justify-content: center;
`
const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    text-align:center; 
`

const MyImage2 = styled(MyImage)`
    width: 20;
    height: 20;
`