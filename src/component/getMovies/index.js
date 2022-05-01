import React from "react";
import axios from "axios";

export const MovieContext = React.createContext();

const MContext = () => { 
 const[movies,setMovies] = React.useState([]); 
 const baseUrl = "http://localhost/CRUD_2/Pedram_Behnam_CRUD";

 const getMovies = () => {
   axios.get(`${baseUrl}/index.php`).then(res=>{
     setMovies(res.data);
     console.log(res.data);
   });
  }

 React.useEffect(() => {
   getMovies();
}, []);

 return (
  <MovieContext.Provider
  value={{
   movies
  }}
  >
  </MovieContext.Provider>
 )
}

export default MContext