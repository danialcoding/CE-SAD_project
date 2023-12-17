import { useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import {
  FaUser,
  FaCalendar,
  FaMailBulk,
  FaPhone,
  FaQuestion,
  FaCircle,
} from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { IoFingerPrintOutline } from "react-icons/io5";

import "./signup.css";

export default Signup;

function Signup(props) {
  const { signInMode, forgetPswMode } = props;

  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Backend
  const [users, setUsers] = useState([]);

  const fetchUsersData = async () => {
    const resault = await fetch("");
    const jsonResault = await resault.json();

    setUsers(jsonResault);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const errors = {
    username: "invalid username",
    pass: "invalid password",
  };
  const errors_type = {
    username: "username",
    pass: "pass",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = users.find((user) => user.username === username);

    if (userData) {
      if (userData.password !== password) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setErrorMessages({});
        setIsSubmitted(true);
        //change this
      }
    } else {
      setErrorMessages({ name: "username", message: errors.username });
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
          {renderErrorMessage(errors_type.pass)}

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

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
