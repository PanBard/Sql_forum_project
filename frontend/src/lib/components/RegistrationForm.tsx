import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { BestButton, ContainerP } from './components_modules';
import  Axios  from 'axios';
import { SERVER_ROUTS } from 'lib/database/server_routs';
import { useTranslations } from 'lib/hooks/useTranslations';
import { API_ROUTS } from 'lib/forum/api_routs_forum';


type RegistrationFormProps = {
    result(params: any): any
    lang: string
}

export const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({
    result,
    lang
}) => {
    const T = useTranslations(lang)
    const [firstName, setFirstName] = useState<any>('');
    const [lastName, setLastName] = useState<any>('');
    const [username, setUsername] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [password,setPassword] = useState<any>('');
    const [confirmPassword,setConfirmPassword] = useState<any>('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [errorType, setErrorType] = useState<any>('');


    const handleInputChange = (e: any) => {
        const {id , value} = e.target;
        // if(id === "firstName"){
        //     setFirstName(value);
        // }
        // if(id === "lastName"){
        //     setLastName(value);
        // }
        if(id === "username"){
            setUsername(value)
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

     const validate_credencials = async ( ) =>{
        if(username == ''){
            setErrorType('enterUsername')
            return null
        }
       

        const query = `select username from users where username='${username}'`
        await Axios.post(API_ROUTS.custom_query, {query: query})
            .then((response)=>{                 
                if(typeof response.data[0] != 'undefined'){
                    const username_from_db = response.data[0]['username']
                    if(username_from_db == username) {                    
                        setErrorType('wrongUsername')
                        setSubmitted(false)
                    }                    
                }
                else{                    
                    if(password==confirmPassword){
                        if(password == ''){
                            setErrorType('enterPassword')
                            return null
                        }
                        send_data_to_db()
                    }
                    else{
                        setErrorType('wrongPassword')
                        setSubmitted(false)
                    }
                    
                }})
     }



     const send_data_to_db = async () => {            
        await Axios.post(API_ROUTS.get_all_users, {username: username, password: password, email:email})            
            .then(  result({result: 'Login', userName : username}))
            .catch((err)=>{console.log('send status :(',err)})
     }

       // Showing success message
       const successMessage = () => {
        return (
            <div style={{ display: submitted ? '' : 'none',}}>
                <h1>{T.registration_form.succes_register_1} {username} {T.registration_form.succes_register_2}</h1>
            </div>
            );
    };

    // Showing error message if error is true
    const errorMessage = () => {
    return (
       <div >
           <div style={{ display: errorType =='wrongPassword' ? '' : 'none',}}>    <h3>{T.registration_form.warn_pass_not_match} </h3>   </div>
           <div style={{ display: errorType =='wrongUsername' ? '' : 'none',}}>    <h3>{T.registration_form.warn_username_taken}</h3>   </div>
           <div style={{ display: errorType =='enterUsername' ? '' : 'none',}}>    <h3>{T.registration_form.warn_username_empty}</h3>   </div>
           <div style={{ display: errorType =='enterPassword' ? '' : 'none',}}>    <h3>{T.registration_form.warn_pass_empty}</h3>   </div>
       </div>
    )
    };


    return(
        <Container className="form" >
             <ContainerP>
            <TableContainer >

                <Cell >
                    <h1>{T.registration_form.header}</h1>
                    
                </Cell>

                 <Cell >
                    <label>{T.registration_form.username}</label>
                    <Input style={{borderColor: errorType == 'wrongUsername' ? 'red' : ''}}  type="text" id='username' onChange = {(e) => handleInputChange(e)} placeholder={T.registration_form.username}/>
                </Cell>

                {/* <Cell >
                    <label>{T.registration_form.first_name}</label>
                    <Input  type="text"  onChange = {(e) => handleInputChange(e)} placeholder="First Name"/>
                </Cell> */}

                {/* <Cell  >
                    <label>{T.registration_form.last_name}</label>
                    <Input  type="text" name=""  onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </Cell> */}

                <Cell >
                    <label >{T.registration_form.email}</label>
                    <Input  type="email" id="email"   onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </Cell>

                <Cell>
                    <label >{T.registration_form.password} </label>
                    <Input style={{borderColor: errorType == 'wrongPassword' ? 'red' : ''}} className="form__input" type="password" id='password' onChange = {(e) => handleInputChange(e)} placeholder={T.registration_form.password}/>
                </Cell>

                <Cell >
                    <label  >{T.registration_form.confirm_password} </label>
                    <Input style={{borderColor: errorType == 'wrongPassword' ? 'red' : ''}} className="form__input" type="password"  id='confirmPassword'  onChange = {(e) => handleInputChange(e)} placeholder={T.registration_form.confirm_password}/>
                </Cell>
                {errorMessage()}
                {successMessage()}
                <div >
                    <BestButton onClick={()=>validate_credencials()} type="submit" >{T.registration_form.button_register}</BestButton>
                </div>

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
    top: 10%;
    
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