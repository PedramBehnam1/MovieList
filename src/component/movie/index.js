import React, { useEffect, useState } from "react";
import "./index.css";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import axios from "axios";
import { Card , Image } from "react-bootstrap";
import {useStateToProps , useDispatchToProps} from "../../redux/action/actions";
import  {SEARCH_TEXT} from "../../redux/action/action-types";
import { wait } from "@testing-library/user-event/dist/utils";
import Home from "../../pages/home";
import {BrowserRouter,Routes,Redirect } from "react-router-dom";

const Movie = (props) =>{ 
 const baseUrl = "http://localhost/CRUD_2/Pedram_Behnam_CRUD/index.php";
 const [state,seteState] = useState(false);
 const {visibility , nameOfMovie,yearOfMakingMovie,status} = useStateToProps((state) =>({
    visibility: state.app.visibility,
    nameOfMovie: state.app.nameOfMovie,
    yearOfMakingMovie: state.app.yearOfMakingMovie,
    status: state.app.status,
  }));

  const[textItem,setTextItem] = useState({
    visibility:true,
    nameOfMovie: "",
    yearOfMakingMovie:  "",
    status: true,
  });

  const updateText = useDispatchToProps(SEARCH_TEXT);




  useEffect(()=>{
    console.log(555512333333333333);
    try {
        // console.log(textItem.visibility);
        // updateText(textItem);
        console.log(visibility);
        console.log(nameOfMovie);
        console.log(yearOfMakingMovie);
        // console.log(status);
        // console.log(status);
        // console.log(status);
        // console.log(status);
    } catch (error) {
      console.log(error);
    }
  },[textItem ]);


 const handleClick=(e)=>{
  if (window.confirm("Are you sure want to delete?")) {

   axios.delete(`${baseUrl}?id=${props.movie.id}`).then(res=>{
        console.log(res.data);
         // window.location.reload();// if you dont problem with refresh the page
        if (res.status == 200) {
            window.location.reload(false);
            seteState(true);// if you dont want refresh the page
        }

   })

//    axios.get(`${baseUrl}/index.php`).then(res =>{
  
//     if (res.data != "rows: 0") { 
//     //   this.setState({movieList : res.data}); 
//       console.log(res.data);
//     }
    
      
//     })
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
            
            <Image src={props.movie.addressFile} alt={props.movie.alt} style={{ imageRendering:"pixelated"}}/>
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
