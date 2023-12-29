import { useEffect,useState } from "react";
import { BiShow,BiHide } from 'react-icons/bi';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoFingerPrintOutline } from 'react-icons/io5';


import SignUp from '../signup/signup'

import './forgetpassword.css';



export default ForgetPassword;

function ForgetPassword() {
    //state
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [answer,setAnswer] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    // error States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [question, setQuestion] = useState('');
    const [questionExist, setQuestionExist] = useState(false);
    const [checkQuestion, setCheckQuestion] = useState(false);
    


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

    const answerField = () => {
        return (
            <div className="answer_div">
                <label><b>Answer</b></label>
                <div className="icon"><RiLockPasswordFill/></div>
                <input  type={"text"} placeholder="Enter Answer" name="answer" onChange={(event)=>{setAnswer(event.target.value)}}/>
            </div>
        )
        
    }

    const newPassField = () => {
        return (
            <div className="answer_div">
                <label><b>New Password</b></label>
                <div className="icon"><RiLockPasswordFill/></div>
                <input  type={passwordShown ? "text" : "password"} placeholder="Enter Password" name="password" onChange={(event)=>{setPassword(event.target.value)}}/>
                <div className="pass_icon" onClick={togglePassword}>{passwordShown ? <BiShow/> : <BiHide/>}</div>
            </div>
        )
    }





    const errors = {
        email: "invalid email",
        ans: "invalid Answer",
        pass: "invalid password"
    };
    const errors_type = {
        email: "email",
        ans: "ans",
        pass: "pass",
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = users.find((user) => user.email === email);

        if (userData && questionExist !== true) {
            setQuestion(userData.privatequestion);
            setQuestionExist(true);
        }
        else if(userData && questionExist === true) {
            if(userData.awnser === answer) {
                setCheckQuestion(true);
            }
            else {
                setErrorMessages({ name: "ans", message: errors.ans});
            }
        }
        else if(checkQuestion === true && userData.password === password) {
            //change password in backend
        }
        else {
            setErrorMessages({ name: "email", message: errors.email});
        }
    };

    const renderPrivateQuestion = () =>
        questionExist === true && (
        <div className="privatequestion"><b>{question}</b></div>
    );

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );


    return(
        <>
           <div className='forgetpassword-container forgetpassword'>
                <form className='form'>
                    <div className='top'>
                        <h3 className='pageName'>Forget Password</h3>
                        <div className="img"><IoFingerPrintOutline/></div>
                
                    </div>
                    <div className="email_div">
                        <div className="icon"><FaUser/></div>
                        <label ><b>Email</b></label>
                        <input type={"text"} placeholder="Enter Email" name="email" onChange={(event)=>{setEmail(event.target.value)}}/>
                    </div>
                    {renderErrorMessage(errors_type.email)}


                    {renderPrivateQuestion()}


                    {questionExist ? answerField() : null}
                    {renderErrorMessage(errors_type.ans)}


                    {checkQuestion ? newPassField() : null}
                    {renderErrorMessage(errors_type.pass)}



                    <button className='submit' type="submit" onClick={(event)=>{handleSubmit(event)}}>Submit</button>
                </form>
            </div> 
        </>
    );
}