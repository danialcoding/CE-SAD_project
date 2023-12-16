import Header from "../../components/header/header";
import Home from "./home";
import Footer from "../../components/footer/footer";
import Signin from "../signin/signin";
import Signup from "../signup/signup";

import React from "react";
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements,Outlet} from "react-router-dom";



const Layout = ({outlet}) => {
    const path = (window.location.pathname).split("/").filter((str)=> str !== "");
    
    if(path[0] === "Dashboard" | path[0] === "dashboard") {
      return (
        <div className="routes">
          {outlet}
        </div>
      )
    }
    else {
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
  
    
  }
  
  const Routes = () => {
      const router = createBrowserRouter(createRoutesFromElements(
          <Route >
            <Route path="/"  element={<Layout outlet={<Home/>}/>}/>
            <Route path="/home" element={<Layout outlet={<Home/>}/>}/>


            <Route path="/sing-in" element={<Layout outlet={<Signin/>}/>}/>
            <Route path="/sing-up" element={<Layout outlet={<Signup/>}/>}/>
            {/* <Route path="/forgetpsw" element={<Layout outlet={}/> */}



            
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