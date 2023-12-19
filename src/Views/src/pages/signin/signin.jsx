import { useEffect,useState } from "react";
import { BiShow,BiHide } from 'react-icons/bi';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoFingerPrintOutline } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';

import './signin.css';


import { apiURL as URL } from "../../api/api";


export default Signin;

function Signin() {
    const navigate = useNavigate();

    const signUpMode = () => {
        return (
            navigate('/sign-up', { replace: true })
        )
    }

    const forgetPswMode = () => {
        return (
            navigate('/forgetpassword', { replace: true })

        )
    }



    const successSignIn = () => {
        return (
            navigate('/', { replace: true })
        )
    }

    

    //state
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [staySignin,setStaySignin] = useState(false);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    // error States
    const [errorMessages, setErrorMessages] = useState({});


    //Backend

    const checklogin = async () => {

        const data = {
            "user_id": 0,
            "password": password,
            "user_name": username,
          };
      
        const response = await fetch(`${URL}/api/users/login/check`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
        
    }


    const errors = {
        false: "username or password isn't true",
        username: "invalid username",
        pass: "invalid password"
    };
    const errors_type = {
        username: "username",
        pass: "pass",
        userpass: "userpass"
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        if(username === '') {
            setErrorMessages({name: "username", message: errors.username});
        }
        else if (password === '') {
            setErrorMessages({name: "pass", message: errors.pass});
        }
        else {
            // setErrorMessages({});
            const res = checklogin();
            res.then((value)=>{
                if(value) {
                    setErrorMessages({});
                    
                    successSignIn();
                    
                    ///login
                }
                else {
                    setErrorMessages({name: "userpass", message: errors.false});
                    setErrorMessages({name: "userpass", message: errors.false});
                }});

        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );


    return(
        <>
           <div className='signin-container signin'>
                <form className='form'>
                    <div className='top'>
                        <h3 className='pageName'>Sing In</h3>
                        <div className="img"><IoFingerPrintOutline/></div>
                        
                        <p className='link-text'>Not registered yet?{" "}</p>
                        <span className="link-primary" onClick={signUpMode}>Sign Up</span>
                
                    </div>
                    <div className="username_div">
                        <div className="icon"><FaUser/></div>
                        <label ><b>Username</b></label>
                        <input type={"text"} placeholder="Enter Username" name="username" onChange={(event)=>{setUsername(event.target.value)}}/>
                    </div>
                    {renderErrorMessage(errors_type.username)}
                    {renderErrorMessage(errors_type.userpass)}

                    <div className="pass_div">
                        <label><b>Password</b></label>
                        <div className="icon"><RiLockPasswordFill/></div>
                        <input  type={passwordShown ? "text" : "password"} placeholder="Enter Password" name="psw" onChange={(event)=>{setPassword(event.target.value)}}/>
                        <div className="pass_icon" onClick={togglePassword}>{passwordShown ? <BiShow/> : <BiHide/>}</div>
                
                    </div>
                    {renderErrorMessage(errors_type.pass)}
                    {renderErrorMessage(errors_type.userpass)}

                    <div className="stay-signin">
                        <input type="checkbox" name="stay_signin" checked={staySignin} onChange={() => {setStaySignin(!staySignin)}}/>   
                        <label>Keep me signed in</label>
                    </div>

                    <button className='submit' type="submit" onClick={(event)=>{handleSubmit(event)}}>Submit</button>
                    <p className="forget_psw">Forgot <span onClick={forgetPswMode}>password?</span></p>

                </form>
            </div> 
        </>
    );
}