import React , { useState } from 'react';

import Login from '../signin/signin'
import SignUp from '../signup/signup'
//import ForgetPsw from '../forgetpsw/forgetpsw'
export default Auth

function Auth(props) {
    const [authMode, setAuthMode] = useState(props.mode);


    const signInMode = () => {
        setAuthMode("signin");
    }
    const signUpMode = () => {
        setAuthMode("signup");
    }
    const forgetPswMode = () => {
        setAuthMode("forgetpsw");
    }

    if (authMode === "signin") {
        return(
            <Login signUpMode = {signUpMode} forgetPswMode = {forgetPswMode}/>
        )
    }
    else if (authMode === "signup") {
        return(
            <SignUp signInMode= {signInMode}/>
        )
    }
    else if (authMode === "forgetpsw") {
        return(
            // <ForgetPsw signUpMode = {signUpMode} signInMode= {signInMode}/>
            <>
            test
            </>
        )
    }
}