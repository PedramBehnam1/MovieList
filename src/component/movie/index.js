import React, { useState } from "react";
import "./index.css";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import axios from "axios";
import { Card , Image } from "react-bootstrap";



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
    
        <Card className=" m-1 col-lg-3 shadow text-center "  style={{ height:"63%"}}>
            
            <Image src={props.movie.addressFile} alt={props.movie.alt} />
            <Card.Body>
                <Card.Title >
                    title:
                    <Card.Subtitle>
                        <p>{props.movie.name}</p>
                    </Card.Subtitle>
                    Year:
                    <Card.Subtitle>
                        <p>{props.movie.yearOfMaking}</p>
                    </Card.Subtitle>
                </Card.Title>

                <div className="d-flex flex-row justify-content-around">
                    <Link to={`/information/${props.movie.id}`}><button className="bg-info rounded-bottom rounded-top">more...</button></Link>
                    <Link to={`/update/${props.movie.id}`}><button className="bg-warning rounded-bottom rounded-top mx-2">Edit </button></Link>
                    <Link to="#" onClick={handleClick}><button className="bg-danger rounded-bottom rounded-top">Delete </button></Link> 
                </div>
            
            </Card.Body>
        
        </Card>
   
  
 )
}

export default Movie;
