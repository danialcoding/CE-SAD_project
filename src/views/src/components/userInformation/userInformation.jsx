import React from "react";
import { useState , useEffect  } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BiShow,BiHide } from "react-icons/bi";





import './userInformation.css';



export default UserInformation;

function UserInformation() {
    const [username, setUsername] = useState("username");
    const [usernameEditMode, setUsernameEditMode] = useState(false);

    const [password, setPassword] = useState("password");
    const [passwordEditMode, setPasswordEditMode] = useState(false);

    const [name, setName] = useState("name");
    const [nameEditMode, setNameEditMode] = useState(false);

    const [lastName, setLastName] = useState("lastname");
    const [lastNameEditMode, setLastNameEditMode] = useState(false);

    // const [date, setDate] = useState("date");
    // const [dateEditMode, setDateEditMode] = useState(false);

    const [email, setEmail] = useState("email");
    const [emailEditMode, setEmailEditMode] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("phone number");
    const [phoneNumberEditMode, setPhoneNumberEditMode] = useState(false);

    const [privateQuestion, setPrivateQuestion] = useState("question");
    const [privateQuestionEditMode, setPrivateQuestionEditMode] = useState(false);

    const [answerPrivateQuestion, setAnswerPrivateQuestion] = useState("awnswer");
    const [answerPrivateQuestionEditMode, setAnswerPrivateQuestionEditMode] = useState(false);


    
    const [errorMessages, setErrorMessages] = useState({});

    
    const [passwordShown, setPasswordShown] = useState(false);
    
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    useEffect(()=>{
        fetchUserData();
    },[]);

    // const fetchTeamsData = async () => {
    //     const resault = await fetch('http://localhost:8080/teams/top10');
    //     const jsonResault = await resault.json();

    //     setTop10Teams(jsonResault);
    // }



    
    //backend check and edit
    const fetchUserData = async () => {
        const response = await fetch(`${URL}/api/users/check/username?user_name=${username}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
    
        const result = await response.json();
        
        setUsername(result.username);
        setPassword(result.password);
        setName(result.name);
        setLastName(result.family);
        setEmail(result.email);
        setPhoneNumber(result.phoneNumber);
        setPrivateQuestion(result.password);
        setAnswerPrivateQuestion(result.password);


    }

    const editUsername = async () => {
        const data = {
            "id": 0,
            "user_name": username,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    const editPassword = async () => {
        const data = {
            "id": 0,
            "user_name": password,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    const editName = async () => {
        const data = {
            "id": 0,
            "user_name": name,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    const editEmail = async () => {
        const data = {
            "id": 0,
            "user_name": email,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    const editLastName = async () => {
        const data = {
            "id": 0,
            "user_name": lastName,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    const editphoneNumber = async () => {
        const data = {
            "id": 0,
            "user_name": phoneNumber,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    const editPrivateQuestion = async () => {
        const data = {
            "id": 0,
            "user_name": privateQuestion,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }
    const editAnswerPrivateQuestion = async () => {
        const data = {
            "id": 0,
            "user_name": answerPrivateQuestion,
          };
      
        const response = await fetch(`${URL}/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }



    //backend check
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
    

    //   const handleSubmit = (event) => {
    //     // event.preventDefault();

    // //     else if(date === '') {
    // //       setErrorMessages({name: "date", message: errors.date});
    // //    }
    
        
    //   };
    
      const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );






    //handle edit
    const cancelEditMode = (event,param)  => {
        switch (param) {
            case 'username':
                setErrorMessages({});
                setUsernameEditMode(false);
                break;
            case 'password':
                setErrorMessages({});
                setPasswordEditMode(false);
                break;
            case 'lastName':
                setErrorMessages({});
                setLastNameEditMode(false);
                break;
            case 'name':
                setErrorMessages({});
                setNameEditMode(false);
                break;
            case 'email':
                setErrorMessages({});
                setEmailEditMode(false);
                break;
            case 'phoneNumber':
                setErrorMessages({});
                setPhoneNumberEditMode(false);
                break;
            case 'privateQuestion':
                setErrorMessages({});
                setPrivateQuestionEditMode(false);
                break;
            case 'answerPrivateQuestion':
                setErrorMessages({});
                setAnswerPrivateQuestionEditMode(false);
                break;
            default:
        }
    }
    const closeEditMode = (event,param)  => {
        switch (param) {
            case 'username':
                if(username === '') {
                    setErrorMessages({name: "username", message: errors.username_empty });
                }
                else if(!checkUsername()) {
                    setErrorMessages({name: "username", message: errors.username});
                }
                else {
                    setErrorMessages({});
                    setUsernameEditMode(false);
                    
                }
                break;
            case 'password':
                if(password === '') {
                    setErrorMessages({name: "pass", message: errors.pass_empty});
                }
                else {
                    setErrorMessages({});
                    setPasswordEditMode(false);
                }
                break;
            case 'lastName':
                if(lastName === '') {
                    setErrorMessages({name: "lastname", message: errors.lastname});
                }
                else {
                    setErrorMessages({});
                    setLastNameEditMode(false);
                }
                break;
            case 'name':
                if(name === '') {
                    setErrorMessages({name: "name", message: errors.name});
                }
                else {
                    setErrorMessages({});
                    setNameEditMode(false);
                }
                
                break;
            case 'email':
                if(email === '') {
                    setErrorMessages({name: "email", message: errors.email_empty});
                }
                else if(isValidEmail(email) !== true) {
                    setErrorMessages({name: "email", message: errors.email_empty});
                }
                else if(!checkEmail()) {
                    setErrorMessages({name: "email", message: errors.email});
                }
                else {
                    setErrorMessages({});
                    setEmailEditMode(false);
                }
                break;
            case 'phoneNumber':
                if(phoneNumber === '') {
                    setErrorMessages({name: "phoneNumber", message: errors.phoneNumber_empty});
                }
                else if(isValidPhoneNumber(phoneNumber) !== true) {
                    setErrorMessages({name: "phoneNumber", message: errors.phoneNumber_empty});
                }
                else if(!checkPhoneNumber()) {
                    setErrorMessages({name: "phoneNumber", message: errors.phoneNumber});
                }
                else {
                    setErrorMessages({});
                    setPhoneNumberEditMode(false);
                }
                break;
            case 'privateQuestion':
                if(privateQuestion === '') {
                    setErrorMessages({name: "pquestion", message: errors.pquestion});
                }
                else {
                    setErrorMessages({});
                    setPrivateQuestionEditMode(false);
                }

                break;
            case 'answerPrivateQuestion':
                if(answerPrivateQuestion === '') {
                    setErrorMessages({name: "answer", message: errors.answer});
                }
                else {
                    setErrorMessages({});
                    setAnswerPrivateQuestionEditMode(false);
                }
                break;
            default:
        }
        
    }
    
    const openEditMode = (param) => {
        
        switch (param) {
            case 'username':
                setUsernameEditMode(true);
                break;
            case 'password':
                setPasswordEditMode(true);
                break;
            case 'lastName':
                setLastNameEditMode(true);
                break;
            case 'name':
                setNameEditMode(true);
                break;
            case 'email':
                setEmailEditMode(true);
                break;
            case 'phoneNumber':
                setPhoneNumberEditMode(true);
                break;
            case 'privateQuestion':
                setPrivateQuestionEditMode(true);
                break;
            case 'answerPrivateQuestion':
                setAnswerPrivateQuestionEditMode(true);
                break;
            default:

        }
    }
    
    const onEditHandler = (event,param) => {
        closeEditMode(event,param);
    }

    return(
        <>
            <div className="user-information user-information-container">
                <div className="form">

                    <div className="top-user-info">
                        <image/>
                        <div className="uname-div">
                            <span className="username">{username}</span>
                            
                        </div>
                        

                    </div>

                    <div className="username_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Username</label>
                        {usernameEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'username')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={usernameEditMode ? (e)=> {onEditHandler(e,'username')} : ()=> {openEditMode('username')}} aria-label={usernameEditMode ? 'Save' : 'Edit'} title={usernameEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {usernameEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!usernameEditMode} type={"text"} value={username} onChange={(event) => {setUsername(event.target.value);}}/>
                        {renderErrorMessage(errors_type.username)}
                    </div>
                    
                    
                    <div className="email_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Email</label>
                        {emailEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'email')}} aria-label="Cancel" title="Cancel" >
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={emailEditMode ? (e)=> {onEditHandler(e,'email')} : ()=> {openEditMode('email')}} aria-label={emailEditMode ? 'Save' : 'Edit'} title={emailEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {emailEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!emailEditMode} type={"text"} value={email} onChange={(event) => {setEmail(event.target.value);}}/>
                        {renderErrorMessage(errors_type.email)}
                    </div>
                    

                    <div className="password_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Password</label>
                        {passwordEditMode && (
                            <button className="textfield--header-action" onClick={(e)=> {cancelEditMode(e,'password')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={passwordEditMode ? (e)=> {onEditHandler(e,'password')} : ()=> {openEditMode('password')}} aria-label={passwordEditMode ? 'Save' : 'Edit'} title={passwordEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {passwordEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!passwordEditMode} type={passwordShown ? "text" : "password"} value={password} onChange={(event) => {setPassword(event.target.value);}}/>
                        <div className="pass_icon" onClick={togglePassword}>
                            {passwordShown ? <BiShow /> : <BiHide />}
                        </div>
                        {renderErrorMessage(errors_type.pass)}
                    </div>
                    

                    <div className="name_div info-item">
                        <div className="icon">
                            <MdDashboard />
                        </div>
                        <div className="top">
                        <label>First Name</label>
                        {nameEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'name')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={nameEditMode ? (e)=> {onEditHandler(e,'name')} : ()=> {openEditMode('name')}} aria-label={nameEditMode ? 'Save' : 'Edit'} title={nameEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {nameEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!nameEditMode} type={"text"} value={name} onChange={(event) => {setName(event.target.value);}}/>
                        {renderErrorMessage(errors_type.name)}
                    </div>
                    


                    <div className="lastname_div info-item">
                        <div className="icon">
                            <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Last Name</label>
                        {lastNameEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'lastName')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={lastNameEditMode ? (e)=> {onEditHandler(e,'lastName')} : ()=> {openEditMode('lastName')}} aria-label={lastNameEditMode ? 'Save' : 'Edit'} title={lastNameEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {lastNameEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!lastNameEditMode} type={"text"} value={lastName} onChange={(event) => {setLastName(event.target.value);}}/>
                        {renderErrorMessage(errors_type.lastname)}
                    </div>
                    


                    <div className="phonenumber_div info-item">
                        <div className="icon">
                            <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Phone Number</label>
                        {phoneNumberEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'phoneNumber')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={phoneNumberEditMode ? (e)=> {onEditHandler(e,'phoneNumber')} : ()=> {openEditMode('phoneNumber')}} aria-label={phoneNumberEditMode ? 'Save' : 'Edit'} title={phoneNumberEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {phoneNumberEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!phoneNumberEditMode} type={"text"} value={phoneNumber} onChange={(event) => {setPhoneNumber(event.target.value);}}/>
                        {renderErrorMessage(errors_type.phoneNumber)}
                    </div>
                    

                    <div className="privatequestion_div info-item">
                        <div className="icon">
                            <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Private Question</label>
                        {privateQuestionEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'privateQuestion')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={privateQuestionEditMode ? (e)=> {onEditHandler(e,'privateQuestion')} : ()=> {openEditMode('privateQuestion')}} aria-label={privateQuestionEditMode ? 'Save' : 'Edit'} title={privateQuestionEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {privateQuestionEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!privateQuestionEditMode} type={"text"} value={privateQuestion} onChange={(event) => {setPrivateQuestion(event.target.value);}}/>
                        {renderErrorMessage(errors_type.pquestion)}
                    </div>
                    


                    <div className="phonenumber_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Answer Private Question</label>
                        {answerPrivateQuestionEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'answerPrivateQuestion')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={answerPrivateQuestionEditMode ? (e)=> {onEditHandler(e,'answerPrivateQuestion')} : ()=> {openEditMode('answerPrivateQuestion')}} aria-label={answerPrivateQuestionEditMode ? 'Save' : 'Edit'} title={answerPrivateQuestionEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {answerPrivateQuestionEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!answerPrivateQuestionEditMode} type={"text"} value={answerPrivateQuestion} onChange={(event) => {setAnswerPrivateQuestion(event.target.value);}}/>
                        {renderErrorMessage(errors_type.answer)}
                    </div>
                    


                </div>
                





                {/* <div className="phonenumber_div info-item">
                    <div className="icon">
                            <MdDashboard />
                    </div>
                    <div className="top">
                    <label>Phone Number</label>
                    {phoneNumberEditMode && (
                        <button className="textfield--header-action"onClick={cancelEditMode} aria-label="Cancel" title="Cancel" aria-controls={id}>
                            <IoClose aria-hidden="true" />
                        </button>
                        )}
                        <button onClick={phoneNumberEditMode ? onEditHandler : openEditMode} aria-label={phoneNumberEditMode ? 'Save' : 'Edit'} title={phoneNumberEditMode ? 'Save' : 'Edit'} className="textfield--header-action"aria-controls={id}>                  
                            {phoneNumberEditMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                        </button>
                    </div>
                    <input id={id} readOnly={!phoneNumberEditMode} type={"text"} value={phoneNumber} onChange={(event) => {setPhoneNumber(event.target.value);}}/>
                </div> */}
                
                   
                
            </div>
        </>
    );
}