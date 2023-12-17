import Header from "../../components/header/header";
import Home from "./home";
import Footer from "../../components/footer/footer";
import Signin from "../signin/signin";
import Signup from "../signup/signup";
import Forgetpassword from "../forgetPassword/forgetpassword"

import React from "react";
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements,Outlet} from "react-router-dom";



const Layout = ({outlet}) => {
  const path = (window.location.pathname).split("/").filter((str)=> str !== "");


    return (
      <>
        <Header/>
  
        <div className="routes">
          {outlet}
        </div>
  
        <Footer/>
      </>
    )
  
    
  }
  
  const Routes = () => {
      const router = createBrowserRouter(createRoutesFromElements(
          <Route>
            <Route path="/"  element={<Layout outlet={<Home/>}/>}/>
            <Route path="/home" element={<Layout outlet={<Home/>}/>}/>


            <Route path="/sign-in" element={<Layout outlet={<Signin/>}/>}/>
            <Route path="/sign-up" element={<Layout outlet={<Signup/>}/>}/>
            <Route path="/forgetpassword" element={<Layout outlet={<Forgetpassword/>}/>}/>
          



            
          </Route>
          
        )
      )
            
  
      return (
          <>
              <RouterProvider router={router}/>
          </>
       );
  }
   
  export default Routes;