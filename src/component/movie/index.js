import React, { useState } from "react";
import "./index.css";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import axios from "axios";


const Movie = (props) =>{ 
 const baseUrl = "http://localhost/CRUD_2/Pedram_Behnam_CRUD/index.php";
 const [state,seteState] = useState(false);

 const handleClick=()=>{
  if (window.confirm("Are you sure want to delete?")) {

   axios.delete(`${baseUrl}?id=${props.movie.id}`).then(res=>{
    console.log(res.data);
   // window.location.reload();// if you dont problem with refresh the page
    seteState(true);// if you dont want refresh the page
   })
  }
 }

 if(state){
  return(
   <>
   </>
  )
 }

 return(
  <div>
   <div className="div1-movie">
   <img src={props.movie.addressFile} alt={props.movie.alt} />
   <div className="div2-movie">
    <h1>title: {props.movie.name}</h1>
    <p>Year: {props.movie.yearOfMaking}</p>
   </div>
   <div className="div3-movie">
   <Link to={`/information/${props.movie.id}`}><button>show more datail</button></Link>
    <Link to={`/update/${props.movie.id}`}><button className="edit">Edit </button></Link>
    
    <Link to="#" onClick={handleClick}><button className="delete">Delete </button></Link> 
   </div>
   </div>
  </div>
 )
}

export default Movie;
