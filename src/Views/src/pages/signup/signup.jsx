import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import {FaUser,FaCalendar,FaMailBulk,FaPhone,FaQuestion,FaCircle,} from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine  } from "react-icons/ri";
//import { IoFingerPrintOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import "./signup.css";

import { apiURL as URL } from "../../api/api";



export default Signup;

function Signup() {
  const navigate = useNavigate();

  const signInMode = () => {
      return (
          navigate('/sign-in', { replace: true })
      )
  }

  const successSignUp = () => {
      return (
          navigate('/', { replace: true })
      )
  }

  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [privateQuestion, setPrivateQuestion] = useState("");
  const [answerPrivateQuestion, setAnswerPrivateQuestion] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmpasswordShown);
  };

  // error States
  const [errorMessages, setErrorMessages] = useState({});
  //const [isSubmitted, setIsSubmitted] = useState(false);

  //Backend

  const signupUser = async () => {

    const data = {
        "id": 0,
        "user_name": username,
        "name": name,
        "family": lastName,
        "phone_number": phoneNumber,
        "email": email,
        "birth_day": date
      };
  
    const response = await fetch(`${URL}/api/users/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return await response.json();
  }

  const insertPassword = async () => {

    const data = {
        "user_id": 0,
        "password": password,
        "user_name": username,
      };
      
  
    const response = await fetch(`${URL}/api/users/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    console.log(data);

    const result = await response.json();
    console.log(result);
    return result;
  }


  const checkUsername = async () => {
  
    const response = await fetch(`${URL}/api/users/check/username?user_name=${username}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result;
  }

  const checkEmail = async () => {
  
    const response = await fetch(`${URL}/api/users/check/email?email=${email}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });

    return  await response.json();
  }

  const checkPhoneNumber = async () => {
  
    const response = await fetch(`${URL}/api/users/check/phone_number?phone_number=${phoneNumber}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });

    return  await response.json();
  }

  const errors = {
    username: "username already exist",
    username_empty: "invalid username",
    pass_s: "The password and confirm passwor are not the same",
    pass_empty: 'invalid password',
    date: "invalid date",
    email_empty: "invalid email",
    email: "email already exist",
    phoneNumber_empty: "invalid phone number",
    phoneNumber: "phone number already exist",
    pquestion: "invalid question",
    answer: "invalid answer",
    name: 'invalid first name',
    lastname: 'invalid last name',
  };
  const errors_type = {
    username: "username",
    pass: "pass",
    confpass: 'confpass',
    date: "date",
    email: "email",
    phoneNumber: "phoneNumber",
    pquestion: 'pquestion',
    answer: 'answer',
    name: 'name',
    lastname: 'lastname',
    passandconfpass: 'passandconfpass',
  };

  const isValidEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
  }
  const isValidPhoneNumber = (phoneNumber) => {
    return /[0-9]{11}/.test(phoneNumber);
}

  const handleSubmit = (event) => {
    event.preventDefault();


    if(username === '') {
      setErrorMessages({name: "username", message: errors.username_empty });
    }
    else if(name === '') {
      setErrorMessages({name: "name", message: errors.name});
    }
    else if(lastName === '') {
      setErrorMessages({name: "lastname", message: errors.lastname});
    }
    else if(password === '') {
      setErrorMessages({name: "pass", message: errors.pass_empty});
    }
    else if(confirmPassword === '') {
      setErrorMessages({name: "confpass", message: errors.pass_empty});
    }
    else if(confirmPassword !== password) {
      setErrorMessages({name: "passandconfpass", message: errors.pass_s });
      setErrorMessages({name: "passandconfpass", message: errors.pass_s });
   }
    else if(date === '') {
      setErrorMessages({name: "date", message: errors.date});
   }
    else if(email === '') {
      setErrorMessages({name: "email", message: errors.email_empty});
    }
    else if(isValidEmail(email) !== true) {
      setErrorMessages({name: "email", message: errors.email_empty});
    }
    else if(phoneNumber === '') {
      setErrorMessages({name: "phoneNumber", message: errors.phoneNumber_empty});
    }
    else if(isValidPhoneNumber(phoneNumber) !== true) {
      setErrorMessages({name: "phoneNumber", message: errors.phoneNumber_empty});
    }
    else if(privateQuestion === '') {
      setErrorMessages({name: "pquestion", message: errors.pquestion});
    }
    else if(answerPrivateQuestion === '') {
      setErrorMessages({name: "answer", message: errors.answer});
    }
    else if(!checkUsername()) {
      setErrorMessages({name: "username", message: errors.username});
    }
    else if(!checkEmail()) {
      setErrorMessages({name: "email", message: errors.email});
    }
    else if(!checkPhoneNumber()) {
      setErrorMessages({name: "phoneNumber", message: errors.phoneNumber});
    }
    else{
      setErrorMessages({});
      signupUser();

      insertPassword();

      successSignUp();
      //login
    }

    
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <>
      <div className="signup-container signup">
        <form className="form">
          <div className="top">
            <h3 className="pageName">Sing Up</h3>

            <p className="link-text">Already have an account? </p>
            <span className="link-primary" onClick={signInMode}>
              <b>Sign In</b>
            </span>
          </div>

          <div className="username_div">
            <div className="icon">
              <FaUser />
            </div>
            <label>
              <b>Username</b>
            </label>
            <input
              type={"text"}
              placeholder="Enter Username"
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.username)}


          <div className="name_div">
            <div className="icon">
              <FaUser />
            </div>
            <label>
              <b>First Name</b>
            </label>
            <input
              type={"text"}
              placeholder="Enter your first name"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.name)}


          <div className="lastname_div">
            <div className="icon">
              <FaUser />
            </div>
            <label>
              <b>Lastname</b>
            </label>
            <input
              type={"text"}
              placeholder="Enter your lastname"
              name="name"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.lastname)}

          <div className="pass_div">
            <label>
              <b>Password</b>
            </label>
            <div className="icon">
              <RiLockPasswordFill />
            </div>
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Enter Password"
              name="psw"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className="pass_icon" onClick={togglePassword}>
              {passwordShown ? <BiShow /> : <BiHide />}
            </div>
          </div>
          {renderErrorMessage(errors_type.pass)}
          {renderErrorMessage(errors_type.passandconfpass)}

          <div className="pass_div">
            <label>
              <b>Confirm password</b>
            </label>
            <div className="icon">
              <RiLockPasswordLine />
            </div>
            <input
              type={confirmpasswordShown ? "text" : "password"}
              placeholder="Enter Password"
              name="conf-psw"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <div className="pass_icon" onClick={toggleConfirmPassword}>
              {confirmpasswordShown ? <BiShow /> : <BiHide />}
            </div>
          </div>
          {renderErrorMessage(errors_type.confpass)}
          {renderErrorMessage(errors_type.passandconfpass)}

          <div className="username_div">
            <div className="icon">
              <FaCalendar />
            </div>
            <label>
              <b>Date of birth</b>
            </label>
            <input
              type={"date"}
              placeholder="Enter Date of your birth"
              name="date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.date)}

          <div className="username_div">
            <div className="icon">
              <FaMailBulk />
            </div>
            <label>
              <b>Email</b>
            </label>
            <input
              type={"email"}
              placeholder="Enter Email"
              name="date"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.email)}


          <div className="username_div">
            <div className="icon">
              <FaPhone />
            </div>
            <label>
              <b>Phone Number</b>
            </label>
            <input
              type={"tel"}
              placeholder="Enter Phone Number"
              name="Phone Number"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.phoneNumber)}


          <div className="username_div">
            <div className="icon">
              <FaQuestion />
            </div>
            <label>
              <b>Private Question</b>
            </label>
            <input
              type={"text"}
              placeholder="Enter Private Question"
              name="Private Question"
              onChange={(event) => {
                setPrivateQuestion(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.pquestion)}

          <div className="username_div">
            <div className="icon">
              <FaCircle />
            </div>
            <label>
              <b>Answer</b>
            </label>
            <input
              type={"text"}
              placeholder="Enter Answer"
              name="Answer"
              onChange={(event) => {
                setAnswerPrivateQuestion(event.target.value);
              }}
            />
          </div>
          {renderErrorMessage(errors_type.answer)}

          <button className="submit" type="submit" onClick={(event)=>{handleSubmit(event)}}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
