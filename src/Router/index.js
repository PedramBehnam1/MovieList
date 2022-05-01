import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import routes from './routes';
const Router = () =>{
 return(
  <div>
   <BrowserRouter>
    <Routes>
     {routes.map(route =>{
       return(
        <Route key={route.path} path={route.path} element={route.Component} />
       )
     })
      
     }
    </Routes>
   </BrowserRouter>
  </div>
 )
}

export default Router;