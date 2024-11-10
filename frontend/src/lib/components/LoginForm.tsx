import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { BestButton, ContainerP } from './components_modules';
import  Axios  from 'axios';
import { useTranslations } from 'lib/hooks/useTranslations';
import { API_ROUTS } from 'lib/forum/api_routs_forum';


type LoginFormProps = {
    result(params: any): any
    lang: string
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
    result,
    lang
}) => {
    
    const T = useTranslations(lang)
    const [username, setUsername] = useState<any>('limon');
    const [password,setPassword] = useState<any>('limon');
    const [errorType, setErrorType] = useState<any>('limon');
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = (e: any) => {
        const {id , value} = e.target;
        if(id === "username"){setUsername(value)}
        if(id === "password"){setPassword(value)}
    }



    const validate_password = async ( ) =>{
         const query = `select password, username from users where username='${username}'`
        await Axios.post(API_ROUTS.custom_query, {query: query})
            .then((response)=>{
                if(typeof response.data[0] != 'undefined'){
                    if(response.data[0]['password'] == password && response.data[0]['username'] == username) {                        
                        setSubmitted(true)
                        setErrorType('none')
                        result({result: 'Login', userName : response.data[0]['username']})
                        alert(`Udało Ci się zalogować ${response.data[0]['username']}`)
                    }
                    else{                        
                        setErrorType('wrongPassword')
                        setSubmitted(false)
                }
                }
                else{                    
                    setErrorType('wrongUsername');
                    setSubmitted(false)
                }
                
               })
            .catch((err)=>{console.log('send status :(',err)})
    }




    // Showing success message
    const successMessage = () => {
        return (
            <div style={{ display: submitted ? '' : 'none',}}>
                <h1>{T.login_form.succes_login}</h1>
            </div>
            );
    };

    // Showing error message
    const errorMessage = () => {
             return (
                <div >
                    <div style={{ display: errorType =='wrongPassword' ? '' : 'none',}}>    <h3>{T.login_form.warn_wrong_pass}</h3>   </div>
                    <div style={{ display: errorType =='wrongUsername' ? '' : 'none',}}>    <h3>{T.login_form.warn_wrong_username}</h3>   </div>
                </div>
        )
    };


    return(
        <Container className="form" >
             <ContainerP>
            <TableContainer >

                <Cell >
                    <h1>{T.login_form.header}</h1>
                    
                </Cell>

                 <Cell >
                    <label>{T.login_form.username} </label>
                    <Input style={{borderColor: errorType == 'wrongUsername' ? 'red' : ''}} type="text" id='username' onChange = {(e) => handleInputChange(e)} placeholder={T.login_form.username}/>
                </Cell>


                <Cell>
                    <label >{T.login_form.password}</label>
                    <Input style={{borderColor: errorType == 'wrongPassword' ? 'red' : ''}} className="form__input" type="password" id='password' onChange = {(e) => handleInputChange(e)} placeholder={T.login_form.password}/>
                </Cell>

       
                {errorMessage()}
                {successMessage()}
                <div >
                    <BestButton onClick={()=>validate_password()} type="submit" >{T.login_form.button_sign_in}</BestButton>
                </div>

                {/* <LoginFaceRecognition lang={lang} returnResult={(e)=>{result(e)}}/> */}

                   </TableContainer>
             </ContainerP>
        </Container>
       
    )       
}

const Container = styled.div`
  padding: 0 15px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    position: absolute; 
    top: 20%;
    z-index: 4;
    width: 100%;    
`

const Input = styled.input`
    background-color: ${ ({theme}) => theme.colors.foreground };
    width: 60%;
    color: ${ ({theme}) => theme.colors.typography };
    height: 30px;
    ::placeholder{color:gray}
    border-radius: 10px;
    border: 1px solid;
    border-color: rgba(255,255,255,.35);
`

const TableContainer = styled.div`
    border: 1px solid ;
    border-color: rgba(255,255,255,.55);
    border-radius: 10px;
    justify-content: center;
    border-radius: 5px;
    width: 550px;
    margin: 20px auto;
    padding: 20px;

`

const Cell = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`