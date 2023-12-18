import { useEffect,useState } from "react";
import { BiShow,BiHide } from 'react-icons/bi';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoFingerPrintOutline } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';


import SignUp from '../signup/signup'

import './signin.css';



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
    const [isSubmitted, setIsSubmitted] = useState(false);


    //Backend
    const[users,setUsers] = useState([]);

    const fetchUsersData = async () => {
        const resault = await fetch('');
        const jsonResault = await resault.json();

        setUsers(jsonResault);
    }


    useEffect(()=>{
        fetchUsersData();
    },[]);



    const errors = {
        username: "invalid username",
        pass: "invalid password"
    };
    const errors_type = {
        username: "username",
        pass: "pass",
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = users.find((user) => user.username === username);

        if (userData) {
            if (userData.password !== password) {
                setErrorMessages({name: "pass", message: errors.pass});
            } else {
                setErrorMessages({});
                setIsSubmitted(true);
                //change this
            }
        } else {
            setErrorMessages({ name: "username", message: errors.username});
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
                    {renderErrorMessage(errors_type.pass)}

                    <div className="pass_div">
                        <label><b>Password</b></label>
                        <div className="icon"><RiLockPasswordFill/></div>
                        <input  type={passwordShown ? "text" : "password"} placeholder="Enter Password" name="psw" onChange={(event)=>{setPassword(event.target.value)}}/>
                        <div className="pass_icon" onClick={togglePassword}>{passwordShown ? <BiShow/> : <BiHide/>}</div>
                
                    </div>
                    {renderErrorMessage(errors_type.pass)}

                    <div className="stay-signin">
                        <input type="checkbox" name="stay_signin" checked={staySignin} onChange={() => {setStaySignin(!staySignin)}}/>   
                        <label>Keep me signed in</label>
                    </div>

                    <button className='submit' type="submit">Submit</button>
                    <p className="forget_psw">Forgot <span onClick={forgetPswMode}>password?</span></p>

                </form>
            </div> 
        </>
    );
}